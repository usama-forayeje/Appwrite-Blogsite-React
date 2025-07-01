import { Navigate, Outlet } from "react-router"
import { useUser } from "../hooks/useAuth"
import { useState } from "react"
import { motion } from "framer-motion"
import Header from "../components/navigation/Header"
import Sidebar from "../components/navigation/Sidebar"
import Footer from "../components/shared/Footer"
import RootLoading from "../components/shared/RootLoading"

function RootLayout() {
  const { data: user, isLoading } = useUser()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  if (!isLoading && !user) {
    return <Navigate to="/login" replace />
  }

  if (isLoading) {
    return <RootLoading />
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-background"
    >
      <Header onMenuClick={() => setSidebarOpen(true)} />
      <div className="flex">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1 lg:ml-64 transition-all duration-300">
          <div className="min-h-[calc(100vh-4rem)]">
            <Outlet />
          </div>
        </main>
      </div>
      <Footer />
    </motion.div>
  )
}

export default RootLayout
