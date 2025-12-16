import { DashboardTopbar } from "@/components/dashboard/DashboardTopbar";
import { Bug, Camera, Shield, AlertTriangle, CheckCircle, Upload, Search, Wifi, RefreshCw, Droplets, Bell, MessageSquare, Leaf, BarChart3, Calendar, TrendingUp, Plus, Image, XCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useRef } from "react";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDiseaseDetection, useESP32Cam, useManualImageUpload } from "@/hooks/useDiseaseDetection";
import { detectDisease } from "@/services/api";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

/**
 * Disease Detection Page
 * 
 * API MAPPINGS:
 * - Disease Analysis: POST /api/disease/detect → disease_name, confidence, treatment
 * - ESP32 Capture: GET /api/esp32/capture?ip={ip} → image blob
 * - ESP32 Test: GET /api/esp32/test?ip={ip} → connection status
 * 
 * BACKEND TO CONFIRM: ESP32 CAM endpoints may need adjustment based on implementation
 */

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

const plants = [
  { id: 1, name: "Tomato Plant #12", zone: "Zone A", health: 98, lastScan: "2h ago" },
  { id: 2, name: "Rose Bush #3", zone: "Zone B", health: 72, lastScan: "3h ago", issue: "Powdery Mildew" },
  { id: 3, name: "Basil Cluster", zone: "Zone A", health: 95, lastScan: "1d ago" },
  { id: 4, name: "Pepper Plant #7", zone: "Zone C", health: 99, lastScan: "1d ago" },
  { id: 5, name: "Cucumber Vine", zone: "Zone B", health: 88, lastScan: "2d ago" },
];

const seasonalInsights = [
  { season: "Current", insight: "High humidity expected - monitor for fungal diseases", risk: "medium" },
  { season: "Next Week", insight: "Temperature drop may stress tropical plants", risk: "low" },
  { season: "This Month", insight: "Peak pest season - increase monitoring frequency", risk: "high" },
];

const analyticsData = {
  totalScans: 156,
  issuesDetected: 12,
  issuesResolved: 10,
  avgDetectionTime: "2.3s",
  accuracy: 99.2,
};

