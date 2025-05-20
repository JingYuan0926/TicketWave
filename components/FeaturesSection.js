import React from 'react';
import { motion } from 'framer-motion';

const FeatureCard = ({ icon, title, description, variants }) => {
  return (
    <motion.div
      variants={variants}
      whileHover={{ scale: 1.05 }}
      className="relative p-6 rounded-2xl overflow-hidden"
      style={{
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
      }}
    >
      <div className="relative z-10">
        <div className="text-4xl mb-4">{icon}</div>
        <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
        <p className="text-gray-300">{description}</p>
      </div>
      <div
        className="absolute inset-0 opacity-0 hover:opacity-30 transition-opacity duration-300"
        style={{
          background: 'linear-gradient(45deg, #F92C86, #00FFA3)',
          filter: 'blur(20px)',
        }}
      />
    </motion.div>
  );
};

export default function FeaturesSection() {
  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const features = [
    {
      icon: '🔐',
      title: 'Smart Contracts',
      description: 'Secure and transparent ticket transactions powered by blockchain technology.',
    },
    {
      icon: '🎟️',
      title: 'NFT Ticket Resale',
      description: 'Safe and verified ticket resale marketplace with built-in authenticity.',
    },
    {
      icon: '🌐',
      title: 'World ID',
      description: 'Bot-free verification ensuring real humans get fair access to tickets.',
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="py-20 w-full"
      style={{ background: '#121212' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl font-bold text-center mb-12 text-white"
        >
          Why TicketWave?
        </motion.h2>
        <motion.div
          variants={containerVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} variants={itemVariants} />
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
} 