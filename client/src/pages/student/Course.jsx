import React from "react";
import { motion} from 'framer-motion';
import { 
  Users, 
  Star, 
} from 'lucide-react';
import { Link } from "react-router-dom";

const Course = ({course}) => {
  return (
     <motion.div
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
                  initial={{ opacity: 0, y: 50, rotateX: 15 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ duration: 0.8, delay: 1 * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    y: -10,
                    rotateX: 5,
                    boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)"
                  }}
                >
                  <div className="relative h-40 sm:h-48 overflow-hidden">
                    <img 
                      src={course.image} 
                      alt={course.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    />
                    <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-white/90 backdrop-blur-sm px-2 sm:px-3 py-1 rounded-full">
                      <span className="text-purple-600 font-semibold text-sm sm:text-base">{course.price}</span>
                    </div>
                  </div>
                  
                  <div className="p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">{course.title}</h3>
                    <p className="text-gray-600 mb-3 sm:mb-4 leading-relaxed text-sm sm:text-base">{course.description}</p>
                    
                    <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">
                      <div className="flex items-center space-x-1">
                        <Users size={14} className="sm:w-4 sm:h-4" />
                        <span>{course.students} students</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="fill-yellow-400 text-yellow-400 w-3 h-3 sm:w-4 sm:h-4" />
                        <span>{course.rating}</span>
                      </div>
                    </div>
                    
                    <motion.button
                      className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-2.5 sm:py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-200 text-sm sm:text-base"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Enroll Now
                    </motion.button>
                  </div>
                </motion.div>
  );
};

export default Course;