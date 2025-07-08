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
    <div className="min-h-screen bg-gradient-earth p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground mb-2">Diagnostic Lens</h1>
          <p className="text-muted-foreground">Take a photo or describe your crop concern</p>
        </div>

        {/* Camera Interface */}
        <Card className="mb-6 bg-gradient-card">
          <div className="aspect-square bg-muted rounded-lg flex items-center justify-center relative overflow-hidden">
            {capturedImage ? (
              <img src={capturedImage} alt="Captured crop" className="w-full h-full object-cover" />
            ) : (
              <div className="text-center">
                <Camera className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Point camera at your crop</p>
              </div>
            )}
            
            {isAnalyzing && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
                  <p>Analyzing crop health...</p>
                </div>
              </div>
            )}
          </div>
          
          <div className="p-4">
            <div className="flex gap-3 justify-center">
              <Button 
                variant="mic" 
                size="mic"
                onClick={handleImageCapture}
                disabled={isAnalyzing}
                className="flex-shrink-0"
              >
                <Camera className="h-8 w-8" />
              </Button>
              
              <Button variant="outline" size="lg" className="flex-1">
                <Mic className="h-5 w-5 mr-2" />
                Describe the problem
              </Button>
              
              {capturedImage && (
                <Button variant="outline" size="icon" onClick={handleRetake}>
                  <RotateCcw className="h-5 w-5" />
                </Button>
              )}
            </div>
          </div>
        </Card>

        {/* Diagnosis Results */}
        {diagnosis && (
          <div className="space-y-4">
            <Card className="p-6 bg-gradient-card">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-foreground">Diagnosis Results</h2>
                <Badge variant="secondary">{diagnosis.confidence}% confident</Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center p-4 bg-background rounded-lg">
                  <AlertTriangle className="h-8 w-8 text-destructive mx-auto mb-2" />
                  <p className="font-medium text-foreground">{diagnosis.disease}</p>
                  <p className="text-sm text-muted-foreground">Identified Issue</p>
                </div>
                
                <div className="text-center p-4 bg-background rounded-lg">
                  <div className="h-8 w-8 mx-auto mb-2 rounded-full bg-destructive flex items-center justify-center">
                    <span className="text-white font-bold text-sm">{diagnosis.affected_area}</span>
                  </div>
                  <p className="font-medium text-foreground">{diagnosis.severity} Severity</p>
                  <p className="text-sm text-muted-foreground">Affected Area</p>
                </div>
              </div>
            </Card>

            {/* Solutions */}
            <div>
              <h3 className="text-lg font-semibold mb-3 text-foreground">Recommended Solutions</h3>
              <div className="space-y-3">
                {diagnosis.solutions.map((solution: any, index: number) => (
                  <Card key={index} className="p-4 bg-gradient-card">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                        <solution.icon className="h-5 w-5 text-primary-foreground" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-medium text-foreground">{solution.action}</h4>
                          <Badge variant="outline">{solution.type}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{solution.description}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button variant="default" size="lg" onClick={handleLogToJournal} className="flex-1">
                <BookOpen className="h-5 w-5 mr-2" />
                Log to Journal
              </Button>
              
              <Button variant="outline" size="lg" onClick={handleRetake} className="flex-1">
                <RotateCcw className="h-5 w-5 mr-2" />
                Retake Photo
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiagnosticLens;