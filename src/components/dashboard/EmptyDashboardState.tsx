import { Leaf, ArrowRight, Sprout, Droplets, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { PlantSelector } from "./PlantSelector";

export function EmptyDashboardState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center min-h-[60vh] px-4"
    >
      {/* Animated illustration */}
      <div className="relative mb-8">
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="w-24 h-24 rounded-3xl bg-gradient-primary flex items-center justify-center shadow-glow"
        >
          <Sprout className="w-12 h-12 text-primary-foreground" />
        </motion.div>
        
        {/* Floating icons */}
        <motion.div
          animate={{ y: [0, -8, 0], x: [0, 5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute -top-4 -right-8 w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center"
        >
          <Droplets className="w-5 h-5 text-blue-500" />
        </motion.div>
        
        <motion.div
          animate={{ y: [0, 8, 0], x: [0, -5, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute -bottom-4 -left-8 w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center"
        >
          <Sun className="w-5 h-5 text-yellow-500" />
        </motion.div>
      </div>

      {/* Content */}
      <div className="text-center max-w-md mb-8">
        <h2 className="text-2xl font-display font-bold text-foreground mb-3">
          Select a Plant to Begin
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          Choose a plant from your collection to view real-time sensor data, 
          predictions, and care recommendations tailored to that specific plant.
        </p>
      </div>

      {/* Plant selector */}
      <div className="w-full max-w-md mb-6">
        <PlantSelector />
      </div>

      {/* Helper tips */}
      <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/50">
          <div className="w-2 h-2 rounded-full bg-primary" />
          <span>View live sensor data</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/50">
          <div className="w-2 h-2 rounded-full bg-blue-500" />
          <span>Get watering predictions</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/50">
          <div className="w-2 h-2 rounded-full bg-yellow-500" />
          <span>Track plant health</span>
        </div>
      </div>
    </motion.div>
  );
}
