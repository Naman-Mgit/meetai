"use client"
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod"
import { OctagonAlertIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import {FaGoogle,FaGithub} from "react-icons/fa"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { Card, CardContent } from '@/components/ui/card';
import { Alert,AlertTitle } from "@/components/ui/alert";
import {Form,
       FormControl,
       FormField,
       FormItem,
       FormLabel,
       FormMessage,
}  from "@/components/ui/form"
import { useForm } from "react-hook-form";
import Link from "next/link";

import { useState } from "react";


const formSchema = z.object({
     email : z.string().email(),
     password : z.string().min(1,{message:"Password is Required"})
});
const SignInView = () => {
  const router=useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending,setPending]=useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
       resolver: zodResolver(formSchema),
       defaultValues:{
           email:"",
           password:""
       }
  });
  const onSubmit=(data : z.infer<typeof formSchema>)=>{
     setError(null)
     setPending(true);
     authClient.signIn.email(
       {
         email:data.email,
         password:data.password,
         callbackURL: "/",
       },
       {
          onSuccess: () => {
            setPending(false);
            router.push("/");
          },
          onError: ({error})=>{
             setPending(false);
             setError(error.message);
          }
       }
     )
  }
  return (
    <div className='flex flex-col gap-6'>
      <Card className='overflow-hidden p-0'>
         <CardContent className='grid p-0 md:grid-cols-2'>
              <Form {...form}>
               <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
                   <div className="flex flex-col gap-6">
                      <div className="flex flex-col  items-center text-center">
                            <h1 className="text-2xl font-bold">
                                Welcome back
                            </h1>
                            <p className="text-muted-foreground text-balance">
                                 Login to Your Account
                            </p>
                      </div>
                      <div className="grid gap-3">
                          <FormField
                             control={form.control}
                             name="email"
                             render={({field})=>(
                                <FormItem>
                                    <FormLabel>
                                        Email
                                    </FormLabel>
                                    <FormControl>
                                       <Input type="email"
                                        placeholder="m@example.com" 
                                        {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                             )}
                          />
                      </div>
                      <div className="grid gap-3">
                          <FormField
                             control={form.control}
                             name="password"
                             render={({field})=>(
                                <FormItem>
                                    <FormLabel>
                                        Password
                                    </FormLabel>
                                    <FormControl>
                                       <Input type="password"
                                        placeholder="********" 
                                        {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                             )}
                          />
                      </div>
                      {!!error && (
                          <Alert className="bg-destructive/10 border-none">
                              <OctagonAlertIcon className="h-4 w-4 !text-destructive"/>
                              <AlertTitle>{error}</AlertTitle>   
                          </Alert>
                      )}
                      <Button type="submit" disabled={pending} className="w-full cursor-pointer">
                        Sign In
                      </Button>
                      <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                           <span className="bg-card text-muted-foreground  relative z-10 px-2">
                              Other options
                           </span>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                          <Button
                            variant="outline"
                            type="button"
                            className="w-full cursor-pointer"
                            onClick={()=>{authClient.signIn.social({
                               provider:"google",
                               callbackURL: "/",
                            })}}
                          >
                             <FaGoogle/>
                          </Button>
                          <Button
                            variant="outline"
                            type="button"
                            className="w-full cursor-pointer"
                            onClick={()=>{authClient.signIn.social({
                               provider:"github",
                               callbackURL: "/",
                            })}}
                          >
                            <FaGithub/>
                          </Button>
                      </div>
                      <div className="text-center  text-sm">
                           Don&apos;t have an account?{" "} 
                           <Link href="/signup" className="underline underline-offset-4">Sign-Up</Link>
                      </div>
                        
                   </div>
               </form>
                    
              </Form>
               <div className='bg-radial from-green-700 to-green-900 relative  hidden md:flex flex-col gap-y-4 items-centre justify-center'>
                    <img src="/logo.svg" alt="Image" className='h-[92px] w-[92px] ml-36 ' />

                    <p className='text-2xl font-semibold text-white text-center'>
                       Join.AI
                    </p>
                  
               </div>

         </CardContent>

         
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
          By Clicking continue , you agree to our {" "} <a href="#">Terms of Services</a> and {" "}
          <a href="#">Privacy Policy</a>
      </div>

    </div>

  )
}

export default SignInView