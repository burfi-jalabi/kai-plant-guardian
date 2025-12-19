import { useState } from "react";
import { Bell, AlertTriangle, CheckCircle, Info, X, ChevronRight, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { usePlant } from "@/contexts/PlantContext";

interface Alert {
  id: number;
  type: "warning" | "success" | "info" | "critical";
  message: string;
  time: string;
  plantId?: string;
  plantName?: string;
  sensor?: string;
  details?: string;
}

const sampleAlerts: Alert[] = [
  {
    id: 1,
    type: "warning",
    message: "Low moisture detected",
    time: "2 hours ago",
    plantId: "plant-1",
    plantName: "Tomato Garden",
    sensor: "Soil Moisture Sensor",
    details: "Soil moisture has dropped below 40%. Consider watering soon to prevent stress.",
  },
  {
    id: 2,
    type: "critical",
    message: "Temperature too high",
    time: "3 hours ago",
    plantId: "plant-4",
    plantName: "Wheat Field",
    sensor: "Temperature Sensor",
    details: "Temperature exceeded 35°C. This may cause heat stress. Consider shade or ventilation.",
  },
  {
    id: 3,
    type: "success",
    message: "Watering completed",
    time: "4 hours ago",
    plantId: "plant-2",
    plantName: "Rose Bed",
    details: "Automatic watering cycle completed successfully. 2.5L delivered.",
  },
  {
    id: 4,
    type: "info",
    message: "Disease scan completed",
    time: "6 hours ago",
    plantId: "plant-3",
    plantName: "Indoor Herbs",
    details: "Weekly disease scan completed. No issues detected.",
  },
];

const alertConfig = {
  warning: {
    icon: AlertTriangle,
    color: "text-yellow-500",
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/20",
  },
  critical: {
    icon: AlertTriangle,
    color: "text-destructive",
    bg: "bg-destructive/10",
    border: "border-destructive/20",
  },
  success: {
    icon: CheckCircle,
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/20",
  },
  info: {
    icon: Info,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
  },
};

export function AlertsDropdown() {
  const [open, setOpen] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const { setActivePlant, plants } = usePlant();

  const unreadCount = sampleAlerts.filter(a => a.type === "warning" || a.type === "critical").length;

  const handleAlertClick = (alert: Alert) => {
    setSelectedAlert(alert);
    setDetailOpen(true);
    setOpen(false);
  };

  const handleGoToPlant = () => {
    if (selectedAlert?.plantId) {
      const plant = plants.find(p => p.id === selectedAlert.plantId);
      if (plant) {
        setActivePlant(plant);
      }
    }
    setDetailOpen(false);
  };

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-destructive text-destructive-foreground text-xs font-bold rounded-full flex items-center justify-center"
              >
                {unreadCount}
              </motion.span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-0 rounded-xl shadow-elevated border-border/50" align="end">
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-foreground">Alerts</h3>
              <span className="text-xs text-muted-foreground">{sampleAlerts.length} total</span>
            </div>
          </div>
          <div className="max-h-80 overflow-y-auto">
            <AnimatePresence>
              {sampleAlerts.map((alert, index) => {
                const config = alertConfig[alert.type];
                const Icon = config.icon;
                
                return (
                  <motion.button
                    key={alert.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleAlertClick(alert)}
                    className={cn(
                      "w-full flex items-start gap-3 p-3 text-left",
                      "hover:bg-muted/50 transition-colors border-b border-border/50 last:border-0"
                    )}
                  >
                    <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center shrink-0", config.bg)}>
                      <Icon className={cn("w-4 h-4", config.color)} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{alert.message}</p>
                      <p className="text-xs text-muted-foreground truncate">
                        {alert.plantName && `${alert.plantName} • `}{alert.time}
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0 mt-1" />
                  </motion.button>
                );
              })}
            </AnimatePresence>
          </div>
        </PopoverContent>
      </Popover>

      {/* Alert Detail Dialog */}
      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedAlert && (
                <>
                  <div className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center",
                    alertConfig[selectedAlert.type].bg
                  )}>
                    {(() => {
                      const Icon = alertConfig[selectedAlert.type].icon;
                      return <Icon className={cn("w-4 h-4", alertConfig[selectedAlert.type].color)} />;
                    })()}
                  </div>
                  {selectedAlert.message}
                </>
              )}
            </DialogTitle>
          </DialogHeader>
          {selectedAlert && (
            <div className="space-y-4">
              <div className="space-y-2">
                {selectedAlert.plantName && (
                  <div className="flex items-center gap-2 text-sm">
                    <Leaf className="w-4 h-4 text-primary" />
                    <span className="text-muted-foreground">Plant:</span>
                    <span className="font-medium">{selectedAlert.plantName}</span>
                  </div>
                )}
                {selectedAlert.sensor && (
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-muted-foreground">Sensor:</span>
                    <span className="font-medium">{selectedAlert.sensor}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">Time:</span>
                  <span className="font-medium">{selectedAlert.time}</span>
                </div>
              </div>
              
              {selectedAlert.details && (
                <div className={cn(
                  "p-4 rounded-xl border",
                  alertConfig[selectedAlert.type].bg,
                  alertConfig[selectedAlert.type].border
                )}>
                  <p className="text-sm text-foreground">{selectedAlert.details}</p>
                </div>
              )}
              
              {selectedAlert.plantId && (
                <Button onClick={handleGoToPlant} className="w-full">
                  <Leaf className="w-4 h-4 mr-2" />
                  Go to {selectedAlert.plantName}
                </Button>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
