import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Mic, 
  MessageSquare, 
  FileText, 
  CheckCircle, 
  ExternalLink,
  IndianRupee,
  Calendar,
  AlertCircle,
  User,
  Building,
  CreditCard
} from "lucide-react";

const SarkariSahayak = () => {
  const [isListening, setIsListening] = useState(false);
  const [chatHistory, setChatHistory] = useState([
    {
      type: "user",
      message: "Are there subsidies for drip irrigation?",
      timestamp: "2 min ago"
    },
    {
      type: "assistant",
      message: "Yes! There are several schemes available for drip irrigation subsidies. The Pradhan Mantri Krishi Sinchai Yojana (PMKSY) provides up to 55% subsidy for drip irrigation systems.",
      timestamp: "2 min ago"
    }
  ]);

  const schemes = [
    {
      title: "Pradhan Mantri Krishi Sinchai Yojana",
      subtitle: "Drip Irrigation Subsidy",
      subsidy: "55%",
      amount: "₹50,000",
      deadline: "Dec 31, 2024",
      status: "eligible",
      category: "Irrigation",
      requirements: ["Aadhaar Card", "Land documents", "Bank passbook", "Caste certificate (if applicable)"],
      description: "Financial assistance for micro-irrigation systems to improve water efficiency"
    },
    {
      title: "PM-KISAN",
      subtitle: "Income Support Scheme", 
      subsidy: "Direct Transfer",
      amount: "₹6,000/year",
      deadline: "Ongoing",
      status: "applied",
      category: "Income Support",
      requirements: ["Aadhaar Card", "Bank account", "Land ownership proof"],
      description: "Direct income support of ₹6,000 per year to all farmer families"
    },
    {
      title: "Soil Health Card Scheme",
      subtitle: "Free Soil Testing",
      subsidy: "100%",
      amount: "Free",
      deadline: "Mar 31, 2025",
      status: "available",
      category: "Soil Health",
      requirements: ["Aadhaar Card", "Land documents"],
      description: "Free soil testing and nutrient management recommendations"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "eligible": return "default";
      case "applied": return "secondary";
      case "available": return "outline";
      default: return "outline";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "eligible": return CheckCircle;
      case "applied": return Calendar;
      case "available": return AlertCircle;
      default: return FileText;
    }
  };

  const handleVoiceInput = () => {
    setIsListening(!isListening);
  };

  const handleSendMessage = (message: string) => {
    const newChat = [
      ...chatHistory,
      { type: "user", message, timestamp: "now" },
      { 
        type: "assistant", 
        message: "I'm analyzing government schemes for your query. Please wait...", 
        timestamp: "now" 
      }
    ];
    setChatHistory(newChat);
  };

  return (
    <div className="h-full bg-gradient-earth flex flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-xl font-semibold text-foreground">Sarkari Sahayak</h1>
          <p className="text-muted-foreground text-sm">Government scheme navigator and support</p>
        </div>

        {/* Voice Input Section */}
        <Card className="p-4 bg-gradient-card">
          <h2 className="text-base font-medium mb-3 flex items-center gap-2">
            <Mic className="h-4 w-4 text-primary" />
            Ask About Schemes
          </h2>
          
          <div className="text-center mb-3">
            <Button
              variant="mic"
              size="mic"
              onClick={handleVoiceInput}
              className={`mx-auto ${isListening ? 'animate-pulse' : ''} h-12 w-12`}
            >
              <Mic className="h-6 w-6" />
            </Button>
            <p className="mt-2 text-muted-foreground text-sm">
              {isListening ? "Listening..." : "Ask about subsidies"}
            </p>
          </div>
          
          {/* Quick Questions */}
          <div className="grid grid-cols-1 gap-2">
            <Button 
              variant="outline" 
              className="text-left p-3 h-auto text-xs"
              onClick={() => handleSendMessage("What are the loan schemes available?")}
            >
              <MessageSquare className="h-3 w-3 mr-2 flex-shrink-0" />
              <span>Loan schemes available?</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="text-left p-3 h-auto text-xs"
              onClick={() => handleSendMessage("How to apply for crop insurance?")}
            >
              <MessageSquare className="h-3 w-3 mr-2 flex-shrink-0" />
              <span>Crop insurance process?</span>
            </Button>
          </div>
        </Card>

        {/* Available Schemes */}
        <div>
          <h2 className="text-base font-medium mb-3 flex items-center gap-2">
            <FileText className="h-4 w-4 text-primary" />
            Available Schemes
          </h2>
          
          <div className="space-y-3">
            {schemes.slice(0, 2).map((scheme, index) => {
              const StatusIcon = getStatusIcon(scheme.status);
              return (
                <Card key={index} className="p-4 bg-gradient-card">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-medium text-foreground text-sm mb-1">{scheme.title}</h3>
                      <p className="text-xs text-muted-foreground">{scheme.subtitle}</p>
                    </div>
                    <Badge variant={getStatusColor(scheme.status) as any} className="text-xs">
                      <StatusIcon className="h-3 w-3 mr-1" />
                      {scheme.status}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    <div className="text-center p-2 bg-background rounded-lg">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <IndianRupee className="h-3 w-3 text-primary" />
                        <span className="font-bold text-primary text-sm">{scheme.amount}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Amount</p>
                    </div>
                    
                    <div className="text-center p-2 bg-background rounded-lg">
                      <div className="font-bold text-green-600 mb-1 text-sm">{scheme.subsidy}</div>
                      <p className="text-xs text-muted-foreground">Subsidy</p>
                    </div>
                    
                    <div className="text-center p-2 bg-background rounded-lg">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <Calendar className="h-3 w-3 text-orange-600" />
                        <span className="font-bold text-orange-600 text-xs">{scheme.deadline}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Deadline</p>
                    </div>
                  </div>
                  
                  <p className="text-xs text-muted-foreground mb-3">{scheme.description}</p>
                  
                  <div className="flex gap-2">
                    <Button variant="default" size="sm" className="flex-1 text-xs">
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Apply
                    </Button>
                    <Button variant="outline" size="sm" className="text-xs">
                      <MessageSquare className="h-3 w-3 mr-1" />
                      Help
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* My Applications */}
        <Card className="p-4 bg-gradient-card">
          <h2 className="text-base font-medium mb-3 flex items-center gap-2">
            <User className="h-4 w-4 text-primary" />
            My Applications
          </h2>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 bg-background rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-green-500/10 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-3 w-3 text-green-500" />
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm">PM-KISAN</p>
                  <p className="text-xs text-muted-foreground">Approved</p>
                </div>
              </div>
              <Badge variant="secondary" className="text-xs">Active</Badge>
            </div>
            
            <div className="flex items-center justify-between p-2 bg-background rounded-lg">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-orange-500/10 rounded-full flex items-center justify-center">
                  <Calendar className="h-3 w-3 text-orange-500" />
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm">Drip Irrigation</p>
                  <p className="text-xs text-muted-foreground">Under review</p>
                </div>
              </div>
              <Badge variant="outline" className="text-xs">Pending</Badge>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SarkariSahayak;