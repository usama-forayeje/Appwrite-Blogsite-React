import { Navigate, Outlet } from 'react-router';
import { useUser } from '../hooks/useAuth';

function AuthLayout() {
  const { data: user, isLoading } = useUser();
  const isAuthenticated = !!user;

  if (!isLoading && isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <section className="flex flex-1 justify-center items-center flex-col py-10">
      <Outlet />
    </section>
  )
}

export default AuthLayout