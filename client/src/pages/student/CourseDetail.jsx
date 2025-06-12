import BuyCourseButton from "@/components/BuyCourseButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useGetCourseDetailWithStatusQuery } from "@/app/api/purchaseApi";
import { BadgeInfo, Lock, PlayCircle, Calendar, Users, Star, Clock } from "lucide-react";
import React, { useState } from "react";
import ReactPlayer from "react-player";
import { useNavigate, useParams } from "react-router-dom";

const CourseDetail = () => {
  const params = useParams();
  const courseId = params.courseId;
  const navigate = useNavigate();
  const { data, isLoading, isError } =
    useGetCourseDetailWithStatusQuery(courseId);


  if (isLoading) return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center transition-colors duration-300">
      <div className="text-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400 mx-auto"></div>
        <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Loading Course...</h1>
      </div>
    </div>
  );
  
  if (isError) return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center transition-colors duration-300">
      <div className="text-center space-y-4">
        <div className="text-red-500 dark:text-red-400 text-6xl">⚠️</div>
        <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Failed to load course details</h1>
      </div>
    </div>
  );

  const { course, purchased } = data;
  console.log(purchased);

  const handleContinueCourse = () => {
    if(purchased){
      navigate(`/course-progress/${courseId}`)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 ">
      <div className="space-y-8">
        {/* Hero Section */}
        <div className="  bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 dark:from-gray-800 dark:via-gray-900 dark:to-black text-white relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
          </div>
          
          <div className="max-w-7xl mx-auto py-12 px-4 md:px-8 flex flex-col gap-4 relative z-10 mt-20 ">
            <div className="space-y-4">
              <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl leading-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                {course?.courseTitle}
              </h1>
              <p className="text-lg md:text-xl text-gray-300 max-w-3xl">Course Sub-title</p>
              
              <div className="flex flex-wrap items-center gap-6 text-sm md:text-base">
                <p className="flex items-center gap-2">
                  Created By{" "}
                  <span className="text-blue-300 dark:text-blue-400 underline italic font-medium hover:text-blue-200 dark:hover:text-blue-300 transition-colors cursor-pointer">
                    {course?.creator.name}
                  </span>
                </p>
                
                <div className="flex items-center gap-2 text-gray-300">
                  <Calendar size={16} />
                  <p>Updated {course?.createdAt.split("T")[0]}</p>
                </div>
                
                <div className="flex items-center gap-2 text-gray-300">
                  <Users size={16} />
                  <p className="font-medium">{course?.enrolledStudents.length} students</p>
                </div>
              </div>

              {/* Status badge */}
              {purchased && (
                <div className="inline-flex items-center gap-2 bg-green-500/20 dark:bg-green-400/20 text-green-300 dark:text-green-400 px-4 py-2 rounded-full border border-green-500/30 dark:border-green-400/30">
                  <Star size={16} fill="currentColor" />
                  <span className="font-medium">Enrolled</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col lg:flex-row justify-between gap-12">
          {/* Left Column - Course Details */}
          <div className="w-full lg:w-1/2 space-y-8">
            {/* Description Section */}
            <div className="space-y-4">
              <h2 className="font-bold text-2xl md:text-3xl text-gray-900 dark:text-gray-100 flex items-center gap-3">
                <div className="w-1 h-8 bg-gradient-to-b from-slate-50 to-purple-500 rounded-full"></div>
                Course Description
              </h2>
              <div 
                className="text-gray-600 dark:text-gray-300 leading-relaxed text-base md:text-lg bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm transition-colors duration-300"
                dangerouslySetInnerHTML={{ __html: course.subTitle }}
              />
            </div>

            {/* Course Content Section */}
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-800 rounded-t-lg p-5">
                <CardTitle className="text-xl md:text-2xl text-gray-900 dark:text-gray-100 flex items-center gap-3">
                  <PlayCircle className="text-blue-600 dark:text-blue-400" size={24} />
                  Course Content
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
                  <Clock size={16} />
                  {course.lectures.length} lectures
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 p-6">
                {course.lectures.map((lecture, idx) => (
                  <div 
                    key={idx} 
                    className="flex items-center gap-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-200 border border-gray-200 dark:border-gray-600"
                  >
                    <div className="flex-shrink-0">
                      <span className="text-blue-600 dark:text-blue-400">
                        {true ? <PlayCircle size={20} /> : <Lock size={20} />}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-gray-100">{lecture.lectureTitle}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Lecture {idx + 1}</p>
                    </div>
                    <div className="text-xs text-gray-400 dark:text-gray-500 bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded">
                      {idx + 1}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Video Player & Purchase */}
          <div className="w-full lg:w-1/3">
            <div className="sticky top-8">
              <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
                <CardContent className="p-0">
                  {/* Video Player */}
                  <div className="w-full aspect-video bg-black rounded-t-lg overflow-hidden">
                    <ReactPlayer
                      width="100%"
                      height="100%"
                      url={course.lectures[0].videoUrl}
                      controls={true}
                      light={true}
                      playIcon={
                        <div className="bg-blue-600 hover:bg-blue-700 rounded-full p-4 transition-colors duration-200">
                          <PlayCircle size={32} className="text-white" />
                        </div>
                      }
                    />
                  </div>
                  
                  {/* Course Info */}
                  <div className="p-6 space-y-4">
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">
                      Preview Lecture
                    </h3>
                    
                    <Separator className="dark:bg-gray-600" />
                    
                    {/* Pricing Section */}
                    <div className="space-y-3">
                      <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">
                        Course Price
                      </h2>
                      <div className="flex items-center gap-3">
                        {course.coursePrice === "FREE" ? (
                          <span className="text-3xl font-bold text-green-600 dark:text-green-400">Free</span>
                        ) : (
                          <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                            ₹{course.coursePrice}
                          </span>
                        )}
                        {course.coursePrice !== "FREE" && (
                          <span className="text-sm text-gray-500 dark:text-gray-400 line-through">₹{parseInt(course.coursePrice) * 1.5}</span>
                        )}
                      </div>
                      
                      {/* Course features */}
                      <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span>Lifetime access</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span>Certificate of completion</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span>Mobile and desktop access</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter className="p-6 pt-0">
                  {purchased ? (
                    <Button 
                      onClick={handleContinueCourse} 
                      className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
                    >
                      <PlayCircle className="mr-2" size={20} />
                      Continue Course
                    </Button>
                  ) : (
                    <div className="w-full">
                      <BuyCourseButton courseId={courseId} />
                    </div>
                  )}
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;