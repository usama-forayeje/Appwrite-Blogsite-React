import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Link, useNavigate } from 'react-router';
import { useLogout, useSendVerificationEmail, useUser } from '../../hooks/useAuth';
import { toast } from 'sonner';
import authService from '../../api/appwrite/auth';
import { Bell, Command,  LogOut, MailWarning, PlusCircle, Search, User } from 'lucide-react';
import MobileNav from './MobileNav';

function Header() {
  const { data: user } = useUser();
  const { mutate: logout } = useLogout();
  const { mutate: resendEmail, isPending: isSendingEmail } = useSendVerificationEmail();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(null, {
      onSuccess: () => {
        toast.success("Logged out successfully!", { description: "See you soon!" });
        navigate('/login', { replace: true });
      }
    });
    
  };

  const handleResendEmail = () => {
    resendEmail(null, {
      onSuccess: () => {
        toast.success("Verification email sent!", { description: "Please check your inbox." });
      }
    });
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {user && !user.emailVerification && (
        <Alert variant="default" className="rounded-none border-x-0 border-t-0 bg-yellow-50 border-yellow-200 text-yellow-800">
          <MailWarning className="h-4 w-4 !text-yellow-800" />
          <AlertDescription className="flex items-center justify-center gap-4 w-full">
            Your email is not verified. Please check your inbox.
            <Button variant="link" className="h-auto p-0 text-yellow-900 font-semibold underline" onClick={handleResendEmail} disabled={isSendingEmail}>
              {isSendingEmail ? "Sending..." : "Resend Email"}
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Main Navigation */}
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center space-x-2">
            <span className="font-bold">MyBlog</span>
          </Link>
          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:gap-6">
            <Link to="/" className="text-sm font-medium transition-colors hover:text-primary">Home</Link>
            <Link to="/create-post" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">Create Post</Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {/* Search/Command Bar Placeholder */}
          <div className="hidden md:block">
            <Button variant="outline" className="relative h-9 w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64">
              <Search className="h-4 w-4 mr-2" />
              <span>Search...</span>
              <kbd className="pointer-events-none absolute right-1.5 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] sm:flex">
                <Command className="h-3 w-3" />K
              </kbd>
            </Button>
          </div>

          {/* Conditional Rendering: User Logged In vs Logged Out */}
          {user ? (
            // User is logged in: Show bell and profile dropdown
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={authService.getUserAvatar(user.name)} alt={user.name} />
                      <AvatarFallback>{user.name?.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => navigate('/profile')}><User className="mr-2 h-4 w-4" /><span>Profile</span></DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-500 focus:text-red-600"><LogOut className="mr-2 h-4 w-4" /><span>Log out</span></DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            // User is logged out: Show Login button
            <Link to="/login">
              <Button>Login</Button>
            </Link>
          )}

          {/* Mobile Navigation Trigger */}
          <MobileNav />
        </div>
      </div>
    </header>
  )
}

export default Header