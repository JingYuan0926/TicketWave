import React from "react";

const TabsContent = ({ children, className, ...props }) => {
  return (
    <div className={`mt-6 ${className}`} {...props}>
      {children}
    </div>
  );
};

export default TabsContent;
