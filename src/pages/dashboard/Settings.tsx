import { DashboardTopbar } from "@/components/dashboard/DashboardTopbar";
import { User, Bell, Shield, Wifi, HelpCircle, Camera, Globe, Check, Settings2, LogOut, Trash2, Key, Smartphone, BookOpen, MessageCircle, FileQuestion, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useState, useRef } from "react";
import { toast } from "sonner";
import { useLanguage, Language } from "@/contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const languages: { code: Language; name: string; nativeName: string; flag: string }[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी', flag: '🇮🇳' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', flag: '🇮🇳' },
];

export default function Settings() {
  const { language, setLanguage, t } = useLanguage();
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File too large", { description: "Please select an image under 5MB" });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
        toast.success("Avatar updated", { description: "Your new avatar has been set" });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    toast.success(t('settings.language'), { 
      description: languages.find(l => l.code === lang)?.nativeName 
    });
  };

  const handleEditPreferences = () => {
    // Set flag so onboarding knows it was accessed from settings
    sessionStorage.setItem('onboarding-from-settings', 'true');
    navigate('/onboarding');
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem('onboarding-complete');
    toast.success("Logged out", { description: "You have been signed out successfully." });
    navigate('/');
  };

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    try {
      // In a real app, you would call a server function to delete the user
      // For now, we'll just sign out and show a message
      await supabase.auth.signOut();
      localStorage.clear();
      toast.success("Account deletion requested", { 
        description: "Your account deletion request has been submitted." 
      });
      navigate('/');
    } catch (error) {
      toast.error("Error", { description: "Could not process your request. Please try again." });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-background">
      <DashboardTopbar title={t('settings.title')} />
      
      <main className="flex-1 p-4 lg:p-6 overflow-auto">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Language Section - Prominent placement */}
          <motion.div 
            className="bg-card rounded-2xl p-6 shadow-soft border border-border/50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Globe className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{t('settings.language')}</h3>
                <p className="text-sm text-muted-foreground">{t('settings.languageDesc')}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <AnimatePresence mode="wait">
                {languages.map((lang) => (
                  <motion.button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className={cn(
                      "relative flex items-center gap-3 p-4 rounded-xl border-2 transition-all duration-200",
                      language === lang.code
                        ? "border-primary bg-primary/5 shadow-sm"
                        : "border-border hover:border-primary/50 hover:bg-muted/50"
                    )}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    layout
                  >
                    <span className="text-2xl">{lang.flag}</span>
                    <div className="text-left flex-1">
                      <p className="font-medium text-foreground">{lang.nativeName}</p>
                      <p className="text-xs text-muted-foreground">{lang.name}</p>
                    </div>
                    {language === lang.code && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-5 h-5 rounded-full bg-primary flex items-center justify-center"
                      >
                        <Check className="w-3 h-3 text-primary-foreground" />
                      </motion.div>
                    )}
                  </motion.button>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Edit Preferences - Re-enter onboarding */}
          <motion.div 
            className="bg-card rounded-2xl p-6 shadow-soft border border-border/50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.05 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                  <Settings2 className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Edit Preferences</h3>
                  <p className="text-sm text-muted-foreground">Change language, role, and personalization</p>
                </div>
              </div>
              <Button variant="outline" onClick={handleEditPreferences}>
                <Settings2 className="w-4 h-4 mr-2" />
                Edit
              </Button>
            </div>
          </motion.div>

          {/* Profile Section */}
          <motion.div 
            className="bg-card rounded-2xl p-6 shadow-soft border border-border/50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <User className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{t('settings.profile')}</h3>
                <p className="text-sm text-muted-foreground">{t('settings.profileDesc')}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 mb-6">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleAvatarChange}
                accept="image/*"
                className="hidden"
              />
              <div 
                className="w-20 h-20 rounded-2xl bg-gradient-primary flex items-center justify-center cursor-pointer overflow-hidden group relative"
                onClick={handleAvatarClick}
              >
                {avatarPreview ? (
                  <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-10 h-10 text-primary-foreground" />
                )}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Camera className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <Button variant="outline" size="sm" onClick={handleAvatarClick}>
                  {t('settings.changeAvatar')}
                </Button>
                <p className="text-xs text-muted-foreground mt-1">{t('settings.avatarHint')}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">{t('settings.fullName')}</Label>
                <Input id="name" defaultValue="Demo User" className="bg-muted/50" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">{t('settings.email')}</Label>
                <Input id="email" defaultValue="demo@growsense.ai" className="bg-muted/50" readOnly />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">{t('settings.phone')}</Label>
                <Input id="phone" placeholder="+1 (555) 000-0000" className="bg-muted/50" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">{t('settings.location')}</Label>
                <Input id="location" placeholder="City, Country" className="bg-muted/50" />
              </div>
            </div>

            <div className="mt-6">
              <Button variant="default">{t('settings.saveChanges')}</Button>
            </div>
          </motion.div>

          {/* Notifications */}
          <motion.div 
            className="bg-card rounded-2xl p-6 shadow-soft border border-border/50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <Bell className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{t('settings.notifications')}</h3>
                <p className="text-sm text-muted-foreground">{t('settings.notificationsDesc')}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
                <div>
                  <p className="font-medium text-foreground">{t('settings.wateringAlerts')}</p>
                  <p className="text-sm text-muted-foreground">{t('settings.wateringAlertsDesc')}</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
                <div>
                  <p className="font-medium text-foreground">{t('settings.diseaseAlerts')}</p>
                  <p className="text-sm text-muted-foreground">{t('settings.diseaseAlertsDesc')}</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
                <div>
                  <p className="font-medium text-foreground">{t('settings.weeklyReports')}</p>
                  <p className="text-sm text-muted-foreground">{t('settings.weeklyReportsDesc')}</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
                <div>
                  <p className="font-medium text-foreground">{t('settings.sensorWarnings')}</p>
                  <p className="text-sm text-muted-foreground">{t('settings.sensorWarningsDesc')}</p>
                </div>
                <Switch />
              </div>
            </div>
          </motion.div>

          {/* Connected Devices */}
          <motion.div 
            className="bg-card rounded-2xl p-6 shadow-soft border border-border/50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center">
                <Wifi className="w-5 h-5 text-teal-500" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{t('settings.connectedDevices')}</h3>
                <p className="text-sm text-muted-foreground">{t('settings.connectedDevicesDesc')}</p>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <div>
                    <p className="font-medium text-foreground">Greenhouse Hub</p>
                    <p className="text-sm text-muted-foreground">{t('settings.connected')} • 4 {t('settings.sensors')}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">{t('settings.configure')}</Button>
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <div>
                    <p className="font-medium text-foreground">Garden Monitor</p>
                    <p className="text-sm text-muted-foreground">{t('settings.connected')} • 3 {t('settings.sensors')}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">{t('settings.configure')}</Button>
              </div>
            </div>

            <Button variant="outline">
              <Wifi className="w-4 h-4 mr-2" />
              {t('settings.addNewDevice')}
            </Button>
          </motion.div>

          {/* Security */}
          <motion.div 
            className="bg-card rounded-2xl p-6 shadow-soft border border-border/50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center">
                <Shield className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{t('settings.security')}</h3>
                <p className="text-sm text-muted-foreground">{t('settings.securityDesc')}</p>
              </div>
            </div>

            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Key className="w-4 h-4 mr-3" />
                {t('settings.changePassword')}
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Smartphone className="w-4 h-4 mr-3" />
                {t('settings.enable2FA')}
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-3" />
                {t('dashboard.logout')}
              </Button>
              
              {/* Delete Account with Confirmation */}
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10">
                    <Trash2 className="w-4 h-4 mr-3" />
                    {t('settings.deleteAccount')}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle className="flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-destructive" />
                      Delete Account
                    </AlertDialogTitle>
                    <AlertDialogDescription className="space-y-3">
                      <p>Are you sure you want to delete your account? This action cannot be undone.</p>
                      <div className="bg-destructive/10 p-4 rounded-lg text-sm space-y-2">
                        <p className="font-medium text-destructive">This will permanently delete:</p>
                        <ul className="list-disc list-inside text-muted-foreground space-y-1">
                          <li>Your profile and settings</li>
                          <li>All saved plants and sensor data</li>
                          <li>Disease scan history</li>
                          <li>Water prediction records</li>
                        </ul>
                      </div>
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction 
                      onClick={handleDeleteAccount}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      disabled={isDeleting}
                    >
                      {isDeleting ? "Deleting..." : "Delete Account"}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </motion.div>

          {/* Help & Support */}
          <motion.div 
            className="bg-card rounded-2xl p-6 shadow-soft border border-border/50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                <HelpCircle className="w-5 h-5 text-purple-500" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{t('settings.helpSupport')}</h3>
                <p className="text-sm text-muted-foreground">{t('settings.helpSupportDesc')}</p>
              </div>
            </div>

            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <BookOpen className="w-4 h-4 mr-3" />
                {t('settings.documentation')}
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <FileQuestion className="w-4 h-4 mr-3" />
                {t('settings.faqs')}
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <MessageCircle className="w-4 h-4 mr-3" />
                {t('settings.contactSupport')}
              </Button>
            </div>

            {/* Quick Help Tips */}
            <div className="mt-6 p-4 rounded-xl bg-muted/30 border border-border/30">
              <p className="text-sm font-medium text-foreground mb-2">Quick Tips for Farmers</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Select a plant to view real-time sensor data</li>
                <li>• Check alerts daily for watering reminders</li>
                <li>• Use disease detection for early problem identification</li>
                <li>• Review weekly reports for plant health trends</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}