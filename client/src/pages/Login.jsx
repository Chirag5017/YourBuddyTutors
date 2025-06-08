import { AppWindowIcon, CodeIcon, Loader2 } from "lucide-react"

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
    <div className="flex items-center w-full justify-center min-h-screen bg-slate-50 p-4">
    <div className="flex w-full max-w-md flex-col gap-6">
      <Tabs defaultValue="login">
        <TabsList className="bg-white/70 backdrop-blur-sm border shadow-lg w-50">
          <TabsTrigger value="login" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-400  data-[state=active]:to-blue-500 data-[state=active]:text-white cursor-pointer">Login</TabsTrigger>
          <TabsTrigger value="signup" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-400  data-[state=active]:to-blue-500 data-[state=active]:text-white cursor-pointer">SignUp</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Card className="bg-white/80 backdrop-blur-lg border border-white/20 shadow-xl">
            <CardHeader>
              <CardTitle className="text-gray-800">Login</CardTitle>
              <CardDescription className="text-gray-600">
                Login your password here. After signup you will be logged
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-current" className="text-gray-700">Email</Label>
                <Input 
                type="email" 
                placeholder="john@example.com"
                 onChange={(e) => changeHandler(e,"login")}
                 name="email"
                value={login.email}
                className="bg-white/70 border-gray-200 focus:border-purple-400 focus:ring-purple-400"
                 />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-new" className="text-gray-700">Password</Label>
                <Input 
                type="password" 
                placeholder="John@doe"
                onChange={(e) => changeHandler(e,"login")}
                name="password"
                value={login.password}
                className="bg-white/70 border-gray-200 focus:border-purple-400 focus:ring-purple-400"
                 />
              </div>
            </CardContent>
            <CardFooter>
              <Button
              className="bg-gradient-to-r from-purple-400 to-blue-500 text-white cursor-pointer w-full shadow-lg hover:bg-blue-600 transition-all duration-200"
              onClick={() => clickHandler("login")}
               disabled={loginIsLoading}
              >
                {loginIsLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please
                    wait
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
         <TabsContent value="signup">
          <Card className="bg-white/80 backdrop-blur-lg border border-white/20 shadow-xl">
            <CardHeader>
              <CardTitle className="text-gray-800">SignUp</CardTitle>
              <CardDescription className="text-gray-600">
                Create a new account and click signup when you are done.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-name" className="text-gray-700">Name</Label>
                <Input 
                type="text" 
                placeholder="John Doe"
                onChange={(e) => changeHandler(e,"signup")}
                name="name"
                value={signup.name}
                className="bg-white/70 border-gray-200 focus:border-purple-400 focus:ring-purple-400"
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-username" className="text-gray-700">Email</Label>
                <Input 
                type="email" 
                placeholder="john@example.com"
                onChange={(e) => changeHandler(e,"signup")}
                 name="email"
                value={signup.email}
                className="bg-white/70 border-gray-200 focus:border-purple-400 focus:ring-purple-400"
                 />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-username" className="text-gray-700">Password</Label>
                <Input 
                type="password" 
                placeholder="John@doe"
                onChange={(e) => changeHandler(e,"signup")}
                name="password"
                value={signup.password}
                className="bg-white/70 border-gray-200 focus:border-purple-400 focus:ring-purple-400"
                 />
              </div>
            </CardContent>
            <CardFooter>
              <Button 
              className="bg-gradient-to-r from-purple-500 to-blue-500  hover:bg-blue-600 text-white cursor-pointer w-full shadow-lg hover:shadow-xl transition-all duration-200" 
              onClick={() => clickHandler("signup")}
              disabled={registerIsLoading}
              >
                {registerIsLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please
                    wait
                  </>
                ) : (
                  "Signup"
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