import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen,  
  ArrowRight, 
} from 'lucide-react';

const TypewriterText = ({ text, delay = 0 }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentIndex < text.length) {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }
    }, delay + currentIndex * 50);

    return () => clearTimeout(timer);
  }, [currentIndex, text, delay]);

  return <span>{displayText}</span>;
};

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "radial-gradient(circle at 20% 20%, rgba(168, 85, 247, 0.3) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)",
              "radial-gradient(circle at 40% 60%, rgba(236, 72, 153, 0.3) 0%, transparent 50%)"
            ]
          }}
          transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
        />
      </div>

      {/* Floating Elements */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-3 h-3 sm:w-4 sm:h-4 bg-purple-400 rounded-full"
        animate={{ y: [0, -20, 0], opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <motion.div
        className="absolute top-1/3 right-1/3 w-4 h-4 sm:w-6 sm:h-6 bg-blue-400 rounded-full"
        animate={{ y: [0, 20, 0], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, delay: 1 }}
      />

      <div className="relative z-10 text-center max-w-6xl mx-auto pt-20 sm:pt-24">
        <motion.div
          initial={{ scale: 0.8, opacity: 0, filter: "blur(10px)" }}
          animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <motion.h1 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 sm:mb-8 leading-tight"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Empowering Learning with
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent block mt-2">
              Your Buddy Tutor
            </span>
          </motion.h1>

          <motion.div
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/80 mb-8 sm:mb-12 max-w-3xl mx-auto px-4"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <TypewriterText 
              text="Transform your learning journey with personalized tutoring, interactive courses, and expert guidance tailored just for you."
              delay={1000}
            />
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-4"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <motion.button
              className="w-full sm:w-auto bg-gradient-to-r from-purple-400 to-blue-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg flex items-center justify-center space-x-2 hover:from-purple-400 hover:to-blue-500 transition-all duration-200"
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 15px 35px rgba(91, 82, 228, 0.53)" 
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Get Started Today</span>
              <ArrowRight size={18} />
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Hero Illustration */}
        <motion.div
          className="mt-12 sm:mt-16"
          initial={{ scale: 0.5, opacity: 0, rotateY: 45 }}
          animate={{ scale: 1, opacity: 1, rotateY: 0 }}
          transition={{ duration: 1.5, delay: 1.5, ease: "easeOut" }}
        >
          <div className="flex justify-center">
            <svg className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#a855f7" stopOpacity="0.8"/>
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.8"/>
                </linearGradient>
              </defs>
              <circle cx="100" cy="100" r="80" fill="url(#grad1)" />
              <circle cx="100" cy="100" r="60" fill="none" stroke="white" strokeWidth="2" opacity="0.6"/>
              <circle cx="100" cy="100" r="40" fill="none" stroke="white" strokeWidth="2" opacity="0.4"/>
              <rect x="80" y="80" width="40" height="40" fill="white" opacity="0.9" rx="4"/>
              <g transform="translate(88, 88)">
                <BookOpen className="w-6 h-6 text-purple-600" />
              </g>
            </svg>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
export default HeroSection;

