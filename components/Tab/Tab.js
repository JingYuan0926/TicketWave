import React from "react";
import { cn } from "../../utils";

const Tab = ({ children, active, className, ...props }) => {
  return (
    <button
      className={cn(
        "px-4 py-2 rounded-t-lg",
        active
          ? "bg-white border-b-2 border-blue-500 text-blue-500"
          : "bg-gray-100 text-gray-500 hover:bg-gray-200"
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Tab;
