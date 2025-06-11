import { Button } from "@/components/ui/button";
import React from "react";
import { Link } from "react-router-dom";
import CourseTab from "./CourseTab";
import { ArrowLeft } from "lucide-react";

const EditCourse = () => {
  return (
    <div className=" mt-23 bg-slate-50 dark:bg-gray-900 flex-1 bg-background dark:bg-background">
      <div className="container mx-auto px-4 py-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="space-y-1">
            <div className="flex  gap-5">
             <Link to={`/tutor/course`}>
              <Button 
                size="icon" 
                variant="outline" 
                className="rounded-full cursor-pointer hover:scale-105 transition-all duration-200 hover:shadow-md border-2 hover:border-blue-300 dark:hover:border-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
              >
                <ArrowLeft size={16} />
              </Button>
              </Link>
            <h1 className="text-3xl font-bold tracking-tight dark:text-white">
              Course Details
            </h1>
            </div>
            <p className="text-muted-foreground dark:text-gray-300 ml-14">
              Add detailed information regarding your course
            </p>
          </div>
          <Link to="lecture" className="w-full sm:w-auto">
            <Button 
              className="w-full cursor-pointer sm:w-auto hover:text-blue-600 dark:hover:text-blue-400 dark:text-gray-300 transition-colors" 
              variant="link"
            >
              Go to lectures page
            </Button>
          </Link>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <CourseTab />
        </div>
      </div>
    </div>
  );
};

export default EditCourse;