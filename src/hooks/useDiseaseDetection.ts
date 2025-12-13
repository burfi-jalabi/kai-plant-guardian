/**
 * Custom hooks for disease detection functionality
 */

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  detectDisease,
  captureESP32Snapshot,
  testESP32Connection,
  type DiseaseDetectionResult,
} from "@/services/api";

/**
 * Hook for disease detection with image analysis
 */
export function useDiseaseDetection() {
  const [result, setResult] = useState<DiseaseDetectionResult | null>(null);

  const mutation = useMutation({
    mutationFn: detectDisease,
    onSuccess: (data) => {
      setResult(data);
    },
  });

  return {
    analyze: mutation.mutate,
    isAnalyzing: mutation.isPending,
    error: mutation.error,
    result,
    clearResult: () => setResult(null),
  };
}

/**
 * Hook for ESP32 CAM operations
 */
export function useESP32Cam() {
  const [isConnected, setIsConnected] = useState(false);
  const [snapshot, setSnapshot] = useState<string | null>(null);

  const testConnection = useMutation({
    mutationFn: testESP32Connection,
    onSuccess: (connected) => {
      setIsConnected(connected);
    },
  });

  const captureSnapshot = useMutation({
    mutationFn: captureESP32Snapshot,
    onSuccess: (blob) => {
      const url = URL.createObjectURL(blob);
      setSnapshot(url);
      setIsConnected(true);
    },
    onError: () => {
      setIsConnected(false);
    },
  });

  return {
    isConnected,
    snapshot,
    testConnection: testConnection.mutate,
    isTestingConnection: testConnection.isPending,
    captureSnapshot: captureSnapshot.mutate,
    isCapturing: captureSnapshot.isPending,
    clearSnapshot: () => {
      if (snapshot) URL.revokeObjectURL(snapshot);
      setSnapshot(null);
    },
  };
}

/**
 * Hook for manual image upload and analysis
 */
export function useManualImageUpload() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const handleFileSelect = (selectedFile: File) => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setFile(selectedFile);
    setPreviewUrl(URL.createObjectURL(selectedFile));
  };

  const clearFile = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setFile(null);
    setPreviewUrl(null);
  };

  return {
    file,
    previewUrl,
    handleFileSelect,
    clearFile,
  };
}
