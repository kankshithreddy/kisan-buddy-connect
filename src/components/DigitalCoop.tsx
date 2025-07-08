import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  AlertTriangle, 
  Users, 
  Bug, 
  CloudRain, 
  Thermometer,
  Wind,
  Bell,
  Shield,
  Activity
} from "lucide-react";

const DigitalCoop = () => {
  const [selectedAlert, setSelectedAlert] = useState<string | null>(null);
  
  const outbreaks = [
    {
      id: "1",
      type: "pest",
      title: "Leaf Curl Virus",
      severity: "high",
      location: "5 km radius",
      affected: 15,
      icon: Bug,
      description: "Whitefly-transmitted virus affecting tomato crops",
      symptoms: ["Yellowing leaves", "Curled leaf edges", "Stunted growth"],
      prevention: "Use yellow sticky traps, apply neem oil spray",
      coordinates: { lat: 28.6, lng: 77.2 }
    },
    {
      id: "2", 
      type: "weather",
      title: "Heavy Rainfall Alert",
      severity: "medium",
      location: "10 km radius",
      affected: 8,
      icon: CloudRain,
      description: "Continuous rainfall expected for next 48 hours",
      symptoms: ["Waterlogging risk", "Fungal infection possibility"],
      prevention: "Ensure proper drainage, avoid irrigation",
      coordinates: { lat: 28.7, lng: 77.1 }
    },
    {
      id: "3",
      type: "disease",
      title: "Powdery Mildew",
      severity: "low",
      location: "3 km radius",
      affected: 6,
      icon: Shield,
      description: "Fungal disease affecting cucurbit crops",
      symptoms: ["White powdery coating", "Leaf yellowing"],
      prevention: "Improve air circulation, apply fungicide",
      coordinates: { lat: 28.5, lng: 77.3 }
    }
  ];

  const myFarmAlerts = [
    {
      type: "warning",
      message: "Pest outbreak detected in nearby farms",
      time: "2 hours ago",
      action: "Apply preventive spray recommended"
    },
    {
      type: "info",
      message: "Weather conditions favorable for fungal growth",
      time: "4 hours ago", 
      action: "Monitor crops closely"
    },
    {
      type: "success",
      message: "Community spraying program successful",
      time: "1 day ago",
      action: "Continue regular monitoring"
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "destructive";
      case "medium": return "default";
      case "low": return "secondary";
      default: return "secondary";
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "warning": return AlertTriangle;
      case "info": return Activity;
      case "success": return Shield;
      default: return Bell;
    }
  };

  return (
    <div className="h-full bg-gradient-earth flex flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-xl font-semibold text-foreground">Digital Co-op</h1>
          <p className="text-muted-foreground text-sm">Community outbreak monitoring and alerts</p>
        </div>

        {/* Map View Summary */}
        <Card className="p-4 bg-gradient-card">
          <h2 className="text-base font-medium mb-3 flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" />
            Outbreak Overview
          </h2>
          
          <div className="grid grid-cols-3 gap-3 mb-3">
            <div className="text-center p-3 bg-destructive/10 rounded-lg">
              <div className="text-xl font-bold text-destructive mb-1">3</div>
              <p className="text-xs text-muted-foreground">Active</p>
            </div>
            
            <div className="text-center p-3 bg-orange-500/10 rounded-lg">
              <div className="text-xl font-bold text-orange-600 mb-1">29</div>
              <p className="text-xs text-muted-foreground">Affected</p>
            </div>
            
            <div className="text-center p-3 bg-green-500/10 rounded-lg">
              <div className="text-xl font-bold text-green-600 mb-1">15km</div>
              <p className="text-xs text-muted-foreground">Coverage</p>
            </div>
          </div>
          
          <div className="bg-background rounded-lg p-3 h-20 flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <MapPin className="h-6 w-6 mx-auto mb-1" />
              <p className="text-xs">Interactive map</p>
            </div>
          </div>
        </Card>

        {/* Active Outbreaks */}
        <div>
          <h2 className="text-base font-medium mb-3 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-primary" />
            Active Outbreaks
          </h2>
          
          <div className="space-y-2">
            {outbreaks.slice(0, 2).map((outbreak) => (
              <Card 
                key={outbreak.id} 
                className={`p-3 bg-gradient-card cursor-pointer transition-smooth ${
                  selectedAlert === outbreak.id ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setSelectedAlert(selectedAlert === outbreak.id ? null : outbreak.id)}
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <outbreak.icon className="h-4 w-4 text-primary" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-medium text-foreground text-sm">{outbreak.title}</h3>
                      <Badge variant={getSeverityColor(outbreak.severity) as any} className="text-xs">
                        {outbreak.severity}
                      </Badge>
                    </div>
                    
                    <p className="text-xs text-muted-foreground mb-2">{outbreak.description}</p>
                    
                    <div className="flex items-center gap-3 text-xs">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {outbreak.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {outbreak.affected} farms
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* My Farm Status */}
        <Card className="p-4 bg-gradient-card">
          <h2 className="text-base font-medium mb-3 flex items-center gap-2">
            <Activity className="h-4 w-4 text-primary" />
            My Farm Status
          </h2>
          
          <div className="space-y-2">
            {myFarmAlerts.slice(0, 2).map((alert, index) => {
              const AlertIcon = getAlertIcon(alert.type);
              return (
                <div key={index} className="flex items-start gap-2 p-2 bg-background rounded-lg">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    alert.type === 'warning' ? 'bg-orange-500/10' :
                    alert.type === 'info' ? 'bg-blue-500/10' : 'bg-green-500/10'
                  }`}>
                    <AlertIcon className={`h-3 w-3 ${
                      alert.type === 'warning' ? 'text-orange-600' :
                      alert.type === 'info' ? 'text-blue-600' : 'text-green-600'
                    }`} />
                  </div>
                  
                  <div className="flex-1">
                    <p className="font-medium text-foreground text-xs">{alert.message}</p>
                    <p className="text-xs text-muted-foreground">{alert.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DigitalCoop;