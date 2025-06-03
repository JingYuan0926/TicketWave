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
  FiSearch,
  FiCalendar,
  FiHeart,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import {
  useMotionTemplate,
  useMotionValue,
  motion,
  animate,
  useSpring,
  useInView,
} from "framer-motion";
import dynamic from "next/dynamic";
import { NumberTicker } from "../components/NumberTicker";
import { BentoCard, BentoGrid } from "../components/BentoGrid";
import { BorderBeam } from "../components/BorderBeam";
import { AnimatedBeam } from "../components/AnimatedBeam";

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

  // Refs for animation tracking
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const buttonRef = useRef(null);

  // Track if elements are in view (once only)
  const badgeInView = useInView(badgeRef, { once: true });
  const titleInView = useInView(titleRef, { once: true });
  const descInView = useInView(descRef, { once: true });
  const buttonInView = useInView(buttonRef, { once: true });

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
        <motion.span
          ref={badgeRef}
          className="mb-1.5 inline-block rounded-full bg-gray-600/50 px-3 py-1.5 text-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={badgeInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          Now Live!
        </motion.span>

        {/* Main heading with gradient text */}
        <motion.h1
          ref={titleRef}
          className="max-w-3xl bg-gradient-to-br from-white to-gray-400 bg-clip-text text-center text-3xl font-medium leading-tight text-transparent sm:text-5xl sm:leading-tight md:text-7xl md:leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Say Goodbye to Ticket Scams & Scalpers
        </motion.h1>

        {/* Description text */}
        <motion.p
          ref={descRef}
          className="my-6 max-w-xl text-center text-base leading-relaxed md:text-lg md:leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={descInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          TicketWave is the ticketing platform for fair access to events.
        </motion.p>

        {/* Animated CTA button with hover and tap effects */}
        <motion.button
          ref={buttonRef}
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
          initial={{ opacity: 0, y: 20 }}
          animate={buttonInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Get Started Now!
          <FiArrowRight className="transition-transform group-hover:-rotate-45 group-active:-rotate-12" />
        </motion.button>
      </div>
    </section>
  );
};

