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

const KisanAllyDashboard = () => {
  const [isListening, setIsListening] = useState(false);
  
  const handleVoiceInput = () => {
    setIsListening(!isListening);
    // Voice input logic would go here
  };

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
    <div className="min-h-screen bg-gradient-earth">
      {/* Header */}
      <div className="bg-gradient-primary text-white p-6 rounded-b-3xl shadow-soft">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-bold">Good morning, Rohan 👋</h1>
            <p className="text-primary-foreground/80">Ready for another productive day?</p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 text-sm">
              <Thermometer className="h-4 w-4" />
              <span>28°C</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <CloudRain className="h-4 w-4" />
              <span>60% chance</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Voice Input Section */}
        <div className="text-center">
          <Button
            variant="mic"
            size="mic"
            onClick={handleVoiceInput}
            className={`mx-auto ${isListening ? 'animate-pulse' : ''}`}
          >
            <Mic className="h-8 w-8" />
          </Button>
          <p className="mt-3 text-muted-foreground">
            {isListening ? "Listening..." : "Ask Ally anything..."}
          </p>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Wheat className="h-5 w-5 text-primary" />
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {quickActions.map((action, index) => (
              <Card key={index} className="p-4 bg-gradient-card hover:shadow-card transition-smooth cursor-pointer">
                <div className="flex flex-col items-center text-center space-y-2">
                  <Button variant={action.color as any} size="icon" className="rounded-full">
                    <action.icon className="h-5 w-5" />
                  </Button>
                  <div>
                    <p className="font-medium">{action.label}</p>
                    <p className="text-sm text-muted-foreground">{action.subtitle}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Live Alerts */}
        <div>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            Live Alerts
          </h2>
          <div className="space-y-3">
            {alerts.map((alert, index) => (
              <Card key={index} className="p-4 bg-gradient-card border-l-4 border-l-primary">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{alert.message}</p>
                    <p className="text-sm text-muted-foreground mt-1">{alert.time}</p>
                  </div>
                  <Badge 
                    variant={alert.severity === 'high' ? 'destructive' : 
                           alert.severity === 'medium' ? 'default' : 'secondary'}
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
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Community Pulse
          </h2>
          <div className="space-y-3">
            {communityActivity.map((activity, index) => (
              <Card key={index} className="p-4 bg-gradient-card">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-primary-foreground text-sm font-medium">
                      {activity.farmer.split(' ')[0][0]}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">
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

        {/* Feature Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4 bg-gradient-card">
            <img src={farmerTech} alt="Farmer with technology" className="w-full h-32 object-cover rounded-lg mb-3" />
            <h3 className="font-semibold mb-2">Voice-First Experience</h3>
            <p className="text-sm text-muted-foreground">Interact naturally with your digital farming assistant</p>
          </Card>
          
          <Card className="p-4 bg-gradient-card">
            <img src={cropHealth} alt="Crop health analysis" className="w-full h-32 object-cover rounded-lg mb-3" />
            <h3 className="font-semibold mb-2">Smart Diagnostics</h3>
            <p className="text-sm text-muted-foreground">AI-powered crop health analysis and solutions</p>
          </Card>
          
          <Card className="p-4 bg-gradient-card">
            <img src={farmHero} alt="Farm landscape" className="w-full h-32 object-cover rounded-lg mb-3" />
            <h3 className="font-semibold mb-2">Community Connected</h3>
            <p className="text-sm text-muted-foreground">Stay connected with your farming community</p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default KisanAllyDashboard;