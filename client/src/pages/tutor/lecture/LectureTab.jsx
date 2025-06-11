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
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { useEditLectureMutation, useGetLectureByIdQuery, useRemoveLectureMutation } from "@/app/api/courseApi";
import axios from "axios";
import { Loader2, Edit, Type, Video, Gift, Upload, Save, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

const MEDIA_API = `${import.meta.env.VITE_BACKEND_URL}/media`;

const LectureTab = () => {
  const [lectureTitle, setLectureTitle] = useState("");
  const [uploadVideInfo, setUploadVideoInfo] = useState(null);
  const [isFree, setIsFree] = useState(false);
  const [mediaProgress, setMediaProgress] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [btnDisable, setBtnDisable] = useState(true);
  const params = useParams();
  const { courseId, lectureId } = params;
  const navigate = useNavigate();

  const { data: lectureData } = useGetLectureByIdQuery(lectureId);
  const lecture = lectureData?.lecture;

  useEffect(() => {
    if (lecture) {
      setLectureTitle(lecture.lectureTitle);
      setIsFree(lecture.isPreviewFree);
      setUploadVideoInfo(lecture.videoInfo);
    }
  }, [lecture]);

  const [editLecture, { data, isLoading, error, isSuccess }] =
    useEditLectureMutation();
  const [removeLecture, { data: removeData, isLoading: removeLoading, isSuccess: removeSuccess }] = useRemoveLectureMutation();

  const fileChangeHandler = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      setMediaProgress(true);
      try {
        const res = await axios.post(`${MEDIA_API}/upload-video`, formData, {
          onUploadProgress: ({ loaded, total }) => {
            setUploadProgress(Math.round((loaded * 100) / total));
          },
        });

        if (res.data.success) {
          console.log(res);
          setUploadVideoInfo({
            videoUrl: res.data.data.url,
            publicId: res.data.data.public_id,
          });
          setBtnDisable(false);
          toast.success(res.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error("Video upload failed");
      } finally {
        setMediaProgress(false);
      }
    }
  };

  const editLectureHandler = async () => {
    console.log({ lectureTitle, uploadVideInfo, isFree, courseId, lectureId });

    await editLecture({
      lectureTitle,
      videoInfo: uploadVideInfo,
      isPreviewFree: isFree,
      courseId,
      lectureId,
    });
  };

  const removeLectureHandler = async () => {
    await removeLecture(lectureId);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message);
      navigate(`/tutor/course`);
    }
    if (error) {
      toast.error(error.data.message);
    }
  }, [isSuccess, error]);

  useEffect(() => {
    if (removeSuccess) {
      toast.success(removeData.message);
      navigate(`/tutor/course/${courseId}/lecture`);
    }
  }, [removeSuccess]);

  return (
    <div className="bg-slate-50 dark:bg-slate-900 p-5">
      <div className="max-w-4xl mx-auto">
        <Card className="bg-white dark:bg-slate-800 shadow-2xl border-0 rounded-2xl overflow-hidden">
          <CardHeader className="flex justify-between bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-700 dark:to-slate-800 border-b border-slate-200 dark:border-slate-700 p-8">
            <div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-200 dark:to-slate-400 bg-clip-text text-transparent flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg">
                  <Edit className="h-5 w-5 text-white" />
                </div>
                Edit Lecture
              </CardTitle>
              <CardDescription className="text-slate-600 dark:text-slate-400 mt-2 text-base">
                Make changes and click save when done.
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button
                disabled={removeLoading}
                variant="destructive"
                onClick={removeLectureHandler}
                className="h-11 px-6 cursor-pointer bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2"
              >
                {removeLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </>
                ) : (
                  <>
                    <Trash2 className="h-4 w-4" />
                    Remove Lecture
                  </>
                )}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-8 space-y-8">
            <div className="space-y-3">
              <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <Type className="h-4 w-4 text-slate-700 dark:text-slate-300" />
                Title
              </Label>
              <Input
                value={lectureTitle}
                onChange={(e) => setLectureTitle(e.target.value)}
                type="text"
                placeholder="Ex. Introduction to Javascript"
                className="h-12 px-4 border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200 text-slate-800 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500 bg-white dark:bg-slate-800"
              />
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <Video className="h-4 w-4 text-slate-700 dark:text-slate-300" />
                Video <span className="text-red-500 dark:text-red-400 ml-1">*</span>
              </Label>
              <div className="relative">
                <Input
                  type="file"
                  accept="video/*"
                  onChange={fileChangeHandler}
                  placeholder="Ex. Introduction to Javascript"
                  className="w-fit cursor-pointer file:cursor-pointer file:p-5 h-12 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl hover:border-blue-400 transition-all duration-200 file:py-2 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-slate-700 dark:file:text-blue-300"
                />
              </div>
            </div>

            <div className="flex items-center space-x-3 p-4 bg-emerald-50 dark:bg-slate-700 rounded-xl border border-emerald-200 dark:border-slate-600">
              <Switch checked={isFree} onCheckedChange={setIsFree} id="airplane-mode" className="data-[state=checked]:bg-emerald-500" />
              <Label htmlFor="airplane-mode" className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <Gift className="h-4 w-4 text-slate-700 dark:text-slate-300" />
                Is this video FREE
              </Label>
            </div>

            {mediaProgress && (
              <div className="p-6 bg-blue-50 dark:bg-slate-700 rounded-xl border border-blue-200 dark:border-slate-600">
                <div className="flex items-center gap-3 mb-3">
                  <Upload className="h-5 w-5 text-blue-600 dark:text-blue-300" />
                  <span className="font-semibold text-blue-800 dark:text-blue-200">Uploading Video...</span>
                </div>
                <Progress value={uploadProgress} className="h-3 bg-blue-100 dark:bg-slate-600" indicatorClassName="bg-blue-600 dark:bg-blue-400" />
                <p className="text-sm text-blue-700 dark:text-blue-200 mt-2 font-medium">{uploadProgress}% uploaded</p>
              </div>
            )}

            <div className="pt-6 border-t border-slate-200 dark:border-slate-700">
              <Button
                disabled={isLoading || btnDisable}
                onClick={editLectureHandler}
                className="h-12 px-8 cursor-pointer bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2 disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Update Lecture
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LectureTab;
