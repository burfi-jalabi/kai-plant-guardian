import { useState } from "react";
import { Activity, AlertTriangle, CheckCircle, Wifi, Battery, Signal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { usePlant } from "@/contexts/PlantContext";

interface SensorStatus {
  id: string;
  name: string;
  location: string;
  status: "online" | "offline" | "warning";
  battery: number;
  signal: number;
  lastUpdate: string;
}

const sensorNetwork: SensorStatus[] = [
  { id: "sensor-1", name: "Moisture Sensor A1", location: "Zone A - Greenhouse", status: "online", battery: 85, signal: 92, lastUpdate: "2 min ago" },
  { id: "sensor-2", name: "Temperature Hub B1", location: "Zone B - Garden", status: "online", battery: 72, signal: 88, lastUpdate: "5 min ago" },
  { id: "sensor-3", name: "Light Sensor C1", location: "Zone C - Indoor", status: "warning", battery: 23, signal: 75, lastUpdate: "12 min ago" },
  { id: "sensor-4", name: "Humidity Node D1", location: "Zone D - Nursery", status: "online", battery: 94, signal: 95, lastUpdate: "1 min ago" },
  { id: "sensor-5", name: "Soil Probe A2", location: "Zone A - Greenhouse", status: "offline", battery: 0, signal: 0, lastUpdate: "2 hours ago" },
];

export function QuickStatusPanel() {
  const [open, setOpen] = useState(false);
  const { plants, activePlant } = usePlant();

  const onlineSensors = sensorNetwork.filter(s => s.status === "online").length;
  const warningSensors = sensorNetwork.filter(s => s.status === "warning").length;
  const offlineSensors = sensorNetwork.filter(s => s.status === "offline").length;
  
  const healthyPlants = plants.filter(p => p.status === "healthy").length;
  const warningPlants = plants.filter(p => p.status === "warning").length;
  const criticalPlants = plants.filter(p => p.status === "critical").length;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Activity className="w-4 h-4" />
          <span className="hidden sm:inline">Quick Status</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary" />
            System Status
          </SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Health Overview */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20"
          >
            <h3 className="font-semibold text-foreground mb-3">Plant Health Overview</h3>
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{healthyPlants}</div>
                <div className="text-xs text-muted-foreground">Healthy</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-500">{warningPlants}</div>
                <div className="text-xs text-muted-foreground">Warning</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-destructive">{criticalPlants}</div>
                <div className="text-xs text-muted-foreground">Critical</div>
              </div>
            </div>
          </motion.div>

          {/* Sensor Network Status */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <Wifi className="w-4 h-4" />
              Sensor Network
            </h3>
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="p-3 rounded-lg bg-primary/10 text-center">
                <CheckCircle className="w-4 h-4 text-primary mx-auto mb-1" />
                <div className="text-lg font-bold">{onlineSensors}</div>
                <div className="text-xs text-muted-foreground">Online</div>
              </div>
              <div className="p-3 rounded-lg bg-yellow-500/10 text-center">
                <AlertTriangle className="w-4 h-4 text-yellow-500 mx-auto mb-1" />
                <div className="text-lg font-bold">{warningSensors}</div>
                <div className="text-xs text-muted-foreground">Warning</div>
              </div>
              <div className="p-3 rounded-lg bg-destructive/10 text-center">
                <X className="w-4 h-4 text-destructive mx-auto mb-1" />
                <div className="text-lg font-bold">{offlineSensors}</div>
                <div className="text-xs text-muted-foreground">Offline</div>
              </div>
            </div>

            {/* Sensor List */}
            <div className="space-y-2">
              {sensorNetwork.map((sensor, index) => (
                <motion.div
                  key={sensor.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + index * 0.05 }}
                  className={cn(
                    "p-3 rounded-xl border transition-colors",
                    sensor.status === "online" && "bg-card border-border/50",
                    sensor.status === "warning" && "bg-yellow-500/5 border-yellow-500/20",
                    sensor.status === "offline" && "bg-destructive/5 border-destructive/20"
                  )}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-sm">{sensor.name}</span>
                    <span className={cn(
                      "text-xs px-2 py-0.5 rounded-full font-medium",
                      sensor.status === "online" && "bg-primary/10 text-primary",
                      sensor.status === "warning" && "bg-yellow-500/10 text-yellow-500",
                      sensor.status === "offline" && "bg-destructive/10 text-destructive"
                    )}>
                      {sensor.status}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{sensor.location}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Battery className="w-3 h-3" />
                      {sensor.battery}%
                    </span>
                    <span className="flex items-center gap-1">
                      <Signal className="w-3 h-3" />
                      {sensor.signal}%
                    </span>
                    <span className="ml-auto">{sensor.lastUpdate}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Active Plant Info */}
          {activePlant && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="p-4 rounded-xl bg-muted/50 border border-border/50"
            >
              <h3 className="font-semibold text-foreground mb-2">Active Plant</h3>
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-foreground">{activePlant.name}</span>
                {" "}• {activePlant.zone}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Last watered: {activePlant.lastWatered}
              </p>
            </motion.div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
