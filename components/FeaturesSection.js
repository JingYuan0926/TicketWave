import React from "react";
import { motion } from "framer-motion";
import {
  Shield,
  Ticket,
  Users,
  Link,
  Search,
  ShoppingCart,
  Sparkles,
} from "lucide-react";

const FeatureCard = ({ icon, title, description, variants, highlight }) => {
  return (
    <motion.div
      variants={variants}
      whileHover={{ scale: 1.05, y: -5 }}
      className="relative p-6 rounded-2xl overflow-hidden group"
      style={{
        background: highlight
          ? "rgba(255, 0, 128, 0.1)"
          : "rgba(255, 255, 255, 0.05)",
        backdropFilter: "blur(10px)",
        border: highlight
          ? "1px solid rgba(255, 0, 128, 0.3)"
          : "1px solid rgba(255, 255, 255, 0.1)",
        boxShadow: highlight
          ? "0 8px 32px 0 rgba(255, 0, 128, 0.2)"
          : "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
      }}
    >
      <div className="relative z-10">
        <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
        <p className="text-gray-300 leading-relaxed">{description}</p>
      </div>
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500"
        style={{
          background: highlight
            ? "linear-gradient(45deg, #FF0080, #7928CA)"
            : "linear-gradient(45deg, #F92C86, #00FFA3)",
          filter: "blur(20px)",
        }}
      />
    </motion.div>
  );
};

const TestimonialCard = ({ quote, author, role, variants }) => {
  return (
    <motion.div
      variants={variants}
      whileHover={{ scale: 1.02 }}
      className="relative p-6 rounded-xl"
      style={{
        background: "rgba(255, 255, 255, 0.03)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      <div className="text-2xl mb-3">💬</div>
      <p className="text-gray-300 mb-4 italic">"{quote}"</p>
      <div>
        <p className="text-white font-semibold">{author}</p>
        <p className="text-gray-400 text-sm">{role}</p>
      </div>
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
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const features = [
    {
      icon: <Shield className="w-8 h-8 text-white" />,
      title: "Smart Contracts",
      description:
        "Automated, transparent ticket sales with built-in anti-scalping protection. Every transaction is recorded on blockchain for complete transparency.",
      highlight: true,
    },
    {
      icon: <Ticket className="w-8 h-8 text-white" />,
      title: "NFT Ticket Resale",
      description:
        "Safe, verified resale marketplace with price regulation. Organizers earn royalties on every resale, fans get authentic tickets.",
    },
    {
      icon: <Users className="w-8 h-8 text-white" />,
      title: "World ID Verification",
      description:
        "Bot-free ticket drops using Worldcoin's proof-of-personhood. Real humans get fair access, no more bot armies.",
    },
  ];

  const howItWorks = [
    {
      step: "1",
      title: "Connect & Verify",
      description:
        "Link your wallet or sign up with Google. Verify your identity with World ID for bot-free access.",
      icon: <Link className="w-8 h-8 text-white" />,
    },
    {
      step: "2",
      title: "Discover Events",
      description:
        "Browse upcoming events with transparent pricing. See real-time availability and fair drop schedules.",
      icon: <Search className="w-8 h-8 text-white" />,
    },
    {
      step: "3",
      title: "Secure Your Ticket",
      description:
        "Purchase NFT tickets through smart contracts. Your ticket is unique, verifiable, and tamper-proof.",
      icon: <ShoppingCart className="w-8 h-8 text-white" />,
    },
    {
      step: "4",
      title: "Experience & Collect",
      description:
        "Attend your event and mint exclusive memories. Trade or keep your NFT ticket as a digital collectible.",
      icon: <Sparkles className="w-8 h-8 text-white" />,
    },
  ];

  const testimonials = [
    {
      quote:
        "Finally, a ticketing platform that actually works for fans. No more getting scammed by fake tickets!",
      author: "Sarah Chen",
      role: "Concert Enthusiast",
    },
    {
      quote:
        "As an event organizer, TicketWave gives us complete control over pricing and helps us earn from resales.",
      author: "Marcus Rodriguez",
      role: "Festival Director",
    },
    {
      quote:
        "The World ID integration is genius. No more bots buying all the tickets in seconds.",
      author: "Alex Kim",
      role: "APU Blockchain Club",
    },
  ];

  return (
    <>
      {/* Main Features Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-20 w-full"
        style={{ background: "#121212" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl font-bold text-center mb-4 text-white"
          >
            Why TicketWave?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-center mb-16 text-gray-400 max-w-3xl mx-auto"
          >
            The first blockchain-powered ticketing platform that puts fans first
            and eliminates the middlemen
          </motion.p>
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

      {/* How It Works Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-20 w-full"
        style={{
          background: "linear-gradient(180deg, #121212 0%, #1a1a1a 100%)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl font-bold text-center mb-4 text-white"
          >
            How It Works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-center mb-16 text-gray-400 max-w-2xl mx-auto"
          >
            Simple steps to secure, fair, and transparent ticketing
          </motion.p>

          <motion.div
            variants={containerVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {howItWorks.map((step, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="relative text-center"
              >
                <div className="relative mb-6">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center">
                    {step.icon}
                  </div>
                  <div
                    className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                    style={{
                      background: "linear-gradient(135deg, #FF0080, #7928CA)",
                      color: "white",
                    }}
                  >
                    {step.step}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">
                  {step.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-20 w-full"
        style={{ background: "#121212" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl font-bold text-center mb-4 text-white"
          >
            What People Are Saying
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-center mb-16 text-gray-400"
          >
            Join thousands who are already experiencing the future of ticketing
          </motion.p>

          <motion.div
            variants={containerVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                {...testimonial}
                variants={itemVariants}
              />
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Final CTA Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-20 w-full text-center"
        style={{
          background:
            "linear-gradient(135deg, #121212 0%, #1a1a1a 50%, #121212 100%)",
          position: "relative",
        }}
      >
        {/* Background particles for final section */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background:
              "radial-gradient(ellipse at center, rgba(255, 0, 128, 0.05) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl font-bold mb-6 text-white"
          >
            Ready to Join the Revolution?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl mb-12 text-gray-300 max-w-2xl mx-auto"
          >
            Be among the first to experience fair, secure, and transparent
            ticketing. Join our beta and help shape the future of live events.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                background:
                  "linear-gradient(135deg, #FF0080, #7928CA, #0070F3)",
                border: "none",
                padding: "18px 36px",
                fontSize: "1.2rem",
                fontWeight: "600",
                borderRadius: "12px",
                cursor: "pointer",
                color: "white",
                boxShadow: "0 8px 32px rgba(255, 0, 128, 0.4)",
              }}
            >
              🚀 Get Early Access
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                background: "transparent",
                border: "2px solid rgba(255, 255, 255, 0.3)",
                padding: "16px 32px",
                fontSize: "1.1rem",
                fontWeight: "500",
                borderRadius: "12px",
                cursor: "pointer",
                color: "white",
                backdropFilter: "blur(10px)",
              }}
            >
              📖 Learn More
            </motion.button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-sm text-gray-500 mt-8"
          >
            No spam, just updates on our progress. Unsubscribe anytime.
          </motion.p>
        </div>
      </motion.section>
    </>
  );
}
