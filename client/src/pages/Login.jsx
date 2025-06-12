import { AppWindowIcon, CodeIcon, Loader2} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { useEffect, useState } from "react"
import { useLoginUserMutation, useRegisterUserMutation } from "@/app/api/authApi"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

export default function Login() {
    const [login, setLogin] = useState({
        email:"",password:""
    })
    const [signup, setSignup] = useState({
        email:"",password:"",name:""
    })

    const [
      registerUser,
      {
        data: registerData,
        error: registerError,
        isLoading: registerIsLoading,
        isSuccess: registerIsSuccess,
      }
     ] = useRegisterUserMutation()

    const [
      loginUser,
      {
        data: loginData,
        error: loginError,
        isLoading: loginIsLoading,
        isSuccess: loginIsSuccess ,
      }
    ] = useLoginUserMutation();  
    const navigate = useNavigate();

    useEffect(() => {
      if(registerIsSuccess && registerData) {
        toast.success(registerData.message || "Signup successful.");
      }
      if(registerError){
      toast.error(registerError.data.message || "Signup Failed");
      }
      if(loginIsSuccess && loginData){
      toast.success(loginData.message || "Login successful.");
      navigate('/');
      }
      if(loginError){ 
      toast.error(loginError.data.message || "login Failed");
      }
    }, [loginIsLoading, registerIsLoading, loginData, registerData, loginError, registerError  ])

    function changeHandler(e,type) {
        const {name,value} = e.target;

        if(type == "signup") {
             setSignup((prev) => {
            return {
                ...prev,
                [name]:value
            }
        })
        }

        else {
            setLogin((prev) => {
                 return {
                ...prev,
                [name]:value
            }
            })
        }

    }

    async function clickHandler(type) {
       const inputData = type === "signup" ? signup : login;
       const action = type === "signup" ? registerUser : loginUser;
       await action(inputData);
        
        
    }

  return (
    <div className="flex items-center w-full justify-center min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-950 p-4 transition-all duration-300">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300/20 dark:bg-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300/20 dark:bg-blue-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      <div className="flex w-full max-w-md flex-col gap-6 relative z-10">
        <Tabs defaultValue="login">
          <TabsList className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-lg w-50 rounded-xl p-1">
            <TabsTrigger 
              value="login" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-600 data-[state=active]:text-white cursor-pointer rounded-lg transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200"
            >
              Login
            </TabsTrigger>
            <TabsTrigger 
              value="signup" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-600 data-[state=active]:text-white cursor-pointer rounded-lg transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200"
            >
              SignUp
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 shadow-2xl rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-3xl">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 dark:from-purple-500/10 dark:to-blue-500/10"></div>
              <CardHeader className="relative pb-6">
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
                  Welcome Back
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400 text-sm">
                  Sign in to your account to continue your journey
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6 relative">
                <div className="grid gap-3">
                  <Label htmlFor="login-email" className="text-gray-700 dark:text-gray-300 font-medium">
                    Email Address
                  </Label>
                  <Input 
                    id="login-email"
                    type="email" 
                    placeholder="john@example.com"
                    onChange={(e) => changeHandler(e,"login")}
                    name="email"
                    value={login.email}
                    className="bg-white/80 dark:bg-gray-700/80 border-gray-200 dark:border-gray-600 focus:border-purple-400 dark:focus:border-purple-500 focus:ring-purple-400/20 dark:focus:ring-purple-500/20 rounded-lg transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 text-gray-900 dark:text-gray-100"
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="login-password" className="text-gray-700 dark:text-gray-300 font-medium">
                    Password
                  </Label>
                  <Input 
                    id="login-password"
                    type="password" 
                    placeholder="••••••••"
                    onChange={(e) => changeHandler(e,"login")}
                    name="password"
                    value={login.password}
                    className="bg-white/80 dark:bg-gray-700/80 border-gray-200 dark:border-gray-600 focus:border-purple-400 dark:focus:border-purple-500 focus:ring-purple-400/20 dark:focus:ring-purple-500/20 rounded-lg transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 text-gray-900 dark:text-gray-100"
                  />
                </div>
              </CardContent>
              <CardFooter className="relative pt-6">
                <Button
                  className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white cursor-pointer w-full shadow-lg hover:shadow-xl transition-all duration-300 rounded-lg font-medium py-6 transform hover:scale-[1.02] active:scale-[0.98]"
                  onClick={() => clickHandler("login")}
                  disabled={loginIsLoading}
                >
                  {loginIsLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                      Signing in...
                    </>
                  ) : (
                    <>
                      <AppWindowIcon className="mr-2 h-4 w-4" />
                      Sign In
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="signup">
            <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 shadow-2xl rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-3xl">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 dark:from-purple-500/10 dark:to-blue-500/10"></div>
              <CardHeader className="relative pb-6">
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
                  Create Account
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400 text-sm">
                  Join us today and start your amazing journey
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6 relative">
                <div className="grid gap-3">
                  <Label htmlFor="signup-name" className="text-gray-700 dark:text-gray-300 font-medium">
                    Full Name
                  </Label>
                  <Input 
                    id="signup-name"
                    type="text" 
                    placeholder="John Doe"
                    onChange={(e) => changeHandler(e,"signup")}
                    name="name"
                    value={signup.name}
                    className="bg-white/80 dark:bg-gray-700/80 border-gray-200 dark:border-gray-600 focus:border-purple-400 dark:focus:border-purple-500 focus:ring-purple-400/20 dark:focus:ring-purple-500/20 rounded-lg transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 text-gray-900 dark:text-gray-100"
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="signup-email" className="text-gray-700 dark:text-gray-300 font-medium">
                    Email Address
                  </Label>
                  <Input 
                    id="signup-email"
                    type="email" 
                    placeholder="john@example.com"
                    onChange={(e) => changeHandler(e,"signup")}
                    name="email"
                    value={signup.email}
                    className="bg-white/80 dark:bg-gray-700/80 border-gray-200 dark:border-gray-600 focus:border-purple-400 dark:focus:border-purple-500 focus:ring-purple-400/20 dark:focus:ring-purple-500/20 rounded-lg transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 text-gray-900 dark:text-gray-100"
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="signup-password" className="text-gray-700 dark:text-gray-300 font-medium">
                    Password
                  </Label>
                  <Input 
                    id="signup-password"
                    type="password" 
                    placeholder="••••••••"
                    onChange={(e) => changeHandler(e,"signup")}
                    name="password"
                    value={signup.password}
                    className="bg-white/80 dark:bg-gray-700/80 border-gray-200 dark:border-gray-600 focus:border-purple-400 dark:focus:border-purple-500 focus:ring-purple-400/20 dark:focus:ring-purple-500/20 rounded-lg transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 text-gray-900 dark:text-gray-100"
                  />
                </div>
              </CardContent>
              <CardFooter className="relative pt-6">
                <Button 
                  className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white cursor-pointer w-full shadow-lg hover:shadow-xl transition-all duration-300 rounded-lg font-medium py-6 transform hover:scale-[1.02] active:scale-[0.98]"
                  onClick={() => clickHandler("signup")}
                  disabled={registerIsLoading}
                >
                  {registerIsLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                      Creating account...
                    </>
                  ) : (
                    <>
                      <CodeIcon className="mr-2 h-4 w-4" />
                      Create Account
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}