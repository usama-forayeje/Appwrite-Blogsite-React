import NotFound from "./pages/NotFound"
import Home from "./pages/Home"
import AuthLayout from "./layout/AuthLayout"
import RootLayout from "./layout/RootLayout"
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"
import VerifyEmail from "./pages/auth/VerifyEmail"
import { Route, Routes } from "react-router"
import CreatePost from "./pages/CreatePost"
import PostDetails from "./pages/PostDetails"
import Profile from "./pages/Profile"
import PublicLayout from "./layout/PublicLayout"
import PublicHome from "./pages/PublicHome"

function App() {
  return (

    <Routes>
      {/* ================================================== */}
      {/* =============== Public Routes ==================== */}
      {/* ================================================== */}
      <Route element={<PublicLayout />}>
        <Route path="/public" element={<PublicHome />} />
        <Route index element={<PublicHome />} />
      </Route>

      {/* ================================================== */}
      {/* =============== Auth Routes ====================== */}
      {/* ================================================== */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
      </Route>

      {/* ================================================== */}
      {/* =============== Private Routes =================== */}
      {/* ================================================== */}
      <Route element={<RootLayout />}>
        <Route path="/dashboard" element={<Home />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/posts/:slug" element={<PostDetails />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      {/* Catch-all route for 404 Not Found */}
      <Route path="*" element={<NotFound />} />
    </Routes>

  )
}

export default App
