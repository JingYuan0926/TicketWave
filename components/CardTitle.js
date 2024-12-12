import React from "react";

const CardTitle = ({ children, className, ...props }) => {
  return (
    <h3 className={`text-lg font-medium ${className}`} {...props}>
      {children}
    </h3>
  );
};

export default CardTitle;
