import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, Edit3 } from "lucide-react";
import React from "react";
import { Link, useParams } from "react-router-dom";
import LectureTab from "./LectureTab";

const EditLecture = () => {
  const params = useParams();
  const courseId = params.courseId;

  return (
    <div className="mt-20 animate-in fade-in duration-300">
      {/* Enhanced Header Section */}
      <div className="relative">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-slate-800 dark:to-slate-900 rounded-2xl -m-4 -z-10" />

        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-4">
            {/* Enhanced Back Button */}
            <Link to={`/tutor/course/${courseId}/lecture`}>
              <Button
                size="icon"
                variant="outline"
                className="cursor-pointer rounded-full hover:scale-105 transition-all duration-200 hover:shadow-md border-2 hover:border-blue-300 dark:border-slate-600 dark:hover:border-blue-600"
              >
                <ArrowLeft size={16} className="text-slate-700 dark:text-slate-200" />
              </Button>
            </Link>

            {/* Enhanced Title with Icon */}
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
                <Edit3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-2xl bg-gradient-to-r from-gray-800 to-gray-600 dark:from-slate-200 dark:to-slate-400 bg-clip-text text-transparent">
                  Update Your Lecture
                </h1>
                <p className="text-sm text-gray-500 dark:text-slate-400 mt-1 flex items-center gap-1">
                  <BookOpen size={14} className="text-gray-500 dark:text-slate-400" />
                  Course ID: {courseId}
                </p>
              </div>
            </div>
          </div>

          {/* Status Badge */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded-full text-sm font-medium">
            <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
            Editing Mode
          </div>
        </div>
      </div>

      {/* Enhanced Content Section */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-4">
        {/* Content wrapper with subtle shadow */}
        <div className="">
          <LectureTab />
        </div>
      </div>
    </div>
  );
};

export default EditLecture;
