
import React, { useState } from "react";
import SearchResult from "./SearchResult";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetSearchCourseQuery } from "@/app/api/courseApi";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { AlertCircle, Search, Filter as FilterIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const [searchInput, setSearchInput] = useState(query || "");
  const [selectedCategories, setSelectedCatgories] = useState([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const navigate = useNavigate();

  const { data, isLoading } = useGetSearchCourseQuery({
    searchQuery: query,
    categories: selectedCategories,
  });

  const isEmpty = !isLoading && data?.courses.length === 0;

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Handle search submission logic here
    console.log("Search submitted:", searchInput);
  };

  const clearSearch = () => {
    setSearchInput("");
  };

  const searchHandler = (e) => {
    e.preventDefault();
    if(searchInput.trim() !== ""){
      navigate(`/course/search?query=${searchInput}`)
    }
    setSearchQuery("");
  }



  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 dark:from-gray-900 dark:via-blue-900/30 dark:to-purple-900/20 relative overflow-hidden transition-all duration-500">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="bg-gradient-to-br from-blue-200/30 to-purple-200/20 dark:from-blue-500/20 dark:to-purple-500/10 absolute -top-40 -right-40 w-96 h-96 rounded-full blur-3xl transition-colors duration-500"></div>
        <div className="bg-gradient-to-tr from-purple-200/30 to-pink-200/20 dark:from-purple-500/20 dark:to-pink-500/10 absolute -bottom-40 -left-40 w-96 h-96 rounded-full blur-3xl transition-colors duration-500"></div>
        <div className="bg-gradient-to-r from-blue-100/20 to-purple-100/20 dark:from-blue-400/10 dark:to-purple-400/10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-2xl transition-colors duration-500"></div>
      </div>



      <div className="relative z-10 max-w-7xl mx-auto p-4 md:p-8">
        {/* Enhanced Search Bar Section */}
        <div className="mt-20 mb-8">
          <div className="relative max-w-4xl mx-auto">
            <form onSubmit={handleSearchSubmit} className="relative group">
              <div className={`relative transform transition-all duration-500 ${isSearchFocused ? 'scale-105' : 'scale-100'}`}>
                {/* Search bar background with glassmorphism */}
                <div className="absolute inset-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/50 dark:border-gray-700/50 group-hover:shadow-3xl transition-all duration-300"></div>
                
                {/* Gradient border animation */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-sm"></div>
                
                <div className="relative flex items-center">
                  {/* Search icon */}
                  <div className="absolute left-6 z-10">
                    <Search className={`w-6 h-6 transition-all duration-300 ${
                      isSearchFocused 
                        ? 'text-blue-600 scale-110' 
                        : 'text-gray-400'
                    }`} />
                  </div>
                  
                  {/* Search input */}
                  <input
                    type="text"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                    placeholder="Search for courses, instructors, or topics..."
                    className="w-full pl-16 pr-32 py-6 bg-transparent border-0 outline-none text-lg font-medium text-gray-800 dark:text-gray-100 placeholder-gray-400 rounded-2xl transition-colors duration-300"
                  />
                  
                  {/* Clear button */}
                  {searchInput && (
                    <button
                      type="button"
                      onClick={clearSearch}
                      className="absolute right-24 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 group"
                    >
                      <X className="w-5 h-5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300" />
                    </button>
                  )}
                  
                  {/* Search button */}
                  <button
                    type="submit"
                    onClick={searchHandler}
                    className="absolute cursor-pointer right-3 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
                  >
                    <Search className="w-4 h-4 " />
                    <span className="hidden sm:inline">Search</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Enhanced Results Header */}
        <div className="my-8 relative">
          <div className="bg-gradient-to-br from-blue-200/40 to-purple-200/30 dark:from-blue-400/30 dark:to-purple-400/20 absolute -top-4 -left-4 w-24 h-24 rounded-full blur-2xl opacity-60 animate-pulse transition-colors duration-500"></div>
          {query && (
            <div className="relative backdrop-blur-sm bg-white/30 dark:bg-gray-800/30 rounded-2xl p-6 border border-white/40 dark:border-gray-700/40 shadow-lg transition-all duration-500">
              <h1 className="font-bold text-2xl md:text-3xl text-gray-800 dark:text-gray-100 mb-3 transition-colors duration-300">
                Results for "
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-gradient-x">
                  {query}
                </span>
                "
              </h1>
              <div className="flex items-center justify-between flex-wrap gap-4">
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed flex items-center gap-2 transition-colors duration-300">
                  <span className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></span>
                  Showing {data?.courses?.length || 0} results for
                  <span className="text-blue-800 dark:text-blue-300 font-bold italic px-3 py-1 bg-blue-100/80 dark:bg-blue-900/50 rounded-lg border border-blue-200/50 dark:border-blue-800/50 backdrop-blur-sm transition-colors duration-300">
                    {query}
                  </span>
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Enhanced Content Area */}
        <div className="flex flex-col md:flex-row gap-10">
          <div className="flex-1 relative">
            {/* Decorative background elements */}
            <div className="bg-gradient-to-br from-purple-200/30 to-pink-200/20 dark:from-purple-500/20 dark:to-pink-500/10 absolute -top-8 -right-8 w-32 h-32 rounded-full blur-3xl opacity-40 animate-pulse transition-colors duration-500"></div>
            <div className="bg-gradient-to-tr from-blue-200/30 to-purple-200/20 dark:from-blue-500/20 dark:to-purple-500/10 absolute -bottom-8 -left-8 w-40 h-40 rounded-full blur-3xl opacity-30 transition-colors duration-500"></div>
            
            {/* Main content container with enhanced glassmorphism */}
            <div className="relative bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-3xl border border-white/50 dark:border-gray-700/50 shadow-2xl p-8 hover:shadow-3xl transition-all duration-500">
              {/* Gradient border effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                {isLoading ? (
                  <div className="space-y-8">
                    {Array.from({ length: 3 }).map((_, idx) => (
                      <CourseSkeleton key={idx} />
                    ))}
                  </div>
                ) : isEmpty ? (
                  <CourseNotFound />
                ) : (
                  <div className="space-y-6">
                    {data?.courses?.map((course, index) => (
                      <div
                        key={course._id}
                        className="transform transition-all duration-300 hover:scale-[1.02]"
                        style={{
                          animationDelay: `${index * 100}ms`,
                          animation: 'fadeInUp 0.6s ease-out forwards'
                        }}
                      >
                        <SearchResult course={course} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;

const CourseNotFound = () => {
    const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-64 p-8 relative">
      {/* Enhanced background with multiple layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-50/80 via-orange-50/60 to-pink-50/40 dark:from-red-900/40 dark:via-orange-900/30 dark:to-pink-900/20 rounded-2xl backdrop-blur-sm transition-colors duration-500"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent rounded-2xl"></div>
      
      <div className="relative z-10 text-center max-w-md">
        {/* Enhanced icon with multiple animation layers */}
        <div className="relative mb-8">
          <div className="bg-red-200/40 dark:bg-red-500/20 absolute inset-0 rounded-full blur-2xl animate-pulse transition-colors duration-500"></div>
          <div className="bg-orange-200/30 dark:bg-orange-500/15 absolute inset-0 rounded-full blur-xl animate-ping transition-colors duration-500"></div>
          <div className="relative bg-gradient-to-br from-red-100 to-orange-100 dark:from-red-900/50 dark:to-orange-900/50 rounded-full p-6 border border-red-200/50 dark:border-red-800/50 backdrop-blur-sm shadow-xl transition-colors duration-500">
            <AlertCircle className="text-red-500 h-16 w-16 mx-auto animate-bounce" />
          </div>
        </div>
        
        {/* Enhanced typography */}
        <h1 className="font-bold text-3xl md:text-4xl mb-4 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 dark:from-gray-100 dark:via-gray-200 dark:to-gray-300 bg-clip-text text-transparent transition-colors duration-300">
          Course Not Found
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed transition-colors duration-300">
          Sorry, we couldn't find the course you're looking for. Try adjusting your search terms or explore our featured courses.
        </p>
        
        {/* Enhanced call-to-action */}
        <div className="space-y-4">
            <Button 
            onClick={() => navigate("/course/search?query")}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
              Browse All Courses
            </Button>
          <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">
            or try searching for something else
          </p>
        </div>
      </div>
    </div>
  );
};

const CourseSkeleton = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between border-b border-gray-200/50 dark:border-gray-700/50 py-8 group transition-colors duration-500">
      {/* Enhanced image skeleton */}
      <div className="h-36 w-full md:w-72 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded-xl overflow-hidden relative shadow-lg transition-colors duration-500">
        <Skeleton className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full animate-shimmer"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/20 to-purple-100/20 dark:from-blue-500/10 dark:to-purple-500/10 rounded-xl transition-colors duration-500"></div>
      </div>
      
      {/* Enhanced content skeleton */}
      <div className="flex flex-col gap-4 flex-1 px-6">
        <div className="space-y-3">
          <Skeleton className="h-7 w-4/5 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-lg shadow-sm transition-colors duration-500" />
          <Skeleton className="h-5 w-3/5 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-600 dark:to-gray-700 rounded-md transition-colors duration-500" />
        </div>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-full transition-colors duration-500"></div>
          <Skeleton className="h-4 w-2/5 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-md transition-colors duration-500" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-7 w-24 bg-gradient-to-r from-blue-200 to-purple-200 dark:from-blue-800 dark:to-purple-800 rounded-full shadow-sm transition-colors duration-500" />
          <Skeleton className="h-7 w-20 bg-gradient-to-r from-green-200 to-blue-200 dark:from-green-800 dark:to-blue-800 rounded-full shadow-sm transition-colors duration-500" />
        </div>
      </div>
       {/* Enhanced price skeleton */}
      <div className="flex flex-col items-end justify-center mt-6 md:mt-0 px-4">
        <Skeleton className={`h-8 w-20 rounded-lg shadow-sm mb-2 transition-colors duration-500 dark:bg-gradient-to-r dark:from-green-800 dark:to-emerald-800 bg-gradient-to-r from-green-200 to-emerald-200`} />
        <Skeleton className={`h-4 w-16 rounded-md transition-colors duration-500 dark:bg-gradient-to-r dark:from-gray-600 to-gray-700 bg-gradient-to-r from-gray-100 to-gray-200`} />
      </div>
    </div>
  );
};
      
