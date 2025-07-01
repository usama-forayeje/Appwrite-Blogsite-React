import { Outlet } from "react-router"
import { motion } from "framer-motion"
import PublicHeader from "../components/navigation/PublicHeader"
import Footer from "../components/shared/Footer"

function PublicLayout() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20"
        >
            <PublicHeader />
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />
        </motion.div>
    )
}

export default PublicLayout