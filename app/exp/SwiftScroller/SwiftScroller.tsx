"use client";
import HorizontalScroller from "@/components/text";
import DemoArea from "@/components/ui/DemoArea";
import EXPERIMENTS from "@/experiments";
import React from "react";

const items = EXPERIMENTS.map((experiment) => {
  return (
    <video
      src={experiment.src}
      autoPlay
      loop
      muted
      playsInline
      className="max-w-80"
    />
  );
});

const SwiftScroller = () => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [left, setLeft] = React.useState(0);
  const [right, setRight] = React.useState(0);

  const initDemoArea = () => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const left = rect.left;
      setLeft(left);
      setRight(rect.right);
    }
  };

  React.useEffect(() => {
    console.log({ left, right });
  }, [left, right]);

  React.useEffect(() => {
    window.addEventListener("resize", initDemoArea);
    initDemoArea();
    return () => {
      window.removeEventListener("resize", initDemoArea);
    };
  }, []);
  return (
    <div ref={ref} className="w-full relative">
      <div
        className="z-20 absolute top-0 bottom-0 w-screen flex items-center justify-center min-h-80 rounded-md  overflow-hidden border border-[var(--colors-gray6)] bg-cover"
        style={{
          left: -1 * left,
          right: -1 * (window.innerWidth - right),
        }}
      >
        <HorizontalScroller className="p-4">{items}</HorizontalScroller>
      </div>
    </div>
  );
};

export default SwiftScroller;
