import React from "react";

const TabsList = ({ children, className, ...props }) => {
  return (
    <div className={`flex space-x-4 border-b ${className}`} {...props}>
      {children}
    </div>
  );
};

export default TabsList;
