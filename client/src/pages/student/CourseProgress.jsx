import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  useCompleteCourseMutation,
  useGetCourseProgressQuery,
  useInCompleteCourseMutation,
  useUpdateLectureProgressMutation,
} from "@/app/api/courseProgress";
import { CheckCircle, CheckCircle2, CirclePlay, BookOpen, Clock, Trophy, Play } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

const CourseProgress = () => {
  const params = useParams();
  const courseId = params.courseId;
  const { data, isLoading, isError, refetch } =
    useGetCourseProgressQuery(courseId);

  const [updateLectureProgress] = useUpdateLectureProgressMutation();
  const [
    completeCourse,
    { data: markCompleteData, isSuccess: completedSuccess },
  ] = useCompleteCourseMutation();
  const [
    inCompleteCourse,
    { data: markInCompleteData, isSuccess: inCompletedSuccess },
  ] = useInCompleteCourseMutation();

  useEffect(() => {
    console.log(markCompleteData);

    if (completedSuccess) {
      refetch();
      toast.success(markCompleteData.message);
    }
    if (inCompletedSuccess) {
      refetch();
      toast.success(markInCompleteData.message);
    }
  }, [completedSuccess, inCompletedSuccess]);

  const [currentLecture, setCurrentLecture] = useState(null);

  if (isLoading) return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center transition-colors duration-300">
      <div className="text-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400 mx-auto"></div>
        <p className="text-xl font-semibold text-gray-800 dark:text-gray-200">Loading Course...</p>
      </div>
    </div>
  );

  if (isError) return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center transition-colors duration-300">
      <div className="text-center space-y-4">
        <div className="text-red-500 dark:text-red-400 text-6xl">⚠️</div>
        <p className="text-xl font-semibold text-gray-800 dark:text-gray-200">Failed to load course details</p>
      </div>
    </div>
  );

  console.log(data);

  const { courseDetails, progress, completed } = data.data;
  const { courseTitle } = courseDetails;

  // Calculate progress percentage
  const completedLectures = progress.filter(prog => prog.viewed).length;
  const totalLectures = courseDetails.lectures.length;
  const progressPercentage = (completedLectures / totalLectures) * 100;

  // initialze the first lecture is not exist
  const initialLecture =
    currentLecture || (courseDetails.lectures && courseDetails.lectures[0]);

  const isLectureCompleted = (lectureId) => {
    return progress.some((prog) => prog.lectureId === lectureId && prog.viewed);
  };

  const handleLectureProgress = async (lectureId) => {
    await updateLectureProgress({ courseId, lectureId });
    refetch();
  };
  // Handle select a specific lecture to watch
  const handleSelectLecture = (lecture) => {
    setCurrentLecture(lecture);
    handleLectureProgress(lecture._id);
  };

  const handleCompleteCourse = async () => {
    await completeCourse(courseId);
  };
  const handleInCompleteCourse = async () => {
    await inCompleteCourse(courseId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/30 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-950/50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto p-4 pt-8">
        {/* Header Section */}
        <div className=" mt-20 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-xl mb-8 p-6 md:p-8 transition-colors duration-300">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-4 flex-1">
              <div className="flex items-center gap-3">
                <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">
                  {courseTitle}
                </h1>
              </div>

              {/* Progress Stats */}
              <div className="flex flex-wrap items-center gap-6 text-sm md:text-base">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <BookOpen size={16} />
                  <span>{totalLectures} Lectures</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <Clock size={16} />
                  <span>{completedLectures} Completed</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <Trophy size={16} />
                  <span>{Math.round(progressPercentage)}% Progress</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full max-w-md">
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                  <span>Course Progress</span>
                  <span>{Math.round(progressPercentage)}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Completion Button */}
            <Button
              onClick={completed ? handleInCompleteCourse : handleCompleteCourse}
              variant={completed ? "outline" : "default"}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${completed
                  ? "border-green-500 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20"
                  : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105"
                }`}
            >
              {completed ? (
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  <span>Completed</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Trophy className="h-5 w-5" />
                  <span>Mark as completed</span>
                </div>
              )}
            </Button>
          </div>
        </div>

        <div className="flex flex-col xl:flex-row gap-8">
          {/* Video Section */}
          <div className="flex-1 xl:w-3/5">
            <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 shadow-2xl rounded-2xl overflow-hidden transition-colors duration-300">
              <CardContent className="p-0">
                {/* Video Player */}
                <div className="relative group">
                  <video
                    src={currentLecture?.videoUrl || initialLecture.videoUrl}
                    controls
                    className="w-full h-auto aspect-video bg-black rounded-t-2xl"
                    onPlay={() =>
                      handleLectureProgress(currentLecture?._id || initialLecture._id)
                    }
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-t-2xl"></div>
                </div>

                {/* Video Info */}
                <div className="p-6 space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-2 flex-1">
                      <h3 className="font-bold text-xl md:text-2xl text-gray-900 dark:text-gray-100 leading-tight">
                        {`Lecture ${courseDetails.lectures.findIndex(
                          (lec) =>
                            lec._id === (currentLecture?._id || initialLecture._id)
                        ) + 1
                          } : ${currentLecture?.lectureTitle || initialLecture.lectureTitle
                          }`}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <Play size={14} />
                        <span>Now Playing</span>
                      </div>
                    </div>

                    {isLectureCompleted(currentLecture?._id || initialLecture._id) && (
                      <Badge className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-700 flex items-center gap-1">
                        <CheckCircle2 size={14} />
                        Watched
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Lecture Sidebar */}
          <div className="xl:w-2/5">
            <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 shadow-2xl rounded-2xl h-fit max-h-[800px] flex flex-col transition-colors duration-300">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="font-bold text-xl md:text-2xl text-gray-900 dark:text-gray-100 flex items-center gap-3">
                  <BookOpen className="text-blue-600 dark:text-blue-400" size={24} />
                  Course Lectures
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  {completedLectures} of {totalLectures} lectures completed
                </p>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-3 custom-scrollbar">
                {courseDetails?.lectures.map((lecture, index) => (
                  <Card
                    key={lecture._id}
                    className={`cursor-pointer transition-all duration-300 border-2 hover:shadow-lg transform hover:scale-[1.02] ${lecture._id === (currentLecture?._id || initialLecture._id)
                        ? "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700 shadow-md"
                        : "bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                      }`}
                    onClick={() => handleSelectLecture(lecture)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-start gap-3 flex-1">
                          <div className="flex-shrink-0 mt-1">
                            {isLectureCompleted(lecture._id) ? (
                              <CheckCircle2 size={24} className="text-green-500 dark:text-green-400" />
                            ) : (
                              <CirclePlay size={24} className="text-gray-400 dark:text-gray-500" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded">
                                {index + 1}
                              </span>
                            </div>
                            <CardTitle className="text-base md:text-lg font-semibold text-gray-900 dark:text-gray-100 leading-tight">
                              {lecture.lectureTitle}
                            </CardTitle>
                          </div>
                        </div>

                        {isLectureCompleted(lecture._id) && (
                          <Badge
                            variant="outline"
                            className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-700 ml-2"
                          >
                            Completed
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseProgress;