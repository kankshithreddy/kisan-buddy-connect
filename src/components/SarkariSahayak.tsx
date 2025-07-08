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
    <div className="min-h-screen bg-gradient-earth p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground mb-2">Sarkari Sahayak</h1>
          <p className="text-muted-foreground">Government scheme navigator and support</p>
        </div>

        {/* Voice Input Section */}
        <Card className="mb-6 p-6 bg-gradient-card">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Mic className="h-5 w-5 text-primary" />
            Ask About Government Schemes
          </h2>
          
          <div className="text-center mb-4">
            <Button
              variant="mic"
              size="mic"
              onClick={handleVoiceInput}
              className={`mx-auto ${isListening ? 'animate-pulse' : ''}`}
            >
              <Mic className="h-8 w-8" />
            </Button>
            <p className="mt-3 text-muted-foreground">
              {isListening ? "Listening to your question..." : "Ask about subsidies, schemes, or eligibility"}
            </p>
          </div>
          
          {/* Quick Questions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Button 
              variant="outline" 
              className="text-left p-4 h-auto"
              onClick={() => handleSendMessage("What are the loan schemes available?")}
            >
              <MessageSquare className="h-4 w-4 mr-2 flex-shrink-0" />
              <span className="text-sm">What are the loan schemes available?</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="text-left p-4 h-auto"
              onClick={() => handleSendMessage("How to apply for crop insurance?")}
            >
              <MessageSquare className="h-4 w-4 mr-2 flex-shrink-0" />
              <span className="text-sm">How to apply for crop insurance?</span>
            </Button>
          </div>
        </Card>

        {/* Chat Interface */}
        <Card className="mb-6 p-6 bg-gradient-card">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            Chat Assistant
          </h2>
          
          <div className="space-y-4 max-h-64 overflow-y-auto">
            {chatHistory.map((chat, index) => (
              <div 
                key={index} 
                className={`flex ${chat.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] rounded-lg p-3 ${
                  chat.type === 'user' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-background text-foreground'
                }`}>
                  <p className="text-sm">{chat.message}</p>
                  <p className="text-xs opacity-70 mt-1">{chat.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Available Schemes */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Available Schemes
          </h2>
          
          <div className="space-y-4">
            {schemes.map((scheme, index) => {
              const StatusIcon = getStatusIcon(scheme.status);
              return (
                <Card key={index} className="p-6 bg-gradient-card">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{scheme.title}</h3>
                      <p className="text-sm text-muted-foreground">{scheme.subtitle}</p>
                    </div>
                    <Badge variant={getStatusColor(scheme.status) as any}>
                      <StatusIcon className="h-3 w-3 mr-1" />
                      {scheme.status}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="text-center p-3 bg-background rounded-lg">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <IndianRupee className="h-4 w-4 text-primary" />
                        <span className="font-bold text-primary">{scheme.amount}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Maximum Amount</p>
                    </div>
                    
                    <div className="text-center p-3 bg-background rounded-lg">
                      <div className="font-bold text-green-600 mb-1">{scheme.subsidy}</div>
                      <p className="text-xs text-muted-foreground">Subsidy</p>
                    </div>
                    
                    <div className="text-center p-3 bg-background rounded-lg">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <Calendar className="h-4 w-4 text-orange-600" />
                        <span className="font-bold text-orange-600 text-sm">{scheme.deadline}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Deadline</p>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-4">{scheme.description}</p>
                  
                  <div className="mb-4">
                    <h4 className="font-medium text-foreground mb-2">Required Documents:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {scheme.requirements.map((req, reqIndex) => (
                        <div key={reqIndex} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-3 w-3 text-green-500" />
                          <span className="text-muted-foreground">{req}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <Button variant="default" size="sm" className="flex-1">
                      <ExternalLink className="h-4 w-4 mr-1" />
                      Apply Now
                    </Button>
                    <Button variant="outline" size="sm">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Get Help
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Application Status */}
        <Card className="p-6 bg-gradient-card">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            My Applications
          </h2>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-background rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-500/10 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </div>
                <div>
                  <p className="font-medium text-foreground">PM-KISAN</p>
                  <p className="text-sm text-muted-foreground">Application approved</p>
                </div>
              </div>
              <Badge variant="secondary">Active</Badge>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-background rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-orange-500/10 rounded-full flex items-center justify-center">
                  <Calendar className="h-4 w-4 text-orange-500" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Drip Irrigation Subsidy</p>
                  <p className="text-sm text-muted-foreground">Under review</p>
                </div>
              </div>
              <Badge variant="outline">Pending</Badge>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SarkariSahayak;