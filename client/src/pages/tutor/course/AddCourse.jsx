import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateCourseMutation } from "@/app/api/courseApi";
import { Loader2, BookOpen, ArrowLeft, Plus, Sparkles } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AddCourse = () => {
  const [courseTitle, setCourseTitle] = useState("");
  const [category, setCategory] = useState("");

  const [createCourse, { data, isLoading, error, isSuccess }] = useCreateCourseMutation();

  const navigate = useNavigate();

  const getSelectedCategory = (value) => {
    setCategory(value);
  };

  const createCourseHandler = async () => {
    if (!courseTitle.trim()) {
      toast.error("Please enter a course title");
      return;
    }
    if (!category) {
      toast.error("Please select a category");
      return;
    }
    await createCourse({ courseTitle, category });
  };

  // for displaying toast
  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Course created successfully!");
      navigate("/tutor/course");
    }
    if (error) {
      toast.error(error?.data?.message || "Failed to create course.");
    }
  }, [isSuccess, error]);

  const categories = [
    { value: "Next JS", icon: "⚛️" },
    { value: "Data Science", icon: "📊" },
    { value: "Frontend Development", icon: "🎨" },
    { value: "Fullstack Development", icon: "🚀" },
    { value: "MERN Stack Development", icon: "💻" },
    { value: "Javascript", icon: "🟨" },
    { value: "Python", icon: "🐍" },
    { value: "Docker", icon: "🐳" },
    { value: "MongoDB", icon: "🍃" },
    { value: "HTML", icon: "🌐" },
  ];

  return (
    <div className="bg-slate-50 p-6 mt-23">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mb-4">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              Create Your Course
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Let's get started with the basics. Add some essential details for your new course and begin your teaching journey.
            </p>
          </div>
        </div>

        {/* Main Form Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Card Header */}
          <div className="px-8 py-6 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-800">Course Details</h2>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Fill in the basic information to create your course
            </p>
          </div>

          {/* Form Content */}
          <div className="p-8 space-y-8">
            {/* Course Title */}
            <div className="space-y-3">
              <Label className="text-base font-semibold text-gray-700 flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Course Title
              </Label>
              <Input
                type="text"
                value={courseTitle}
                onChange={(e) => setCourseTitle(e.target.value)}
                placeholder="Enter your course name (e.g., Complete React Development Bootcamp)"
                className="h-12 text-base border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl transition-all duration-200"
              />
              <p className="text-sm text-gray-500">
                Choose a clear, descriptive title that tells students what they'll learn
              </p>
            </div>

            {/* Category Selection */}
            <div className="space-y-3">
              <Label className="text-base font-semibold text-gray-700 flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Category
              </Label>
              <Select onValueChange={getSelectedCategory}>
                <SelectTrigger className="h-12 text-base border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl transition-all duration-200">
                  <SelectValue placeholder="Select a category for your course" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-2 border-gray-200">
                  <SelectGroup>
                    <SelectLabel className="text-sm font-semibold text-gray-700 px-3 py-2">
                      Choose Category
                    </SelectLabel>
                    {categories.map((cat) => (
                      <SelectItem 
                        key={cat.value} 
                        value={cat.value}
                        className="hover:bg-blue-50 focus:bg-blue-50 rounded-lg mx-2 my-1 cursor-pointer transition-colors duration-200"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-lg">{cat.icon}</span>
                          <span className="font-medium">{cat.value}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <p className="text-sm text-gray-500">
                Select the category that best fits your course content
              </p>
            </div>

            {/* Preview Card */}
            {(courseTitle || category) && (
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-blue-600" />
                  Course Preview
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-600">Title:</span>
                    <span className="text-base font-semibold text-gray-900">
                      {courseTitle || "Your course title will appear here"}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-600">Category:</span>
                    <span className="text-base font-semibold text-gray-900 flex items-center gap-2">
                      {category && (
                        <span className="text-lg">
                          {categories.find(cat => cat.value === category)?.icon}
                        </span>
                      )}
                      {category || "No category selected"}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Form Actions */}
          <div className="px-8 py-6 bg-gray-50 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <Button 
                variant="outline" 
                onClick={() => navigate("/tutor/course")}
                className="px-6 py-3 rounded-xl border-2 border-gray-300 hover:bg-gray-100 transition-all duration-200"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Cancel
              </Button>
              
              <Button 
                disabled={isLoading || !courseTitle.trim() || !category} 
                onClick={createCourseHandler}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Creating Course...
                  </>
                ) : (
                  <>
                    <Plus className="mr-2 h-5 w-5" />
                    Create Course
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-600" />
            Quick Tips
          </h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <p className="font-medium text-gray-700">Choose a Clear Title</p>
                <p>Make it descriptive and include key learning outcomes</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <p className="font-medium text-gray-700">Select Right Category</p>
                <p>This helps students find your course more easily</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;