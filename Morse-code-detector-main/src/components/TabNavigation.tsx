import { TabType } from "./MorseCodeApp";

interface TabNavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  isDetecting: boolean;
}

export function TabNavigation({ activeTab, onTabChange, isDetecting }: TabNavigationProps) {
  const tabs = [
    { id: "home" as TabType, label: "Home", icon: "🏠" },
    { id: "live" as TabType, label: "Live Output", icon: "📡", disabled: !isDetecting },
    { id: "history" as TabType, label: "History", icon: "📚" },
    { id: "calibration" as TabType, label: "Calibration", icon: "⚙️" },
    { id: "help" as TabType, label: "Help", icon: "❓" },
    { id: "about" as TabType, label: "About", icon: "ℹ️" },
  ];

  return (
    <nav className="bg-gray-800 border-b border-gray-700">
      <div className="px-6">
        <div className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => !tab.disabled && onTabChange(tab.id)}
              disabled={tab.disabled}
              className={`
                flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors
                ${activeTab === tab.id
                  ? "border-blue-500 text-blue-400"
                  : tab.disabled
                  ? "border-transparent text-gray-500 cursor-not-allowed"
                  : "border-transparent text-gray-300 hover:text-white hover:border-gray-300"
                }
              `}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
