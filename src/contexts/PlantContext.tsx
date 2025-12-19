import React, { createContext, useContext, useState, useCallback } from "react";

export interface Plant {
  id: string;
  name: string;
  type: string;
  zone: string;
  imageUrl?: string;
  status: "healthy" | "warning" | "critical";
  lastWatered?: string;
  addedAt: string;
}

interface PlantContextType {
  plants: Plant[];
  activePlant: Plant | null;
  setActivePlant: (plant: Plant | null) => void;
  addPlant: (plant: Omit<Plant, "id" | "addedAt">) => void;
  removePlant: (id: string) => void;
  isLoading: boolean;
}

const PlantContext = createContext<PlantContextType | undefined>(undefined);

// Sample plants data - in production, this would come from an API
const samplePlants: Plant[] = [
  {
    id: "plant-1",
    name: "Tomato Garden",
    type: "Vegetable",
    zone: "Zone A - Greenhouse",
    status: "healthy",
    lastWatered: "2 hours ago",
    addedAt: "2024-01-15",
  },
  {
    id: "plant-2",
    name: "Rose Bed",
    type: "Flower",
    zone: "Zone B - Garden",
    status: "warning",
    lastWatered: "12 hours ago",
    addedAt: "2024-02-20",
  },
  {
    id: "plant-3",
    name: "Indoor Herbs",
    type: "Herbs",
    zone: "Zone C - Indoor",
    status: "healthy",
    lastWatered: "4 hours ago",
    addedAt: "2024-03-10",
  },
  {
    id: "plant-4",
    name: "Wheat Field",
    type: "Grain",
    zone: "Zone D - Nursery",
    status: "critical",
    lastWatered: "2 days ago",
    addedAt: "2024-01-05",
  },
];

export function PlantProvider({ children }: { children: React.ReactNode }) {
  const [plants, setPlants] = useState<Plant[]>(samplePlants);
  const [activePlant, setActivePlantState] = useState<Plant | null>(null);
  const [isLoading] = useState(false);

  const setActivePlant = useCallback((plant: Plant | null) => {
    setActivePlantState(plant);
    // Store in localStorage to persist across page refreshes
    if (plant) {
      localStorage.setItem("activePlantId", plant.id);
    } else {
      localStorage.removeItem("activePlantId");
    }
  }, []);

  const addPlant = useCallback((plantData: Omit<Plant, "id" | "addedAt">) => {
    const newPlant: Plant = {
      ...plantData,
      id: `plant-${Date.now()}`,
      addedAt: new Date().toISOString().split("T")[0],
    };
    setPlants((prev) => [...prev, newPlant]);
  }, []);

  const removePlant = useCallback((id: string) => {
    setPlants((prev) => prev.filter((p) => p.id !== id));
    if (activePlant?.id === id) {
      setActivePlantState(null);
    }
  }, [activePlant]);

  // Restore active plant from localStorage on mount
  React.useEffect(() => {
    const savedPlantId = localStorage.getItem("activePlantId");
    if (savedPlantId) {
      const savedPlant = plants.find((p) => p.id === savedPlantId);
      if (savedPlant) {
        setActivePlantState(savedPlant);
      }
    }
  }, [plants]);

  return (
    <PlantContext.Provider
      value={{
        plants,
        activePlant,
        setActivePlant,
        addPlant,
        removePlant,
        isLoading,
      }}
    >
      {children}
    </PlantContext.Provider>
  );
}

export function usePlant() {
  const context = useContext(PlantContext);
  if (!context) {
    throw new Error("usePlant must be used within a PlantProvider");
  }
  return context;
}
