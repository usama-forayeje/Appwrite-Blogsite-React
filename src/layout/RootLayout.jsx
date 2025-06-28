import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router'
import { useUser } from '../hooks/useAuth';
import { Navbar } from '../components';

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
            <div className="flex items-center justify-center min-h-screen">
                <p>Loading...</p>
            </div>
        );
    }

    return (
        user && (
            <div className="w-full md:flex">
                <Navbar />
                <section className="flex flex-1 h-full">
                    <Outlet />
                </section>
            </div>
        )
    )
}

export default RootLayout