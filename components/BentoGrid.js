import React from "react";
import { FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";

const BentoGrid = ({ children, className, ...props }) => {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[22rem] grid-cols-3 gap-4",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
  ...props
}) => (
  <div
    key={name}
    className={cn(
      "group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-xl cursor-pointer",
      // Dark styles for our aurora theme
      "bg-gray-900/50 backdrop-blur-sm border border-white/10",
      "transform-gpu [box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
      "transition-all duration-300 hover:scale-[1.02] hover:border-white/20",
      className
    )}
    {...props}
  >
    <div>{background}</div>

    {/* Default state - Icon and Title only */}
    <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-6 transition-all duration-300">
      <Icon className="h-12 w-12 origin-left transform-gpu text-blue-400 transition-all duration-300 ease-in-out group-hover:scale-90 group-hover:text-blue-300" />
      <h3 className="text-xl font-semibold text-white transition-all duration-300 group-hover:text-blue-100">
        {name}
      </h3>
    </div>

    {/* Hover state - Description overlay */}
    <motion.div
      className="absolute inset-0 flex flex-col justify-center items-center p-6 bg-gray-900/95 backdrop-blur-sm rounded-xl"
      initial={{ opacity: 0 }}
      whileHover={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Icon className="h-8 w-8 text-blue-400 mb-4" />
      <h3 className="text-lg font-semibold text-white mb-3 text-center">
        {name}
      </h3>
      <p className="text-sm text-gray-300 text-center leading-relaxed mb-4">
        {description}
      </p>

      {/* CTA Button */}
      <button className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors">
        {cta}
        <FiArrowRight className="h-4 w-4" />
      </button>
    </motion.div>
  </div>
);

export { BentoCard, BentoGrid };
