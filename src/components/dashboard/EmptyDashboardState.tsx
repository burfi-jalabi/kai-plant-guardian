import { Sprout, Droplets, Sun, Leaf, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { PlantSelector } from "./PlantSelector";

export function EmptyDashboardState() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
      {/* Premium Empty State */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-xl text-center"
      >
        {/* Animated Icon Group */}
        <div className="relative w-40 h-40 mx-auto mb-10">
          {/* Main icon */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="w-28 h-28 rounded-3xl bg-gradient-primary flex items-center justify-center shadow-glow">
              <Sprout className="w-14 h-14 text-primary-foreground" />
            </div>
          </motion.div>
          
          {/* Floating decorations */}
          <motion.div
            animate={{ y: [0, -6, 0], x: [0, 4, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
            className="absolute -top-2 right-4 w-12 h-12 rounded-xl bg-blue-500/15 backdrop-blur-sm border border-blue-500/20 flex items-center justify-center"
          >
            <Droplets className="w-6 h-6 text-blue-500" />
          </motion.div>
          
          <motion.div
            animate={{ y: [0, 6, 0], x: [0, -4, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
            className="absolute -bottom-2 left-4 w-12 h-12 rounded-xl bg-yellow-500/15 backdrop-blur-sm border border-yellow-500/20 flex items-center justify-center"
          >
            <Sun className="w-6 h-6 text-yellow-500" />
          </motion.div>
          
          <motion.div
            animate={{ y: [0, -5, 0], x: [0, -3, 0] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 0.9 }}
            className="absolute top-6 -left-4 w-10 h-10 rounded-lg bg-primary/15 backdrop-blur-sm border border-primary/20 flex items-center justify-center"
          >
            <Leaf className="w-5 h-5 text-primary" />
          </motion.div>
        </div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-10"
        >
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-foreground mb-4">
            Select a Plant to Begin
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-md mx-auto">
            Choose a plant from your collection to view real-time sensor data, 
            predictions, and personalized care recommendations.
          </p>
        </motion.div>

        {/* Plant selector */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="w-full max-w-md mx-auto mb-10"
        >
          <PlantSelector />
        </motion.div>

        {/* Feature highlights */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-lg mx-auto"
        >
          {[
            { icon: TrendingUp, label: "Live Sensor Data", color: "text-primary" },
            { icon: Droplets, label: "Smart Watering", color: "text-blue-500" },
            { icon: Leaf, label: "Health Tracking", color: "text-yellow-500" },
          ].map((feature, index) => (
            <motion.div
              key={feature.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              className="flex flex-col items-center gap-2 p-4 rounded-xl bg-muted/30 border border-border/50"
            >
              <feature.icon className={`w-5 h-5 ${feature.color}`} />
              <span className="text-sm text-muted-foreground">{feature.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
