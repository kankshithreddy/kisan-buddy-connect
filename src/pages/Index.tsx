import { useState } from "react";
import { Button } from "@/components/ui/button";
import KisanAllyDashboard from "@/components/KisanAllyDashboard";
import DiagnosticLens from "@/components/DiagnosticLens";
import CommunityMandi from "@/components/CommunityMandi";
import DigitalCoop from "@/components/DigitalCoop";
import SarkariSahayak from "@/components/SarkariSahayak";
import FarmJournal from "@/components/FarmJournal";
import { Camera, Home, TrendingUp, Users, FileText, Bell } from "lucide-react";

const Index = () => {
  const [activeScreen, setActiveScreen] = useState("dashboard");

  const screens = {
    dashboard: <KisanAllyDashboard />,
    diagnostic: <DiagnosticLens />,
    mandi: <CommunityMandi />,
    community: <DigitalCoop />,
    schemes: <SarkariSahayak />,
    alerts: <FarmJournal />,
  };

  const navigationItems = [
    { id: "dashboard", label: "Home", icon: Home },
    { id: "diagnostic", label: "Diagnose", icon: Camera },
    { id: "mandi", label: "Mandi", icon: TrendingUp },
    { id: "community", label: "Community", icon: Users },
    { id: "schemes", label: "Schemes", icon: FileText },
    { id: "alerts", label: "Alerts", icon: Bell },
  ];

  const renderScreen = () => {
    return screens[activeScreen as keyof typeof screens] || screens.dashboard;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Main Content */}
      <div className="pb-20">
        {renderScreen()}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-soft">
        <div className="grid grid-cols-6 gap-1 p-2">
          {navigationItems.map((item) => (
            <Button
              key={item.id}
              variant={activeScreen === item.id ? "default" : "ghost"}
              size="sm"
              className="flex-col h-16 text-xs"
              onClick={() => setActiveScreen(item.id)}
            >
              <item.icon className="h-5 w-5 mb-1" />
              {item.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
