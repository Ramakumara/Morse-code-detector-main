import { useState, useEffect } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Header } from "./Header";
import { TabNavigation } from "./TabNavigation";
import { HomeTab } from "./tabs/HomeTab";
import { LiveOutputTab } from "./tabs/LiveOutputTab";
import { HistoryTab } from "./tabs/HistoryTab";
import { CalibrationTab } from "./tabs/CalibrationTab";
import { HelpTab } from "./tabs/HelpTab";
import { AboutTab } from "./tabs/AboutTab";
import { StatusBar } from "./StatusBar";
import { toast } from "sonner";

export type DetectionMode = "eye" | "sound" | "both";
export type TabType = "home" | "live" | "history" | "calibration" | "help" | "about";

export function MorseCodeApp() {
  const [activeTab, setActiveTab] = useState<TabType>("home");
  const [currentSession, setCurrentSession] = useState<string | null>(null);
  const [detectionMode, setDetectionMode] = useState<DetectionMode>("both");
  const [isDetecting, setIsDetecting] = useState(false);
  
  const createSession = useMutation(api.morse.createSession);
  const endSession = useMutation(api.morse.endSession);
  const sessions = useQuery(api.morse.getUserSessions);

  const startDetection = async (mode: DetectionMode) => {
    try {
      const result = await createSession({ mode });
      setCurrentSession(result.sessionId);
      setDetectionMode(mode);
      setIsDetecting(true);
      setActiveTab("live");
      toast.success(`Detection started in ${mode} mode`);
    } catch (error) {
      toast.error("Failed to start detection session");
    }
  };

  const stopDetection = async () => {
    if (currentSession) {
      try {
        await endSession({ sessionId: currentSession });
        setIsDetecting(false);
        setCurrentSession(null);
        toast.success("Detection session ended");
      } catch (error) {
        toast.error("Failed to end session");
      }
    }
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case "home":
        return (
          <HomeTab
            onStartDetection={startDetection}
            isDetecting={isDetecting}
            detectionMode={detectionMode}
          />
        );
      case "live":
        return (
          <LiveOutputTab
            sessionId={currentSession}
            detectionMode={detectionMode}
            isDetecting={isDetecting}
            onStopDetection={stopDetection}
          />
        );
      case "history":
        return <HistoryTab sessions={sessions || []} />;
      case "calibration":
        return (
          <CalibrationTab
            sessionId={currentSession}
            isDetecting={isDetecting}
          />
        );
      case "help":
        return <HelpTab />;
      case "about":
        return <AboutTab />;
      default:
        return <HomeTab onStartDetection={startDetection} isDetecting={isDetecting} detectionMode={detectionMode} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <Header />
      
      <TabNavigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
        isDetecting={isDetecting}
      />
      
      <main className="flex-1 p-6">
        {renderActiveTab()}
      </main>
      
      <StatusBar
        isDetecting={isDetecting}
        sessionId={currentSession}
        detectionMode={detectionMode}
      />
    </div>
  );
}
