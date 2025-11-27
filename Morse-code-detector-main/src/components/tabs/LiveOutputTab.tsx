import { useState, useEffect, useRef } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { DetectionMode } from "../MorseCodeApp";
import { EyeTracker } from "../detection/EyeTracker";
import { SoundDetector } from "../detection/SoundDetector";
import { MorseDecoder } from "../detection/MorseDecoder";

interface LiveOutputTabProps {
  sessionId: string | null;
  detectionMode: DetectionMode;
  isDetecting: boolean;
  onStopDetection: () => void;
}

export function LiveOutputTab({ sessionId, detectionMode, isDetecting, onStopDetection }: LiveOutputTabProps) {
  const [morseBuffer, setMorseBuffer] = useState<string>("");
  const [currentLetter, setCurrentLetter] = useState<string>("");
  const [decodedText, setDecodedText] = useState<string>("");
  const [recentSignals, setRecentSignals] = useState<Array<{ type: string; time: number }>>([]);
  
  const recordDetection = useMutation(api.morse.recordDetection);
  const saveOutput = useMutation(api.morse.saveDecodedOutput);
  const calibration = useQuery(api.morse.getCalibrationSettings, 
    sessionId ? { sessionId } : "skip"
  );

  const handleSignalDetected = async (signalType: "dot" | "dash" | "space", inputType: "blink" | "sound", duration: number, confidence: number) => {
    if (!sessionId) return;

    try {
      await recordDetection({
        sessionId,
        inputType,
        signalType,
        duration,
        confidence,
      });

      setRecentSignals(prev => [...prev.slice(-9), { type: signalType, time: Date.now() }]);

      if (signalType === "space") {
        if (morseBuffer) {
          const letter = MorseDecoder.decodeLetter(morseBuffer);
          if (letter) {
            setCurrentLetter(letter);
            setDecodedText(prev => prev + letter);
            await saveOutput({
              sessionId,
              morseCode: morseBuffer,
              decodedLetter: letter,
              completeSentence: decodedText + letter,
            });
          }
          setMorseBuffer("");
        }
      } else {
        const symbol = signalType === "dot" ? "." : "-";
        setMorseBuffer(prev => prev + symbol);
      }
    } catch (error) {
      console.error("Failed to record detection:", error);
    }
  };

  if (!isDetecting || !sessionId) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🚫</div>
        <h3 className="text-2xl font-semibold text-white mb-2">No Active Session</h3>
        <p className="text-gray-400">Start a detection session from the Home tab to see live output</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Control Panel */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-white">Live Detection</h3>
          <button
            onClick={onStopDetection}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Stop Detection
          </button>
        </div>
        
        <div className="grid md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">{detectionMode.toUpperCase()}</div>
            <div className="text-sm text-gray-400">Detection Mode</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">{recentSignals.length}</div>
            <div className="text-sm text-gray-400">Signals Detected</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400">{decodedText.length}</div>
            <div className="text-sm text-gray-400">Characters Decoded</div>
          </div>
        </div>
      </div>

      {/* Detection Components */}
      <div className="grid md:grid-cols-2 gap-6">
        {(detectionMode === "eye" || detectionMode === "both") && (
          <EyeTracker
            onSignalDetected={handleSignalDetected}
            calibration={calibration}
            isActive={isDetecting}
          />
        )}
        
        {(detectionMode === "sound" || detectionMode === "both") && (
          <SoundDetector
            onSignalDetected={handleSignalDetected}
            calibration={calibration}
            isActive={isDetecting}
          />
        )}
      </div>

      {/* Output Display */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h4 className="text-lg font-semibold text-white mb-4">Morse Code</h4>
          <div className="bg-gray-900 rounded p-4 min-h-[100px] font-mono text-lg">
            <div className="text-yellow-400">{morseBuffer}</div>
            <div className="text-gray-500 text-sm mt-2">
              {recentSignals.slice(-5).map((signal, i) => (
                <span key={i} className="mr-1">
                  {signal.type === "dot" ? "·" : signal.type === "dash" ? "–" : " "}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h4 className="text-lg font-semibold text-white mb-4">Current Letter</h4>
          <div className="bg-gray-900 rounded p-4 min-h-[100px] flex items-center justify-center">
            <div className="text-4xl font-bold text-green-400">{currentLetter || "—"}</div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h4 className="text-lg font-semibold text-white mb-4">Decoded Text</h4>
          <div className="bg-gray-900 rounded p-4 min-h-[100px] font-mono text-lg text-blue-400 break-words">
            {decodedText || "Start detecting to see decoded text..."}
          </div>
        </div>
      </div>
    </div>
  );
}
