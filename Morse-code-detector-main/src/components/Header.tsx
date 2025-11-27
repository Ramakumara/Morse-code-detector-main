import { SignOutButton } from "../SignOutButton";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export function Header() {
  const user = useQuery(api.auth.loggedInUser);

  return (
    <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Morse Code Detection System</h1>
            <p className="text-gray-400 text-sm">Real-time Eye Blink & Sound Analysis</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-sm text-gray-300">Welcome back</p>
            <p className="text-sm font-medium text-blue-400">{user?.email}</p>
          </div>
          <SignOutButton />
        </div>
      </div>
    </header>
  );
}
