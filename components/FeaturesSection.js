import React from 'react';
import { motion } from 'framer-motion';

const FeatureCard = ({ icon, title, description }) => {
  return (
    <motion.div
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
    <section className="py-20 w-full" style={{ background: '#121212' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-12 text-white">
          Why TicketWave?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
} 