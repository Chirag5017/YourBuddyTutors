import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateLectureMutation, useGetCourseLectureQuery } from "@/app/api/courseApi";
import { Loader2, BookOpen, Plus, ArrowLeft, Video } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Lecture from "./Lecture";

const CreateLecture = () => {
  const [lectureTitle, setLectureTitle] = useState("");
  const params = useParams();
  const courseId = params.courseId;
  const navigate = useNavigate();

  const [createLecture, { data, isLoading, isSuccess, error }] =
    useCreateLectureMutation();

  const {
    data: lectureData,
    isLoading: lectureLoading,
    isError: lectureError,
    refetch,
  } = useGetCourseLectureQuery(courseId);

  const createLectureHandler = async () => {
    await createLecture({ lectureTitle, courseId });
  };

  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success(data.message);
    }
    if (error) {
      toast.error(error.data.message);
    }
  }, [isSuccess, error]);

  console.log(lectureData);

  return (
    <div className="bg-slate-50 dark:bg-slate-900 mt-20">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header Section */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-8 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-200 dark:to-slate-400 bg-clip-text text-transparent">
                Let's add lectures, add some basic details for your new lecture
              </h1>
              <p className="text-slate-600 dark:text-slate-400 mt-2">
                Transform your knowledge into engaging learning experiences that inspire and educate your students.
              </p>
            </div>
          </div>

          {/* Form Section */}
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="lecture-title" className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <Video className="h-4 w-4" />
                Title
              </Label>
              <Input
                id="lecture-title"
                type="text"
                value={lectureTitle}
                onChange={(e) => setLectureTitle(e.target.value)}
                placeholder="Your Title Name"
                className="h-12 px-4 border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200 text-slate-800 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500 bg-white dark:bg-slate-800"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-4">
              <Button
                variant="outline"
                onClick={() => navigate(`/tutor/course/${courseId}`)}
                className="h-12 cursor-pointer px-6 border-2 border-slate-300 dark:border-slate-600 hover:border-slate-400 dark:hover:border-slate-500 rounded-xl font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-200 flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to course
              </Button>
              <Button
                disabled={isLoading}
                onClick={createLectureHandler}
                className="h-12 cursor-pointer px-8 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4" />
                    Create lecture
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Lectures List Section */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg">
              <Video className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">Course Lectures</h2>
          </div>

          <div className="space-y-1">
            {lectureLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600 dark:text-blue-400" />
                  <p className="text-slate-600 dark:text-slate-400 font-medium">Loading lectures...</p>
                </div>
              </div>
            ) : lectureError ? (
              <div className="text-center py-12">
                <div className="p-4 bg-red-50 dark:bg-red-900/50 rounded-xl border border-red-200 dark:border-red-800 inline-block">
                  <p className="text-red-600 dark:text-red-400 font-medium">Failed to load lectures.</p>
                  <p className="text-red-500 dark:text-red-300 text-sm mt-1">Please try refreshing the page</p>
                </div>
              </div>
            ) : lectureData?.lectures?.length === 0 ? (
              <div className="text-center py-16">
                <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 inline-block">
                  <Video className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-600 dark:text-slate-400 font-medium text-lg mb-2">No lectures available</p>
                  <p className="text-slate-500 dark:text-slate-400 text-sm">Create your first lecture to get started</p>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {lectureData.lectures.map((lecture, index) => (
                  <div key={lecture._id} className="transform hover:scale-[1.01] transition-all duration-200">
                    <Lecture
                      lecture={lecture}
                      courseId={courseId}
                      index={index}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateLecture;
