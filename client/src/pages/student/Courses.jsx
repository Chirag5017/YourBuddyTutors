import { motion} from 'framer-motion';
import Course from './Course';
import { useGetPublishedCourseQuery } from '@/app/api/courseApi';
import { Skeleton } from '@/components/ui/skeleton';


const Courses = () => {
   const {data, isLoading, isError} = useGetPublishedCourseQuery();
   if(isError) return <h1 className="text-center text-red-600 dark:text-red-400 text-xl font-semibold mt-10">Some error occurred while fetching courses.</h1>

  return (
    <section id="courses" className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
            Popular Courses
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto px-4">
            Discover our most loved courses designed by industry experts to help you achieve your goals.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
           {isLoading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <CourseSkeleton key={index} />
            ))
          ) : (
           data?.courses && data.courses.map((course, index) => {
            return index < 3 && (
              <Course key={index} course={course}/>
            )
           }) 
          )}
        </div>
      </div>
    </section>
  );
};
export default Courses;

const CourseSkeleton = () => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-md hover:shadow-lg dark:shadow-gray-900/50 transition-shadow rounded-lg overflow-hidden border border-gray-100 dark:border-gray-700">
      <Skeleton className="w-full h-36 bg-gray-200 dark:bg-gray-700" />
      <div className="px-5 py-4 space-y-3">
        <Skeleton className="h-6 w-3/4 bg-gray-200 dark:bg-gray-700" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="h-6 w-6 rounded-full bg-gray-200 dark:bg-gray-700" />
            <Skeleton className="h-4 w-20 bg-gray-200 dark:bg-gray-700" />
          </div>
          <Skeleton className="h-4 w-16 bg-gray-200 dark:bg-gray-700" />
        </div>
        <Skeleton className="h-4 w-1/4 bg-gray-200 dark:bg-gray-700" />
      </div>
    </div>
  );
};