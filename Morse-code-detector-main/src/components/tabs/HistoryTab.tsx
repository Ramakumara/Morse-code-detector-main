import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

interface HistoryTabProps {
  sessions: Array<{
    _id: string;
    sessionId: string;
    mode: string;
    startTime: number;
    endTime?: number;
    totalSignals: number;
    totalWords: number;
  }>;
}

export function HistoryTab({ sessions }: HistoryTabProps) {
  const [selectedSession, setSelectedSession] = useState<string | null>(null);
  const sessionHistory = useQuery(api.morse.getSessionHistory, 
    selectedSession ? { sessionId: selectedSession } : "skip"
  );

  const exportSession = (sessionId: string) => {
    if (!sessionHistory) return;
    
    const data = {
      sessionId,
      detections: sessionHistory.detections,
      outputs: sessionHistory.outputs,
      exportTime: new Date().toISOString(),
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `morse-session-${sessionId.slice(-8)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Session History</h2>
        <p className="text-gray-400">View and export your previous detection sessions</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Sessions List */}
        <div className="bg-gray-800 rounded-lg border border-gray-700">
          <div className="p-4 border-b border-gray-700">
            <h3 className="text-lg font-semibold text-white">Recent Sessions</h3>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {sessions.length === 0 ? (
              <div className="p-6 text-center text-gray-400">
                No sessions found. Start a detection session to see history.
              </div>
            ) : (
              sessions.map((session) => (
                <div
                  key={session._id}
                  onClick={() => setSelectedSession(session.sessionId)}
                  className={`p-4 border-b border-gray-700 cursor-pointer hover:bg-gray-700 transition-colors ${
                    selectedSession === session.sessionId ? 'bg-gray-700' : ''
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-white">
                        {session.sessionId.slice(-8)}
                      </div>
                      <div className="text-sm text-gray-400">
                        {new Date(session.startTime).toLocaleString()}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-blue-400">
                        {session.mode.toUpperCase()}
                      </div>
                      <div className="text-xs text-gray-400">
                        {session.totalSignals} signals
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Session Details */}
        <div className="bg-gray-800 rounded-lg border border-gray-700">
          <div className="p-4 border-b border-gray-700 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Session Details</h3>
            {selectedSession && (
              <button
                onClick={() => exportSession(selectedSession)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors"
              >
                Export
              </button>
            )}
          </div>
          
          {!selectedSession ? (
            <div className="p-6 text-center text-gray-400">
              Select a session to view details
            </div>
          ) : !sessionHistory ? (
            <div className="p-6 text-center text-gray-400">
              Loading session data...
            </div>
          ) : (
            <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
              <div>
                <h4 className="font-medium text-white mb-2">Decoded Output</h4>
                <div className="bg-gray-900 rounded p-3 font-mono text-sm">
                  {sessionHistory.outputs.map((output, i) => (
                    <div key={i} className="mb-1">
                      <span className="text-yellow-400">{output.morseCode}</span>
                      <span className="text-gray-500"> → </span>
                      <span className="text-green-400">{output.decodedLetter}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-white mb-2">Detection Timeline</h4>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {sessionHistory.detections.map((detection, i) => (
                    <div key={i} className="flex items-center justify-between text-sm">
                      <span className="text-gray-300">
                        {detection.signalType} ({detection.inputType})
                      </span>
                      <span className="text-gray-500">
                        {new Date(detection.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
