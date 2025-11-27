import { useEffect, useRef, useState } from "react";

interface EyeTrackerProps {
  onSignalDetected: (signalType: "dot" | "dash" | "space", inputType: "blink", duration: number, confidence: number) => void;
  calibration: any;
  isActive: boolean;
}

export function EyeTracker({ onSignalDetected, calibration, isActive }: EyeTrackerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [blinkCount, setBlinkCount] = useState(0);
  const [lastBlinkTime, setLastBlinkTime] = useState(0);
  const [eyeStatus, setEyeStatus] = useState<"open" | "closed" | "detecting">("open");

  useEffect(() => {
    if (!isActive) return;

    const initializeCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { width: 640, height: 480 } 
        });
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setIsInitialized(true);
        }
      } catch (error) {
        console.error("Failed to access camera:", error);
      }
    };

    initializeCamera();

    return () => {
      if (videoRef.current?.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, [isActive]);

  useEffect(() => {
    if (!isInitialized || !isActive) return;

    const detectBlinks = () => {
      // Simulated blink detection - in a real implementation, this would use
      // computer vision libraries like MediaPipe or TensorFlow.js
      const now = Date.now();
      const timeSinceLastBlink = now - lastBlinkTime;
      
      // Simulate random blink detection for demo purposes
      if (Math.random() < 0.02 && timeSinceLastBlink > 500) {
        const duration = Math.random() * 400 + 100; // 100-500ms
        const isLongBlink = duration > (calibration?.dotDurationMs || 200) * 2;
        const signalType = isLongBlink ? "dash" : "dot";
        const confidence = Math.random() * 0.3 + 0.7; // 0.7-1.0
        
        setEyeStatus("closed");
        setBlinkCount(prev => prev + 1);
        setLastBlinkTime(now);
        
        onSignalDetected(signalType, "blink", duration, confidence);
        
        setTimeout(() => setEyeStatus("open"), duration);
      }
      
      // Detect letter spaces (longer pauses)
      if (timeSinceLastBlink > (calibration?.letterSpaceMs || 600) && lastBlinkTime > 0) {
        onSignalDetected("space", "blink", timeSinceLastBlink, 0.9);
        setLastBlinkTime(0);
      }
    };

    const interval = setInterval(detectBlinks, 50);
    return () => clearInterval(interval);
  }, [isInitialized, isActive, calibration, lastBlinkTime, onSignalDetected]);

  if (!isActive) {
    return (
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h4 className="text-lg font-semibold text-white mb-4">👁️ Eye Tracker</h4>
        <div className="text-center py-8 text-gray-400">
          Eye tracking is not active
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-semibold text-white">👁️ Eye Tracker</h4>
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${isInitialized ? 'bg-green-400' : 'bg-red-400'}`}></div>
          <span className="text-sm text-gray-400">
            {isInitialized ? 'Active' : 'Initializing...'}
          </span>
        </div>
      </div>

      <div className="relative">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="w-full h-48 bg-gray-900 rounded object-cover"
        />
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
        />
        
        {/* Eye status overlay */}
        <div className="absolute top-2 left-2 bg-black/50 rounded px-2 py-1 text-white text-sm">
          Eye: {eyeStatus}
        </div>
        
        {/* Blink indicator */}
        <div className="absolute top-2 right-2 bg-black/50 rounded px-2 py-1 text-white text-sm">
          Blinks: {blinkCount}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
        <div className="text-center">
          <div className="text-lg font-bold text-blue-400">{calibration?.eyeBlinkThreshold || 0.7}</div>
          <div className="text-gray-400">Threshold</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-green-400">{blinkCount}</div>
          <div className="text-gray-400">Total Blinks</div>
        </div>
      </div>
    </div>
  );
}
