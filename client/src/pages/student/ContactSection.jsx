import { motion } from 'framer-motion';
import {  CheckCircle } from 'lucide-react';

const ContactSection = () => {
  return (
    <section id="contact" className="py-16 sm:py-20 lg:py-24 bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            Ready to Start Learning?
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 mb-8 sm:mb-12 max-w-2xl mx-auto">
            Join thousands of students who have transformed their careers with Your Buddy Tutor. Start your journey today!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
            <motion.button
              className="w-full sm:w-auto bg-gradient-to-r from-purple-400 to-blue-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg flex items-center justify-center space-x-2 hover:from-purple-400 hover:to-blue-500 transition-all duration-200"
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 15px 35px rgba(168, 85, 247, 0.4)" 
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Get Started Free</span>
              <CheckCircle size={18} />
            </motion.button>
            
            <motion.button
              className="w-full sm:w-auto border-2 border-white/30 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:bg-white/10 backdrop-blur-sm transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Support
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
