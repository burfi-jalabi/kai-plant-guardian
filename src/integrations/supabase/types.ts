export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      alerts: {
        Row: {
          created_at: string
          id: number
          is_read: boolean | null
          message: string
          type: string
        }
        Insert: {
          created_at?: string
          id?: number
          is_read?: boolean | null
          message: string
          type: string
        }
        Update: {
          created_at?: string
          id?: number
          is_read?: boolean | null
          message?: string
          type?: string
        }
        Relationships: []
      }
      disease_scans: {
        Row: {
          confidence: number
          created_at: string
          disease_name: string
          id: string
          image_url: string | null
          is_healthy: boolean
          severity: string | null
          treatment: string | null
          user_id: string | null
        }
        Insert: {
          confidence: number
          created_at?: string
          disease_name: string
          id?: string
          image_url?: string | null
          is_healthy?: boolean
          severity?: string | null
          treatment?: string | null
          user_id?: string | null
        }
        Update: {
          confidence?: number
          created_at?: string
          disease_name?: string
          id?: string
          image_url?: string | null
          is_healthy?: boolean
          severity?: string | null
          treatment?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          display_name: string | null
          id: string
          location: string | null
          phone_number: string | null
          sms_alerts: boolean | null
          updated_at: string
          user_id: string
          whatsapp_alerts: boolean | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          location?: string | null
          phone_number?: string | null
          sms_alerts?: boolean | null
          updated_at?: string
          user_id: string
          whatsapp_alerts?: boolean | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          location?: string | null
          phone_number?: string | null
          sms_alerts?: boolean | null
          updated_at?: string
          user_id?: string
          whatsapp_alerts?: boolean | null
        }
        Relationships: []
      }
      sensor_readings: {
        Row: {
          co2_level: number | null
          created_at: string
          device_id: string
          humidity: number
          id: string
          light_intensity: number
          soil_moisture: number
          temperature: number
        }
        Insert: {
          co2_level?: number | null
          created_at?: string
          device_id: string
          humidity: number
          id?: string
          light_intensity: number
          soil_moisture: number
          temperature: number
        }
        Update: {
          co2_level?: number | null
          created_at?: string
          device_id?: string
          humidity?: number
          id?: string
          light_intensity?: number
          soil_moisture?: number
          temperature?: number
        }
        Relationships: []
      }
      water_predictions: {
        Row: {
          confidence: number
          created_at: string
          id: string
          next_watering_hours: number
          recommended_amount_liters: number
          was_triggered: boolean | null
          zone_id: number
        }
        Insert: {
          confidence: number
          created_at?: string
          id?: string
          next_watering_hours: number
          recommended_amount_liters: number
          was_triggered?: boolean | null
          zone_id: number
        }
        Update: {
          confidence?: number
          created_at?: string
          id?: string
          next_watering_hours?: number
          recommended_amount_liters?: number
          was_triggered?: boolean | null
          zone_id?: number
        }
        Relationships: []
      }
      zones: {
        Row: {
          created_at: string
          id: number
          name: string
          plant_type: string | null
          soil_type: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
          plant_type?: string | null
          soil_type?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
          plant_type?: string | null
          soil_type?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