export default function DiseaseDetection() {
  const [esp32Url, setEsp32Url] = useState("http://192.168.1.100");
  const [autoIrrigation, setAutoIrrigation] = useState(true);
  const [whatsappAlerts, setWhatsappAlerts] = useState(false);
  const [smsAlerts, setSmsAlerts] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isAddPlantOpen, setIsAddPlantOpen] = useState(false);
  const [newPlantName, setNewPlantName] = useState("");
  const [newPlantZone, setNewPlantZone] = useState("");
  const [activeImageSource, setActiveImageSource] = useState<"esp32" | "upload">("esp32");
  
  // File input ref for manual upload
  const fileInputRef = useRef<HTMLInputElement>(null);

  // API hooks
  const esp32Cam = useESP32Cam();
  const manualUpload = useManualImageUpload();
  const diseaseDetection = useDiseaseDetection();

  // Handle ESP32 capture - calls GET /api/esp32/capture
  const handleCaptureSnapshot = () => {
    esp32Cam.captureSnapshot(esp32Url);
    setActiveImageSource("esp32");
  };

  // Handle ESP32 connection test - calls GET /api/esp32/test
  const handleTestConnection = async () => {
    toast.loading("Testing ESP32 connection...", { id: "esp32-test" });
    esp32Cam.testConnection(esp32Url, {
      onSuccess: (connected) => {
        if (connected) {
          toast.success("ESP32 CAM connected successfully!", { 
            id: "esp32-test",
            description: `Device found at ${esp32Url}`
          });
        } else {
          toast.error("ESP32 CAM not reachable", { 
            id: "esp32-test",
            description: "Check the IP address and ensure the device is powered on"
          });
        }
      },
      onError: () => {
        toast.error("Connection test failed", { 
          id: "esp32-test",
          description: "Network error - check your connection"
        });
      }
    });
  };

  // Handle manual file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      manualUpload.handleFileSelect(file);
      setActiveImageSource("upload");
    }
  };

  // Trigger file input click
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  // Analyze current image - calls POST /api/disease/detect
  const handleAnalyze = async () => {
    let imageToAnalyze: File | Blob | null = null;

    if (activeImageSource === "upload" && manualUpload.file) {
      imageToAnalyze = manualUpload.file;
    } else if (activeImageSource === "esp32" && esp32Cam.snapshot) {
      // Convert blob URL to blob for analysis
      const response = await fetch(esp32Cam.snapshot);
      imageToAnalyze = await response.blob();
    }

    if (imageToAnalyze) {
      diseaseDetection.analyze(imageToAnalyze);
    }
  };

  // Get current preview image
  const currentPreview = activeImageSource === "upload" 
    ? manualUpload.previewUrl 
    : esp32Cam.snapshot;

  const hasImage = !!currentPreview;

  const handleAddPlant = () => {
    if (!newPlantName.trim() || !newPlantZone) {
      toast.error("Please fill all fields");
      return;
    }
    toast.success("Plant added", { description: `${newPlantName} added to ${newPlantZone}` });
    setNewPlantName("");
    setNewPlantZone("");
    setIsAddPlantOpen(false);
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

        {/* Control Toggles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Auto Irrigation */}
          <div className="bg-card rounded-2xl p-5 shadow-soft border border-border/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                  <Droplets className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Auto Irrigation</p>
                  <p className="text-xs text-muted-foreground">Water when disease detected</p>
                </div>
              </div>
              <Switch checked={autoIrrigation} onCheckedChange={setAutoIrrigation} />
            </div>
          </div>

          {/* WhatsApp Alerts */}
          <div className="bg-card rounded-2xl p-5 shadow-soft border border-border/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <p className="font-medium text-foreground">WhatsApp Alerts</p>
                  <p className="text-xs text-muted-foreground">Get instant notifications</p>
                </div>
              </div>
              <Switch checked={whatsappAlerts} onCheckedChange={setWhatsappAlerts} />
            </div>
          </div>

          {/* SMS Alerts */}
          <div className="bg-card rounded-2xl p-5 shadow-soft border border-border/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                  <Bell className="w-5 h-5 text-purple-500" />
                </div>
                <div>
                  <p className="font-medium text-foreground">SMS Alerts</p>
                  <p className="text-xs text-muted-foreground">Text message notifications</p>
                </div>
              </div>
              <Switch checked={smsAlerts} onCheckedChange={setSmsAlerts} />
            </div>
          </div>
        </div>

        {/* Alert Phone Number Input */}
        {(whatsappAlerts || smsAlerts) && (
          <div className="bg-card rounded-2xl p-5 shadow-soft border border-border/50 mb-6">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <label className="text-sm text-muted-foreground mb-1 block">Phone Number for Alerts</label>
                <Input 
                  value={phoneNumber} 
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="+1 234 567 8900"
                  type="tel"
                />
              </div>
              <div className="flex items-end">
                <Button>Save Number</Button>
              </div>
            </div>
          </div>
        )}

        {/* Image Capture Section - ESP32 CAM + Manual Upload */}
        <div className="bg-card rounded-2xl p-6 shadow-soft border border-border/50 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Camera className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-foreground">Image Capture</h3>
            </div>
            {esp32Cam.isConnected && (
              <div className="flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                <Wifi className="w-3 h-3" />
                ESP32 Connected
              </div>
            )}
          </div>

          {/* Tabs for ESP32 vs Manual Upload */}
          <Tabs defaultValue="esp32" className="mb-4">
            <TabsList className="grid w-full grid-cols-2 max-w-md">
              <TabsTrigger value="esp32" onClick={() => setActiveImageSource("esp32")}>
                <Wifi className="w-4 h-4 mr-2" />
                ESP32 CAM
              </TabsTrigger>
              <TabsTrigger value="upload" onClick={() => setActiveImageSource("upload")}>
                <Upload className="w-4 h-4 mr-2" />
                Upload Image
              </TabsTrigger>
            </TabsList>

            {/* ESP32 CAM Tab - GET /api/esp32/capture */}
            <TabsContent value="esp32" className="mt-4">
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
                    disabled={esp32Cam.isTestingConnection}
                  >
                    {esp32Cam.isTestingConnection ? (
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Wifi className="w-4 h-4 mr-2" />
                    )}
                    Test
                  </Button>
                  <Button 
                    onClick={handleCaptureSnapshot} 
                    disabled={esp32Cam.isCapturing}
                  >
                    {esp32Cam.isCapturing ? (
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Camera className="w-4 h-4 mr-2" />
                    )}
                    Capture
                  </Button>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                {/* BACKEND TO CONFIRM: ESP32 endpoint format */}
                Connects to your ESP32-CAM device via local network
              </p>
            </TabsContent>

            {/* Manual Upload Tab */}
            <TabsContent value="upload" className="mt-4">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  variant="outline" 
                  onClick={handleUploadClick}
                  className="flex-1 sm:flex-none"
                >
                  <Image className="w-4 h-4 mr-2" />
                  Select Image
                </Button>
                {manualUpload.file && (
                  <p className="text-sm text-muted-foreground self-center">
                    Selected: {manualUpload.file.name}
                  </p>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Supported formats: JPG, PNG, WebP (max 10MB)
              </p>
            </TabsContent>
          </Tabs>

          {/* Image Preview & Analysis */}
          <div className="border-2 border-dashed border-border rounded-xl p-4 text-center">
            {currentPreview ? (
              <div className="space-y-4">
                <div className="relative w-full max-w-md mx-auto aspect-video bg-muted rounded-lg overflow-hidden">
                  <img 
                    src={currentPreview} 
                    alt="Captured/Uploaded Image" 
                    className="w-full h-full object-cover" 
                  />
                  <div className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm px-2 py-1 rounded text-xs text-muted-foreground">
                    {activeImageSource === "esp32" ? "ESP32 Capture" : "Uploaded Image"}
                  </div>
                </div>

                {/* Disease Detection Result - from POST /api/disease/detect */}
                {diseaseDetection.result && (
                  <div className={`p-4 rounded-xl ${
                    diseaseDetection.result.is_healthy 
                      ? 'bg-primary/10 border border-primary/20' 
                      : 'bg-yellow-500/10 border border-yellow-500/20'
                  }`}>
                    <div className="flex items-center justify-center gap-2 mb-2">
                      {diseaseDetection.result.is_healthy ? (
                        <CheckCircle className="w-5 h-5 text-primary" />
                      ) : (
                        <AlertTriangle className="w-5 h-5 text-yellow-500" />
                      )}
                      <span className="font-semibold text-foreground">
                        {diseaseDetection.result.disease_name}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        ({diseaseDetection.result.confidence}% confidence)
                      </span>
                    </div>
                    {diseaseDetection.result.treatment && (
                      <p className="text-sm text-muted-foreground">
                        <span className="font-medium">Treatment:</span> {diseaseDetection.result.treatment}
                      </p>
                    )}
                  </div>
                )}

                {/* Analysis Error */}
                {diseaseDetection.error && (
                  <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-xl text-sm text-destructive">
                    Analysis failed. Please try again or check your connection.
                  </div>
                )}

                <div className="flex justify-center gap-3">
                  <Button 
                    variant="outline"
                    onClick={() => {
                      if (activeImageSource === "esp32") {
                        handleCaptureSnapshot();
                      } else {
                        handleUploadClick();
                      }
                    }} 
                    disabled={esp32Cam.isCapturing}
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    {activeImageSource === "esp32" ? "Recapture" : "Change Image"}
                  </Button>
                  <Button 
                    onClick={handleAnalyze}
                    disabled={diseaseDetection.isAnalyzing}
                  >
                    {diseaseDetection.isAnalyzing ? (
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Search className="w-4 h-4 mr-2" />
                    )}
                    Analyze for Disease
                  </Button>
                </div>
              </div>
            ) : (
              <div className="py-8">
                <div className="w-16 h-16 rounded-2xl bg-muted mx-auto mb-4 flex items-center justify-center">
                  <Camera className="w-8 h-8 text-muted-foreground" />
                </div>
                <p className="text-foreground font-medium mb-1">Capture or Upload an Image</p>
                <p className="text-sm text-muted-foreground mb-4">
                  Use ESP32 CAM to capture a live snapshot, or upload an image manually
                </p>
                <div className="flex justify-center gap-3">
                  <Button variant="outline" onClick={handleCaptureSnapshot} disabled={esp32Cam.isCapturing}>
                    <Camera className="w-4 h-4 mr-2" />
                    Capture from ESP32
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-4">
                  Use tabs above for ESP32 capture or image upload
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Multi-Plant Support */}
        <div className="bg-card rounded-2xl p-6 shadow-soft border border-border/50 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Leaf className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-foreground">Multi-Plant Monitoring</h3>
              <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">{plants.length} plants</span>
            </div>
            <Button variant="outline" size="sm" onClick={() => setIsAddPlantOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Plant
            </Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left text-sm font-medium text-muted-foreground py-2">Plant</th>
                  <th className="text-left text-sm font-medium text-muted-foreground py-2">Zone</th>
                  <th className="text-left text-sm font-medium text-muted-foreground py-2">Health</th>
                  <th className="text-left text-sm font-medium text-muted-foreground py-2">Last Scan</th>
                  <th className="text-left text-sm font-medium text-muted-foreground py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {plants.map((plant) => (
                  <tr key={plant.id} className="border-b border-border/50 last:border-0">
                    <td className="py-3 font-medium text-foreground">{plant.name}</td>
                    <td className="py-3 text-muted-foreground">{plant.zone}</td>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-12 h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${plant.health >= 90 ? 'bg-primary' : plant.health >= 70 ? 'bg-yellow-500' : 'bg-destructive'}`}
                            style={{ width: `${plant.health}%` }}
                          />
                        </div>
                        <span className="text-sm text-foreground">{plant.health}%</span>
                      </div>
                    </td>
                    <td className="py-3 text-sm text-muted-foreground">{plant.lastScan}</td>
                    <td className="py-3">
                      {plant.issue ? (
                        <span className="text-xs bg-yellow-500/10 text-yellow-600 px-2 py-1 rounded-full">{plant.issue}</span>
                      ) : (
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Healthy</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Tabs for Analytics & Seasonal */}
        <Tabs defaultValue="analytics" className="mb-6">
          <TabsList className="mb-4">
            <TabsTrigger value="analytics">
              <BarChart3 className="w-4 h-4 mr-2" />
              Farmer Analytics
            </TabsTrigger>
            <TabsTrigger value="seasonal">
              <Calendar className="w-4 h-4 mr-2" />
              Seasonal Insights
            </TabsTrigger>
          </TabsList>

          <TabsContent value="analytics">
            <div className="bg-card rounded-2xl p-6 shadow-soft border border-border/50">
              <h3 className="font-semibold text-foreground mb-4">Detection Analytics</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="text-center p-4 rounded-xl bg-muted/50">
                  <p className="text-2xl font-bold text-foreground">{analyticsData.totalScans}</p>
                  <p className="text-xs text-muted-foreground">Total Scans</p>
                </div>
                <div className="text-center p-4 rounded-xl bg-muted/50">
                  <p className="text-2xl font-bold text-yellow-500">{analyticsData.issuesDetected}</p>
                  <p className="text-xs text-muted-foreground">Issues Found</p>
                </div>
                <div className="text-center p-4 rounded-xl bg-muted/50">
                  <p className="text-2xl font-bold text-primary">{analyticsData.issuesResolved}</p>
                  <p className="text-xs text-muted-foreground">Resolved</p>
                </div>
                <div className="text-center p-4 rounded-xl bg-muted/50">
                  <p className="text-2xl font-bold text-foreground">{analyticsData.avgDetectionTime}</p>
                  <p className="text-xs text-muted-foreground">Avg Detection</p>
                </div>
                <div className="text-center p-4 rounded-xl bg-muted/50">
                  <p className="text-2xl font-bold text-teal-500">{analyticsData.accuracy}%</p>
                  <p className="text-xs text-muted-foreground">Accuracy</p>
                </div>
              </div>
              <div className="mt-4 p-4 rounded-xl bg-primary/5 border border-primary/10">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">This Week's Performance</span>
                </div>
                <p className="text-sm text-muted-foreground">Disease detection rate improved by 12% compared to last week. Early detection has prevented 3 potential outbreaks.</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="seasonal">
            <div className="bg-card rounded-2xl p-6 shadow-soft border border-border/50">
              <h3 className="font-semibold text-foreground mb-4">Seasonal Risk Insights</h3>
              <div className="space-y-3">
                {seasonalInsights.map((item, index) => (
                  <div key={index} className={`p-4 rounded-xl border ${
                    item.risk === 'high' ? 'bg-destructive/5 border-destructive/20' :
                    item.risk === 'medium' ? 'bg-yellow-500/5 border-yellow-500/20' :
                    'bg-blue-500/5 border-blue-500/20'
                  }`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-foreground">{item.season}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        item.risk === 'high' ? 'bg-destructive/10 text-destructive' :
                        item.risk === 'medium' ? 'bg-yellow-500/10 text-yellow-600' :
                        'bg-blue-500/10 text-blue-600'
                      }`}>
                        {item.risk.charAt(0).toUpperCase() + item.risk.slice(1)} Risk
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{item.insight}</p>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>

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

      {/* Add Plant Dialog */}
      <Dialog open={isAddPlantOpen} onOpenChange={setIsAddPlantOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Plant</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="plantName">Plant Name</Label>
              <Input 
                id="plantName" 
                value={newPlantName} 
                onChange={(e) => setNewPlantName(e.target.value)} 
                placeholder="e.g., Tomato Plant #13"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="plantZone">Zone</Label>
              <Select value={newPlantZone} onValueChange={setNewPlantZone}>
                <SelectTrigger>
                  <SelectValue placeholder="Select zone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Zone A">Zone A</SelectItem>
                  <SelectItem value="Zone B">Zone B</SelectItem>
                  <SelectItem value="Zone C">Zone C</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddPlantOpen(false)}>Cancel</Button>
            <Button onClick={handleAddPlant}>Add Plant</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
