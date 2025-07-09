"use client";
import React from "react";

import ClipPathTabs from "../ClipPathTabs/ClipPathTabs";
import {
  Globe,
  Plus,
  Search,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";

const XyneChatbox = () => {
  const [selectedTab, setSelectedTab] = React.useState("Ask AI");

  const handleTabClick = (tab: string) => {
    setSelectedTab(tab);
  };

  const staggerDelay = 0.05;

  const textAreaVariant = {
    askAI: {
      paddingTop: 14,
      paddingBottom: 60,
      paddingRight: 16,
      paddingLeft: 14,
    },
    search: {
      paddingTop: 14,
      paddingBottom: 14,
      paddingRight: 60,
      paddingLeft: 14,
    },
  };
  const textCtrVariants = {
    askAI: {
      minHeight: 96,
    },
    search: {
      minHeight: 64,
    },
  };

  return (
    <div className="space-y-4 w-full h-full m-2 sm:m-4 md:m-10">
      <div className="w-full">
        <ClipPathTabs
          tabs={[
            { name: "Ask AI", slot: <Sparkles className="w-4 h-4" /> },
            { name: "Search", slot: <Search className="w-4 h-4" /> },
          ]}
          onTabClick={handleTabClick}
          tabColor="#FF4F4F"
        />
      </div>
      <motion.div
        variants={textCtrVariants}
        initial="askAI"
        animate={selectedTab === "Ask AI" ? "askAI" : "search"}
        className="relative w-full overflow-clip rounded-[20px]"
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 19,
          mass: 1.2,
        }}
      >
        <motion.input
          layout
          name="xyne-chatbox"
          variants={textAreaVariant}
          initial="askAI"
          animate={selectedTab === "Ask AI" ? "askAI" : "search"}
          // transition={{ duration: 0.2 }}
          transition={{
            type: "spring",
            stiffness: 150,
            damping: 19,
            mass: 1.2,
          }}
          className="w-full h-full border border-gray-400 rounded-[20px] text-black"
          placeholder="Ask me anything..."
        />
        {selectedTab === "Search" && (
          <motion.button
            key="hg"
            layoutId="sd"
            transition={{
              type: "spring",
              stiffness: 150,
              damping: 19,
              mass: 1.2,
            }}
            className="bg-black size-8 rounded-full flex items-center justify-center absolute right-4 top-2.5"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              color="white"
            >
              <path d="M8.99992 16V6.41407L5.70696 9.70704C5.31643 10.0976 4.68342 10.0976 4.29289 9.70704C3.90237 9.31652 3.90237 8.6835 4.29289 8.29298L9.29289 3.29298L9.36907 3.22462C9.76184 2.90427 10.3408 2.92686 10.707 3.29298L15.707 8.29298L15.7753 8.36915C16.0957 8.76192 16.0731 9.34092 15.707 9.70704C15.3408 10.0732 14.7618 10.0958 14.3691 9.7754L14.2929 9.70704L10.9999 6.41407V16C10.9999 16.5523 10.5522 17 9.99992 17C9.44764 17 8.99992 16.5523 8.99992 16Z"></path>
            </svg>
          </motion.button>
        )}
        {selectedTab === "Ask AI" && (
          <motion.div
            layout
            className="absolute left-0 bottom-0 right-0 h-14 text-black flex items-center justify-between px-3.5 "
          >
            <div className="flex items-center space-x-2">
              <motion.button
                key={"attachments"}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  delay: 0 * staggerDelay,
                  duration: 0.2,
                  ease: "easeOut",
                }}
                className="size-9 flex items-center justify-center rounded-full border-[1px] border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 shadow-xs hover:shadow-sm"
              >
                <Plus className={"w-4 h-4"} />
              </motion.button>
              <motion.button
                key={"attachments-2"}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  delay: 1 * staggerDelay,
                  duration: 0.2,
                  ease: "easeOut",
                }}
                className="size-9 flex items-center justify-center rounded-full border-[1px] border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 shadow-xs hover:shadow-sm"
              >
                <Globe className={"w-4 h-4"} />
              </motion.button>
              <motion.button
                key={"attachments-3"}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  delay: 2 * staggerDelay,
                  duration: 0.2,
                  ease: "easeOut",
                }}
                className="h-9 px-3 flex items-center justify-center rounded-full border-[1px] border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 shadow-xs hover:shadow-sm gap-2"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-label=""
                >
                  <path d="M14.3352 10.0257C14.3352 7.6143 12.391 5.66554 10.0002 5.66537C7.60929 5.66537 5.66528 7.61419 5.66528 10.0257C5.66531 11.5493 6.44221 12.8881 7.61938 13.6683H12.3811C13.558 12.8881 14.3352 11.5491 14.3352 10.0257ZM8.84399 16.9984C9.07459 17.3983 9.50543 17.6683 10.0002 17.6683C10.495 17.6682 10.926 17.3984 11.1565 16.9984H8.84399ZM8.08813 15.6683H11.9114V14.9984H8.08813V15.6683ZM1.66626 9.33529L1.80103 9.34896C2.10381 9.41116 2.3313 9.67914 2.3313 10.0003C2.33115 10.3214 2.10377 10.5896 1.80103 10.6517L1.66626 10.6654H0.833252C0.466091 10.6654 0.168389 10.3674 0.168213 10.0003C0.168213 9.63306 0.465983 9.33529 0.833252 9.33529H1.66626ZM19.1663 9.33529L19.301 9.34896C19.6038 9.41116 19.8313 9.67914 19.8313 10.0003C19.8311 10.3214 19.6038 10.5896 19.301 10.6517L19.1663 10.6654H18.3333C17.9661 10.6654 17.6684 10.3674 17.6682 10.0003C17.6682 9.63306 17.966 9.33529 18.3333 9.33529H19.1663ZM3.0481 3.04818C3.2753 2.82099 3.62593 2.79189 3.88403 2.96224L3.98853 3.04818L4.57739 3.63705L4.66235 3.74154C4.83285 3.99966 4.80464 4.35021 4.57739 4.57748C4.35013 4.80474 3.99958 4.83293 3.74146 4.66244L3.63696 4.57748L3.0481 3.98861L2.96216 3.88412C2.79181 3.62601 2.82089 3.27538 3.0481 3.04818ZM16.012 3.04818C16.2717 2.7886 16.6927 2.78852 16.9524 3.04818C17.2117 3.30786 17.2119 3.72901 16.9524 3.98861L16.3625 4.57748C16.1028 4.83717 15.6818 4.83718 15.4221 4.57748C15.1626 4.31776 15.1625 3.89669 15.4221 3.63705L16.012 3.04818ZM9.33521 1.66634V0.833336C9.33521 0.466067 9.63297 0.168297 10.0002 0.168297C10.3674 0.168472 10.6653 0.466175 10.6653 0.833336V1.66634C10.6653 2.0335 10.3674 2.33121 10.0002 2.33138C9.63297 2.33138 9.33521 2.03361 9.33521 1.66634ZM15.6653 10.0257C15.6653 11.9571 14.7058 13.6634 13.2415 14.6917V16.3333C13.2415 16.7004 12.9444 16.9971 12.5774 16.9974C12.282 18.1473 11.2423 18.9982 10.0002 18.9984C8.75792 18.9984 7.71646 18.1476 7.42114 16.9974C7.05476 16.9964 6.75806 16.7 6.75806 16.3333V14.6917C5.29383 13.6634 4.33523 11.957 4.33521 10.0257C4.33521 6.88608 6.86835 4.33529 10.0002 4.33529C13.132 4.33547 15.6653 6.88618 15.6653 10.0257Z"></path>
                </svg>
                Reasoning
              </motion.button>
            </div>
            <div>
              <motion.button
                transition={{
                  type: "spring",
                  stiffness: 150,
                  damping: 19,
                  mass: 1.2,
                }}
                key="u"
                layoutId="sd"
                className="bg-black size-9 rounded-full flex items-center justify-center"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  color="white"
                >
                  <path d="M8.99992 16V6.41407L5.70696 9.70704C5.31643 10.0976 4.68342 10.0976 4.29289 9.70704C3.90237 9.31652 3.90237 8.6835 4.29289 8.29298L9.29289 3.29298L9.36907 3.22462C9.76184 2.90427 10.3408 2.92686 10.707 3.29298L15.707 8.29298L15.7753 8.36915C16.0957 8.76192 16.0731 9.34092 15.707 9.70704C15.3408 10.0732 14.7618 10.0958 14.3691 9.7754L14.2929 9.70704L10.9999 6.41407V16C10.9999 16.5523 10.5522 17 9.99992 17C9.44764 17 8.99992 16.5523 8.99992 16Z"></path>
                </svg>
              </motion.button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default XyneChatbox;
