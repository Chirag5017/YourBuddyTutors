import { motion} from 'framer-motion';
import Course from './Course';

const Courses = () => {
  const courses = [
    {
      title: "Web Development Masterclass",
      description: "Learn modern web development with React, Node.js, and MongoDB",
      students: "2,500+",
      rating: 4.9,
      price: "$49",
      image: "https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      title: "Data Science Fundamentals",
      description: "Master Python, machine learning, and data visualization techniques",
      students: "1,800+",
      rating: 4.8,
      price: "$59",
      image: "https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
      title: "Digital Marketing Pro",
      description: "Complete guide to SEO, social media, and content marketing",
      students: "3,200+",
      rating: 4.7,
      price: "$39",
      image: "https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    }
  ];

  return (
    <section id="courses" className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Popular Courses
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Discover our most loved courses designed by industry experts to help you achieve your goals.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {courses.map((course, index) => (
            <Course key={index} course={course}/>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Courses;