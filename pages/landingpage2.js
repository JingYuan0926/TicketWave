import React, { Suspense, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import Particles from "../components/ui/particles";
import FeaturesSection from "../components/FeaturesSection";
import ShinyButton from "../components/ui/shiny-button";
import { motion } from "framer-motion";
import { AuroraText } from "../components/magicui/aurora-text";

// Preload the model for better performance
useGLTF.preload("/models/ticket.glb");

// Component to render the 3D model
function Model(props) {
  const { scene } = useGLTF("/models/ticket.glb");
  const copiedScene = scene.clone();
  const modelRef = useRef();

  return (
    <primitive
      object={copiedScene}
      ref={modelRef}
      scale={1}
      position={[0, 0, 0]}
      {...props}
    />
  );
}

export default function LandingPage2() {
  const [isInteracting, setIsInteracting] = useState(false);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" },
  };

  const wordVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 1 + custom * 0.5,
        duration: 0.8,
        ease: "easeOut",
      },
    }),
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const pulseAnimation = {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  return (
    <>
      {/* Global particles background for entire page */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 0,
          backgroundColor: "#121212",
        }}
      >
        <Particles
          quantity={300}
          color="#ffffff"
          className="pointer-events-none"
          refresh={true}
        />
      </motion.div>

      <main
        style={{
          width: "100%",
          height: "100vh",
          backgroundColor: "transparent",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Gradient Overlay for Depth */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background:
              "radial-gradient(ellipse at center, transparent 0%, rgba(18, 18, 18, 0.3) 70%)",
            zIndex: 1,
            pointerEvents: "none",
          }}
        />

        {/* Content Container */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            height: "100%",
            padding: "0 5%",
            zIndex: 10,
          }}
        >
          {/* Left Section: Enhanced Title, Value Prop, and CTA */}
          <motion.div
            variants={fadeIn}
            style={{
              flex: "0 1 50%",
              maxWidth: "600px",
            }}
          >
            {/* Main Title */}
            <motion.h1
              variants={fadeIn}
              style={{
                fontSize: "clamp(3rem, 8vw, 6rem)",
                fontWeight: "900",
                color: "#FFFFFF",
                margin: "0 0 20px 0",
                lineHeight: "1.1",
                letterSpacing: "-0.02em",
                display: "flex",
                alignItems: "center",
                gap: "0.1em",
              }}
            >
              <span>Ticket</span>
              <AuroraText
                colors={["#FF0080", "#7928CA", "#0070F3", "#38bdf8"]}
                speed={0.5}
              >
                Wave
              </AuroraText>
            </motion.h1>

            {/* Subtitle with Animation */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                flexWrap: "nowrap",
                marginBottom: "40px",
              }}
            >
              <motion.span
                custom={0}
                variants={wordVariants}
                initial="hidden"
                animate="visible"
                style={{
                  fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
                  fontWeight: "700",
                  lineHeight: "1.2",
                  color: "#FFFFFF",
                  letterSpacing: "-0.02em",
                  whiteSpace: "nowrap",
                }}
              >
                Discover
              </motion.span>
              <motion.span
                custom={0.5}
                variants={wordVariants}
                initial="hidden"
                animate="visible"
                style={{
                  fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
                  fontWeight: "700",
                  color: "#666",
                }}
              >
                •
              </motion.span>
              <motion.span
                custom={1}
                variants={wordVariants}
                initial="hidden"
                animate="visible"
                style={{
                  fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
                  fontWeight: "700",
                  lineHeight: "1.2",
                  color: "#FFFFFF",
                  letterSpacing: "-0.02em",
                  whiteSpace: "nowrap",
                }}
              >
                Book
              </motion.span>
              <motion.span
                custom={1.5}
                variants={wordVariants}
                initial="hidden"
                animate="visible"
                style={{
                  fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
                  fontWeight: "700",
                  color: "#666",
                }}
              >
                •
              </motion.span>
              <motion.span
                custom={2}
                variants={wordVariants}
                initial="hidden"
                animate="visible"
                style={{
                  fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
                  fontWeight: "700",
                  lineHeight: "1.2",
                  color: "#FFFFFF",
                  letterSpacing: "-0.02em",
                  whiteSpace: "nowrap",
                }}
              >
                Experience
              </motion.span>
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.5, duration: 0.8 }}
              style={{
                display: "flex",
                gap: "16px",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <motion.div animate={pulseAnimation}>
                <ShinyButton
                  style={{
                    background:
                      "linear-gradient(135deg, #06B6D4, #3B82F6, #0EA5E9)",
                    border: "none",
                    padding: "16px 32px",
                    fontSize: "1.1rem",
                    fontWeight: "600",
                    borderRadius: "12px",
                    cursor: "pointer",
                    color: "white",
                    boxShadow: "0 8px 32px rgba(6, 182, 212, 0.3)",
                  }}
                  onClick={() => console.log("Join Beta clicked")}
                >
                  🚀 Join the Beta
                </ShinyButton>
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  background: "transparent",
                  border: "2px solid rgba(255, 255, 255, 0.2)",
                  padding: "14px 28px",
                  fontSize: "1rem",
                  fontWeight: "500",
                  borderRadius: "12px",
                  cursor: "pointer",
                  color: "white",
                  backdropFilter: "blur(10px)",
                }}
                onClick={() => console.log("Watch Demo clicked")}
              >
                📺 Watch Demo
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Section: Enhanced 3D Model with Interaction Hints */}
          <motion.div
            variants={fadeIn}
            style={{
              flex: "0 1 50%",
              height: "500px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
            }}
          >
            {/* Interaction Hint - Positioned below the model */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{
                opacity: isInteracting ? 0 : 0.6,
              }}
              transition={{
                opacity: { duration: 0.5 },
              }}
              style={{
                position: "absolute",
                bottom: "10px",
                left: "50%",
                transform: "translateX(-50%)",
                fontSize: "0.8rem",
                color: "#888",
                zIndex: 10,
                pointerEvents: "none",
                textAlign: "center",
              }}
            >
              Click and drag to explore
            </motion.div>

            {/* 3D Canvas with Enhanced Lighting */}
            <Canvas
              camera={{ position: [0, 0, 4], fov: 45 }}
              style={{
                background: "transparent",
                width: "100%",
                height: "100%",
              }}
              onPointerDown={() => setIsInteracting(true)}
              onPointerUp={() => setIsInteracting(false)}
            >
              <ambientLight intensity={2.2} />
              <directionalLight
                position={[3, 3, 5]}
                intensity={2.8}
                color="#FFFFFF"
              />
              <directionalLight
                position={[-3, 2, -5]}
                intensity={1.2}
                color="#ADD8E6"
              />
              <pointLight
                position={[0, 0, 2]}
                intensity={0.8}
                color="#06B6D4"
              />
              <Suspense fallback={null}>
                <Model />
              </Suspense>
              <OrbitControls
                enableZoom={false}
                enablePan={false}
                minPolarAngle={Math.PI / 4}
                maxPolarAngle={(3 * Math.PI) / 4}
                autoRotate={!isInteracting}
                autoRotateSpeed={0.8}
                target={[0, 0, 0]}
                onStart={() => setIsInteracting(true)}
                onEnd={() => setIsInteracting(false)}
              />
            </Canvas>

            {/* Glow Effect Behind Model */}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "300px",
                height: "300px",
                background:
                  "radial-gradient(circle, rgba(6, 182, 212, 0.1) 0%, transparent 70%)",
                borderRadius: "50%",
                zIndex: -1,
                animation: "pulse 3s ease-in-out infinite",
              }}
            />
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3, duration: 0.8 }}
          style={{
            position: "absolute",
            bottom: "30px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span style={{ color: "#888", fontSize: "0.9rem" }}>
            Scroll to explore
          </span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            style={{
              width: "2px",
              height: "30px",
              background: "linear-gradient(to bottom, #FF0080, transparent)",
              borderRadius: "1px",
            }}
          />
        </motion.div>
      </main>

      {/* Enhanced Features Section */}
      <FeaturesSection />

      {/* Add CSS for animations */}
      <style jsx>{`
        @keyframes pulse {
          0%,
          100% {
            opacity: 0.1;
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            opacity: 0.2;
            transform: translate(-50%, -50%) scale(1.1);
          }
        }
      `}</style>
    </>
  );
}
