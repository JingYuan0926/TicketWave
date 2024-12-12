import React from "react";

const Slider2 = ({ children, className, ...props }) => {
  return (
    <div className={`flex space-x-4 overflow-x-auto ${className}`} {...props}>
      {children}
    </div>
  );
};

export default Slider2;