// Problem and Stats Section Component
export const ProblemStatsSection = () => {
  // Refs for animation tracking
  const titleRef = useRef(null);
  const problem1Ref = useRef(null);
  const problem2Ref = useRef(null);
  const problem3Ref = useRef(null);
  const statsTextRef = useRef(null);
  const stat1Ref = useRef(null);
  const stat2Ref = useRef(null);
  const stat3Ref = useRef(null);

  // Track if elements are in view (once only)
  const titleInView = useInView(titleRef, { once: true });
  const problem1InView = useInView(problem1Ref, { once: true });
  const problem2InView = useInView(problem2Ref, { once: true });
  const problem3InView = useInView(problem3Ref, { once: true });
  const statsTextInView = useInView(statsTextRef, { once: true });
  const stat1InView = useInView(stat1Ref, { once: true });
  const stat2InView = useInView(stat2Ref, { once: true });
  const stat3InView = useInView(stat3Ref, { once: true });

  return (
    <section className="relative py-24 px-4 text-gray-200">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Problem Section */}
        <div className="text-center mb-16">
          <motion.h2
            ref={titleRef}
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-white mb-12"
          >
            The Current Ticketing Situation
          </motion.h2>

          {/* Problem Bullet Points */}
          <div className="grid md:grid-cols-3 gap-8 mb-24">
            <motion.div
              ref={problem1Ref}
              initial={{ opacity: 0, y: 20 }}
              animate={
                problem1InView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-col items-center text-center"
            >
              <div className="bg-red-500/20 backdrop-blur-sm p-4 rounded-full mb-4 border border-red-500/30">
                <FiTrendingUp className="text-red-400 text-2xl" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                Scalpers
              </h3>
              <p className="text-gray-300">Resellers drive up prices</p>
            </motion.div>

            <motion.div
              ref={problem2Ref}
              initial={{ opacity: 0, y: 20 }}
              animate={
                problem2InView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col items-center text-center"
            >
              <div className="bg-red-500/20 backdrop-blur-sm p-4 rounded-full mb-4 border border-red-500/30">
                <FiDollarSign className="text-red-400 text-2xl" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Scams</h3>
              <p className="text-gray-300">Fans lose huge amounts of money</p>
            </motion.div>

            <motion.div
              ref={problem3Ref}
              initial={{ opacity: 0, y: 20 }}
              animate={
                problem3InView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col items-center text-center"
            >
              <div className="bg-red-500/20 backdrop-blur-sm p-4 rounded-full mb-4 border border-red-500/30">
                <FiAlertTriangle className="text-red-400 text-2xl" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Bots</h3>
              <p className="text-gray-300">Tickets gone in seconds</p>
            </motion.div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="text-center">
          <motion.p
            ref={statsTextRef}
            initial={{ opacity: 0, y: 20 }}
            animate={
              statsTextInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
            }
            transition={{ duration: 0.6 }}
            className="text-lg text-gray-300 font-medium mb-12"
          >
            Scalping, scams, and bots make ticketing unfair for real fans.
          </motion.p>

          <div className="grid md:grid-cols-3 gap-12">
            {/* Stat 1 - 88% */}
            <motion.div
              ref={stat1Ref}
              initial={{ opacity: 0, y: 20 }}
              animate={
                stat1InView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
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
              ref={stat2Ref}
              initial={{ opacity: 0, y: 20 }}
              animate={
                stat2InView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
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
              ref={stat3Ref}
              initial={{ opacity: 0, y: 20 }}
              animate={
                stat3InView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
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
const TiltCard = ({ icon: Icon, title, description, index }) => {
  const ref = useRef(null);
  const animationRef = useRef(null);

  // Track if card is in view (once only)
  const cardInView = useInView(animationRef, { once: true });

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

  // Define different colors for each card
  const borderColors = [
    { from: "#3b82f6", to: "#8b5cf6" }, // Blue to Purple
    { from: "#10b981", to: "#06b6d4" }, // Green to Cyan
    { from: "#f59e0b", to: "#ef4444" }, // Amber to Red
    { from: "#ec4899", to: "#8b5cf6" }, // Pink to Purple
  ];

  const colors = borderColors[index % borderColors.length];

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        transform,
      }}
      className="relative h-80 w-64 rounded-xl bg-gradient-to-br from-blue-400/20 to-purple-400/20 backdrop-blur-sm border border-white/10 group cursor-pointer overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={cardInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6 }}
    >
      <div ref={animationRef}>
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

        {/* BorderBeam Animation */}
        <BorderBeam
          size={100}
          duration={8}
          delay={0}
          colorFrom={colors.from}
          colorTo={colors.to}
        />
      </div>
    </motion.div>
  );
};

// Solution Section Component
export const SolutionSection = () => {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true });

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
          ref={titleRef}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
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
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <TiltCard
                icon={solution.icon}
                title={solution.title}
                description={solution.description}
                index={index}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Feature Showcase Section Component with Animated Beams
export const FeatureShowcase = () => {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true });

  // Refs for the animated beam layout
  const containerRef = useRef(null);
  const centerRef = useRef(null);

  // Left side refs
  const leftTop = useRef(null);
  const leftMiddle = useRef(null);
  const leftBottom = useRef(null);

  // Right side refs
  const rightTop = useRef(null);
  const rightMiddle = useRef(null);
  const rightBottom = useRef(null);

  // Circle component for the layout
  const Circle = React.forwardRef(({ className, children, label }, ref) => {
    return (
      <div className="flex flex-col items-center">
        <div
          ref={ref}
          className={`z-10 flex size-16 items-center justify-center rounded-full border-2 bg-white/10 backdrop-blur-sm border-white/20 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)] transition-all duration-300 hover:bg-white/20 hover:border-white/30 hover:scale-110 ${className}`}
        >
          {children}
        </div>
        <span className="text-sm text-gray-300 mt-2 text-center font-medium">
          {label}
        </span>
      </div>
    );
  });

  Circle.displayName = "Circle";

  return (
    <section className="relative py-24 px-4 text-gray-200">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Feature Showcase Title */}
        <motion.div
          ref={titleRef}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Features
          </h2>
        </motion.div>

        {/* Animated Beam Layout */}
        <div
          className="relative flex h-[500px] w-full items-center justify-center overflow-hidden"
          ref={containerRef}
        >
          <div className="flex size-full max-h-[400px] max-w-5xl flex-col items-stretch justify-between gap-12">
            {/* Top Row */}
            <div className="flex flex-row items-center justify-between">
              <Circle ref={leftTop} label="NFT Tickets">
                <FiShield className="h-8 w-8 text-blue-400" />
              </Circle>

              <Circle ref={rightTop} label="World ID">
                <FiUsers className="h-8 w-8 text-green-400" />
              </Circle>
            </div>

            {/* Middle Row */}
            <div className="flex flex-row items-center justify-between">
              <Circle ref={leftMiddle} label="Smart Contracts">
                <FiLock className="h-8 w-8 text-purple-400" />
              </Circle>

              {/* Center TicketWave Circle */}
              <Circle
                ref={centerRef}
                className="size-20 border-blue-500/50 bg-blue-500/20"
                label="TicketWave"
              >
                <div className="text-2xl font-bold text-blue-300">TW</div>
              </Circle>

              <Circle ref={rightMiddle} label="NFT Marketplace">
                <FiRefreshCw className="h-8 w-8 text-cyan-400" />
              </Circle>
            </div>

            {/* Bottom Row */}
            <div className="flex flex-row items-center justify-between">
              <Circle ref={leftBottom} label="Memory Minting">
                <FiZap className="h-8 w-8 text-yellow-400" />
              </Circle>

              <Circle ref={rightBottom} label="ENS Integration">
                <FiUser className="h-8 w-8 text-teal-400" />
              </Circle>
            </div>
          </div>

          {/* Animated Beams - Left to Center */}
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={leftTop}
            toRef={centerRef}
            curvature={-40}
            gradientStartColor="#3b82f6"
            gradientStopColor="#8b5cf6"
            delay={0}
            duration={3}
            pathColor="#3b82f6"
            pathOpacity={0.3}
            pathWidth={3}
          />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={leftMiddle}
            toRef={centerRef}
            gradientStartColor="#a855f7"
            gradientStopColor="#3b82f6"
            delay={0.5}
            duration={3}
            pathColor="#a855f7"
            pathOpacity={0.3}
            pathWidth={3}
          />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={leftBottom}
            toRef={centerRef}
            curvature={40}
            gradientStartColor="#eab308"
            gradientStopColor="#a855f7"
            delay={1}
            duration={3}
            pathColor="#eab308"
            pathOpacity={0.3}
            pathWidth={3}
          />

          {/* Animated Beams - Center to Right */}
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={centerRef}
            toRef={rightTop}
            curvature={40}
            gradientStartColor="#3b82f6"
            gradientStopColor="#8b5cf6"
            reverse
            delay={1.5}
            duration={3}
            pathColor="#3b82f6"
            pathOpacity={0.3}
            pathWidth={3}
          />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={centerRef}
            toRef={rightMiddle}
            gradientStartColor="#a855f7"
            gradientStopColor="#3b82f6"
            reverse
            delay={2}
            duration={3}
            pathColor="#a855f7"
            pathOpacity={0.3}
            pathWidth={3}
          />
          <AnimatedBeam
            containerRef={containerRef}
            fromRef={centerRef}
            toRef={rightBottom}
            curvature={-40}
            gradientStartColor="#eab308"
            gradientStopColor="#a855f7"
            reverse
            delay={2.5}
            duration={3}
            pathColor="#eab308"
            pathOpacity={0.3}
            pathWidth={3}
          />
        </div>
      </div>
    </section>
  );
};

