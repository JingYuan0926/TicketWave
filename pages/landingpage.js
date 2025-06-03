import React, { useEffect, useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import {
  useMotionTemplate,
  useMotionValue,
  motion,
  animate,
} from "framer-motion";
import dynamic from "next/dynamic";

// Dynamically import Canvas to avoid SSR issues
const Canvas = dynamic(
  () => import("@react-three/fiber").then((mod) => ({ default: mod.Canvas })),
  {
    ssr: false,
  }
);

const Stars = dynamic(
  () => import("@react-three/drei").then((mod) => ({ default: mod.Stars })),
  {
    ssr: false,
  }
);

// Array of colors for the animated gradient background
const COLORS_TOP = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];

export const AuroraHero = () => {
  // State to track if component is mounted (client-side)
  const [isMounted, setIsMounted] = useState(false);

  // Motion value for animating the gradient color
  const color = useMotionValue(COLORS_TOP[0]);

  useEffect(() => {
    // Set mounted to true after component mounts
    setIsMounted(true);

    // Animate through all colors in an infinite loop
    animate(color, COLORS_TOP, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, []);

  // Create dynamic CSS properties using motion templates
  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #020617 50%, ${color})`;
  const border = useMotionTemplate`1px solid ${color}`;
  const boxShadow = useMotionTemplate`0px 4px 24px ${color}`;

  return (
    <motion.section
      style={{
        backgroundImage,
      }}
      className="relative grid min-h-screen place-content-center overflow-hidden bg-gray-950 px-4 py-24 text-gray-200"
    >
      {/* Main content container */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Beta badge */}
        <span className="mb-1.5 inline-block rounded-full bg-gray-600/50 px-3 py-1.5 text-sm">
          Now Live!
        </span>

        {/* Main heading with gradient text */}
        <h1 className="max-w-3xl bg-gradient-to-br from-white to-gray-400 bg-clip-text text-center text-3xl font-medium leading-tight text-transparent sm:text-5xl sm:leading-tight md:text-7xl md:leading-tight">
          Say Goodbye to Ticket Scams & Scalpers
        </h1>

        {/* Description text */}
        <p className="my-6 max-w-xl text-center text-base leading-relaxed md:text-lg md:leading-relaxed">
          TicketWave is the blockchain-powered ticketing platform that
          guarantees fair access to events.
        </p>

        {/* Animated CTA button with hover and tap effects */}
        <motion.button
          style={{
            border,
            boxShadow,
          }}
          whileHover={{
            scale: 1.015,
          }}
          whileTap={{
            scale: 0.985,
          }}
          className="group relative flex w-fit items-center gap-1.5 rounded-full bg-gray-950/10 px-4 py-2 text-gray-50 transition-colors hover:bg-gray-950/50"
        >
          Try TicketWave for Free
          <FiArrowRight className="transition-transform group-hover:-rotate-45 group-active:-rotate-12" />
        </motion.button>
      </div>

      {/* 3D Stars background animation - only render on client */}
      {isMounted && (
        <div className="absolute inset-0 z-0">
          <Canvas>
            <Stars radius={50} count={2500} factor={4} fade speed={2} />
          </Canvas>
        </div>
      )}
    </motion.section>
  );
};

// Default export for Next.js page
export default function LandingPage() {
  return <AuroraHero />;
}
