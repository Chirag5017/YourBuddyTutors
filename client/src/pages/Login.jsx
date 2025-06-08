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
    <div className="flex items-center w-full justify-center mt-20">
    <div className="flex w-full max-w-sm flex-col gap-6">
      <Tabs defaultValue="login">
        <TabsList>
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">SignUp</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>
                Login your password here. After signup you will be logged
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-current">Email</Label>
                <Input 
                type="email" 
                placeholder="john@example.com"
                 onChange={(e) => changeHandler(e,"login")}
                 name="email"
                value={login.email}
                 />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-new">Password</Label>
                <Input 
                type="password" 
                placeholder="John@doe"
                onChange={(e) => changeHandler(e,"login")}
                name="password"
                value={login.password}
                 />
              </div>
            </CardContent>
            <CardFooter>
              <Button
              className="bg-blue-500 cursor-pointer hover:bg-blue-600 w-84"
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
          <Card>
            <CardHeader>
              <CardTitle>SignUp</CardTitle>
              <CardDescription>
                Create a new account and click signup when you are done.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-name">Name</Label>
                <Input 
                type="text" 
                placeholder="John Doe"
                onChange={(e) => changeHandler(e,"signup")}
                name="name"
                value={signup.name}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-username">Email</Label>
                <Input 
                type="email" 
                placeholder="john@example.com"
                onChange={(e) => changeHandler(e,"signup")}
                 name="email"
                value={signup.email}
                 />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-username">Password</Label>
                <Input 
                type="password" 
                placeholder="John@doe"
                onChange={(e) => changeHandler(e,"signup")}
                name="password"
                value={signup.password}
                 />
              </div>
            </CardContent>
            <CardFooter>
              <Button 
              className="bg-blue-500 cursor-pointer hover:bg-blue-600 w-84" 
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
