export function AboutTab() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">Morse Code Detection System</h2>
        <p className="text-xl text-gray-400">Version 1.0.0</p>
      </div>

      <div className="space-y-6">
        {/* Project Overview */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="text-xl font-semibold text-white mb-4">Project Overview</h3>
          <p className="text-gray-300 leading-relaxed">
            The Morse Code Detection System is an advanced real-time application that converts eye blinks 
            and sound signals into Morse code, providing instant decoding capabilities. This research-grade 
            tool combines computer vision, audio processing, and machine learning to create an accessible 
            communication interface.
          </p>
        </div>

        {/* Features */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="text-xl font-semibold text-white mb-4">Key Features</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span className="text-gray-300">Real-time eye blink detection</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span className="text-gray-300">Audio signal processing</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span className="text-gray-300">Live Morse code conversion</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span className="text-gray-300">Multi-format output display</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-gray-300">Session history tracking</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-gray-300">Customizable calibration</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-gray-300">Data export capabilities</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-gray-300">Professional interface</span>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Stack */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="text-xl font-semibold text-white mb-4">Technical Stack</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <h4 className="font-semibold text-blue-400 mb-2">Frontend</h4>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• React 19</li>
                <li>• TypeScript</li>
                <li>• Tailwind CSS</li>
                <li>• WebRTC APIs</li>
                <li>• Canvas API</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-green-400 mb-2">Backend</h4>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• Convex Database</li>
                <li>• Real-time Functions</li>
                <li>• Authentication</li>
                <li>• Data Storage</li>
                <li>• Session Management</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-purple-400 mb-2">Detection</h4>
              <ul className="space-y-1 text-gray-300 text-sm">
                <li>• Computer Vision</li>
                <li>• Audio Processing</li>
                <li>• Signal Analysis</li>
                <li>• Pattern Recognition</li>
                <li>• Real-time Decoding</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Applications */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="text-xl font-semibold text-white mb-4">Applications</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-yellow-400 mb-2">Accessibility</h4>
              <p className="text-gray-300 text-sm">
                Enables communication for individuals with motor disabilities through 
                eye-controlled interfaces and alternative input methods.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-yellow-400 mb-2">Research</h4>
              <p className="text-gray-300 text-sm">
                Provides a platform for studying human-computer interaction, 
                signal processing, and assistive technology development.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-yellow-400 mb-2">Education</h4>
              <p className="text-gray-300 text-sm">
                Interactive tool for learning Morse code and understanding 
                signal processing concepts in real-time.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-yellow-400 mb-2">Emergency</h4>
              <p className="text-gray-300 text-sm">
                Alternative communication method for emergency situations 
                where traditional input methods are unavailable.
              </p>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 text-center">
          <h3 className="text-xl font-semibold text-white mb-4">Contact & Support</h3>
          <p className="text-gray-300 mb-4">
            For technical support, feature requests, or research collaboration opportunities
          </p>
          <div className="flex justify-center space-x-4 text-sm">
            <span className="text-blue-400">📧 support@morsedetection.com</span>
            <span className="text-green-400">🌐 www.morsedetection.com</span>
          </div>
        </div>
      </div>
    </div>
  );
}
