import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { useGetPurchasedCoursesQuery } from "@/app/api/courseApi";
import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { courses as demo } from "../student/MyLearning";
import { 
  DollarSign, 
  ShoppingCart, 
  TrendingUp, 
  BarChart3, 
  Users, 
  BookOpen,
  Target,
  Award
} from "lucide-react";

const Dashboard = () => {
  // const {data, isSuccess, isError, isLoading} = useGetPurchasedCoursesQuery();

  // if(isLoading) return <h1>Loading...</h1>
  // if(isError) return <h1 className="text-red-500">Failed to get purchased course</h1>
  const purchasedCourse = [...demo];

  const courseData = purchasedCourse.map((course) => ({
    name: course.title,
    price: course.price
  }));

  const totalRevenue = purchasedCourse.reduce((acc, element) => acc + (element.amount || 0), 0);
  const totalSales = purchasedCourse.length;
  const averagePrice = totalRevenue / totalSales || 0;
  const stats = [
    {
      title: "Total Sales",
      value: totalSales,
      icon: ShoppingCart,
      color: "blue",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
      valueColor: "text-blue-600",
      change: "+12.5%",
      changeType: "positive"
    },
    {
      title: "Total Revenue",
      value: `₹${totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: "green",
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
      valueColor: "text-green-600",
      change: "+8.2%",
      changeType: "positive"
    },
    {
      title: "Average Price",
      value: `₹${Math.round(averagePrice).toLocaleString()}`,
      icon: Target,
      color: "purple",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
      valueColor: "text-purple-600",
      change: "+3.1%",
      changeType: "positive"
    },
  ];

  return (
    <div className="mt-23 bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
              <p className="text-gray-600 flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                Monitor your course performance and sales metrics
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">Last Updated</p>
                <p className="text-sm font-semibold text-gray-900">
                  {new Date().toLocaleDateString()}
                </p>
              </div>
              <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full">
                <Award className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-8">
          {stats.map((stat, index) => (
            <Card 
              key={index}
              className="shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-0 overflow-hidden"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-full ${stat.bgColor}`}>
                    <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    stat.changeType === 'positive' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {stat.change}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    {stat.title}
                  </p>
                  <p className={`text-2xl font-bold ${stat.valueColor}`}>
                    {stat.value}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Chart Section */}
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-3 mb-8">
          {/* Main Chart */}
          <Card className="shadow-xl hover:shadow-2xl transition-shadow duration-300 border-0 lg:col-span-2">
            <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
              <CardTitle className="text-xl font-semibold text-gray-800 flex items-center gap-3">
                <TrendingUp className="w-6 h-6 text-blue-600" />
                Course Price Analysis
              </CardTitle>
              <p className="text-sm text-gray-600 mt-2">
                Visual representation of your course pricing strategy
              </p>
            </CardHeader>
            <CardContent className="p-6">
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={courseData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="name"
                    stroke="#6b7280"
                    angle={-45}
                    textAnchor="end"
                    interval={0}
                    height={80}
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="#6b7280" 
                    fontSize={12}
                    tickFormatter={(value) => `₹${value}`}
                  />
                  <Tooltip 
                    formatter={(value, name) => [`₹${value}`, 'Price']}
                    labelStyle={{ color: '#374151' }}
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke="url(#colorGradient)"
                    strokeWidth={3}
                    dot={{ fill: '#3b82f6', strokeWidth: 2, r: 6 }}
                    activeDot={{ r: 8, fill: '#1d4ed8' }}
                  />
                  <defs>
                    <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#6366f1" />
                    </linearGradient>
                  </defs>
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Side Stats */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 border-0">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                  Quick Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Highest Priced Course</span>
                  <span className="font-semibold text-green-600">
                    ₹{Math.max(...courseData.map(c => c.price)).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Lowest Priced Course</span>
                  <span className="font-semibold text-blue-600">
                    ₹{Math.min(...courseData.map(c => c.price)).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Courses</span>
                  <span className="font-semibold text-purple-600">
                    {courseData.length}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Performance Indicator */}
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 border-0 bg-gradient-to-br from-blue-50 to-indigo-100">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <Award className="w-5 h-5 text-blue-600" />
                  Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {totalSales > 10 ? '🚀' : totalSales > 5 ? '📈' : '🌱'}
                  </div>
                  <p className="text-sm font-medium text-gray-700">
                    {totalSales > 10 ? 'Excellent Performance!' : 
                     totalSales > 5 ? 'Good Progress!' : 'Getting Started!'}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    Keep up the great work!
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recent Activity */}
        <Card className="shadow-xl border-0">
          <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
            <CardTitle className="text-xl font-semibold text-gray-800 flex items-center gap-3">
              <BarChart3 className="w-6 h-6 text-blue-600" />
              Course Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {courseData.slice(0, 6).map((course, index) => (
                <div 
                  key={index}
                  className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 text-sm truncate">
                        {course.name}
                      </h4>
                      <p className="text-xs text-gray-600 mt-1">Course #{index + 1}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-blue-600">₹{course.price}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;