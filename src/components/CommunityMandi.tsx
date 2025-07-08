import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  TrendingDown, 
  MapPin, 
  Truck, 
  Users, 
  Clock,
  IndianRupee,
  Calculator,
  MessageSquare
} from "lucide-react";

const CommunityMandi = () => {
  const [selectedCrop, setSelectedCrop] = useState("tomato");
  
  const crops = [
    { 
      name: "Tomato", 
      id: "tomato", 
      price: 45, 
      change: 15, 
      trend: "up",
      forecast: "Hold for 2 weeks - prices expected to rise further",
      unit: "kg"
    },
    { 
      name: "Onion", 
      id: "onion", 
      price: 32, 
      change: -8, 
      trend: "down",
      forecast: "Sell now - oversupply expected",
      unit: "kg"
    },
    { 
      name: "Wheat", 
      id: "wheat", 
      price: 2250, 
      change: 5, 
      trend: "up",
      forecast: "Stable - good time to sell",
      unit: "quintal"
    },
    { 
      name: "Cotton", 
      id: "cotton", 
      price: 6200, 
      change: -3, 
      trend: "down",
      forecast: "Wait 1 month - demand will increase",
      unit: "quintal"
    }
  ];

  const logistics = [
    {
      name: "Sita Devi",
      crop: "Tomato",
      quantity: "50 kg",
      location: "2 km away",
      message: "Going to Azadpur mandi tomorrow morning"
    },
    {
      name: "Ravi Kumar", 
      crop: "Onion",
      quantity: "2 quintals",
      location: "5 km away",
      message: "Truck available, need 2 more farmers"
    }
  ];

  const selectedCropData = crops.find(c => c.id === selectedCrop);

  return (
    <div className="h-full bg-gradient-earth flex flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-xl font-semibold text-foreground">Community Mandi</h1>
          <p className="text-muted-foreground text-sm">Market prices and logistics coordination</p>
        </div>

        {/* Crop Selection */}
        <div>
          <h2 className="text-base font-medium mb-2 text-foreground">Select Your Crop</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {crops.map((crop) => (
              <Button
                key={crop.id}
                variant={selectedCrop === crop.id ? "default" : "outline"}
                className="p-2 h-auto flex-col text-xs"
                onClick={() => setSelectedCrop(crop.id)}
              >
                <span className="font-medium">{crop.name}</span>
                <span className="text-xs">₹{crop.price}/{crop.unit}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Price Dashboard */}
        {selectedCropData && (
          <Card className="p-4 bg-gradient-card">
            <div className="grid grid-cols-3 gap-4 mb-3">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <IndianRupee className="h-6 w-6 text-primary" />
                  <span className="text-2xl font-bold text-foreground">
                    {selectedCropData.price}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">Current Price</p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  {selectedCropData.trend === "up" ? (
                    <TrendingUp className="h-5 w-5 text-green-500" />
                  ) : (
                    <TrendingDown className="h-5 w-5 text-red-500" />
                  )}
                  <span className={`text-xl font-bold ${
                    selectedCropData.trend === "up" ? "text-green-500" : "text-red-500"
                  }`}>
                    {selectedCropData.change > 0 ? "+" : ""}{selectedCropData.change}%
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">24h Change</p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Clock className="h-5 w-5 text-primary" />
                  <Badge variant="outline" className="text-xs">Open</Badge>
                </div>
                <p className="text-xs text-muted-foreground">6AM - 6PM</p>
              </div>
            </div>
            
            <div className="p-3 bg-background rounded-lg">
              <h3 className="font-medium text-foreground mb-1 text-sm">Market Forecast</h3>
              <p className="text-xs text-muted-foreground">{selectedCropData.forecast}</p>
            </div>
          </Card>
        )}

        {/* Profit Calculator */}
        <Card className="p-4 bg-gradient-card">
          <h2 className="text-base font-medium mb-3 flex items-center gap-2">
            <Calculator className="h-4 w-4 text-primary" />
            Profit Calculator
          </h2>
          
          <div className="grid grid-cols-3 gap-2 mb-3">
            <div className="p-3 bg-background rounded-lg text-center">
              <p className="text-xs text-muted-foreground mb-1">Quantity</p>
              <p className="text-lg font-bold text-foreground">100 kg</p>
            </div>
            
            <div className="p-3 bg-background rounded-lg text-center">
              <p className="text-xs text-muted-foreground mb-1">Revenue</p>
              <p className="text-lg font-bold text-green-600">₹4,500</p>
            </div>
            
            <div className="p-3 bg-background rounded-lg text-center">
              <p className="text-xs text-muted-foreground mb-1">Transport</p>
              <p className="text-lg font-bold text-orange-600">₹300</p>
            </div>
          </div>
          
          <div className="p-3 bg-primary/10 rounded-lg text-center">
            <p className="text-xs text-muted-foreground">Net Profit</p>
            <p className="text-2xl font-bold text-primary">₹4,200</p>
          </div>
        </Card>

        {/* Logistics */}
        <Card className="p-4 bg-gradient-card">
          <h2 className="text-base font-medium mb-3 flex items-center gap-2">
            <Truck className="h-4 w-4 text-primary" />
            Logistics
          </h2>
          
          <div className="space-y-2">
            {logistics.slice(0, 2).map((item, index) => (
              <div key={index} className="p-3 bg-background rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-medium text-foreground text-sm">{item.name}</h3>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {item.location}
                    </p>
                  </div>
                  <Badge variant="outline" className="text-xs">{item.crop}</Badge>
                </div>
                
                <p className="text-xs text-muted-foreground mb-2">{item.message}</p>
                
                <div className="flex justify-between items-center">
                  <span className="text-xs font-medium text-foreground">
                    {item.quantity}
                  </span>
                  <Button variant="outline" size="sm" className="text-xs h-6">
                    <MessageSquare className="h-3 w-3 mr-1" />
                    Connect
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CommunityMandi;