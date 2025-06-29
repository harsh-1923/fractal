"use client";
import { SwatchBookIcon } from "lucide-react";
import React from "react";
import { clsx } from "clsx";

type ClipPathTabsProps = {
  tabs?: {
    name: string;
    slot: React.ReactNode;
  }[];
  slowed?: boolean;
};

const ClipPathTabs = ({ tabs = TABS, slowed = false }: ClipPathTabsProps) => {
  const [tabsInView, setTabsInView] = React.useState<number>(tabs.length);
  const [activeTab, setActiveTab] = React.useState(tabs[0].name);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const activeTabElementRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth > 768) {
        setTabsInView(tabs.length);
      } else if (window.innerWidth > 480) {
        setTabsInView(3);
      } else {
        setTabsInView(2);
      }
    });

    return () => {
      window.removeEventListener("resize", () => {});
    };
  }, [tabs.length]);

  React.useEffect(() => {
    const container = containerRef.current;

    if (activeTab && container) {
      const activeTabElement = activeTabElementRef.current;

      if (activeTabElement) {
        const { offsetLeft, offsetWidth } = activeTabElement;

        const clipLeft = offsetLeft;
        const clipRight = offsetLeft + offsetWidth;
        container.style.clipPath = `inset(0 ${Number(
          100 - (clipRight / container.offsetWidth) * 100
        ).toFixed()}% 0 ${Number(
          (clipLeft / container.offsetWidth) * 100
        ).toFixed()}% round 17px)`;
      }
    }
  }, [activeTab, activeTabElementRef, containerRef, tabsInView]);

  return (
    <div className="relative flex flex-col items-center w-fit mx-auto">
      <ul className="relative flex w-full justify-center gap-2">
        {tabs.slice(0, tabsInView).map((tab) => (
          <li key={tab.name}>
            <button
              ref={activeTab === tab.name ? activeTabElementRef : null}
              data-tab={tab.name}
              onClick={() => {
                setActiveTab(tab.name);
              }}
              className="flex h-[34px] items-center gap-2 rounded-[17px] p-4 text-sm font-medium text-black no-underline"
            >
              {tab.slot}
              {tab.name}
            </button>
          </li>
        ))}
      </ul>

      <div
        aria-hidden
        className={clsx(
          "absolute z-10 w-full overflow-hidden transition-[clip-path] duration-250 ease-in-out",
          slowed && "duration-1000"
        )}
        ref={containerRef}
      >
        <ul className="relative flex w-full justify-center gap-2 bg-[#ff4d00]">
          {tabs.slice(0, tabsInView).map((tab) => (
            <li key={tab.name}>
              <button
                data-tab={tab.name}
                onClick={() => {
                  setActiveTab(tab.name);
                }}
                className="flex h-[34px] items-center gap-2 rounded-full p-4 text-sm font-medium text-white no-underline"
                tabIndex={-1}
              >
                {tab.slot}
                {tab.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const TABS = [
  {
    name: "Components",
    slot: (
      <svg
        aria-hidden="true"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4.67129 3.14634C4.47603 3.34161 4.47603 3.65819 4.67129 3.85345L7.14616 6.32833C7.34142 6.52359 7.65801 6.52359 7.85327 6.32833L10.3281 3.85345C10.5234 3.65819 10.5234 3.34161 10.3281 3.14634L7.85327 0.671471C7.65801 0.476209 7.34142 0.476209 7.14616 0.671471L4.67129 3.14634ZM7.49971 5.26766L5.73195 3.4999L7.49971 1.73213L9.26748 3.4999L7.49971 5.26766ZM8.67129 7.14634C8.47603 7.34161 8.47603 7.65819 8.67129 7.85345L11.1462 10.3283C11.3414 10.5236 11.658 10.5236 11.8533 10.3283L14.3281 7.85345C14.5234 7.65819 14.5234 7.34161 14.3281 7.14634L11.8533 4.67147C11.658 4.47621 11.3414 4.47621 11.1462 4.67147L8.67129 7.14634ZM11.4997 9.26766L9.73195 7.4999L11.4997 5.73213L13.2675 7.4999L11.4997 9.26766ZM4.67129 11.8535C4.47603 11.6582 4.47603 11.3416 4.67129 11.1463L7.14616 8.67147C7.34142 8.47621 7.65801 8.47621 7.85327 8.67147L10.3281 11.1463C10.5234 11.3416 10.5234 11.6582 10.3281 11.8535L7.85327 14.3283C7.65801 14.5236 7.34142 14.5236 7.14616 14.3283L4.67129 11.8535ZM5.73195 11.4999L7.49971 13.2677L9.26748 11.4999L7.49971 9.73213L5.73195 11.4999ZM0.671288 7.14649C0.476026 7.34175 0.476026 7.65834 0.671288 7.8536L3.14616 10.3285C3.34142 10.5237 3.65801 10.5237 3.85327 10.3285L6.32814 7.8536C6.5234 7.65834 6.5234 7.34175 6.32814 7.14649L3.85327 4.67162C3.65801 4.47636 3.34142 4.47636 3.14616 4.67162L0.671288 7.14649ZM3.49972 9.26781L1.73195 7.50005L3.49972 5.73228L5.26748 7.50005L3.49972 9.26781Z"
          fill="currentColor"
          fillRule="evenodd"
          clipRule="evenodd"
        ></path>
      </svg>
    ),
  },
  {
    name: "Spacing",
    slot: (
      <svg
        aria-hidden="true"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3.00014 2.73895C3.00014 2.94698 2.76087 3.06401 2.59666 2.93628L1.00386 1.69744C0.875177 1.59735 0.875177 1.40286 1.00386 1.30277L2.59666 0.063928C2.76087 -0.0637944 3.00014 0.0532293 3.00014 0.261266V1.00012H9.00009V0.261296C9.00009 0.0532591 9.23936 -0.0637646 9.40358 0.0639578L10.9964 1.3028C11.1251 1.40289 11.1251 1.59738 10.9964 1.69747L9.40358 2.93631C9.23936 3.06404 9.00009 2.94701 9.00009 2.73898V2.00012H3.00014V2.73895ZM9.50002 4.99998H2.50002C2.22388 4.99998 2.00002 5.22384 2.00002 5.49998V12.5C2.00002 12.7761 2.22388 13 2.50002 13H9.50002C9.77616 13 10 12.7761 10 12.5V5.49998C10 5.22384 9.77616 4.99998 9.50002 4.99998ZM2.50002 3.99998C1.67159 3.99998 1.00002 4.67156 1.00002 5.49998V12.5C1.00002 13.3284 1.67159 14 2.50002 14H9.50002C10.3284 14 11 13.3284 11 12.5V5.49998C11 4.67156 10.3284 3.99998 9.50002 3.99998H2.50002ZM14.7389 6.00001H14V12H14.7389C14.9469 12 15.064 12.2393 14.9362 12.4035L13.6974 13.9963C13.5973 14.125 13.4028 14.125 13.3027 13.9963L12.0639 12.4035C11.9362 12.2393 12.0532 12 12.2612 12H13V6.00001H12.2612C12.0532 6.00001 11.9361 5.76074 12.0639 5.59653L13.3027 4.00373C13.4028 3.87505 13.5973 3.87505 13.6974 4.00374L14.9362 5.59653C15.0639 5.76074 14.9469 6.00001 14.7389 6.00001Z"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="0.2"
          fillRule="evenodd"
          clipRule="evenodd"
        ></path>
      </svg>
    ),
  },
  {
    name: "Colors",
    slot: <SwatchBookIcon size={16} />,
  },
  {
    name: "Typography",
    slot: (
      <svg
        aria-hidden="true"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3.94993 2.95002L3.94993 4.49998C3.94993 4.74851 3.74845 4.94998 3.49993 4.94998C3.2514 4.94998 3.04993 4.74851 3.04993 4.49998V2.50004C3.04993 2.45246 3.05731 2.40661 3.07099 2.36357C3.12878 2.18175 3.29897 2.05002 3.49993 2.05002H11.4999C11.6553 2.05002 11.7922 2.12872 11.8731 2.24842C11.9216 2.32024 11.9499 2.40682 11.9499 2.50002L11.9499 2.50004V4.49998C11.9499 4.74851 11.7485 4.94998 11.4999 4.94998C11.2514 4.94998 11.0499 4.74851 11.0499 4.49998V2.95002H8.04993V12.05H9.25428C9.50281 12.05 9.70428 12.2515 9.70428 12.5C9.70428 12.7486 9.50281 12.95 9.25428 12.95H5.75428C5.50575 12.95 5.30428 12.7486 5.30428 12.5C5.30428 12.2515 5.50575 12.05 5.75428 12.05H6.94993V2.95002H3.94993Z"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="0.4"
          fillRule="evenodd"
          clipRule="evenodd"
        ></path>
      </svg>
    ),
  },
];

export default ClipPathTabs;
