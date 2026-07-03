import { GraduationCap, Settings, LogOut, User, Moon, Sun, MessagesSquare } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useThemeStore } from "../store/useThemeStore";
import { Link } from 'react-router-dom';

function NavBar() {
  const { logout, authUser } = useAuthStore();
  const { theme, toggleTheme } = useThemeStore();
  const isDark = theme === "srmdark";

  return (
    <header className="glass border-b border-base-300/60 fixed w-full top-0 z-40">
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <Link to={authUser ? "/chat" : "/"} className='flex items-center gap-2.5 hover:opacity-80 transition-all'>
            <div className="size-9 rounded-xl bg-primary flex items-center justify-center shadow-soft">
              <GraduationCap className="size-5 text-primary-content" />
            </div>
            <h1 className="text-lg font-bold tracking-tight">SRMentor</h1>
          </Link>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={toggleTheme}
              className="btn btn-sm btn-ghost btn-circle"
              aria-label="Toggle theme"
              title={isDark ? "Switch to light" : "Switch to dark"}
            >
              {isDark ? <Sun className="size-5" /> : <Moon className="size-5" />}
            </button>

            {authUser && (
              <Link to={'/chat'} className="btn btn-sm btn-ghost gap-2 rounded-full">
                <MessagesSquare className='size-4' />
                <span className="hidden sm:inline">Chats</span>
              </Link>
            )}

            <Link to={'/settings'} className="btn btn-sm btn-ghost gap-2 rounded-full">
              <Settings className='size-4' />
              <span className="hidden sm:inline">Settings</span>
            </Link>

            {authUser && (
              <>
                <Link to={'/profile'} className="btn btn-sm btn-ghost gap-2 rounded-full">
                  <User className='size-4' />
                  <span className='hidden sm:inline'>Profile</span>
                </Link>

                <button className='btn btn-sm btn-ghost gap-2 rounded-full' onClick={logout}>
                  <LogOut className='size-4' />
                  <span className='hidden sm:inline'>Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
