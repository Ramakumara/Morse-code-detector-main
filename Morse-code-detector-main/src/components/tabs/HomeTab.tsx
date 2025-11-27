import { DetectionMode } from "../MorseCodeApp";

interface HomeTabProps {
  onStartDetection: (mode: DetectionMode) => void;
  isDetecting: boolean;
  detectionMode: DetectionMode;
}

export function HomeTab({ onStartDetection, isDetecting, detectionMode }: HomeTabProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-white mb-4">
          Morse Code Detection System
        </h2>
        <p className="text-xl text-gray-300 mb-8">
          Real-time detection and decoding of Morse code through eye blinks and sound signals
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
            👁️
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Eye Tracking</h3>
          <p className="text-gray-300 mb-4">
            Detect Morse code through controlled eye blinks with real-time visual feedback
          </p>
          <button
            onClick={() => onStartDetection("eye")}
            disabled={isDetecting}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white py-2 px-4 rounded-lg transition-colors"
          >
            {isDetecting && detectionMode === "eye" ? "Detecting..." : "Start Eye Detection"}
          </button>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-4">
            🔊
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Sound Detection</h3>
          <p className="text-gray-300 mb-4">
            Convert audio signals into Morse code with waveform visualization
          </p>
          <button
            onClick={() => onStartDetection("sound")}
            disabled={isDetecting}
            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white py-2 px-4 rounded-lg transition-colors"
          >
            {isDetecting && detectionMode === "sound" ? "Detecting..." : "Start Sound Detection"}
          </button>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-4">
            🔄
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Combined Mode</h3>
          <p className="text-gray-300 mb-4">
            Use both eye tracking and sound detection simultaneously for enhanced accuracy
          </p>
          <button
            onClick={() => onStartDetection("both")}
            disabled={isDetecting}
            className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 text-white py-2 px-4 rounded-lg transition-colors"
          >
            {isDetecting && detectionMode === "both" ? "Detecting..." : "Start Combined Mode"}
          </button>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h3 className="text-xl font-semibold text-white mb-4">Features</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            <span className="text-gray-300">Real-time detection and decoding</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            <span className="text-gray-300">Visual feedback and waveform display</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            <span className="text-gray-300">Session history and export options</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
            <span className="text-gray-300">Customizable calibration settings</span>
          </div>
        </div>
      </div>
    </div>
  );
}
