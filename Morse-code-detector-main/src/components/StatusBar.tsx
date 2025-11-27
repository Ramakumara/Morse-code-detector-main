import { DetectionMode } from "./MorseCodeApp";

interface StatusBarProps {
  isDetecting: boolean;
  sessionId: string | null;
  detectionMode: DetectionMode;
}

export function StatusBar({ isDetecting, sessionId, detectionMode }: StatusBarProps) {
  return (
    <footer className="bg-gray-800 border-t border-gray-700 px-6 py-3">
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${isDetecting ? 'bg-green-400 animate-pulse' : 'bg-gray-500'}`}></div>
            <span className="text-gray-300">
              Status: {isDetecting ? 'Detecting' : 'Idle'}
            </span>
          </div>
          
          {sessionId && (
            <div className="text-gray-400">
              Session: {sessionId.slice(-8)}
            </div>
          )}
          
          {isDetecting && (
            <div className="text-gray-400">
              Mode: {detectionMode.charAt(0).toUpperCase() + detectionMode.slice(1)}
            </div>
          )}
        </div>
        
        <div className="text-gray-400">
          Morse Code Detection System v1.0
        </div>
      </div>
    </footer>
  );
}
