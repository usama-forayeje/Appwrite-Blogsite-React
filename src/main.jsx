import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./pages/Home.jsx"; // Adjust the path as necessary
import AuthLayout from "./components/AuthLayout.jsx";
import SignIn from "./pages/SignIn.jsx"; // Adjust the path as necessary
import AllPosts from "./pages/AllPosts.jsx"; // Adjust the path as necessary
import AddPost from "./pages/AddPost.jsx"; // Adjust the path as necessary
import EditPost from "./pages/EditPost.jsx"; // Adjust the path as necessary
import Post from "./pages/Post.jsx"; // Adjust the path as necessary
import LogInPage from "./pages/LogInPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "logIn",
        element: (
          <AuthLayout Authenticated={false}>
            <LogInPage />
          </AuthLayout>
        ),
      },
      {
        path: "/signup",
        element: (
          <AuthLayout Authenticated={false}>
            <SignIn />
          </AuthLayout>
        ),
      },
      {
        path: "/allPosts",
        element: (
          <AuthLayout Authenticated>
            {" "}
            <AllPosts />
          </AuthLayout>
        ),
      },
      {
        path: "/add-post",
        element: (
            <AuthLayout Authenticated>
                {" "}
                <AddPost />
            </AuthLayout>
        ),
    },
    {
      path: "/edit-post/:slug",
      element: (
          <AuthLayout authentication>
              {" "}
              <EditPost />
          </AuthLayout>
      ),
  },
  {
      path: "/post/:slug",
      element: <Post />,
  },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
