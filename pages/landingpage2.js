import React, { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import Particles from '../components/ui/particles';
import FeaturesSection from '../components/FeaturesSection';
import { motion } from 'framer-motion';

// Preload the model for better performance
useGLTF.preload('/models/ticket.glb');

// Component to render the 3D model
function Model(props) {
  const { scene } = useGLTF('/models/ticket.glb');
  const copiedScene = scene.clone();
  const modelRef = useRef();

  return <primitive object={copiedScene} ref={modelRef} scale={1} position={[0, 0, 0]} {...props} />;
}

export default function LandingPage2() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <>
      <main style={{
        width: '100%',
        height: '100vh',
        backgroundColor: '#121212',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Particles Background */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 0,
          }}>
          <Particles
            quantity={200}
            color="#ffffff"
            className="pointer-events-none"
          />
        </motion.div>

        {/* Content Container */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            height: '100%',
            padding: '0 5%',
            zIndex: 1,
          }}>
          {/* Left Section: Title and Subtitle */}
          <motion.div
            variants={fadeIn}
            style={{
              flex: '0 1 50%',
              maxWidth: '600px',
            }}>
            <motion.h1
              variants={fadeIn}
              style={{
                fontSize: 'clamp(3rem, 8vw, 6rem)',
                fontWeight: '900',
                color: '#FFFFFF',
                margin: '0 0 30px 0',
                lineHeight: '1.1',
                letterSpacing: '-0.02em',
              }}>
              TicketWave
            </motion.h1>
            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                flexWrap: 'nowrap',
              }}>
              {/* Wrap each span in motion.span */}
              <motion.span variants={fadeIn} style={{
                fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                fontWeight: '700',
                lineHeight: '1.2',
                background: 'linear-gradient(90deg, #F92C86, #FCEE21, #00FFA3)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
                letterSpacing: '-0.02em',
                whiteSpace: 'nowrap',
              }}>
                Discover
              </motion.span>
              <motion.span variants={fadeIn} style={{
                fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                fontWeight: '700',
                color: '#666',
              }}>
                •
              </motion.span>
              <motion.span variants={fadeIn} style={{
                fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                fontWeight: '700',
                lineHeight: '1.2',
                background: 'linear-gradient(90deg, #FCEE21, #00FFA3, #F92C86)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
                letterSpacing: '-0.02em',
                whiteSpace: 'nowrap',
              }}>
                Book
              </motion.span>
              <motion.span variants={fadeIn} style={{
                fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                fontWeight: '700',
                color: '#666',
              }}>
                •
              </motion.span>
              <motion.span variants={fadeIn} style={{
                fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                fontWeight: '700',
                lineHeight: '1.2',
                background: 'linear-gradient(90deg, #00FFA3, #F92C86, #FCEE21)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
                letterSpacing: '-0.02em',
                whiteSpace: 'nowrap',
              }}>
                Experience
              </motion.span>
            </motion.div>
          </motion.div>

          {/* Right Section: 3D Model Viewer */}
          <motion.div
            variants={fadeIn}
            style={{
              flex: '0 1 50%',
              height: '500px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Canvas 
              camera={{ position: [0, 0, 4], fov: 45 }}
              style={{ 
                background: 'transparent',
                width: '100%',
                height: '100%',
              }}
            >
              <ambientLight intensity={2.0} />
              <directionalLight 
                position={[3, 3, 5]} 
                intensity={2.5} 
                color="#FFFFFF"
              />
              <directionalLight 
                position={[-3, 2, -5]}
                intensity={1.0} 
                color="#ADD8E6"
              />
              <Suspense fallback={null}>
                <Model />
              </Suspense>
              <OrbitControls
                enableZoom={false}
                enablePan={false}
                minPolarAngle={Math.PI / 4}
                maxPolarAngle={3 * Math.PI / 4}
                autoRotate={true}
                autoRotateSpeed={0.6}
                target={[0, 0, 0]}
              />
            </Canvas>
          </motion.div>
        </motion.div>
      </main>
      <FeaturesSection />
    </>
  );
}
