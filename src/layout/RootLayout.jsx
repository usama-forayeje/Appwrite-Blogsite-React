import { Navigate, Outlet } from "react-router";
import { useUser } from "../hooks/useAuth";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Header from "../components/navigation/Header";
import Sidebar from "../components/navigation/Sidebar";
import RootLoading from "../components/shared/RootLoading";
import ErrorBoundary from "../components/shared/ErrorBoundary";

function RootLayout() {
  const { data: user, isLoading } = useUser();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!isLoading && !user) {
    return <Navigate to="/login" replace />;
  }

  if (isLoading) {
    return <RootLoading />;
  }

  return (
    <ErrorBoundary>
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="min-h-screen bg-background flex flex-col font-sans"
        >
          {/* Header */}
          <Header onMenuClick={() => setSidebarOpen(true)} />
          {/* Main content area and Sidebar container */}
          <div className="flex flex-1">
            <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            {/* Main content area */}
            {/* The lg:ml-64 ensures content shifts to the right when sidebar is open */}
            <main className="flex-1 lg:ml-64 transition-all duration-300 overflow-auto">
              <div>
                <Outlet />
              </div>
            </main>
          </div>
        </motion.div>
      </AnimatePresence>
    </ErrorBoundary>
  );
}

export default RootLayout;