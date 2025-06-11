import { Badge } from "@/components/ui/badge";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Star, Clock, Users, BookOpen, ArrowRight } from "lucide-react";

const SearchResult = ({ course }) => {
  const navigate = useNavigate();
  return (
    <div className="group relative overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50/0 via-purple-50/0 to-pink-50/0 group-hover:from-blue-50/30 group-hover:via-purple-50/20 group-hover:to-pink-50/30 dark:from-blue-900/0 dark:via-purple-900/0 dark:to-pink-900/0 dark:group-hover:from-blue-900/30 dark:group-hover:via-purple-900/20 dark:group-hover:to-pink-900/30 rounded-2xl transition-all duration-500"></div>
      
      {/* Animated border gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/20 group-hover:via-purple-500/20 group-hover:to-pink-500/20 dark:group-hover:from-blue-400/20 dark:group-hover:via-purple-400/20 dark:group-hover:to-pink-400/20 rounded-2xl blur-sm transition-all duration-500"></div>
      
      <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center border border-gray-200/50 dark:border-gray-700/50 group-hover:border-white/80 dark:group-hover:border-gray-600/80 py-8 px-6 gap-6 transition-all duration-500 hover:shadow-2xl dark:hover:shadow-2xl dark:hover:shadow-black/20 rounded-2xl backdrop-blur-sm bg-white/40 dark:bg-gray-800/40 group-hover:bg-white/70 dark:group-hover:bg-gray-800/70 transform group-hover:scale-[1.02]">
        
        <Link
          to={`/course-detail/${course._id}`}
          className="flex flex-col md:flex-row gap-6 w-full md:w-auto group/link"
        >
          {/* Enhanced image container */}
          <div className="relative overflow-hidden rounded-xl shadow-lg group-hover:shadow-2xl dark:shadow-black/30 dark:group-hover:shadow-black/50 transition-all duration-500">
            {/* Image wrapper with multiple effects */}
            <div className="relative w-full md:w-72 h-40">
              <img
                src={course.courseThumbnail}
                alt="course-thumbnail"
                className="w-full h-full object-cover rounded-xl group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              
              {/* Overlay gradients */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-transparent to-purple-600/20 dark:from-blue-400/20 dark:to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
              
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 dark:via-gray-200/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
              
              {/* Floating badge */}
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full px-3 py-1 shadow-lg">
                  <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">Preview</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Enhanced content section */}
          <div className="flex flex-col gap-3 flex-1 min-w-0">
            {/* Title with gradient animation */}
            <h1 className="font-bold text-xl md:text-2xl text-gray-800 dark:text-gray-200 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 dark:group-hover:from-blue-400 dark:group-hover:to-purple-400 transition-all duration-500 line-clamp-2 leading-tight">
              {course.courseTitle}
            </h1>
            
            {/* Subtitle */}
            <p className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 line-clamp-2 leading-relaxed transition-colors duration-300">
              {course.subTitle}
            </p>
            
            {/* Instructor info with enhanced styling */}
            <div className="flex items-center gap-3 group-hover:transform group-hover:translate-x-2 transition-transform duration-300">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 dark:from-blue-400 dark:to-purple-500 rounded-full flex items-center justify-center shadow-md">
                <span className="text-white text-xs font-bold">
                  {course.creator?.name?.charAt(0) || 'I'}
                </span>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                Instructor: <span className="font-bold">{course.creator?.name}</span>
              </p>
            </div>
            
            {/* Course stats */}
            <div className="flex items-center gap-4 text-xs text-gray-600 dark:text-gray-400 mt-2">
              <div className="flex items-center gap-1 bg-gray-100/80 dark:bg-gray-700/80 rounded-full px-2 py-1 group-hover:bg-blue-100/80 dark:group-hover:bg-blue-900/80 transition-colors duration-300">
                <Users className="w-3 h-3" />
                <span>1.2k students</span>
              </div>
              <div className="flex items-center gap-1 bg-gray-100/80 dark:bg-gray-700/80 rounded-full px-2 py-1 group-hover:bg-green-100/80 dark:group-hover:bg-green-900/80 transition-colors duration-300">
                <Clock className="w-3 h-3" />
                <span>4.5 hours</span>
              </div>
              <div className="flex items-center gap-1 bg-gray-100/80 dark:bg-gray-700/80 rounded-full px-2 py-1 group-hover:bg-orange-100/80 dark:group-hover:bg-orange-900/80 transition-colors duration-300">
                <BookOpen className="w-3 h-3" />
                <span>12 lessons</span>
              </div>
            </div>
            
            {/* Enhanced badges */}
            <div className="flex items-center gap-2 mt-3">
              <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-400 dark:to-purple-500 hover:from-blue-600 hover:to-purple-700 dark:hover:from-blue-500 dark:hover:to-purple-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 px-3 py-1">
                {course.courseLevel}
              </Badge>
              
              {/* Rating badge */}
              <div className="flex items-center gap-1 bg-gradient-to-r from-yellow-400 to-orange-500 dark:from-yellow-500 dark:to-orange-600 text-white px-3 py-1 rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                <Star className="w-3 h-3 fill-current" />
                <span className="text-xs font-semibold">4.8</span>
              </div>
            </div>
          </div>
        </Link>
        
        {/* Enhanced price section */}
        <div className="flex flex-col items-end justify-center mt-4 md:mt-0 gap-3 min-w-0 md:min-w-[120px]">
          {/* Price with enhanced styling */}
          <div className="relative group/price">
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 dark:from-green-500 dark:to-emerald-600 rounded-lg blur-md opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
            <h1 className="relative font-bold text-xl md:text-xl text-green-600 dark:text-green-400 group-hover:text-green-700 dark:group-hover:text-green-300 transition-all duration-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg group-hover:shadow-xl border border-green-200/50 dark:border-green-700/50">
             {course.coursePrice === "FREE" ? "Free" : `₹${course.coursePrice}`}
              
              {/* Animated underline */}
              <div className="absolute -bottom-1 left-4 w-0 h-1 bg-gradient-to-r from-green-500 to-emerald-500 dark:from-green-400 dark:to-emerald-400 group-hover:w-[calc(100%-2rem)] transition-all duration-500 rounded-full"></div>
            </h1>
          </div>
          
          {/* Original price (if discounted) */}
          <div className="text-sm text-gray-500 dark:text-gray-400 line-through opacity-0 group-hover:opacity-100 transition-opacity duration-300">
           {course.coursePrice === "FREE" ? "Free" : `₹${Math.round(course.coursePrice * 1.4)}`}
          </div>
          
          {/* Action button */}
          <button 
          onClick={() => navigate(`/course-detail/${course._id}`) }
          className="opacity-0 cursor-pointer group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 hover:from-blue-700 hover:to-purple-700 dark:hover:from-blue-600 dark:hover:to-purple-600 text-white px-4 py-2 rounded-lg shadow-lg hover:shadow-xl text-sm font-medium">
            <span>Enroll Now</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
        
        {/* Floating decorative elements */}
        <div className="absolute -z-10 top-4 right-4 w-20 h-20 bg-gradient-to-br from-blue-200/30 to-purple-200/20 dark:from-blue-800/30 dark:to-purple-800/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute -z-10 bottom-4 left-4 w-16 h-16 bg-gradient-to-tr from-purple-200/30 to-pink-200/20 dark:from-purple-800/30 dark:to-pink-800/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
      </div>
      
      {/* Enhanced bottom border animation */}
      <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 group-hover:w-full transition-all duration-700 ease-out rounded-full"></div>
    </div>
  );
};

export default SearchResult;