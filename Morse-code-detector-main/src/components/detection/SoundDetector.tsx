import { useEffect, useRef, useState } from "react";

interface SoundDetectorProps {
  onSignalDetected: (signalType: "dot" | "dash" | "space", inputType: "sound", duration: number, confidence: number) => void;
  calibration: any;
  isActive: boolean;
}

export function SoundDetector({ onSignalDetected, calibration, isActive }: SoundDetectorProps) {
  const [isInitialized, setIsInitialized] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const [signalCount, setSignalCount] = useState(0);
  const [isDetecting, setIsDetecting] = useState(false);
  const [waveformData, setWaveformData] = useState<number[]>(new Array(50).fill(0));
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const lastSignalTimeRef = useRef(0);
  const signalStartTimeRef = useRef(0);

  useEffect(() => {
    if (!isActive) return;

    const initializeAudio = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        
        audioContextRef.current = new AudioContext();
        const source = audioContextRef.current.createMediaStreamSource(stream);
        analyserRef.current = audioContextRef.current.createAnalyser();
        
        analyserRef.current.fftSize = 256;
        const bufferLength = analyserRef.current.frequencyBinCount;
        dataArrayRef.current = new Uint8Array(bufferLength);
        
        source.connect(analyserRef.current);
        setIsInitialized(true);
      } catch (error) {
        console.error("Failed to access microphone:", error);
      }
    };

    initializeAudio();

    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [isActive]);

  useEffect(() => {
    if (!isInitialized || !analyserRef.current || !dataArrayRef.current) return;

    const detectAudio = () => {
      if (!analyserRef.current || !dataArrayRef.current) return;

      analyserRef.current.getByteFrequencyData(dataArrayRef.current);
      
      // Calculate average audio level
      const average = dataArrayRef.current.reduce((sum, value) => sum + value, 0) / dataArrayRef.current.length;
      const normalizedLevel = average / 255;
      setAudioLevel(normalizedLevel);

      // Update waveform data
      setWaveformData(prev => [...prev.slice(1), normalizedLevel]);

      const threshold = calibration?.soundThreshold || 0.5;
      const now = Date.now();
      
      if (normalizedLevel > threshold && !isDetecting) {
        // Signal start
        setIsDetecting(true);
        signalStartTimeRef.current = now;
      } else if (normalizedLevel <= threshold && isDetecting) {
        // Signal end
        setIsDetecting(false);
        const duration = now - signalStartTimeRef.current;
        
        if (duration > 50) { // Minimum signal duration
          const isLongSignal = duration > (calibration?.dotDurationMs || 200) * 2;
          const signalType = isLongSignal ? "dash" : "dot";
          const confidence = Math.min(normalizedLevel / threshold, 1.0);
          
          setSignalCount(prev => prev + 1);
          lastSignalTimeRef.current = now;
          
          onSignalDetected(signalType, "sound", duration, confidence);
        }
      }
      
      // Detect letter spaces (silence periods)
      const timeSinceLastSignal = now - lastSignalTimeRef.current;
      if (timeSinceLastSignal > (calibration?.letterSpaceMs || 600) && 
          lastSignalTimeRef.current > 0 && 
          normalizedLevel <= threshold) {
        onSignalDetected("space", "sound", timeSinceLastSignal, 0.9);
        lastSignalTimeRef.current = 0;
      }
    };

    const interval = setInterval(detectAudio, 50);
    return () => clearInterval(interval);
  }, [isInitialized, isDetecting, calibration, onSignalDetected]);

  if (!isActive) {
    return (
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h4 className="text-lg font-semibold text-white mb-4">🔊 Sound Detector</h4>
        <div className="text-center py-8 text-gray-400">
          Sound detection is not active
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-semibold text-white">🔊 Sound Detector</h4>
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${isInitialized ? 'bg-green-400' : 'bg-red-400'}`}></div>
          <span className="text-sm text-gray-400">
            {isInitialized ? 'Active' : 'Initializing...'}
          </span>
        </div>
      </div>

      {/* Waveform Display */}
      <div className="bg-gray-900 rounded p-4 mb-4">
        <div className="h-24 flex items-end justify-between">
          {waveformData.map((level, index) => (
            <div
              key={index}
              className={`w-1 bg-gradient-to-t ${
                level > (calibration?.soundThreshold || 0.5) 
                  ? 'from-red-500 to-yellow-400' 
                  : 'from-blue-500 to-green-400'
              } transition-all duration-100`}
              style={{ height: `${Math.max(level * 100, 2)}%` }}
            />
          ))}
        </div>
        
        {/* Threshold line */}
        <div 
          className="relative border-t border-red-400 border-dashed mt-1"
          style={{ 
            bottom: `${(calibration?.soundThreshold || 0.5) * 96}px` 
          }}
        >
          <span className="absolute right-0 -top-4 text-xs text-red-400">
            Threshold
          </span>
        </div>
      </div>

      {/* Audio Level Meter */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-sm text-gray-400 mb-1">
          <span>Audio Level</span>
          <span>{(audioLevel * 100).toFixed(1)}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-100 ${
              isDetecting ? 'bg-red-400' : 'bg-green-400'
            }`}
            style={{ width: `${audioLevel * 100}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="text-center">
          <div className="text-lg font-bold text-blue-400">{calibration?.soundThreshold || 0.5}</div>
          <div className="text-gray-400">Threshold</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-green-400">{signalCount}</div>
          <div className="text-gray-400">Signals</div>
        </div>
      </div>
    </div>
  );
}
