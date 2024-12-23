import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PropTypes from 'prop-types';
import { useNavigate } from "react-router";

function AuthLayout({ children, Authenticated = true }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // লোডিং স্টেট চালু
  const authStatus = useSelector((state) => state.auth.status); // Redux থেকে অ্যাক্সেস করুন

  useEffect(() => {
    // চেক করুন ব্যবহারকারীর অ্যাক্সেস স্ট্যাটাস এবং নেভিগেট করুন
    if (authStatus !== Authenticated) {
      navigate(Authenticated ? "/login" : "/");
    }
    setLoading(false); // নেভিগেশন চেকের পরে লোডিং শেষ করুন
  }, [authStatus, Authenticated, navigate]);

  // লোডিং চলাকালে "Loading..." বার্তা
  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  // সফল চেকের পরে চিলড্রেন রেন্ডার
  return <div className="min-h-screen">{children}</div>;
}
AuthLayout.propTypes = {
  children: PropTypes.node.isRequired,
  Authenticated: PropTypes.bool
};

export default AuthLayout;
