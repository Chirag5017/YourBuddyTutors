// import { Skeleton } from "@/components/ui/skeleton";
// import React from "react";
// import Course from "./Course";
// // import { useGetPublishedCourseQuery } from "@/features/api/courseApi";
 
// const Courses = () => {
// //   const {data, isLoading, isError} = useGetPublishedCourseQuery();
// const isLoading = true;
 
// //   if(isError) return <h1>Some error occurred while fetching courses.</h1>

//   return (
//     <div className="bg-gray-50 dark:bg-[#141414]">
//       <div className="max-w-7xl mx-auto p-6">
//         <h2 className="font-bold text-3xl text-center mb-10">Our Courses</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           {isLoading ? (
//             Array.from({ length: 20 }).map((_, index) => (
//               <CourseSkeleton key={index} />
//             ))
//           ) : (
//         //    data?.courses && data.courses.map((course, index) => <Course key={index} course={course}/>) 
//        <Course/>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Courses;

// const CourseSkeleton = () => {
//   return (
//     <div className="bg-white shadow-md hover:shadow-lg transition-shadow rounded-lg overflow-hidden">
//       <Skeleton className="w-full h-36" />
//       <div className="px-5 py-4 space-y-3">
//         <Skeleton className="h-6 w-3/4" />
//         <div className="flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <Skeleton className="h-6 w-6 rounded-full" />
//             <Skeleton className="h-4 w-20" />
//           </div>
//           <Skeleton className="h-4 w-16" />
//         </div>
//         <Skeleton className="h-4 w-1/4" />
//       </div>
//     </div>
//   );
// };

import { motion} from 'framer-motion';
import { 
  Users, 
  Star, 
} from 'lucide-react';

const Courses = () => {
  const courses = [
    {
      title: "Web Development Masterclass",
      description: "Learn modern web development with React, Node.js, and MongoDB",
      students: "2,500+",
      rating: 4.9,
      price: "$49",
      image: "https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      title: "Data Science Fundamentals",
      description: "Master Python, machine learning, and data visualization techniques",
      students: "1,800+",
      rating: 4.8,
      price: "$59",
      image: "https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      title: "Digital Marketing Pro",
      description: "Complete guide to SEO, social media, and content marketing",
      students: "3,200+",
      rating: 4.7,
      price: "$39",
      image: "https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    }
  ];

  return (
    <section id="courses" className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Popular Courses
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Discover our most loved courses designed by industry experts to help you achieve your goals.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {courses.map((course, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
              initial={{ opacity: 0, y: 50, rotateX: 15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
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
          ))}
        </div>
      </div>
    </section>
  );
};
export default Courses;