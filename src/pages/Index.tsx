import { useState } from "react";
import { Button } from "@/components/ui/button";
import KisanAllyDashboard from "@/components/KisanAllyDashboard";
// import DiagnosticLens from "@/components/DiagnosticLens";
// import CommunityMandi from "@/components/CommunityMandi";
// import DigitalCoop from "@/components/DigitalCoop";
// import SarkariSahayak from "@/components/SarkariSahayak";
// import FarmJournal from "@/components/FarmJournal";
import { Camera, Home, TrendingUp, Users, FileText, Bell } from "lucide-react";

const Index = () => {
  const [activeScreen, setActiveScreen] = useState("dashboard");

  const screens = {
    dashboard: <KisanAllyDashboard />,
    // diagnostic: <DiagnosticLens />,
    // mandi: <CommunityMandi />,
    // community: <DigitalCoop />,
    // schemes: <SarkariSahayak />,
    // alerts: <FarmJournal />,
  };

  const navigationItems = [
    { id: "dashboard", label: "Home", icon: Home },
    // { id: "diagnostic", label: "Diagnose", icon: Camera },
    // { id: "mandi", label: "Mandi", icon: TrendingUp },
    // { id: "community", label: "Community", icon: Users },
    // { id: "schemes", label: "Schemes", icon: FileText },
    // { id: "alerts", label: "Journal", icon: Bell },
  ];

  const renderScreen = () => {
    return screens[activeScreen as keyof typeof screens] || screens.dashboard;
  };

  return (
    <div className="h-screen bg-background flex flex-col">
      {/* Top Navigation */}
      <div className="bg-card border-b border-border shadow-soft flex-shrink-0">
        <div className="flex items-center justify-between px-4 py-2">
          <h1 className="text-lg font-semibold text-foreground">Kisan Ally</h1>
          <div className="flex gap-1">
            {navigationItems.map((item) => (
              <Button
                key={item.id}
                variant={activeScreen === item.id ? "default" : "ghost"}
                size="sm"
                className="flex items-center gap-2 text-xs px-2 py-1 h-8"
                onClick={() => setActiveScreen(item.id)}
              >
                <item.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{item.label}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {renderScreen()}
      </div>
    </div>
  );
};

export default Index;
