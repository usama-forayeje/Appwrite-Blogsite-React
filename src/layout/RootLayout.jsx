
import { Navigate, Outlet } from 'react-router'
import { useUser } from '../hooks/useAuth';
import { Footer, Header, RootLoading } from '../components';

function RootLayout() {
    const { data: user, isLoading } = useUser();

    if (!isLoading && !user) {
        return <Navigate to="/login" replace />;
    }

    if (isLoading) {
        return (
            <RootLoading />
        );
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow container mx-auto py-8 px-4">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default RootLayout