import React from "react";

const shimmer =
  "relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-green-200/50 before:to-transparent";

export function SkeletonMonitor() {
  return (
    <div
      className={`${shimmer} border-green-300/50 border bg-green-200/50 rounded-3xl w-[500px]`}
    >
      <div
        className={` border-b border-green-300/50 px-6 py-4 flex justify-between items-center`}
      >
        <div className={`${shimmer} h-6 w-32 bg-green-200/50 rounded-md`}></div>
        <div
          className={`${shimmer} h-6 w-6 bg-green-200/50 rounded-full`}
        ></div>
      </div>
      <div className={`flex px-6 py-4 justify-between`}>
        <div className={`space-y-2`}>
          <div
            className={`${shimmer} h-4 w-16 bg-green-200/50 rounded-md`}
          ></div>
          <div
            className={`${shimmer} h-4 w-12 bg-green-200/50 rounded-md`}
          ></div>
        </div>
        <div className={`space-y-2`}>
          <div
            className={`${shimmer} h-4 w-24 bg-green-200/50 rounded-md`}
          ></div>
          <div
            className={`${shimmer} h-4 w-16 bg-green-200/50 rounded-md`}
          ></div>
        </div>
        <div className={`space-y-2`}>
          <div
            className={`${shimmer} h-4 w-24 bg-green-200/50 rounded-md`}
          ></div>
          <div
            className={`${shimmer} h-4 w-16 bg-green-200/50 rounded-md`}
          ></div>
        </div>
      </div>
    </div>
  );
}
