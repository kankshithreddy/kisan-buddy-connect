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
    <div className="min-h-screen bg-gradient-earth p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground mb-2">Farm Journal</h1>
          <p className="text-muted-foreground">Automated logs and farm activity tracking</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card className="p-4 bg-gradient-card text-center">
            <div className="text-2xl font-bold text-primary mb-1">{stats.totalEntries}</div>
            <p className="text-sm text-muted-foreground">Total Entries</p>
          </Card>
          
          <Card className="p-4 bg-gradient-card text-center">
            <div className="text-2xl font-bold text-red-600 mb-1">{stats.pestIssues}</div>
            <p className="text-sm text-muted-foreground">Pest Issues</p>
          </Card>
          
          <Card className="p-4 bg-gradient-card text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">{stats.weatherEvents}</div>
            <p className="text-sm text-muted-foreground">Weather Events</p>
          </Card>
          
          <Card className="p-4 bg-gradient-card text-center">
            <div className="text-2xl font-bold text-green-600 mb-1">{stats.irrigationCycles}</div>
            <p className="text-sm text-muted-foreground">Irrigation Cycles</p>
          </Card>
        </div>

        {/* Controls */}
        <Card className="mb-6 p-4 bg-gradient-card">
          <div className="flex flex-wrap gap-3 items-center justify-between">
            <div className="flex gap-2">
              <Button
                variant={viewMode === "timeline" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("timeline")}
              >
                <Calendar className="h-4 w-4 mr-1" />
                Timeline
              </Button>
              <Button
                variant={viewMode === "graph" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("graph")}
              >
                <BarChart3 className="h-4 w-4 mr-1" />
                Trends
              </Button>
            </div>
            
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-1" />
              Add Entry
            </Button>
          </div>
        </Card>

        {/* Filters */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Filter className="h-5 w-5 text-primary" />
            Filter by Type
          </h2>
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <Button
                key={filter.id}
                variant={selectedFilter === filter.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedFilter(filter.id)}
              >
                <filter.icon className="h-4 w-4 mr-1" />
                {filter.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Timeline View */}
        {viewMode === "timeline" && (
          <div className="space-y-4">
            {filteredEntries.map((entry) => (
              <Card key={entry.id} className="p-6 bg-gradient-card">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                    entry.type === 'pest' ? 'bg-red-500/10' :
                    entry.type === 'weather' ? 'bg-blue-500/10' :
                    entry.type === 'irrigation' ? 'bg-green-500/10' :
                    'bg-yellow-500/10'
                  }`}>
                    <entry.icon className={`h-6 w-6 ${getTypeColor(entry.type)}`} />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-foreground">{entry.title}</h3>
                      <div className="flex items-center gap-2">
                        {entry.automated && (
                          <Badge variant="secondary" className="text-xs">Auto</Badge>
                        )}
                        <Badge variant={getSeverityColor(entry.severity) as any}>
                          {entry.severity}
                        </Badge>
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-2">{entry.description}</p>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {entry.date} at {entry.time}
                      </span>
                      <span>{entry.location}</span>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-foreground mb-1">Actions Taken:</h4>
                      <ul className="text-sm space-y-1">
                        {entry.actions.map((action, index) => (
                          <li key={index} className="flex items-center gap-2 text-muted-foreground">
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
          <Card className="p-6 bg-gradient-card">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Activity Trends
            </h2>
            
            <div className="h-64 bg-background rounded-lg flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <BarChart3 className="h-12 w-12 mx-auto mb-2" />
                <p>Farm activity trends would be displayed here</p>
                <p className="text-sm">Charts showing pest frequency, weather patterns, and irrigation cycles</p>
              </div>
            </div>
            
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-3 bg-background rounded-lg">
                <div className="text-lg font-bold text-red-600 mb-1">2.3/week</div>
                <p className="text-sm text-muted-foreground">Avg Pest Issues</p>
              </div>
              
              <div className="text-center p-3 bg-background rounded-lg">
                <div className="text-lg font-bold text-blue-600 mb-1">15mm/week</div>
                <p className="text-sm text-muted-foreground">Avg Rainfall</p>
              </div>
              
              <div className="text-center p-3 bg-background rounded-lg">
                <div className="text-lg font-bold text-green-600 mb-1">14h/week</div>
                <p className="text-sm text-muted-foreground">Irrigation Time</p>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default FarmJournal;