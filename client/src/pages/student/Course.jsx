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
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-900/50 overflow-hidden hover:shadow-2xl dark:hover:shadow-gray-900/70 transition-all duration-300 border border-gray-100 dark:border-gray-700"
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
                      src={course.courseThumbnail} 
                      alt={course.courseTitle}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    />
                    <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-2 sm:px-3 py-1 rounded-full border border-white/20 dark:border-gray-700/50">
                      <span className="text-purple-600 dark:text-purple-400 font-semibold text-sm sm:text-base">{
                        course.coursePrice === "FREE" ? "Free" : `₹${course.coursePrice}`
                        } </span>
                    </div>
                  </div>
                  
                  <div className="p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3">{course.courseTitle}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-3 sm:mb-4 leading-relaxed text-sm sm:text-base">{course.subTitle}</p>
                    
                    <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-3 sm:mb-4">
                      <div className="flex items-center space-x-1">
                        <Users size={14} className="sm:w-4 sm:h-4" />
                        <span>{course.students} students</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="fill-yellow-400 text-yellow-400 w-3 h-3 sm:w-4 sm:h-4" />
                        <span>4528</span>
                      </div>
                    </div>
                    <Link to={`/course-detail/${course._id}`}>
                    <motion.button
                      className="w-full bg-gradient-to-r from-purple-500 to-blue-500 dark:from-purple-600 dark:to-blue-600 text-white py-2.5 sm:py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-blue-600 dark:hover:from-purple-700 dark:hover:to-blue-700 transition-all duration-200 text-sm sm:text-base shadow-lg dark:shadow-purple-500/25 hover:shadow-xl dark:hover:shadow-purple-500/40"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Enroll Now
                    </motion.button>
                    </Link>
                  </div>
                </motion.div>
  );
};

export default Course;