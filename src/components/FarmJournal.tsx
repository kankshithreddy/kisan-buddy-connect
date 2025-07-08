import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Bug, 
  CloudRain, 
  Droplets, 
  Wheat, 
  TrendingUp,
  Filter,
  BarChart3,
  Camera,
  Plus,
  Activity
} from "lucide-react";

const FarmJournal = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [viewMode, setViewMode] = useState("timeline");

  const filters = [
    { id: "all", label: "All", icon: Activity },
    { id: "pest", label: "Pest", icon: Bug },
    { id: "weather", label: "Weather", icon: CloudRain },
    { id: "irrigation", label: "Irrigation", icon: Droplets },
    { id: "harvest", label: "Harvest", icon: Wheat }
  ];

  const journalEntries = [
    {
      id: 1,
      date: "2024-07-08",
      time: "10:30 AM",
      type: "pest",
      title: "Pest Detection",
      description: "Detected leaf curl virus on tomato plants",
      icon: Bug,
      severity: "high",
      location: "Field A, Section 2",
      actions: ["Applied neem oil spray", "Removed affected leaves"],
      automated: true
    },
    {
      id: 2,
      date: "2024-07-07",
      time: "6:00 PM",
      type: "weather",
      title: "Rainfall Logged",
      description: "Heavy rainfall recorded - 25mm",
      icon: CloudRain,
      severity: "medium",
      location: "Entire farm",
      actions: ["Checked drainage systems", "Delayed fertilizer application"],
      automated: true
    },
    {
      id: 3,
      date: "2024-07-06",
      time: "7:15 AM",
      type: "irrigation",
      title: "Drip Irrigation",
      description: "Automated irrigation cycle completed",
      icon: Droplets,
      severity: "low",
      location: "All fields",
      actions: ["2 hours irrigation", "Moisture levels optimal"],
      automated: true
    },
    {
      id: 4,
      date: "2024-07-05",
      time: "2:30 PM",
      type: "harvest",
      title: "Tomato Harvest",
      description: "Harvested 150 kg of tomatoes",
      icon: Wheat,
      severity: "low",
      location: "Field B",
      actions: ["Quality check completed", "Stored in cool storage"],
      automated: false
    }
  ];

  const filteredEntries = selectedFilter === "all" 
    ? journalEntries 
    : journalEntries.filter(entry => entry.type === selectedFilter);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "destructive";
      case "medium": return "default";
      case "low": return "secondary";
      default: return "secondary";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "pest": return "text-red-600";
      case "weather": return "text-blue-600";
      case "irrigation": return "text-green-600";
      case "harvest": return "text-yellow-600";
      default: return "text-gray-600";
    }
  };

  const stats = {
    totalEntries: journalEntries.length,
    pestIssues: journalEntries.filter(e => e.type === "pest").length,
    weatherEvents: journalEntries.filter(e => e.type === "weather").length,
    irrigationCycles: journalEntries.filter(e => e.type === "irrigation").length
  };

  return (
    <div className="h-full bg-gradient-earth flex flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-xl font-semibold text-foreground">Farm Journal</h1>
          <p className="text-muted-foreground text-sm">Automated logs and farm activity tracking</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <Card className="p-3 bg-gradient-card text-center">
            <div className="text-xl font-bold text-primary mb-1">{stats.totalEntries}</div>
            <p className="text-xs text-muted-foreground">Total</p>
          </Card>
          
          <Card className="p-3 bg-gradient-card text-center">
            <div className="text-xl font-bold text-red-600 mb-1">{stats.pestIssues}</div>
            <p className="text-xs text-muted-foreground">Pests</p>
          </Card>
          
          <Card className="p-3 bg-gradient-card text-center">
            <div className="text-xl font-bold text-blue-600 mb-1">{stats.weatherEvents}</div>
            <p className="text-xs text-muted-foreground">Weather</p>
          </Card>
          
          <Card className="p-3 bg-gradient-card text-center">
            <div className="text-xl font-bold text-green-600 mb-1">{stats.irrigationCycles}</div>
            <p className="text-xs text-muted-foreground">Irrigation</p>
          </Card>
        </div>

        {/* Controls */}
        <Card className="p-3 bg-gradient-card">
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <Button
                variant={viewMode === "timeline" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("timeline")}
                className="text-xs"
              >
                <Calendar className="h-3 w-3 mr-1" />
                Timeline
              </Button>
              <Button
                variant={viewMode === "graph" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("graph")}
                className="text-xs"
              >
                <BarChart3 className="h-3 w-3 mr-1" />
                Trends
              </Button>
            </div>
            
            <Button variant="outline" size="sm" className="text-xs">
              <Plus className="h-3 w-3 mr-1" />
              Add
            </Button>
          </div>
        </Card>

        {/* Filters */}
        <div>
          <h2 className="text-base font-medium mb-2 flex items-center gap-2">
            <Filter className="h-4 w-4 text-primary" />
            Filter
          </h2>
          <div className="flex flex-wrap gap-1">
            {filters.map((filter) => (
              <Button
                key={filter.id}
                variant={selectedFilter === filter.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedFilter(filter.id)}
                className="text-xs"
              >
                <filter.icon className="h-3 w-3 mr-1" />
                {filter.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Timeline View */}
        {viewMode === "timeline" && (
          <div className="space-y-3">
            {filteredEntries.slice(0, 3).map((entry) => (
              <Card key={entry.id} className="p-4 bg-gradient-card">
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    entry.type === 'pest' ? 'bg-red-500/10' :
                    entry.type === 'weather' ? 'bg-blue-500/10' :
                    entry.type === 'irrigation' ? 'bg-green-500/10' :
                    'bg-yellow-500/10'
                  }`}>
                    <entry.icon className={`h-4 w-4 ${getTypeColor(entry.type)}`} />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-medium text-foreground text-sm">{entry.title}</h3>
                      <div className="flex items-center gap-1">
                        {entry.automated && (
                          <Badge variant="secondary" className="text-xs">Auto</Badge>
                        )}
                        <Badge variant={getSeverityColor(entry.severity) as any} className="text-xs">
                          {entry.severity}
                        </Badge>
                      </div>
                    </div>
                    
                    <p className="text-xs text-muted-foreground mb-2">{entry.description}</p>
                    
                    <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {entry.date}
                      </span>
                      <span>{entry.location}</span>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-foreground mb-1 text-xs">Actions:</h4>
                      <ul className="text-xs space-y-1">
                        {entry.actions.slice(0, 2).map((action, index) => (
                          <li key={index} className="flex items-center gap-1 text-muted-foreground">
                            <div className="w-1 h-1 bg-primary rounded-full"></div>
                            {action}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Graph View */}
        {viewMode === "graph" && (
          <Card className="p-4 bg-gradient-card">
            <h2 className="text-base font-medium mb-3 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              Activity Trends
            </h2>
            
            <div className="h-32 bg-background rounded-lg flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <BarChart3 className="h-8 w-8 mx-auto mb-2" />
                <p className="text-xs">Farm activity trends</p>
              </div>
            </div>
            
            <div className="mt-3 grid grid-cols-3 gap-2">
              <div className="text-center p-2 bg-background rounded-lg">
                <div className="text-sm font-bold text-red-600 mb-1">2.3</div>
                <p className="text-xs text-muted-foreground">Pest/week</p>
              </div>
              
              <div className="text-center p-2 bg-background rounded-lg">
                <div className="text-sm font-bold text-blue-600 mb-1">15mm</div>
                <p className="text-xs text-muted-foreground">Rain/week</p>
              </div>
              
              <div className="text-center p-2 bg-background rounded-lg">
                <div className="text-sm font-bold text-green-600 mb-1">14h</div>
                <p className="text-xs text-muted-foreground">Irrigation/week</p>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default FarmJournal;