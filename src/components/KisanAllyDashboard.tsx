import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Mic, 
  Camera, 
  TrendingUp, 
  Bell, 
  FileText, 
  Users, 
  Wheat, 
  CloudRain,
  Thermometer,
  Wind
} from "lucide-react";
import farmHero from "@/assets/farm-hero.jpg";
import farmerTech from "@/assets/farmer-tech.jpg";
import cropHealth from "@/assets/crop-health.jpg";
import ConversationalAlly from "./ConversationalAlly";

const KisanAllyDashboard = () => {
  const [showChat, setShowChat] = useState(false);
  
  const handleVoiceInput = () => {
    setShowChat(true);
  };

  if (showChat) {
    return <ConversationalAlly onClose={() => setShowChat(false)} />;
  }

  const quickActions = [
    { icon: Camera, label: "Diagnose Crop", color: "leaf", subtitle: "Image Analysis" },
    { icon: TrendingUp, label: "Check Prices", color: "harvest", subtitle: "Market Rates" },
    { icon: Bell, label: "Alerts", color: "earth", subtitle: "Community Updates" },
    { icon: FileText, label: "Schemes", color: "action", subtitle: "Govt. Support" },
  ];

  const alerts = [
    { type: "disease", message: "Leaf Curl outbreak reported 5km away", time: "2h ago", severity: "high" },
    { type: "weather", message: "Heavy rains expected tomorrow", time: "4h ago", severity: "medium" },
    { type: "market", message: "Tomato prices increased by 15%", time: "6h ago", severity: "low" },
  ];

  const communityActivity = [
    { farmer: "Sita Devi", action: "applied neem spray", crop: "cotton", time: "30 min ago" },
    { farmer: "Ravi Kumar", action: "harvested", crop: "wheat", time: "1h ago" },
    { farmer: "Priya Singh", action: "sowed", crop: "millet", time: "2h ago" },
  ];

  return (
    <div className="h-full bg-gradient-earth flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-primary text-white p-4 rounded-b-2xl shadow-soft flex-shrink-0">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-semibold">Good morning, Rohan 👋</h1>
            <p className="text-primary-foreground/80 text-sm">Ready for another productive day?</p>
          </div>
          <div className="text-right text-sm">
            <div className="flex items-center gap-1">
              <Thermometer className="h-3 w-3" />
              <span>28°C</span>
            </div>
            <div className="flex items-center gap-1">
              <CloudRain className="h-3 w-3" />
              <span>60%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Voice Input Section */}
        <div className="text-center">
          <Button
            variant="mic"
            size="mic"
            onClick={handleVoiceInput}
            className="mx-auto"
          >
            <Mic className="h-6 w-6" />
          </Button>
          <p className="mt-2 text-muted-foreground text-sm">
            Tap to start chatting with Ally
          </p>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-lg font-medium mb-3 flex items-center gap-2">
            <Wheat className="h-4 w-4 text-primary" />
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action, index) => (
              <Card key={index} className="p-3 bg-gradient-card hover:shadow-card transition-smooth cursor-pointer">
                <div className="flex flex-col items-center text-center space-y-2">
                  <Button variant={action.color as any} size="icon" className="rounded-full h-8 w-8">
                    <action.icon className="h-4 w-4" />
                  </Button>
                  <div>
                    <p className="font-medium text-sm">{action.label}</p>
                    <p className="text-xs text-muted-foreground">{action.subtitle}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Live Alerts */}
        <div>
          <h2 className="text-lg font-medium mb-3 flex items-center gap-2">
            <Bell className="h-4 w-4 text-primary" />
            Live Alerts
          </h2>
          <div className="space-y-2">
            {alerts.slice(0, 2).map((alert, index) => (
              <Card key={index} className="p-3 bg-gradient-card border-l-4 border-l-primary">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="font-medium text-foreground text-sm">{alert.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                  </div>
                  <Badge 
                    variant={alert.severity === 'high' ? 'destructive' : 
                           alert.severity === 'medium' ? 'default' : 'secondary'}
                    className="text-xs"
                  >
                    {alert.severity}
                  </Badge>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Community Pulse */}
        <div>
          <h2 className="text-lg font-medium mb-3 flex items-center gap-2">
            <Users className="h-4 w-4 text-primary" />
            Community Pulse
          </h2>
          <div className="space-y-2">
            {communityActivity.slice(0, 2).map((activity, index) => (
              <Card key={index} className="p-3 bg-gradient-card">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-primary-foreground text-xs font-medium">
                      {activity.farmer.split(' ')[0][0]}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs">
                      <span className="font-medium">{activity.farmer}</span>
                      {' '}{activity.action}{' '}
                      <span className="text-primary font-medium">{activity.crop}</span>
                    </p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KisanAllyDashboard;