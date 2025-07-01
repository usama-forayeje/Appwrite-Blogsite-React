import { useState } from "react"
import { Link, useNavigate } from "react-router"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "framer-motion"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../components/ui/form"
import { useLogin } from "../../hooks/useAuth"
import authService from "../../api/appwrite/auth"
import { toast } from "sonner"
import { loginSchema } from "../../schema/auth"
import { Eye, EyeOff, Loader2, Chrome, Mail } from "lucide-react"

function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  const { mutate: loginUser, isPending } = useLogin()

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  })

  const onSubmit = (values) => {
    loginUser(values, {
      onSuccess: () => {
        toast.success("Welcome back!", {
          description: "You have successfully signed in.",
        })
        navigate("/dashboard")
      },
      onError: (error) => {
        toast.error("Sign in failed", {
          description: error.message || "Please check your credentials and try again.",
        })
      },
    })
  }

  const handleGoogleLogin = () => {
    // authService.loginWithGoogle()
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="text-center">
        <h2 className="text-2xl font-bold">Welcome back</h2>
        <p className="text-muted-foreground mt-2">Sign in to your account to continue</p>
      </div>

      {/* Social Login */}
      <Button variant="outline" className="w-full h-12 bg-transparent" onClick={handleGoogleLogin}>
        <Chrome className="mr-2 h-5 w-5" />
        Continue with Google
      </Button>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-2 text-muted-foreground">Or continue with email</span>
        </div>
      </div>

      {/* Email/Password Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input type="email" placeholder="Enter your email" className="pl-9 h-12" {...field} />
                  </div>
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
                <div className="flex items-center justify-between">
                  <FormLabel>Password</FormLabel>
                  <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="pr-9 h-12"
                      {...field}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full h-12" disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isPending ? "Signing in..." : "Sign in"}
          </Button>
        </form>
      </Form>

      <div className="text-center text-sm text-muted-foreground">
        Don't have an account?{" "}
        <Link to="/signup" className="text-primary hover:underline font-medium">
          Sign up
        </Link>
      </div>
    </motion.div>
  )
}

export default Login
