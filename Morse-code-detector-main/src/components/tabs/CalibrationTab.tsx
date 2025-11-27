import { useState, useEffect } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

interface CalibrationTabProps {
  sessionId: string | null;
  isDetecting: boolean;
}

export function CalibrationTab({ sessionId, isDetecting }: CalibrationTabProps) {
  const [settings, setSettings] = useState({
    eyeBlinkThreshold: 0.7,
    soundThreshold: 0.5,
    dotDurationMs: 200,
    dashDurationMs: 600,
    letterSpaceMs: 600,
    wordSpaceMs: 1400,
  });

  const updateCalibration = useMutation(api.morse.updateCalibration);
  const calibration = useQuery(api.morse.getCalibrationSettings, 
    sessionId ? { sessionId } : "skip"
  );

  useEffect(() => {
    if (calibration) {
      setSettings({
        eyeBlinkThreshold: calibration.eyeBlinkThreshold,
        soundThreshold: calibration.soundThreshold,
        dotDurationMs: calibration.dotDurationMs,
        dashDurationMs: calibration.dashDurationMs,
        letterSpaceMs: calibration.letterSpaceMs,
        wordSpaceMs: calibration.wordSpaceMs,
      });
    }
  }, [calibration]);

  const handleSave = async () => {
    if (!sessionId) return;
    
    try {
      await updateCalibration({
        sessionId,
        ...settings,
      });
    } catch (error) {
      console.error("Failed to update calibration:", error);
    }
  };

  const resetToDefaults = () => {
    setSettings({
      eyeBlinkThreshold: 0.7,
      soundThreshold: 0.5,
      dotDurationMs: 200,
      dashDurationMs: 600,
      letterSpaceMs: 600,
      wordSpaceMs: 1400,
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Calibration Settings</h2>
        <p className="text-gray-400">Adjust detection parameters for optimal performance</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Detection Thresholds */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Detection Thresholds</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Eye Blink Threshold: {settings.eyeBlinkThreshold}
              </label>
              <input
                type="range"
                min="0.1"
                max="1.0"
                step="0.1"
                value={settings.eyeBlinkThreshold}
                onChange={(e) => setSettings(prev => ({ ...prev, eyeBlinkThreshold: parseFloat(e.target.value) }))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Sensitive</span>
                <span>Conservative</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Sound Threshold: {settings.soundThreshold}
              </label>
              <input
                type="range"
                min="0.1"
                max="1.0"
                step="0.1"
                value={settings.soundThreshold}
                onChange={(e) => setSettings(prev => ({ ...prev, soundThreshold: parseFloat(e.target.value) }))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Sensitive</span>
                <span>Conservative</span>
              </div>
            </div>
          </div>
        </div>

        {/* Timing Settings */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Timing Settings</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Dot Duration (ms)
              </label>
              <input
                type="number"
                min="50"
                max="500"
                value={settings.dotDurationMs}
                onChange={(e) => setSettings(prev => ({ ...prev, dotDurationMs: parseInt(e.target.value) }))}
                className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Dash Duration (ms)
              </label>
              <input
                type="number"
                min="200"
                max="1000"
                value={settings.dashDurationMs}
                onChange={(e) => setSettings(prev => ({ ...prev, dashDurationMs: parseInt(e.target.value) }))}
                className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Letter Space (ms)
              </label>
              <input
                type="number"
                min="300"
                max="1500"
                value={settings.letterSpaceMs}
                onChange={(e) => setSettings(prev => ({ ...prev, letterSpaceMs: parseInt(e.target.value) }))}
                className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Word Space (ms)
              </label>
              <input
                type="number"
                min="800"
                max="3000"
                value={settings.wordSpaceMs}
                onChange={(e) => setSettings(prev => ({ ...prev, wordSpaceMs: parseInt(e.target.value) }))}
                className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex justify-center space-x-4">
        <button
          onClick={resetToDefaults}
          className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition-colors"
        >
          Reset to Defaults
        </button>
        <button
          onClick={handleSave}
          disabled={!sessionId}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors"
        >
          Save Settings
        </button>
      </div>

      {!sessionId && (
        <div className="mt-4 text-center text-gray-400 text-sm">
          Start a detection session to save calibration settings
        </div>
      )}
    </div>
  );
}
