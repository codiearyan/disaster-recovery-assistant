import React from "react";

export const MarqueeText = () => {
  return (
    <div className="relative flex overflow-hidden bg-black/5 dark:bg-white/5 py-3">
      <div className="animate-marquee whitespace-nowrap">
        <span className="mx-4 text-lg text-gray-700 dark:text-gray-300">
          Flood Relief Program
        </span>
        <span className="mx-4 text-lg text-gray-700 dark:text-gray-300">
          Earthquake Response
        </span>
        <span className="mx-4 text-lg text-gray-700 dark:text-gray-300">
          Hurricane Recovery
        </span>
        <span className="mx-4 text-lg text-gray-700 dark:text-gray-300">
          Fire Emergency Support
        </span>
      </div>
      <div className="absolute top-0 animate-marquee2 whitespace-nowrap">
        <span className="mx-4 text-lg text-gray-700 dark:text-gray-300">
          Flood Relief Program
        </span>
        <span className="mx-4 text-lg text-gray-700 dark:text-gray-300">
          Earthquake Response
        </span>
        <span className="mx-4 text-lg text-gray-700 dark:text-gray-300">
          Hurricane Recovery
        </span>
        <span className="mx-4 text-lg text-gray-700 dark:text-gray-300">
          Fire Emergency Support
        </span>
      </div>
    </div>
  );
};
