import { useState } from "react";
import { Search, ChevronDown, Leaf, AlertTriangle, AlertCircle, Check } from "lucide-react";
import { usePlant, Plant } from "@/contexts/PlantContext";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const statusConfig = {
  healthy: {
    icon: Leaf,
    color: "text-primary",
    bg: "bg-primary/10",
    label: "Healthy",
  },
  warning: {
    icon: AlertTriangle,
    color: "text-yellow-500",
    bg: "bg-yellow-500/10",
    label: "Needs Attention",
  },
  critical: {
    icon: AlertCircle,
    color: "text-destructive",
    bg: "bg-destructive/10",
    label: "Critical",
  },
};

export function PlantSelector() {
  const { plants, activePlant, setActivePlant } = usePlant();
  const [open, setOpen] = useState(false);

  const handleSelectPlant = (plant: Plant) => {
    setActivePlant(plant);
    setOpen(false);
  };

  const StatusIcon = activePlant ? statusConfig[activePlant.status].icon : Leaf;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full justify-between h-auto py-3 px-4 rounded-xl border-border/50 bg-card hover:bg-muted/50 transition-all duration-200",
            activePlant && "border-primary/30"
          )}
        >
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "w-10 h-10 rounded-lg flex items-center justify-center transition-colors",
                activePlant ? statusConfig[activePlant.status].bg : "bg-muted"
              )}
            >
              <StatusIcon
                className={cn(
                  "w-5 h-5",
                  activePlant ? statusConfig[activePlant.status].color : "text-muted-foreground"
                )}
              />
            </div>
            <div className="text-left">
              <p className="font-medium text-foreground">
                {activePlant ? activePlant.name : "Select a plant"}
              </p>
              <p className="text-xs text-muted-foreground">
                {activePlant ? `${activePlant.zone} • ${activePlant.type}` : "Choose a plant to view data"}
              </p>
            </div>
          </div>
          <ChevronDown
            className={cn(
              "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200",
              open && "rotate-180"
            )}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0 rounded-xl shadow-elevated border-border/50" align="start">
        <Command>
          <CommandInput placeholder="Search plants..." className="border-0" />
          <CommandList>
            <CommandEmpty className="py-6 text-center text-sm text-muted-foreground">
              No plants found.
            </CommandEmpty>
            <CommandGroup heading="Your Plants">
              {plants.map((plant) => {
                const config = statusConfig[plant.status];
                const StatusIcon = config.icon;
                const isSelected = activePlant?.id === plant.id;

                return (
                  <CommandItem
                    key={plant.id}
                    value={plant.name}
                    onSelect={() => handleSelectPlant(plant)}
                    className="flex items-center gap-3 px-3 py-3 cursor-pointer rounded-lg"
                  >
                    <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center", config.bg)}>
                      <StatusIcon className={cn("w-4 h-4", config.color)} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground truncate">{plant.name}</p>
                      <p className="text-xs text-muted-foreground truncate">
                        {plant.zone} • Last watered: {plant.lastWatered || "Unknown"}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={cn(
                          "text-xs px-2 py-0.5 rounded-full font-medium",
                          config.bg,
                          config.color
                        )}
                      >
                        {config.label}
                      </span>
                      {isSelected && <Check className="w-4 h-4 text-primary" />}
                    </div>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export function PlantSelectorCompact() {
  const { plants, activePlant, setActivePlant } = usePlant();
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="gap-2 text-muted-foreground hover:text-foreground"
        >
          <Leaf className="w-4 h-4" />
          <span className="max-w-[120px] truncate">
            {activePlant ? activePlant.name : "Select Plant"}
          </span>
          <ChevronDown className={cn("w-3 h-3 transition-transform", open && "rotate-180")} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-1 rounded-xl shadow-elevated" align="end">
        {plants.map((plant) => (
          <button
            key={plant.id}
            onClick={() => {
              setActivePlant(plant);
              setOpen(false);
            }}
            className={cn(
              "w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left text-sm transition-colors",
              activePlant?.id === plant.id
                ? "bg-primary/10 text-primary"
                : "hover:bg-muted"
            )}
          >
            <Leaf className="w-4 h-4 shrink-0" />
            <span className="truncate">{plant.name}</span>
          </button>
        ))}
      </PopoverContent>
    </Popover>
  );
}
