"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React from "react";

export const AuroraText = ({
  children,
  className,
  colors = ["#FF0080", "#7928CA", "#0070F3", "#38bdf8"],
  speed = 1,
}) => {
  return (
    <motion.span
      className={cn("relative inline-block", className)}
      style={{
        background: `linear-gradient(90deg, ${colors.join(", ")}, ${
          colors[0]
        })`,
        backgroundSize: "400% 100%",
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        color: "transparent",
        WebkitTextFillColor: "transparent",
      }}
      animate={{
        backgroundPosition: ["300% 0%", "-100% 0%"],
      }}
      transition={{
        duration: 8 / speed,
        ease: "linear",
        repeat: Infinity,
        repeatType: "loop",
      }}
    >
      {children}
    </motion.span>
  );
};
