import React, { useEffect, useState, useRef } from "react";
import {
  FiArrowRight,
  FiAlertTriangle,
  FiDollarSign,
  FiTrendingUp,
  FiShield,
  FiUsers,
  FiRefreshCw,
  FiLock,
  FiImage,
  FiUser,
  FiZap,
  FiCreditCard,
} from "react-icons/fi";
import {
  useMotionTemplate,
  useMotionValue,
  motion,
  animate,
  useSpring,
} from "framer-motion";
import dynamic from "next/dynamic";
import { NumberTicker } from "../components/NumberTicker";
import { BentoCard, BentoGrid } from "../components/BentoGrid";

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
              <p className="text-gray-300">
                Huge amounts of money lost in scams
              </p>
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
            className="text-lg text-gray-300 font-medium mb-12"
          >
            Scalping, scams, and bots make ticketing unfair for real fans.
          </motion.p>

          <div className="grid md:grid-cols-3 gap-12">
            {/* Stat 1 - 88% */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center"
            >
              <div className="text-6xl md:text-7xl font-bold bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent mb-4">
                <NumberTicker
                  value={88}
                  delay={0.2}
                  className="text-6xl md:text-7xl font-bold bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent"
                />
                %
              </div>
              <p className="text-gray-300 text-lg">
                of fans want a transparent and secure platform
              </p>
            </motion.div>

            {/* Stat 2 - $35K+ with dividers */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center relative md:border-l md:border-r border-gray-600/30 md:px-12"
            >
              <div className="text-6xl md:text-7xl font-bold bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent mb-4">
                $
                <NumberTicker
                  value={35}
                  delay={0.4}
                  className="text-6xl md:text-7xl font-bold bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent"
                />
                K+
              </div>
              <p className="text-gray-300 text-lg">
                average losses from ticket scams per victim
              </p>
            </motion.div>

            {/* Stat 3 - 90% */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center"
            >
              <div className="text-6xl md:text-7xl font-bold bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent mb-4">
                <NumberTicker
                  value={90}
                  delay={0.6}
                  className="text-6xl md:text-7xl font-bold bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent"
                />
                %
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

// Constants for tilt animation
const ROTATION_RANGE = 32.5;
const HALF_ROTATION_RANGE = 32.5 / 2;

// 3D Tilt Card Component
const TiltCard = ({ icon: Icon, title, description }) => {
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x);
  const ySpring = useSpring(y);

  const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

  const handleMouseMove = (e) => {
    if (!ref.current) return [0, 0];

    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = (e.clientX - rect.left) * ROTATION_RANGE;
    const mouseY = (e.clientY - rect.top) * ROTATION_RANGE;

    const rX = (mouseY / height - HALF_ROTATION_RANGE) * -1;
    const rY = mouseX / width - HALF_ROTATION_RANGE;

    x.set(rX);
    y.set(rY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        transform,
      }}
      className="relative h-80 w-64 rounded-xl bg-gradient-to-br from-blue-400/20 to-purple-400/20 backdrop-blur-sm border border-white/10 group cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div
        style={{
          transform: "translateZ(75px)",
          transformStyle: "preserve-3d",
        }}
        className="absolute inset-4 grid place-content-center rounded-xl bg-gray-900/80 backdrop-blur-sm shadow-lg border border-white/10"
      >
        {/* Icon and Title - Always visible */}
        <div className="text-center">
          <Icon
            style={{
              transform: "translateZ(75px)",
            }}
            className="mx-auto text-4xl text-blue-400 mb-4 transition-all duration-300 group-hover:text-blue-300"
          />
          <h3
            style={{
              transform: "translateZ(50px)",
            }}
            className="text-center text-xl font-bold text-white mb-2"
          >
            {title}
          </h3>
        </div>

        {/* Description - Shows on hover */}
        <motion.div
          style={{
            transform: "translateZ(25px)",
          }}
          className="absolute inset-0 flex items-center justify-center p-4 rounded-xl bg-gray-900/95 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-center text-sm text-gray-300 leading-relaxed">
            {description}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

// Solution Section Component
export const SolutionSection = () => {
  const solutions = [
    {
      icon: FiShield,
      title: "NFT-Based Tickets",
      description:
        "Every ticket is a unique NFT — secure, verifiable, and impossible to fake.",
    },
    {
      icon: FiUsers,
      title: "World ID Verification",
      description:
        "Only real humans can buy tickets, thanks to Sybil-resistant verification.",
    },
    {
      icon: FiRefreshCw,
      title: "NFT Marketplace",
      description:
        "Fans can resell safely, and organizers stay in control with fair pricing rules.",
    },
    {
      icon: FiLock,
      title: "Smart Contracts",
      description:
        "No hidden fees or shady algorithms — everything runs on audited code.",
    },
  ];

  return (
    <section className="relative py-24 px-4 text-gray-200">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Solution Title */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            How TicketWave Fixes This
          </h2>
        </motion.div>

        {/* Solution Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
          {solutions.map((solution, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <TiltCard
                icon={solution.icon}
                title={solution.title}
                description={solution.description}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Feature Showcase Section Component
export const FeatureShowcase = () => {
  const features = [
    {
      Icon: FiShield,
      name: "NFT-Based Tickets",
      description:
        "Every ticket is a tamper-proof NFT — verifiable, secure, and impossible to duplicate.",
      href: "#",
      cta: "Learn more",
      className: "col-span-3 lg:col-span-2",
      background: (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10">
          <div className="absolute top-2 right-2 h-16 w-16 rounded-lg bg-blue-500/15 backdrop-blur-sm flex items-center justify-center opacity-40">
            <FiShield className="h-8 w-8 text-blue-400" />
          </div>
          {/* Additional decorative elements */}
          <div className="absolute bottom-1/4 left-1/4 h-4 w-4 rounded-lg bg-purple-400/10 opacity-20"></div>
        </div>
      ),
    },
    {
      Icon: FiZap,
      name: "Memory Minting",
      description:
        "Fans can mint personalized NFT mementos from their event experience.",
      href: "#",
      cta: "Learn more",
      className: "col-span-3 lg:col-span-1",
      background: (
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10">
          <div className="absolute bottom-2 right-2 h-12 w-12 rounded-full bg-purple-500/15 backdrop-blur-sm flex items-center justify-center opacity-40">
            <FiZap className="h-6 w-6 text-purple-400" />
          </div>
          {/* Additional sparkle effect */}
          <div className="absolute top-1/3 left-1/3 h-3 w-3 rounded-full bg-pink-400/15 opacity-25"></div>
          <div className="absolute top-2/3 left-2/3 h-2 w-2 rounded-full bg-purple-400/20 opacity-30"></div>
        </div>
      ),
    },
    {
      Icon: FiUsers,
      name: "World ID Verification",
      description:
        "Bots and fake accounts are blocked with Worldcoin's Sybil-resistant proof-of-personhood.",
      href: "#",
      cta: "Learn more",
      className: "col-span-3 lg:col-span-1",
      background: (
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-blue-500/10">
          <div className="absolute top-2 right-2 h-14 w-14 rounded-full bg-green-500/10 backdrop-blur-sm flex items-center justify-center opacity-30">
            <FiUsers className="h-7 w-7 text-green-400" />
          </div>
        </div>
      ),
    },
    {
      Icon: FiRefreshCw,
      name: "Fair Resale Marketplace",
      description:
        "Tickets can be resold safely, with price caps enforced via smart contracts.",
      href: "#",
      cta: "Learn more",
      className: "col-span-3 lg:col-span-2",
      background: (
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10">
          <div className="absolute top-2 right-2 h-12 w-12 rounded-xl bg-cyan-500/15 backdrop-blur-sm flex items-center justify-center opacity-40">
            <FiRefreshCw className="h-6 w-6 text-cyan-400" />
          </div>
          <div className="absolute bottom-2 left-2 h-8 w-8 rounded-lg bg-blue-500/15 backdrop-blur-sm flex items-center justify-center opacity-30">
            <FiCreditCard className="h-4 w-4 text-blue-400" />
          </div>
          {/* Additional decorative elements */}
          <div className="absolute top-1/2 left-1/4 h-6 w-6 rounded-full bg-cyan-400/10 opacity-20"></div>
          <div className="absolute bottom-1/4 right-1/4 h-4 w-4 rounded-full bg-blue-400/10 opacity-15"></div>
        </div>
      ),
    },
    {
      Icon: FiImage,
      name: "NFT Collectibles",
      description:
        "Organizers can issue limited-edition NFT collectibles tied to events for added engagement.",
      href: "#",
      cta: "Learn more",
      className: "col-span-3 lg:col-span-2",
      background: (
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-cyan-500/10">
          <div className="absolute top-2 right-2 h-12 w-12 rounded-lg bg-indigo-500/10 backdrop-blur-sm flex items-center justify-center opacity-30">
            <FiImage className="h-6 w-6 text-indigo-400" />
          </div>
          <div className="absolute bottom-2 left-2 h-8 w-8 rounded-full bg-cyan-500/10 backdrop-blur-sm flex items-center justify-center opacity-20">
            <FiImage className="h-4 w-4 text-cyan-400" />
          </div>
        </div>
      ),
    },
    {
      Icon: FiUser,
      name: "ENS Profile Integration",
      description:
        "Fans can personalize their identity on-chain with ENS, building community and credibility.",
      href: "#",
      cta: "Learn more",
      className: "col-span-3 lg:col-span-1",
      background: (
        <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-emerald-500/10">
          <div className="absolute bottom-2 right-2 h-12 w-12 rounded-full bg-teal-500/10 backdrop-blur-sm flex items-center justify-center opacity-30">
            <FiUser className="h-6 w-6 text-teal-400" />
          </div>
        </div>
      ),
    },
  ];

  return (
    <section className="relative py-24 px-4 text-gray-200">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Feature Showcase Title */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Powerful Features Built for Fans
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Discover the cutting-edge technology that makes TicketWave the
            future of event ticketing
          </p>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <BentoGrid>
            {features.map((feature, idx) => (
              <BentoCard key={idx} {...feature} />
            ))}
          </BentoGrid>
        </motion.div>
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
        <SolutionSection />
        <FeatureShowcase />
      </div>
    </div>
  );
}
