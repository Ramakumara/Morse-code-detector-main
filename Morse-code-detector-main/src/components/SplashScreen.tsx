import { useEffect, useState } from "react";

export function SplashScreen() {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setFadeIn(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center">
      <div className={`text-center transition-all duration-1000 ${fadeIn ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto mb-6 bg-blue-500 rounded-full flex items-center justify-center animate-pulse">
            <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
        </div>
        
        <h1 className="text-5xl font-bold text-white mb-4 animate-fade-in">
          Morse Code Detection
        </h1>
        
        <h2 className="text-2xl text-blue-300 mb-8 animate-fade-in-delay">
          Eye Blinks & Sound Analysis
        </h2>
        
        <div className="flex justify-center space-x-2 mb-8">
          <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
        
        <p className="text-gray-300 text-lg">
          Real-time detection and decoding system
        </p>
      </div>
    </div>
  );
}
