"use client";

import type React from "react";

import { useRef, useState, useEffect, useCallback, ReactNode } from "react";

// Performance constants
const VELOCITY_THRESHOLD = 0.5; // Minimum velocity to trigger scaling
const THROTTLE_DELAY = 16; // ~60fps throttling
const VELOCITY_SAMPLES = 3; // Number of velocity samples to average

interface HorizontalScrollerProps {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  velocityThreshold?: number;
  maxVelocity?: number;
  minScale?: number;
  resetDelay?: number;
}

export default function HorizontalScroller({
  children,
  className = "",
  containerClassName = "",
  velocityThreshold: propVelocityThreshold = 1.0,
  maxVelocity: propMaxVelocity = 8,
  minScale: propMinScale = 0.8,
  resetDelay: propResetDelay = 100,
}: HorizontalScrollerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, scrollLeft: 0 });
  const [scrollVelocity, setScrollVelocity] = useState(0);
  const [scale, setScale] = useState(1);
  const [isScaling, setIsScaling] = useState(false);

  const [velocityThreshold, setVelocityThreshold] = useState(
    propVelocityThreshold
  );
  const [maxVelocity, setMaxVelocity] = useState(propMaxVelocity);
  const [minScale, setMinScale] = useState(propMinScale);
  const [resetDelay, setResetDelay] = useState(propResetDelay);

  // Performance optimization refs
  const lastScrollTime = useRef(Date.now());
  const lastScrollLeft = useRef(0);
  const velocityTimeout = useRef<NodeJS.Timeout | number | undefined>(
    undefined
  );
  const throttleTimeout = useRef<NodeJS.Timeout | number | undefined>(
    undefined
  );
  const animationFrame = useRef<number | undefined>(undefined);
  const velocityHistory = useRef<number[]>([]);

  // Update props when they change
  useEffect(() => {
    setVelocityThreshold(propVelocityThreshold);
  }, [propVelocityThreshold]);

  useEffect(() => {
    setMaxVelocity(propMaxVelocity);
  }, [propMaxVelocity]);

  useEffect(() => {
    setMinScale(propMinScale);
  }, [propMinScale]);

  useEffect(() => {
    setResetDelay(propResetDelay);
  }, [propResetDelay]);

  // Optimized velocity calculation with throttling and averaging
  const updateScrollVelocity = useCallback(() => {
    if (!containerRef.current) return;

    // Cancel previous animation frame
    if (animationFrame.current) {
      cancelAnimationFrame(animationFrame.current);
    }

    animationFrame.current = requestAnimationFrame(() => {
      if (!containerRef.current) return;

      const currentTime = Date.now();
      const currentScrollLeft = containerRef.current.scrollLeft;
      const timeDiff = currentTime - lastScrollTime.current;
      const scrollDiff = Math.abs(currentScrollLeft - lastScrollLeft.current);

      if (timeDiff > 0) {
        const instantVelocity = scrollDiff / timeDiff;

        // Add to velocity history for smoothing
        velocityHistory.current.push(instantVelocity);
        if (velocityHistory.current.length > VELOCITY_SAMPLES) {
          velocityHistory.current.shift();
        }

        // Calculate average velocity for smoother scaling
        const avgVelocity =
          velocityHistory.current.reduce((sum, v) => sum + v, 0) /
          velocityHistory.current.length;
        setScrollVelocity(avgVelocity);

        // Only apply scaling if velocity exceeds threshold
        if (avgVelocity > velocityThreshold) {
          if (!isScaling) {
            setIsScaling(true);
          }

          // Calculate scale based on velocity (faster = smaller scale)
          const velocityRatio = Math.min(
            (avgVelocity - velocityThreshold) /
              (maxVelocity - velocityThreshold),
            1
          );
          const newScale = 1 - velocityRatio * (1 - minScale);
          setScale(newScale);
        } else {
          // Below threshold - no scaling
          if (isScaling) {
            setScale(1);
            setIsScaling(false);
          }
        }

        lastScrollTime.current = currentTime;
        lastScrollLeft.current = currentScrollLeft;

        // Reset scale after scrolling stops with debouncing
        if (velocityTimeout.current) {
          clearTimeout(velocityTimeout.current);
        }
        velocityTimeout.current = setTimeout(() => {
          setScrollVelocity(0);
          setScale(1);
          setIsScaling(false);
          velocityHistory.current = [];
        }, resetDelay);
      }
    });
  }, [isScaling, velocityThreshold, maxVelocity, minScale, resetDelay]);

  // Throttled scroll handler for better performance
  const handleScroll = useCallback(() => {
    if (throttleTimeout.current) return;

    throttleTimeout.current = setTimeout(() => {
      updateScrollVelocity();
      throttleTimeout.current = undefined as any;
    }, THROTTLE_DELAY);
  }, [updateScrollVelocity]);

  // Handle mouse drag start
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return;

    setIsDragging(true);
    setDragStart({
      x: e.pageX - containerRef.current.offsetLeft,
      scrollLeft: containerRef.current.scrollLeft,
    });

    // Prevent text selection during drag
    e.preventDefault();
  }, []);

  // Handle mouse drag
  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging || !containerRef.current) return;

      e.preventDefault();
      const x = e.pageX - containerRef.current.offsetLeft;
      const walk = (x - dragStart.x) * 2; // Multiply by 2 for faster scrolling
      containerRef.current.scrollLeft = dragStart.scrollLeft - walk;

      updateScrollVelocity();
    },
    [isDragging, dragStart, updateScrollVelocity]
  );

  // Handle mouse drag end
  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Handle touch events for mobile
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (!containerRef.current) return;

    setIsDragging(true);
    const touch = e.touches[0];
    setDragStart({
      x: touch.pageX - containerRef.current.offsetLeft,
      scrollLeft: containerRef.current.scrollLeft,
    });
  }, []);

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isDragging || !containerRef.current) return;

      const touch = e.touches[0];
      const x = touch.pageX - containerRef.current.offsetLeft;
      const walk = (x - dragStart.x) * 2;
      containerRef.current.scrollLeft = dragStart.scrollLeft - walk;

      updateScrollVelocity();
    },
    [isDragging, dragStart, updateScrollVelocity]
  );

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Add global mouse event listeners
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!isDragging || !containerRef.current) return;

      const x = e.pageX - containerRef.current.offsetLeft;
      const walk = (x - dragStart.x) * 2;
      containerRef.current.scrollLeft = dragStart.scrollLeft - walk;

      updateScrollVelocity();
    };

    const handleGlobalMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleGlobalMouseMove);
      document.addEventListener("mouseup", handleGlobalMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleGlobalMouseMove);
      document.removeEventListener("mouseup", handleGlobalMouseUp);
    };
  }, [isDragging, dragStart, updateScrollVelocity]);

  // Enhanced cleanup on unmount
  useEffect(() => {
    return () => {
      if (velocityTimeout.current) {
        clearTimeout(velocityTimeout.current);
      }
      if (throttleTimeout.current) {
        clearTimeout(throttleTimeout.current);
      }
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`
          flex items-start gap-8 overflow-x-auto overflow-y-hidden 
          scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200
          scroll-smooth
          ${isDragging ? "cursor-grabbing select-none" : "cursor-grab"}
          ${containerClassName}
          ${className}
        `}
      onScroll={handleScroll}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        scrollbarWidth: "thin",
        willChange: isDragging || isScaling ? "scroll-position" : "auto",
      }}
    >
      <div
        className="flex items-start gap-2"
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          willChange: isScaling ? "transform" : "auto",
          backfaceVisibility: "hidden", // Optimize for 3D transforms
        }}
      >
        {children}
      </div>
    </div>
  );
}
