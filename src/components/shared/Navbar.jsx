import { useLogout, useUser } from '../../hooks/useAuth';
import { Link, useNavigate } from 'react-router';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import authService from '../../api/appwrite/auth';
import { Home, LogOut, PlusCircle, User } from 'lucide-react';

function Navbar() {
  const { data: user } = useUser();
  const { mutate: logout } = useLogout();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(() => {
      navigate('/login');
    });
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-white shadow-md w-full">
      {/* App Logo */}
      <Link to="/" className="text-xl font-bold">
        MyBlog
      </Link>

      {/* Nav Links and User Profile */}
      <div className="flex items-center gap-4">
        <Link to="/">
          <Button variant="ghost" size="icon">
            <Home className="h-5 w-5" />
          </Button>
        </Link>
        <Link to="/create-post">
          <Button variant="ghost" size="icon">
            <PlusCircle className="h-5 w-5" />
          </Button>
        </Link>

        {/* User Dropdown Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Avatar className="h-10 w-10">
                <AvatarImage src={authService.getUserAvatar(user?.name)} alt={user?.name} />
                <AvatarFallback>{user?.name.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user?.name}</p>
                <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate('/profile')}>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-red-500">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  )
}

export default Navbar