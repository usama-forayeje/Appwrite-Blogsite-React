import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { AtSign, Chrome, Eye, EyeOff, Loader2, User } from 'lucide-react';

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useSignup } from '../../hooks/useAuth';
import authService from '../../api/appwrite/auth';
import { signupSchema } from '../../schema/auth';

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { mutate: signupUser, isPending } = useSignup();

  const form = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: { name: "", email: "", password: "" },
  });

  const onSubmit = (values) => {
    signupUser(values, {
      onSuccess: () => {
        toast.success("Account created successfully!", {
          description: "Please check your email to verify your account.",
        });
        navigate("/login"); // সঠিকভাবে navigate ফাংশন কল করা হচ্ছে
      },
      onError: (error) => {
        toast.error("Signup Failed", {
          description: error.message || "Something went wrong. Please try again.",
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
        <h1 className="text-2xl font-semibold tracking-tight">Create an Account</h1>
        <p className="text-sm text-muted-foreground mt-2">
          Join MyBlog today to share your story
        </p>
      </div>


      <div className="grid grid-cols-1 gap-2  ">
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
            Or continue with email
          </span>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Name</FormLabel>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <FormControl>
                    <Input placeholder="Your Name" className="pl-9" {...field} />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Email</FormLabel>
                <div className="relative">
                  <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <FormControl>
                    <Input type="email" placeholder="email@example.com" className="pl-9" {...field} />
                  </FormControl>
                </div>
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
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground z-10">
                    {showPassword ? <EyeOff className="h-4 w-4 cursor-pointer" /> : <Eye className="h-4 w-4 cursor-pointer" />}
                  </button>
                  <FormControl>
                    <Input type={showPassword ? "text" : "password"} placeholder="Password (min. 8 characters)" className="pr-9" {...field} />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full cursor-pointer" disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isPending ? "Creating Account..." : "Create Account"}
          </Button>
        </form>
      </Form>

      <div className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link to="/login" className="text-primary cursor-pointer hover:underline font-medium">
          Sign in
        </Link>
      </div>
    </div>
  );
}