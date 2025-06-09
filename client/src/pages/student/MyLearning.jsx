import React from "react";
import Course from "./Course";
// import { useLoadUserQuery } from "@/features/api/authApi";

export const courses = [
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
const MyLearning = () => { 
//   const {data, isLoading} = useLoadUserQuery();
const isLoading = false

  const myLearning =  courses;
  return (
    <div className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-purple-50 to-blue-50 min-h-screen">
      {/* Beautiful Header Section */}
      <div className="text-center mb-12 sm:mb-16 lg:mb-20">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent leading-tight tracking-tight px-4 py-6 sm:py-8 lg:py-10">
          My Learning
        </h1>
        <div className="w-30 sm:w-32 lg:w-40 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mt-4   sm:mt-6 rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {isLoading ? (
          <MyLearningSkeleton />
        ) : myLearning.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 sm:py-24 lg:py-32">
            <div className="text-center max-w-md mx-auto">
              <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 mx-auto mb-6 sm:mb-8 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
              </div>
              <p className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-700 mb-3 sm:mb-4 px-4">
                You're not enrolled in any course yet
              </p>
              <p className="text-sm sm:text-base lg:text-lg text-gray-500 leading-relaxed px-4 mb-8 sm:mb-10">
                Start your learning journey today! Explore our courses and unlock your potential with expert-led content.
              </p>
              <button className="bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 lg:px-10 rounded-full hover:from-purple-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                Browse Courses
              </button>
            </div>
          </div>
        ) : (
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {myLearning.map((course, index) => (
              <Course key={index} course={course}/>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyLearning;

// Skeleton component for loading state
const MyLearningSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
    {[...Array(3)].map((_, index) => (
      <div
        key={index}
        className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse"
      >
        <div className="h-48 bg-gray-300"></div>
        <div className="p-6">
          <div className="h-6 bg-gray-300 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded mb-4"></div>
          <div className="flex justify-between mb-4">
            <div className="h-4 bg-gray-200 rounded w-20"></div>
            <div className="h-4 bg-gray-200 rounded w-16"></div>
          </div>
          <div className="h-12 bg-gray-300 rounded"></div>
        </div>
      </div>
    ))}
  </div>
);