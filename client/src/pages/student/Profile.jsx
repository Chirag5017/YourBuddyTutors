import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import Course from "./Course";
import { useLoadUserQuery, useUpdateUserMutation } from "@/app/api/authApi";
import toast from "react-hot-toast";

const Profile = () => {
  const [name, setName] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");

  const { data, isLoading, refetch } = useLoadUserQuery();
  const [
    updateUser,
    {
      data: updateUserData,
      isLoading: updateUserIsLoading,
      isError,
      error,
      isSuccess,
    },
  ] = useUpdateUserMutation();

//   console.log(data);

  const onChangeHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) setProfilePhoto(file);
  };

  const updateUserHandler = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("profilePhoto", profilePhoto);
    await updateUser(formData);
  };

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success(data.message || "Profile updated.");
    }
    if (isError) {
      toast.error(error.message || "Failed to update profile");
    }
  }, [error, updateUserData, isSuccess, isError]);

  if (isLoading) return <h1 className="text-center text-2xl font-bold text-gray-600 dark:text-gray-400 mt-20 animate-pulse">Profile Loading...</h1>;

  const user = data && data.user;

//   console.log(user);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 dark:from-gray-900 dark:via-slate-800 dark:to-slate-900">
      <div className="max-w-6xl mx-auto px-6 py-12  ">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="font-bold text-4xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
          </h1>
          <div className="w-24 h-1 "></div>
        </div>

        {/* Profile Card */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/20 p-8 mb-12 transform hover:scale-[1.02] transition-all duration-300">
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12">
            {/* Avatar Section */}
            <div className="flex flex-col items-center group">
              <div className="relative">
                <Avatar className="h-32 w-32 lg:h-40 lg:w-40 mb-6 ring-4 ring-white dark:ring-gray-700 shadow-2xl group-hover:ring-blue-500 transition-all duration-300">
                  <AvatarImage
                    src={user.photoUrl || "https://github.com/shadcn.png"}
                    alt="@shadcn"
                    className="object-cover"
                  />
                  <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
                    CN
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </div>
            </div>

            {/* User Info Section */}
            <div className="flex-1 space-y-6">
              <div className="grid gap-6">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-6 border border-blue-100 dark:border-blue-800/30">
                  <h2 className="font-bold text-lg text-blue-800 dark:text-blue-300 mb-4 flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    Personal Information
                  </h2>
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                      <span className="font-semibold text-gray-700 dark:text-gray-300 min-w-20">Name:</span>
                      <span className="text-gray-900 dark:text-gray-100 font-medium bg-white/60 dark:bg-gray-700/60 px-4 py-2 rounded-xl">
                        {user.name}
                      </span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                      <span className="font-semibold text-gray-700 dark:text-gray-300 min-w-20">Email:</span>
                      <span className="text-gray-900 dark:text-gray-100 font-medium bg-white/60 dark:bg-gray-700/60 px-4 py-2 rounded-xl">
                        {user.email}
                      </span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                      <span className="font-semibold text-gray-700 dark:text-gray-300 min-w-20">Role:</span>
                      <span className="inline-flex items-center px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-sm shadow-lg">
                        {user.role.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Edit Profile Button */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-8 py-3 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                      ✨ Edit Profile
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl border-0 shadow-2xl rounded-3xl">
                    <DialogHeader className="text-center pb-6">
                      <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        Edit Profile
                      </DialogTitle>
                      <DialogDescription className="text-gray-600 dark:text-gray-400 mt-2">
                        Make changes to your profile here. Click save when you're done.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-6 py-4">
                      <div className="space-y-3">
                        <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Name</Label>
                        <Input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Enter your name"
                          className="rounded-xl border-2 border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm"
                        />
                      </div>
                      <div className="space-y-3">
                        <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Profile Photo</Label>
                        <Input
                          onChange={onChangeHandler}
                          type="file"
                          accept="image/*"
                          className="rounded-xl border-2 border-gray-200 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm file:bg-blue-50 file:text-blue-700 file:border-0 file:rounded-lg file:px-4 file:py-2 file:mr-4 file:font-medium hover:file:bg-blue-100"
                        />
                      </div>
                    </div>
                    <DialogFooter className="pt-6">
                      <Button
                      //   disabled={updateUserIsLoading}
                        onClick={updateUserHandler}
                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                      >
                        {updateUserIsLoading ? (
                          <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" /> 
                            Saving Changes...
                          </>
                        ) : (
                          <>
                            💾 Save Changes
                          </>
                        )}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </div>

        {/* Courses Section */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/20 p-8">
          <div className="mb-8">
            <h2 className="font-bold text-2xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
              📚 My Learning Journey
            </h2>
            <p className="text-gray-600 dark:text-gray-400">Courses you're currently enrolled in</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {user.enrolledCourses.length === 0 ? (
              <div className="col-span-full text-center py-16">
                <div className="text-6xl mb-4">📖</div>
                <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
                  No courses yet!
                </h3>
                <p className="text-gray-500 dark:text-gray-500">
                  Start your learning journey by enrolling in a course
                </p>
              </div>
            ) : (
               user.enrolledCourses.map((course, index) => (
                <div key={index} className="transform hover:scale-105 transition-all duration-300">
                  <Course course={course} />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;