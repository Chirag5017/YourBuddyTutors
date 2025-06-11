// import RichTextEditor from "@/components/RichTextEditor";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

import { 
    useEditCourseMutation,
    useGetCourseByIdQuery,
    usePublishCourseMutation,
 } from "@/app/api/courseApi";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

const CourseTab = () => {
  
  const [input, setInput] = useState({
    courseTitle: "",
    subTitle: "",
    description: "",
    category: "",
    courseLevel: "",
    coursePrice: "",
    courseThumbnail: "",
  });

  const params = useParams();
  const courseId = params.courseId;
  const { data: courseByIdData, isLoading: courseByIdLoading , refetch} =
    useGetCourseByIdQuery(courseId);

    const [publishCourse, {}] = usePublishCourseMutation();
 
  useEffect(() => {
    if (courseByIdData?.course) { 
        const course = courseByIdData?.course;
      setInput({
        courseTitle: course.courseTitle,
        subTitle: course.subTitle,
        description: course.description,
        category: course.category,
        courseLevel: course.courseLevel,
        coursePrice: course.coursePrice,
        courseThumbnail: "",
      });
    }
  }, [courseByIdData]);

  const [previewThumbnail, setPreviewThumbnail] = useState("");
  const navigate = useNavigate();

  const [editCourse, { data, isLoading, isSuccess, error }] =
    useEditCourseMutation();

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const selectCategory = (value) => {
    setInput({ ...input, category: value });
  };
  const selectCourseLevel = (value) => {
    setInput({ ...input, courseLevel: value });
  };
  // get file
  const selectThumbnail = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput({ ...input, courseThumbnail: file });
      const fileReader = new FileReader();
      fileReader.onloadend = () => setPreviewThumbnail(fileReader.result);
      fileReader.readAsDataURL(file);
    }
  };

  const updateCourseHandler = async () => {
    const formData = new FormData();
    formData.append("courseTitle", input.courseTitle);
    formData.append("subTitle", input.subTitle);
    formData.append("category", input.category);
    formData.append("courseLevel", input.courseLevel);
    formData.append("coursePrice", input.coursePrice);
    formData.append("courseThumbnail", input.courseThumbnail);

    await editCourse({ formData, courseId });
  };

  const publishStatusHandler = async (action) => {
    try {
      const response = await publishCourse({courseId, query:action});
      if(response.data){
        refetch();
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to publish or unpublish course");
    }
  }

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message || "Course update.");
    }
    if (error) {
      toast.error(error.data.message || "Failed to update course");
    }
  }, [isSuccess, error]);

  if(courseByIdLoading) return (
    <div className="flex items-center justify-center h-96 bg-background dark:bg-background">
      <div className="flex items-center space-x-2">
        <Loader2 className="h-6 w-6 animate-spin text-primary dark:text-primary" />
        <span className="text-lg font-medium text-foreground dark:text-foreground">
          Loading course data...
        </span>
      </div>
    </div>
  );
 
  return (
    <Card className="w-full bg-card dark:bg-card border-border dark:border-border">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-4">
        <div className="space-y-1">
          <CardTitle className="text-2xl font-bold text-card-foreground dark:text-card-foreground">
            Basic Course Information
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground dark:text-muted-foreground">
            Make changes to your courses here. Click save when you're done.
          </CardDescription>
        </div>
        <div className="flex space-x-2">
          <Button 
            disabled={courseByIdData?.course.lectures.length === 0} 
            variant="outline" 
            onClick={() => publishStatusHandler(courseByIdData?.course.isPublished ? "false" : "true")}
            className="whitespace-nowrap cursor-pointer hover:bg-accent dark:hover:bg-accent hover:text-accent-foreground dark:hover:text-accent-foreground border-border dark:border-border"
          >
            {courseByIdData?.course.isPublished ? "Unpublish" : "Publish"}
          </Button>
          <Button 
            variant="destructive" 
            className="whitespace-nowrap cursor-pointer hover:bg-destructive/90 dark:hover:bg-destructive/90"
          >
            Remove Course
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-6">
          {/* Title Field */}
          <div className="space-y-2">
            <Label htmlFor="courseTitle" className="text-sm font-medium text-foreground dark:text-foreground">
              Course Title
            </Label>
            <Input
              id="courseTitle"
              type="text"
              name="courseTitle"
              value={input.courseTitle}
              onChange={changeEventHandler}
              placeholder="Ex. Fullstack developer"
              className="w-full bg-background dark:bg-background border-border dark:border-border text-foreground dark:text-foreground placeholder:text-muted-foreground dark:placeholder:text-muted-foreground focus:ring-ring dark:focus:ring-ring"
            />
          </div>

          {/* Subtitle Field */}
          <div className="space-y-2">
            <Label htmlFor="subTitle" className="text-sm font-medium text-foreground dark:text-foreground">
              Subtitle
            </Label>
            <Input
              id="subTitle"
              type="text"
              name="subTitle"
              value={input.subTitle}
              onChange={changeEventHandler}
              placeholder="Ex. Become a Fullstack developer from zero to hero in 2 months"
              className="w-full bg-background dark:bg-background border-border dark:border-border text-foreground dark:text-foreground placeholder:text-muted-foreground dark:placeholder:text-muted-foreground focus:ring-ring dark:focus:ring-ring"
            />
          </div>

          {/* Category, Level, and Price Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground dark:text-foreground">
                Category
              </Label>
              <Select
                value={input.category}
                onValueChange={selectCategory}
              >
                <SelectTrigger className="w-full bg-background dark:bg-background border-border dark:border-border text-foreground dark:text-foreground hover:bg-accent dark:hover:bg-accent">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent className="bg-popover dark:bg-popover border-border dark:border-border">
                  <SelectGroup>
                    <SelectLabel className="text-muted-foreground dark:text-muted-foreground">
                      Category
                    </SelectLabel>
                    <SelectItem value="Next JS" className="text-foreground dark:text-foreground hover:bg-accent dark:hover:bg-accent">
                      Next JS
                    </SelectItem>
                    <SelectItem value="Data Science" className="text-foreground dark:text-foreground hover:bg-accent dark:hover:bg-accent">
                      Data Science
                    </SelectItem>
                    <SelectItem value="Frontend Development" className="text-foreground dark:text-foreground hover:bg-accent dark:hover:bg-accent">
                      Frontend Development
                    </SelectItem>
                    <SelectItem value="Fullstack Development" className="text-foreground dark:text-foreground hover:bg-accent dark:hover:bg-accent">
                      Fullstack Development
                    </SelectItem>
                    <SelectItem value="MERN Stack Development" className="text-foreground dark:text-foreground hover:bg-accent dark:hover:bg-accent">
                      MERN Stack Development
                    </SelectItem>
                    <SelectItem value="Javascript" className="text-foreground dark:text-foreground hover:bg-accent dark:hover:bg-accent">
                      Javascript
                    </SelectItem>
                    <SelectItem value="Python" className="text-foreground dark:text-foreground hover:bg-accent dark:hover:bg-accent">
                      Python
                    </SelectItem>
                    <SelectItem value="Docker" className="text-foreground dark:text-foreground hover:bg-accent dark:hover:bg-accent">
                      Docker
                    </SelectItem>
                    <SelectItem value="MongoDB" className="text-foreground dark:text-foreground hover:bg-accent dark:hover:bg-accent">
                      MongoDB
                    </SelectItem>
                    <SelectItem value="HTML" className="text-foreground dark:text-foreground hover:bg-accent dark:hover:bg-accent">
                      HTML
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground dark:text-foreground">
                Course Level
              </Label>
              <Select
                value={input.courseLevel}
                onValueChange={selectCourseLevel}
              >
                <SelectTrigger className="w-full bg-background dark:bg-background border-border dark:border-border text-foreground dark:text-foreground hover:bg-accent dark:hover:bg-accent">
                  <SelectValue placeholder="Select a course level" />
                </SelectTrigger>
                <SelectContent className="bg-popover dark:bg-popover border-border dark:border-border">
                  <SelectGroup>
                    <SelectLabel className="text-muted-foreground dark:text-muted-foreground">
                      Course Level
                    </SelectLabel>
                    <SelectItem value="Beginner" className="text-foreground dark:text-foreground hover:bg-accent dark:hover:bg-accent">
                      Beginner
                    </SelectItem>
                    <SelectItem value="Medium" className="text-foreground dark:text-foreground hover:bg-accent dark:hover:bg-accent">
                      Medium
                    </SelectItem>
                    <SelectItem value="Advance" className="text-foreground dark:text-foreground hover:bg-accent dark:hover:bg-accent">
                      Advance
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="coursePrice" className="text-sm font-medium text-foreground dark:text-foreground">
                Price (INR)
              </Label>
              <Input
                id="coursePrice"
                type="text"
                name="coursePrice"
                value={input.coursePrice}
                onChange={changeEventHandler}
                placeholder="199"
                className="w-full bg-background dark:bg-background border-border dark:border-border text-foreground dark:text-foreground placeholder:text-muted-foreground dark:placeholder:text-muted-foreground focus:ring-ring dark:focus:ring-ring"
                min="0"
              />
            </div>
          </div>

          {/* Thumbnail Upload */}
          <div className="space-y-3">
            <Label htmlFor="courseThumbnail" className="text-sm font-medium text-foreground dark:text-foreground">
              Course Thumbnail
            </Label>
            <Input
              id="courseThumbnail"
              type="file"
              onChange={selectThumbnail}
              accept="image/*"
              className="w-fit cursor-pointer file:cursor-pointer h-12 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 dark:file:bg-blue-950 file:text-blue-700 dark:file:text-blue-300 hover:file:bg-blue-100 dark:hover:file:bg-blue-900 bg-background dark:bg-background text-foreground dark:text-foreground"
            />
            {previewThumbnail && (
              <div className="mt-4">
                <img
                  src={previewThumbnail}
                  className="h-64 w-auto rounded-lg border border-border dark:border-border object-cover shadow-sm dark:shadow-slate-800"
                  alt="Course Thumbnail Preview"
                />
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button 
              onClick={() => navigate("/tutor/course")} 
              variant="outline"
              className="flex-1 sm:flex-none cursor-pointer hover:bg-accent dark:hover:bg-accent hover:text-accent-foreground dark:hover:text-accent-foreground border-border dark:border-border"
            >
              Cancel
            </Button>
            <Button 
              disabled={isLoading} 
              onClick={updateCourseHandler}
              className="flex-1 sm:flex-none cursor-pointer bg-primary dark:bg-primary text-primary-foreground dark:text-primary-foreground hover:bg-primary/90 dark:hover:bg-primary/90"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseTab;