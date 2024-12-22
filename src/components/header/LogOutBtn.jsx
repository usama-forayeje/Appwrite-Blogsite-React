
import { useDispatch } from 'react-redux';
import authService from '../../appwrite/auth';
import { logout } from '../../fetchers/authSlice';

function LogOutBtn() {
    const dispatch = useDispatch();
    const handleLogOut = () => {
        // Add the logout logic
        authService.logout().then(() => {
            dispatch(logout());
        }
        );
    }
  return (
    <button onClick={handleLogOut}>Log Out</button>
  )
}

export default LogOutBtn