// How it Works Section Component
export const HowItWorksSection = () => {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true });

  const steps = [
    {
      step: "Step 1",
      title: "Connect Account",
      description:
        "Link your wallet and verify your identity with World ID for secure, bot-free access.",
      icon: FiUser,
    },
    {
      step: "Step 2",
      title: "Discover Events",
      description:
        "Browse upcoming events and find tickets at fair, transparent prices with no hidden fees.",
      icon: FiSearch,
    },
    {
      step: "Step 3",
      title: "Secure Your Ticket",
      description:
        "Purchase your NFT ticket with smart contract protection and guaranteed authenticity.",
      icon: FiShield,
    },
    {
      step: "Step 4",
      title: "Experience & Collect",
      description:
        "Attend your event and mint exclusive NFT memories to commemorate your experience.",
      icon: FiHeart,
    },
  ];

  return (
    <section className="relative py-24 px-4 text-gray-200">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Title */}
        <motion.div
          ref={titleRef}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            How TicketWave Works
          </h2>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => {
            const stepRef = useRef(null);
            const stepInView = useInView(stepRef, { once: true });

            return (
              <motion.div
                key={index}
                ref={stepRef}
                className="relative group cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={
                  stepInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-6 h-full hover:border-white/20 transition-all duration-300 hover:scale-[1.02]">
                  {/* Default State - Icon, Step, and Title */}
                  <div className="transition-all duration-300">
                    <div className="mb-6">
                      <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-400 transition-colors duration-300">
                        <step.icon className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-sm text-blue-400 font-medium">
                        {step.step}
                      </span>
                    </div>

                    <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-100 transition-colors duration-300">
                      {step.title}
                    </h3>
                  </div>

                  {/* Hover State - Description Overlay */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center p-6 bg-gray-900/95 backdrop-blur-sm rounded-xl"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-center text-gray-300 leading-relaxed">
                      {step.description}
                    </p>
                  </motion.div>

                  {/* Connection Line (except for last step) */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-blue-500/50 to-transparent transform -translate-y-1/2 z-10">
                      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-blue-500/50 rounded-full"></div>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
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
        <SolutionSection />
        <FeatureShowcase />
        <HowItWorksSection />
      </div>
    </div>
  );
}
