import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLogin } from '../../hooks/useAuth';
import { toast } from 'sonner';
import authService from '../../api/appwrite/auth';
import { loginSchema } from '../../schema/auth';
import { AtSign, Chrome, Eye, EyeOff, Loader2 } from 'lucide-react';

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { mutate: loginUser, isPending } = useLogin();

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = (values) => {
    loginUser(values, {
      onSuccess: () => {
        toast.success("Login Successful!");
        navigate("/");
      },
      onError: (error) => {
        toast.error("Login Failed", {
          description: error.message || "Invalid credentials. Please try again.",
        });
      },
    });
  };

  const handleGoogleLogin = () => {
    authService.loginWithGoogle();
  };

  return (
    <div className="w-full max-w-sm p-8 space-y-6 bg-card text-card-foreground rounded-xl border shadow-sm">


      <div className="text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Sign in</h1>
        <p className="text-sm text-muted-foreground mt-2">
          Choose your preferred sign in method
        </p>
      </div>


      <div className="grid grid-cols-1 gap-2 ">
        <Button variant="outline" className="cursor-pointer" onClick={handleGoogleLogin}>
          <Chrome className="mr-2 h-4 w-4" />
          Continue with Google
        </Button>
      </div>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>


      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="email@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Password</FormLabel>
                <div className="relative">
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute cursor-pointer right-3 top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground z-10">
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                  <FormControl>
                    <Input type={showPassword ? "text" : "password"} placeholder="Password" {...field} />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center justify-end">
            <Link to="/forgot-password" className="text-sm  cursor-pointer font-medium text-primary hover:underline">
              Forgot password?
            </Link>
          </div>

          <Button type="submit" className="w-full cursor-pointer" disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Continue with Email
          </Button>
        </form>
      </Form>

      <div className="text-center text-sm text-muted-foreground">
        Don't have an account?{" "}
        <Link to="/signup" className="text-primary cursor-pointer hover:underline font-medium">
          Sign up
        </Link>
      </div>
    </div>
  )
}

export default Login