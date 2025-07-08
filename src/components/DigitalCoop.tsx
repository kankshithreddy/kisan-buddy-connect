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
    <div className="min-h-screen bg-gradient-earth p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground mb-2">Digital Co-op</h1>
          <p className="text-muted-foreground">Community outbreak monitoring and alerts</p>
        </div>

        {/* Map View Summary */}
        <Card className="mb-6 p-6 bg-gradient-card">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            Outbreak Map Overview
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="text-center p-4 bg-destructive/10 rounded-lg">
              <div className="text-2xl font-bold text-destructive mb-1">3</div>
              <p className="text-sm text-muted-foreground">Active Outbreaks</p>
            </div>
            
            <div className="text-center p-4 bg-orange-500/10 rounded-lg">
              <div className="text-2xl font-bold text-orange-600 mb-1">29</div>
              <p className="text-sm text-muted-foreground">Farms Affected</p>
            </div>
            
            <div className="text-center p-4 bg-green-500/10 rounded-lg">
              <div className="text-2xl font-bold text-green-600 mb-1">15 km</div>
              <p className="text-sm text-muted-foreground">Coverage Radius</p>
            </div>
          </div>
          
          <div className="bg-background rounded-lg p-4 h-32 flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <MapPin className="h-8 w-8 mx-auto mb-2" />
              <p className="text-sm">Interactive map would display here</p>
            </div>
          </div>
        </Card>

        {/* Active Outbreaks */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-primary" />
            Active Outbreaks
          </h2>
          
          <div className="space-y-4">
            {outbreaks.map((outbreak) => (
              <Card 
                key={outbreak.id} 
                className={`p-4 bg-gradient-card cursor-pointer transition-smooth ${
                  selectedAlert === outbreak.id ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setSelectedAlert(selectedAlert === outbreak.id ? null : outbreak.id)}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <outbreak.icon className="h-6 w-6 text-primary" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-foreground">{outbreak.title}</h3>
                      <Badge variant={getSeverityColor(outbreak.severity) as any}>
                        {outbreak.severity}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-2">{outbreak.description}</p>
                    
                    <div className="flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {outbreak.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {outbreak.affected} farms
                      </span>
                    </div>
                    
                    {selectedAlert === outbreak.id && (
                      <div className="mt-4 p-4 bg-background rounded-lg">
                        <div className="space-y-3">
                          <div>
                            <h4 className="font-medium text-foreground mb-1">Symptoms:</h4>
                            <ul className="text-sm text-muted-foreground space-y-1">
                              {outbreak.symptoms.map((symptom, index) => (
                                <li key={index} className="flex items-center gap-2">
                                  <div className="w-1 h-1 bg-primary rounded-full"></div>
                                  {symptom}
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className="font-medium text-foreground mb-1">Prevention:</h4>
                            <p className="text-sm text-muted-foreground">{outbreak.prevention}</p>
                          </div>
                          
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Shield className="h-4 w-4 mr-1" />
                              Apply Prevention
                            </Button>
                            <Button variant="outline" size="sm">
                              <Bell className="h-4 w-4 mr-1" />
                              Set Alert
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* My Farm Status */}
        <Card className="mb-6 p-6 bg-gradient-card">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            My Farm Status
          </h2>
          
          <div className="space-y-3">
            {myFarmAlerts.map((alert, index) => {
              const AlertIcon = getAlertIcon(alert.type);
              return (
                <div key={index} className="flex items-start gap-3 p-3 bg-background rounded-lg">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    alert.type === 'warning' ? 'bg-orange-500/10' :
                    alert.type === 'info' ? 'bg-blue-500/10' : 'bg-green-500/10'
                  }`}>
                    <AlertIcon className={`h-4 w-4 ${
                      alert.type === 'warning' ? 'text-orange-600' :
                      alert.type === 'info' ? 'text-blue-600' : 'text-green-600'
                    }`} />
                  </div>
                  
                  <div className="flex-1">
                    <p className="font-medium text-foreground text-sm">{alert.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                    <p className="text-xs text-primary mt-1">{alert.action}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Community Actions */}
        <Card className="p-6 bg-gradient-card">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Community Actions
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="action" size="card" className="flex-col">
              <Shield className="h-8 w-8 mb-2" />
              <span className="font-medium">Join Prevention Program</span>
              <span className="text-sm text-muted-foreground">Coordinate with neighbors</span>
            </Button>
            
            <Button variant="action" size="card" className="flex-col">
              <Bell className="h-8 w-8 mb-2" />
              <span className="font-medium">Report Outbreak</span>
              <span className="text-sm text-muted-foreground">Help the community</span>
            </Button>
            
            <Button variant="action" size="card" className="flex-col">
              <Activity className="h-8 w-8 mb-2" />
              <span className="font-medium">Share Treatment</span>
              <span className="text-sm text-muted-foreground">Success stories</span>
            </Button>
            
            <Button variant="action" size="card" className="flex-col">
              <Users className="h-8 w-8 mb-2" />
              <span className="font-medium">Find Experts</span>
              <span className="text-sm text-muted-foreground">Connect with specialists</span>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DigitalCoop;