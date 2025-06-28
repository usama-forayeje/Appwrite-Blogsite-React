import { Link, Navigate, Outlet, useLocation } from 'react-router';
import { useUser } from '../hooks/useAuth';
import { Loader2 } from 'lucide-react';

function AuthLayout() {
  const { data: user, isLoading } = useUser();
  const isAuthenticated = !!user;
  const location = useLocation();

  if (isAuthenticated && location.pathname !== '/verify-email') {
    return <Navigate to="/" replace />;
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-10 w-10 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">MyBlog</h1>
            <p className="text-balance text-muted-foreground">
              Enter your details to access your account
            </p>
          </div>

          <Outlet />

          <div className="mt-4 text-center text-sm">
            By continuing, you agree to our{" "}
            <Link to="/terms" className="underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to="/privacy" className="underline">
              Privacy Policy
            </Link>
            .
          </div>
        </div>
      </div>

      <div className="hidden bg-muted lg:block">
        <img
          src="https://images.unsplash.com/photo-1589998059171-988d887df646?q=80&w=2070&auto=format&fit=crop"
          alt="A beautiful open book representing blogging and writing"
          className="h-full w-full object-cover dark:brightness-[0.8]"
        />
      </div>
    </div>
  )
}

export default AuthLayout