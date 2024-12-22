import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Container from "../container/Container";
import LogOutBtn from "./LogOutBtn";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: "true",
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "SignUp",
      slug: "/signUp",
      active: !authStatus,
    },

    {
      name: "All Posts",
      slug: "/posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/createPost",
      active: authStatus,
    },
  ];

  return (
    <header className="bg-gray-800 text-white py-3 shadow">
      <Container>
        <nav className="flex items-center justify-between">
          <div className="mr-4 ">
            <ul className="flex items-center ml-auto">
              {navItems.map((item) =>
                item.active ? (
                  <li key={item.slug} className="mr-4">
                    <button onClick={() => navigate(item.slug)}>
                      {item.name}
                    </button>
                  </li>
                ) : null
              )}
              {authStatus && (
                <li>
                  <LogOutBtn />
                </li>
              )}
            </ul>
          </div>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
