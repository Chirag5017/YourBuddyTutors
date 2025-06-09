import { ChartNoAxesColumn, SquareLibrary } from "lucide-react";
import React from "react";
import { Link, Outlet } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="flex min-h-screen bg-slate-50 ">
      <div className="hidden lg:block w-64 border-r border-gray-300 dark:border-gray-700 sticky top-0 h-screen overflow-y-auto">
        <div className="p-6">
          <nav className="space-y-2 mt-30 ">
            <Link 
              to="dashboard" 
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <ChartNoAxesColumn size={20} />
              <span className="font-medium">Dashboard</span>
            </Link>
            <Link 
              to="course" 
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <SquareLibrary size={20} />
              <span className="font-medium">Courses</span>
            </Link>
          </nav>
        </div>
      </div>
      
      <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Sidebar;