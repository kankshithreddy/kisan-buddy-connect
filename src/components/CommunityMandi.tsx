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
    <div className="min-h-screen bg-gradient-earth p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground mb-2">Community Mandi</h1>
          <p className="text-muted-foreground">Market prices and logistics coordination</p>
        </div>

        {/* Crop Selection */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3 text-foreground">Select Your Crop</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {crops.map((crop) => (
              <Button
                key={crop.id}
                variant={selectedCrop === crop.id ? "default" : "outline"}
                className="p-4 h-auto flex-col"
                onClick={() => setSelectedCrop(crop.id)}
              >
                <span className="font-medium">{crop.name}</span>
                <span className="text-sm">₹{crop.price}/{crop.unit}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Price Dashboard */}
        {selectedCropData && (
          <Card className="mb-6 p-6 bg-gradient-card">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <IndianRupee className="h-8 w-8 text-primary" />
                  <span className="text-3xl font-bold text-foreground">
                    {selectedCropData.price}
                  </span>
                  <span className="text-muted-foreground">/{selectedCropData.unit}</span>
                </div>
                <p className="text-sm text-muted-foreground">Current Price</p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  {selectedCropData.trend === "up" ? (
                    <TrendingUp className="h-6 w-6 text-green-500" />
                  ) : (
                    <TrendingDown className="h-6 w-6 text-red-500" />
                  )}
                  <span className={`text-2xl font-bold ${
                    selectedCropData.trend === "up" ? "text-green-500" : "text-red-500"
                  }`}>
                    {selectedCropData.change > 0 ? "+" : ""}{selectedCropData.change}%
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">24h Change</p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Clock className="h-6 w-6 text-primary" />
                  <Badge variant="outline">Market Open</Badge>
                </div>
                <p className="text-sm text-muted-foreground">6 AM - 6 PM</p>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-background rounded-lg">
              <h3 className="font-semibold text-foreground mb-2">Market Forecast</h3>
              <p className="text-sm text-muted-foreground">{selectedCropData.forecast}</p>
            </div>
          </Card>
        )}

        {/* Profit Calculator */}
        <Card className="mb-6 p-6 bg-gradient-card">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Calculator className="h-5 w-5 text-primary" />
            Profit Calculator
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-background rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Quantity</p>
              <p className="text-2xl font-bold text-foreground">100 kg</p>
            </div>
            
            <div className="p-4 bg-background rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Expected Revenue</p>
              <p className="text-2xl font-bold text-green-600">₹4,500</p>
            </div>
            
            <div className="p-4 bg-background rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Transport Cost</p>
              <p className="text-2xl font-bold text-orange-600">₹300</p>
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-primary/10 rounded-lg">
            <p className="text-sm text-muted-foreground">Net Profit</p>
            <p className="text-3xl font-bold text-primary">₹4,200</p>
          </div>
        </Card>

        {/* Logistics Coordination */}
        <Card className="mb-6 p-6 bg-gradient-card">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Truck className="h-5 w-5 text-primary" />
            Logistics Coordination
          </h2>
          
          <div className="space-y-4">
            {logistics.map((item, index) => (
              <div key={index} className="p-4 bg-background rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-medium text-foreground">{item.name}</h3>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {item.location}
                    </p>
                  </div>
                  <Badge variant="outline">{item.crop}</Badge>
                </div>
                
                <p className="text-sm text-muted-foreground mb-3">{item.message}</p>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-foreground">
                    Quantity: {item.quantity}
                  </span>
                  <Button variant="outline" size="sm">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    Connect
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <Button variant="default" className="w-full mt-4">
            <Users className="h-5 w-5 mr-2" />
            Join Transport Group
          </Button>
        </Card>

        {/* Nearby Mandis */}
        <Card className="p-6 bg-gradient-card">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            Nearby Mandis
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-background rounded-lg">
              <h3 className="font-medium text-foreground mb-2">Azadpur Mandi</h3>
              <p className="text-sm text-muted-foreground mb-2">12 km away • Opens 6 AM</p>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-green-600">Best Price</span>
                <Button variant="outline" size="sm">View Details</Button>
              </div>
            </div>
            
            <div className="p-4 bg-background rounded-lg">
              <h3 className="font-medium text-foreground mb-2">Ghazipur Mandi</h3>
              <p className="text-sm text-muted-foreground mb-2">18 km away • Opens 5 AM</p>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-orange-600">Good Volume</span>
                <Button variant="outline" size="sm">View Details</Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CommunityMandi;