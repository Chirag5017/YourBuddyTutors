import { Button } from "@/components/ui/button";
import React from "react";
import { Link } from "react-router-dom";
import CourseTab from "./CourseTab";

const EditCourse = () => {
  return (
    <div className=" mt-23 bg-slate-50 flex-1 bg-background">
      <div className="container mx-auto px-4 py-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">
              Course Details
            </h1>
            <p className="text-muted-foreground">
              Add detailed information regarding your course
            </p>
          </div>
          <Link to="lecture" className="w-full sm:w-auto">
            <Button 
              className="w-full sm:w-auto hover:text-blue-600 transition-colors" 
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