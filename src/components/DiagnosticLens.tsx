import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Camera, 
  Mic, 
  RotateCcw, 
  BookOpen, 
  AlertTriangle,
  CheckCircle,
  Droplets,
  Bug,
  Leaf
} from "lucide-react";
import cropHealth from "@/assets/crop-health.jpg";

const DiagnosticLens = () => {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [diagnosis, setDiagnosis] = useState<any>(null);

  const handleImageCapture = () => {
    // Simulate image capture
    setCapturedImage(cropHealth);
    setIsAnalyzing(true);
    
    // Simulate analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      setDiagnosis({
        disease: "Leaf Curl Virus",
        confidence: 85,
        severity: "Medium",
        affected_area: "30%",
        solutions: [
          {
            type: "Immediate",
            action: "Apply Neem Oil Spray",
            icon: Droplets,
            description: "Mix 30ml neem oil with 1L water and spray in evening"
          },
          {
            type: "Preventive", 
            action: "Remove Affected Leaves",
            icon: Leaf,
            description: "Carefully remove and dispose of infected leaves"
          },
          {
            type: "Treatment",
            action: "Use Organic Pesticide",
            icon: Bug,
            description: "Apply organic pesticide every 7 days for 3 weeks"
          }
        ]
      });
    }, 2000);
  };

  const handleRetake = () => {
    setCapturedImage(null);
    setDiagnosis(null);
  };

  const handleLogToJournal = () => {
    // Log to farm journal
    console.log("Logged to farm journal:", diagnosis);
  };

  return (
    <div className="h-full bg-gradient-earth flex flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-xl font-semibold text-foreground">Diagnostic Lens</h1>
          <p className="text-muted-foreground text-sm">Take a photo or describe your crop concern</p>
        </div>

        {/* Camera Interface */}
        <Card className="bg-gradient-card">
          <div className="aspect-video bg-muted rounded-lg flex items-center justify-center relative overflow-hidden">
            {capturedImage ? (
              <img src={capturedImage} alt="Captured crop" className="w-full h-full object-cover" />
            ) : (
              <div className="text-center">
                <Camera className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground text-sm">Point camera at your crop</p>
              </div>
            )}
            
            {isAnalyzing && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mx-auto mb-2"></div>
                  <p className="text-sm">Analyzing...</p>
                </div>
              </div>
            )}
          </div>
          
          <div className="p-4">
            <div className="flex gap-2 justify-center">
              <Button 
                variant="mic" 
                size="mic"
                onClick={handleImageCapture}
                disabled={isAnalyzing}
                className="flex-shrink-0 h-12 w-12"
              >
                <Camera className="h-6 w-6" />
              </Button>
              
              <Button variant="outline" size="sm" className="flex-1">
                <Mic className="h-4 w-4 mr-1" />
                Describe
              </Button>
              
              {capturedImage && (
                <Button variant="outline" size="sm" onClick={handleRetake}>
                  <RotateCcw className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </Card>

        {/* Diagnosis Results */}
        {diagnosis && (
          <div className="space-y-3">
            <Card className="p-4 bg-gradient-card">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-medium text-foreground">Diagnosis</h2>
                <Badge variant="secondary" className="text-xs">{diagnosis.confidence}% confident</Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="text-center p-3 bg-background rounded-lg">
                  <AlertTriangle className="h-6 w-6 text-destructive mx-auto mb-1" />
                  <p className="font-medium text-foreground text-sm">{diagnosis.disease}</p>
                  <p className="text-xs text-muted-foreground">Issue</p>
                </div>
                
                <div className="text-center p-3 bg-background rounded-lg">
                  <div className="h-6 w-6 mx-auto mb-1 rounded-full bg-destructive flex items-center justify-center">
                    <span className="text-white font-bold text-xs">{diagnosis.affected_area}</span>
                  </div>
                  <p className="font-medium text-foreground text-sm">{diagnosis.severity}</p>
                  <p className="text-xs text-muted-foreground">Severity</p>
                </div>
              </div>
            </Card>

            {/* Solutions */}
            <div>
              <h3 className="text-base font-medium mb-2 text-foreground">Solutions</h3>
              <div className="space-y-2">
                {diagnosis.solutions.slice(0, 2).map((solution: any, index: number) => (
                  <Card key={index} className="p-3 bg-gradient-card">
                    <div className="flex items-start gap-2">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                        <solution.icon className="h-4 w-4 text-primary-foreground" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-foreground text-sm">{solution.action}</h4>
                          <Badge variant="outline" className="text-xs">{solution.type}</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">{solution.description}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button variant="default" size="sm" onClick={handleLogToJournal} className="flex-1">
                <BookOpen className="h-4 w-4 mr-1" />
                Log to Journal
              </Button>
              
              <Button variant="outline" size="sm" onClick={handleRetake} className="flex-1">
                <RotateCcw className="h-4 w-4 mr-1" />
                Retake
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiagnosticLens;