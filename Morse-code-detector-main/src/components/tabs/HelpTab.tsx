export function HelpTab() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Help & Documentation</h2>
        <p className="text-gray-400">Learn how to use the Morse Code Detection System effectively</p>
      </div>

      <div className="space-y-6">
        {/* Getting Started */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="text-xl font-semibold text-white mb-4">Getting Started</h3>
          <div className="space-y-3 text-gray-300">
            <div className="flex items-start space-x-3">
              <span className="text-blue-400 font-bold">1.</span>
              <span>Choose your detection mode from the Home tab (Eye, Sound, or Both)</span>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-blue-400 font-bold">2.</span>
              <span>Calibrate your settings in the Calibration tab for optimal performance</span>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-blue-400 font-bold">3.</span>
              <span>Start detection and switch to the Live Output tab to see real-time results</span>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-blue-400 font-bold">4.</span>
              <span>View your session history and export data from the History tab</span>
            </div>
          </div>
        </div>

        {/* Morse Code Reference */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="text-xl font-semibold text-white mb-4">Morse Code Reference</h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div>
              <h4 className="font-semibold text-blue-400 mb-2">A-I</h4>
              <div className="space-y-1 text-gray-300 font-mono">
                <div>A: · –</div>
                <div>B: – · · ·</div>
                <div>C: – · – ·</div>
                <div>D: – · ·</div>
                <div>E: ·</div>
                <div>F: · · – ·</div>
                <div>G: – – ·</div>
                <div>H: · · · ·</div>
                <div>I: · ·</div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-blue-400 mb-2">J-R</h4>
              <div className="space-y-1 text-gray-300 font-mono">
                <div>J: · – – –</div>
                <div>K: – · –</div>
                <div>L: · – · ·</div>
                <div>M: – –</div>
                <div>N: – ·</div>
                <div>O: – – –</div>
                <div>P: · – – ·</div>
                <div>Q: – – · –</div>
                <div>R: · – ·</div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-blue-400 mb-2">S-Z</h4>
              <div className="space-y-1 text-gray-300 font-mono">
                <div>S: · · ·</div>
                <div>T: –</div>
                <div>U: · · –</div>
                <div>V: · · · –</div>
                <div>W: · – –</div>
                <div>X: – · · –</div>
                <div>Y: – · – –</div>
                <div>Z: – – · ·</div>
              </div>
            </div>
          </div>
        </div>

        {/* Detection Tips */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="text-xl font-semibold text-white mb-4">Detection Tips</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-green-400 mb-2">Eye Tracking</h4>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• Ensure good lighting on your face</li>
                <li>• Keep your head relatively still</li>
                <li>• Blink deliberately and clearly</li>
                <li>• Short blinks for dots, long blinks for dashes</li>
                <li>• Pause between letters</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold blue-400 mb-2">Sound Detection</h4>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• Use a clear, consistent tone</li>
                <li>• Maintain steady volume</li>
                <li>• Short beeps for dots, long beeps for dashes</li>
                <li>• Allow silence between letters</li>
                <li>• Minimize background noise</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Troubleshooting */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="text-xl font-semibold text-white mb-4">Troubleshooting</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-yellow-400 mb-2">Detection not working?</h4>
              <ul className="space-y-1 text-gray-300 text-sm ml-4">
                <li>• Check camera and microphone permissions</li>
                <li>• Adjust calibration settings</li>
                <li>• Ensure proper lighting/audio conditions</li>
                <li>• Try refreshing the page</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-yellow-400 mb-2">Inaccurate decoding?</h4>
              <ul className="space-y-1 text-gray-300 text-sm ml-4">
                <li>• Fine-tune timing settings in calibration</li>
                <li>• Practice consistent signal timing</li>
                <li>• Use combined mode for better accuracy</li>
                <li>• Check signal confidence levels</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
