import { Authenticated, Unauthenticated } from "convex/react";
import { SignInForm } from "./SignInForm";
import { SignOutButton } from "./SignOutButton";
import { Toaster } from "sonner";
import { MorseCodeApp } from "./components/MorseCodeApp";
import { SplashScreen } from "./components/SplashScreen";
import { useState, useEffect } from "react";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Authenticated>
        <MorseCodeApp />
      </Authenticated>
      
      <Unauthenticated>
        <div className="min-h-screen flex flex-col bg-gray-900">
          <header className="sticky top-0 z-10 bg-gray-800/80 backdrop-blur-sm h-16 flex justify-between items-center border-b border-gray-700 shadow-sm px-4">
            <h2 className="text-xl font-semibold text-blue-400">Morse Code Detection System</h2>
          </header>
          <main className="flex-1 flex items-center justify-center p-8">
            <div className="w-full max-w-md mx-auto">
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-blue-400 mb-4">
                  Eye Blink & Sound Detection
                </h1>
                <p className="text-xl text-gray-300">
                  Sign in to start detecting Morse code
                </p>
              </div>
              <SignInForm />
            </div>
          </main>
        </div>
      </Unauthenticated>
      
      <Toaster theme="dark" />
    </div>
  );
}
