import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./fetchers/authSlice";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { Outlet } from "react-router";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((user) => {
        if (user) {
          dispatch(login(user));
        } else {
          dispatch(logout());
        }
      })
      .catch((error) => {
        console.error("Error loading user data:", error);
        alert("Failed to load user data. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-white border-opacity-50 mb-4"></div>
          <h1 className="text-2xl font-semibold">Loading...</h1>
          <p className="text-sm opacity-80 mt-2">
            Please wait while we load your data.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-gray-50 to-gray-200 text-gray-800">
      <div className="container mx-auto flex flex-col min-h-screen">
        {/* Header Section */}
        <Header />

        {/* Main Content */}
        <main className="flex-grow py-6 px-4 md:px-8">
          <div className="bg-white shadow-md rounded-lg p-6">
            <Outlet />
          </div>
        </main>

        {/* Footer Section */}
        <Footer />
      </div>
    </div>
  );
}

export default App;
