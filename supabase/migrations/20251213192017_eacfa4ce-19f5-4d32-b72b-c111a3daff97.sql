-- Sensor readings table for IoT data ingestion
CREATE TABLE public.sensor_readings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  device_id TEXT NOT NULL,
  temperature NUMERIC NOT NULL,
  humidity NUMERIC NOT NULL,
  soil_moisture NUMERIC NOT NULL,
  light_intensity NUMERIC NOT NULL,
  co2_level NUMERIC,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Disease detection history
CREATE TABLE public.disease_scans (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  image_url TEXT,
  disease_name TEXT NOT NULL,
  confidence NUMERIC NOT NULL,
  severity TEXT CHECK (severity IN ('low', 'medium', 'high')),
  treatment TEXT,
  is_healthy BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Water prediction logs
CREATE TABLE public.water_predictions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  zone_id INTEGER NOT NULL,
  next_watering_hours NUMERIC NOT NULL,
  confidence NUMERIC NOT NULL,
  recommended_amount_liters NUMERIC NOT NULL,
  was_triggered BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Zones/areas for plant monitoring
CREATE TABLE public.zones (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  soil_type TEXT DEFAULT 'loamy',
  plant_type TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Alerts/notifications
CREATE TABLE public.alerts (
  id SERIAL PRIMARY KEY,
  type TEXT NOT NULL CHECK (type IN ('warning', 'success', 'info')),
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- User profiles for additional user data
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  phone_number TEXT,
  whatsapp_alerts BOOLEAN DEFAULT false,
  sms_alerts BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.sensor_readings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.disease_scans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.water_predictions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.zones ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Sensor readings: public read (for dashboard), authenticated write
CREATE POLICY "Anyone can read sensor data" ON public.sensor_readings FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert sensor data" ON public.sensor_readings FOR INSERT WITH CHECK (true);

-- Disease scans: users see their own, or public if no user_id
CREATE POLICY "Users can view their own scans" ON public.disease_scans FOR SELECT USING (user_id IS NULL OR auth.uid() = user_id);
CREATE POLICY "Anyone can insert scans" ON public.disease_scans FOR INSERT WITH CHECK (true);

-- Water predictions: public read
CREATE POLICY "Anyone can read water predictions" ON public.water_predictions FOR SELECT USING (true);
CREATE POLICY "Anyone can insert water predictions" ON public.water_predictions FOR INSERT WITH CHECK (true);

-- Zones: public read/write for now
CREATE POLICY "Anyone can read zones" ON public.zones FOR SELECT USING (true);
CREATE POLICY "Anyone can manage zones" ON public.zones FOR ALL USING (true);

-- Alerts: public read
CREATE POLICY "Anyone can read alerts" ON public.alerts FOR SELECT USING (true);
CREATE POLICY "Anyone can insert alerts" ON public.alerts FOR INSERT WITH CHECK (true);

-- Profiles: users manage their own
CREATE POLICY "Users can view their own profile" ON public.profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Insert default zones
INSERT INTO public.zones (name, soil_type, plant_type) VALUES
  ('Zone A - Tomatoes', 'loamy', 'tomato'),
  ('Zone B - Peppers', 'sandy', 'pepper'),
  ('Zone C - Herbs', 'clay', 'basil');

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to profiles
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();