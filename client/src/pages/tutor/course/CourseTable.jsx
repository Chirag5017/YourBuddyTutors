import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetCreatorCourseQuery } from "@/app/api/courseApi";
import { Edit, Plus, BookOpen, DollarSign } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const CourseTable = () => {
  const {data, isLoading} = useGetCreatorCourseQuery();
  const navigate = useNavigate();

  if(isLoading) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400"></div>
    </div>
  );
 
  return (
    <div className="mt-23 bg-slate-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">My Courses</h1>
              <p className="text-gray-600 dark:text-gray-300 flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Manage and track your course offerings
              </p>
            </div>
            <Button 
              onClick={() => navigate(`create`)}
              className="bg-gradient-to-r cursor-pointer from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 dark:from-blue-500 dark:to-indigo-500 dark:hover:from-blue-600 dark:hover:to-indigo-600 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create New Course
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">Total Courses</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{data?.courses?.length || 0}</p>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">Published</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {data?.courses?.filter(course => course.isPublished).length || 0}
                </p>
              </div>
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
                <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">Drafts</p>
                <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                  {data?.courses?.filter(course => !course.isPublished).length || 0}
                </p>
              </div>
              <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-full">
                <Edit className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 border-b border-gray-200 dark:border-gray-600">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Course Overview</h2>
          </div>
          
          <Table>
            <TableCaption className="py-6 text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700">
              A comprehensive list of your recent courses and their current status.
            </TableCaption>
            <TableHeader>
              <TableRow className="hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                <TableHead className="w-[120px] font-semibold text-gray-700 dark:text-gray-300 py-4 pl-4">
                    Price
                </TableHead>
                <TableHead className="font-semibold text-gray-700 dark:text-gray-300 py-4 ml-2 ">Status</TableHead>
                <TableHead className="font-semibold text-gray-700 dark:text-gray-300 py-4">Course Title</TableHead>
                <TableHead className="text-right font-semibold text-gray-700 dark:text-gray-300 py-4">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.courses?.map((course, index) => (
                <TableRow 
                  key={course._id} 
                  className="hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-200 border-b border-gray-100 dark:border-gray-600 group"
                >
                  <TableCell className="font-medium py-4 px-4">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-green-600 dark:text-green-400">
                        {course.coursePrice !== "FREE" ? `₹ ${course.coursePrice}` : "Free"}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="py-4">
                    <Badge 
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        course.isPublished 
                          ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 border-green-200 dark:border-green-700' 
                          : 'bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-300 border-orange-200 dark:border-orange-700'
                      }`}
                    >
                      {course.isPublished ? "Published" : "Draft"}
                    </Badge>
                  </TableCell>
                  <TableCell className="py-4">
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {course.courseTitle}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Course #{index + 1}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right py-4">
                    <Button 
                      size='sm' 
                      variant='ghost' 
                      onClick={() => navigate(`${course._id}`)}
                      className="hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-700 dark:hover:text-blue-400 text-gray-700 dark:text-gray-300 rounded-lg px-3 py-2 transition-all duration-200 group-hover:shadow-md cursor-pointer"
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Empty State */}
        {(!data?.courses || data.courses.length === 0) && (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 mt-8">
            <BookOpen className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No courses yet</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">Get started by creating your first course</p>
            <Button 
              onClick={() => navigate(`create`)}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 dark:from-blue-500 dark:to-indigo-500 dark:hover:from-blue-600 dark:hover:to-indigo-600 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create Your First Course
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseTable;