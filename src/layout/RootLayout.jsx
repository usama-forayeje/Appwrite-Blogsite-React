import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router'
import { useUser } from '../hooks/useAuth';
import { Footer, Navbar, RootLoading } from '../components';

function RootLayout() {
    const { data: user, isLoading } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoading && !user) {
            navigate('/login');
        }
    }, [user, isLoading, navigate])

    if (isLoading) {
        return (
            <RootLoading />
        );
    }

    return (
        user && (
            <div className="flex flex-col min-h-screen">
                <header>
                    <Navbar />
                </header>

                <main className="flex-grow container mx-auto py-8 px-4">
                    <Outlet />
                </main>

                <Footer />
            </div>
        )
    );
}

export default RootLayout