import { DashboardTopbar } from "@/components/dashboard/DashboardTopbar";
import { Bug, Camera, Shield, AlertTriangle, CheckCircle, Upload, Search, Wifi, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const recentScans = [
  { id: 1, plant: "Tomato Plant #12", status: "healthy", confidence: 98, date: "Today, 10:30 AM" },
  { id: 2, plant: "Rose Bush #3", status: "warning", disease: "Powdery Mildew", confidence: 85, date: "Today, 9:15 AM" },
  { id: 3, plant: "Basil Cluster", status: "healthy", confidence: 96, date: "Yesterday, 4:00 PM" },
  { id: 4, plant: "Pepper Plant #7", status: "healthy", confidence: 99, date: "Yesterday, 2:30 PM" },
];

const diseases = [
  { 
    id: 1, 
    name: "Powdery Mildew", 
    severity: "medium",
    affectedPlants: 2,
    description: "White powdery spots on leaves and stems",
    treatment: "Apply fungicide and improve air circulation"
  },
  { 
    id: 2, 
    name: "Leaf Spot", 
    severity: "low",
    affectedPlants: 1,
    description: "Brown or black spots on foliage",
    treatment: "Remove affected leaves and avoid overhead watering"
  },
];

export default function DiseaseDetection() {
  const [esp32Url, setEsp32Url] = useState("http://192.168.1.100");
  const [isConnected, setIsConnected] = useState(false);
  const [snapshotPreview, setSnapshotPreview] = useState<string | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);

  const handleCaptureSnapshot = async () => {
    setIsCapturing(true);
    // Simulate ESP32 CAM capture - in production, this would fetch from the actual ESP32 CAM
    setTimeout(() => {
      setSnapshotPreview("/placeholder.svg");
      setIsConnected(true);
      setIsCapturing(false);
    }, 1500);
  };

  const handleTestConnection = () => {
    setIsCapturing(true);
    setTimeout(() => {
      setIsConnected(true);
      setIsCapturing(false);
    }, 1000);
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-background">
      <DashboardTopbar title="Disease Detection" />
      
      <main className="flex-1 p-4 lg:p-6 overflow-auto">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-card rounded-2xl p-5 shadow-soft border border-border/50">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground">Healthy Plants</p>
            <p className="text-2xl font-bold text-foreground">46/48</p>
          </div>

          <div className="bg-card rounded-2xl p-5 shadow-soft border border-border/50">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-yellow-500" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground">Warnings</p>
            <p className="text-2xl font-bold text-foreground">2</p>
          </div>

          <div className="bg-card rounded-2xl p-5 shadow-soft border border-border/50">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <Camera className="w-5 h-5 text-blue-500" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground">Scans Today</p>
            <p className="text-2xl font-bold text-foreground">12</p>
          </div>

          <div className="bg-card rounded-2xl p-5 shadow-soft border border-border/50">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center">
                <Search className="w-5 h-5 text-teal-500" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground">Detection Rate</p>
            <p className="text-2xl font-bold text-foreground">99.2%</p>
          </div>
        </div>

        {/* ESP32 CAM Section */}
        <div className="bg-card rounded-2xl p-6 shadow-soft border border-border/50 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Camera className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-foreground">ESP32 CAM Snapshot</h3>
            <div className={`ml-2 flex items-center gap-1 text-xs px-2 py-1 rounded-full ${isConnected ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
              <Wifi className="w-3 h-3" />
              {isConnected ? 'Connected' : 'Disconnected'}
            </div>
          </div>
          
          {/* ESP32 CAM URL Input */}
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <div className="flex-1">
              <label className="text-sm text-muted-foreground mb-1 block">ESP32 CAM IP Address</label>
              <Input 
                value={esp32Url} 
                onChange={(e) => setEsp32Url(e.target.value)}
                placeholder="http://192.168.1.100"
                className="font-mono"
              />
            </div>
            <div className="flex items-end gap-2">
              <Button 
                variant="outline" 
                onClick={handleTestConnection}
                disabled={isCapturing}
              >
                <Wifi className="w-4 h-4 mr-2" />
                Test
              </Button>
              <Button 
                onClick={handleCaptureSnapshot}
                disabled={isCapturing}
              >
                {isCapturing ? (
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Camera className="w-4 h-4 mr-2" />
                )}
                Capture
              </Button>
            </div>
          </div>

          {/* Snapshot Preview */}
          <div className="border-2 border-dashed border-border rounded-xl p-4 text-center">
            {snapshotPreview ? (
              <div className="space-y-4">
                <div className="relative w-full max-w-md mx-auto aspect-video bg-muted rounded-lg overflow-hidden">
                  <img 
                    src={snapshotPreview} 
                    alt="ESP32 CAM Snapshot" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm px-2 py-1 rounded text-xs text-muted-foreground">
                    Live Preview
                  </div>
                </div>
                <div className="flex justify-center gap-3">
                  <Button onClick={handleCaptureSnapshot} disabled={isCapturing}>
                    {isCapturing ? (
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <RefreshCw className="w-4 h-4 mr-2" />
                    )}
                    Recapture
                  </Button>
                  <Button variant="default">
                    <Search className="w-4 h-4 mr-2" />
                    Analyze for Disease
                  </Button>
                </div>
              </div>
            ) : (
              <div className="py-8">
                <div className="w-16 h-16 rounded-2xl bg-muted mx-auto mb-4 flex items-center justify-center">
                  <Camera className="w-8 h-8 text-muted-foreground" />
                </div>
                <p className="text-foreground font-medium mb-1">Connect to ESP32 CAM</p>
                <p className="text-sm text-muted-foreground mb-4">Enter your ESP32 CAM IP address and capture a snapshot</p>
                <p className="text-xs text-muted-foreground">Supported: ESP32-CAM, AI-Thinker CAM</p>
              </div>
            )}
          </div>
        </div>

        {/* Manual Upload Section */}
        <div className="bg-card rounded-2xl p-6 shadow-soft border border-border/50 mb-6">
          <h3 className="font-semibold text-foreground mb-4">Or Upload Image Manually</h3>
          <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
            <div className="w-12 h-12 rounded-xl bg-muted mx-auto mb-3 flex items-center justify-center">
              <Upload className="w-6 h-6 text-muted-foreground" />
            </div>
            <p className="text-foreground font-medium mb-1">Drop an image here or click to upload</p>
            <p className="text-sm text-muted-foreground mb-3">Supports JPG, PNG up to 10MB</p>
            <Button variant="outline" size="sm">
              <Upload className="w-4 h-4 mr-2" />
              Browse Files
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Scans */}
          <div className="bg-card rounded-2xl p-6 shadow-soft border border-border/50">
            <h3 className="font-semibold text-foreground mb-4">Recent Scans</h3>
            <div className="space-y-3">
              {recentScans.map((scan) => (
                <div key={scan.id} className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
                  <div className="flex items-center gap-3">
                    {scan.status === 'healthy' ? (
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-primary" />
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center">
                        <AlertTriangle className="w-5 h-5 text-yellow-500" />
                      </div>
                    )}
                    <div>
                      <p className="font-medium text-foreground">{scan.plant}</p>
                      <p className="text-sm text-muted-foreground">
                        {scan.status === 'healthy' ? 'Healthy' : scan.disease}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-foreground">{scan.confidence}%</p>
                    <p className="text-xs text-muted-foreground">{scan.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Active Issues */}
          <div className="bg-card rounded-2xl p-6 shadow-soft border border-border/50">
            <h3 className="font-semibold text-foreground mb-4">Active Issues</h3>
            {diseases.length > 0 ? (
              <div className="space-y-4">
                {diseases.map((disease) => (
                  <div key={disease.id} className="p-4 rounded-xl border border-border bg-muted/30">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Bug className={`w-5 h-5 ${
                          disease.severity === 'high' ? 'text-destructive' :
                          disease.severity === 'medium' ? 'text-yellow-500' :
                          'text-blue-500'
                        }`} />
                        <span className="font-medium text-foreground">{disease.name}</span>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        disease.severity === 'high' ? 'bg-destructive/10 text-destructive' :
                        disease.severity === 'medium' ? 'bg-yellow-500/10 text-yellow-600' :
                        'bg-blue-500/10 text-blue-600'
                      }`}>
                        {disease.severity.charAt(0).toUpperCase() + disease.severity.slice(1)}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{disease.description}</p>
                    <p className="text-sm text-foreground">
                      <span className="font-medium">Treatment:</span> {disease.treatment}
                    </p>
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                      <span className="text-xs text-muted-foreground">
                        {disease.affectedPlants} plant(s) affected
                      </span>
                      <Button variant="outline" size="sm">View Details</Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <CheckCircle className="w-12 h-12 text-primary mx-auto mb-3" />
                <p className="text-foreground font-medium">All Clear!</p>
                <p className="text-sm text-muted-foreground">No active disease issues detected.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
