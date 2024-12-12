import React from "react";

const CardHeader = ({ children, className, ...props }) => {
  return (
    <div className={`bg-gray-100 px-6 py-4 border-b ${className}`} {...props}>
      {children}
    </div>
  );
};

export default CardHeader;
