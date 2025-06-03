import React, { useEffect, useState } from "react";
import {
  FiArrowRight,
  FiAlertTriangle,
  FiDollarSign,
  FiTrendingUp,
} from "react-icons/fi";
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

  // Motion value for animating the gradient color - used only for button effects now
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

  // Create dynamic CSS properties using motion templates for button only
  const border = useMotionTemplate`1px solid ${color}`;
  const boxShadow = useMotionTemplate`0px 4px 24px ${color}`;

  return (
    <section className="relative grid min-h-screen place-content-center px-4 py-24 text-gray-200">
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
    </section>
  );
};

// Problem and Stats Section Component
export const ProblemStatsSection = () => {
  return (
    <section className="relative py-24 px-4 text-gray-200">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Problem Section */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-white mb-12"
          >
            Why Ticketing Sucks Today
          </motion.h2>

          {/* Problem Bullet Points */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-col items-center text-center"
            >
              <div className="bg-red-500/20 backdrop-blur-sm p-4 rounded-full mb-4 border border-red-500/30">
                <FiAlertTriangle className="text-red-400 text-2xl" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Bot Attacks
              </h3>
              <p className="text-gray-300">
                Scalpers and bots scoop tickets in seconds
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col items-center text-center"
            >
              <div className="bg-red-500/20 backdrop-blur-sm p-4 rounded-full mb-4 border border-red-500/30">
                <FiDollarSign className="text-red-400 text-2xl" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Massive Scams
              </h3>
              <p className="text-gray-300">Fans lose $35K+ in scams</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col items-center text-center"
            >
              <div className="bg-red-500/20 backdrop-blur-sm p-4 rounded-full mb-4 border border-red-500/30">
                <FiTrendingUp className="text-red-400 text-2xl" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Price Inflation
              </h3>
              <p className="text-gray-300">
                Over-inflated prices on secondary sites
              </p>
            </motion.div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-lg text-blue-400 font-medium mb-8"
          >
            BUILD TRUST WITH YOUR FANS WITH A TRANSPARENT PLATFORM
          </motion.p>

          <div className="grid md:grid-cols-3 gap-12">
            {/* Stat 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center"
            >
              <div className="text-6xl md:text-7xl font-bold bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent mb-4">
                88%
              </div>
              <p className="text-gray-300 text-lg">
                of fans want a transparent and secure platform
              </p>
            </motion.div>

            {/* Stat 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
            >
              <div className="text-6xl md:text-7xl font-bold bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent mb-4">
                $35K+
              </div>
              <p className="text-gray-300 text-lg">
                average losses from ticket scams per victim
              </p>
            </motion.div>

            {/* Stat 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center"
            >
              <div className="text-6xl md:text-7xl font-bold bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent mb-4">
                90%
              </div>
              <p className="text-gray-300 text-lg">
                of tickets are grabbed by bots within seconds
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Main Landing Page Container with Fixed Background
export default function LandingPage() {
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

  return (
    <div className="relative">
      {/* Fixed Background Layer */}
      <motion.div
        style={{
          backgroundImage,
        }}
        className="fixed inset-0 bg-gray-950 z-0"
      />

      {/* Fixed 3D Stars background animation - covers entire viewport */}
      {isMounted && (
        <div className="fixed inset-0 z-10">
          <Canvas>
            <Stars radius={50} count={2500} factor={4} fade speed={2} />
          </Canvas>
        </div>
      )}

      {/* Scrollable Content Layer */}
      <div className="relative z-20">
        <AuroraHero />
        <ProblemStatsSection />
      </div>
    </div>
  );
}
