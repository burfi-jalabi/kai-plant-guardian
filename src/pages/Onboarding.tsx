import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage, Language } from '@/contexts/LanguageContext';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  Globe, 
  Sun, 
  Moon, 
  Sprout, 
  Tractor, 
  Home, 
  FlaskConical, 
  Building2,
  Leaf,
  Droplets,
  Activity,
  Heart,
  ArrowRight,
  ArrowLeft,
  Check
} from 'lucide-react';

type OnboardingStep = 'language' | 'role' | 'welcome';
type UserRole = 'farmer' | 'hobbyist' | 'researcher' | 'commercial';

const Onboarding = () => {
  const [step, setStep] = useState<OnboardingStep>('language');
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [selectedLang, setSelectedLang] = useState<Language | null>(null);
  const { language, setLanguage, t } = useLanguage();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const hasOnboarded = localStorage.getItem('onboarding-complete');
    if (hasOnboarded === 'true') {
      navigate('/', { replace: true });
    }
  }, [navigate]);

  const handleLanguageSelect = (lang: Language) => {
    setSelectedLang(lang);
    setLanguage(lang);
  };

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    localStorage.setItem('user-role', role);
  };

  const handleComplete = () => {
    localStorage.setItem('onboarding-complete', 'true');
    navigate('/', { replace: true });
  };

  const handleSkip = () => {
    localStorage.setItem('onboarding-complete', 'true');
    navigate('/', { replace: true });
  };

  const goToNextStep = () => {
    if (step === 'language' && selectedLang) {
      setStep('role');
    } else if (step === 'role' && selectedRole) {
      setStep('welcome');
    }
  };

  const goToPrevStep = () => {
    if (step === 'role') {
      setStep('language');
    } else if (step === 'welcome') {
      setStep('role');
    }
  };

  const languages = [
    { code: 'en' as Language, name: 'English', native: 'English', flag: '🇬🇧' },
    { code: 'hi' as Language, name: 'Hindi', native: 'हिंदी', flag: '🇮🇳' },
    { code: 'gu' as Language, name: 'Gujarati', native: 'ગુજરાતી', flag: '🇮🇳' },
  ];

  const roles = [
    { id: 'farmer' as UserRole, icon: Tractor, labelKey: 'role.farmer', descKey: 'role.farmerDesc' },
    { id: 'hobbyist' as UserRole, icon: Home, labelKey: 'role.hobbyist', descKey: 'role.hobbyistDesc' },
    { id: 'researcher' as UserRole, icon: FlaskConical, labelKey: 'role.researcher', descKey: 'role.researcherDesc' },
    { id: 'commercial' as UserRole, icon: Building2, labelKey: 'role.commercial', descKey: 'role.commercialDesc' },
  ];

  const features = [
    { icon: Activity, key: 'welcome.feature1' },
    { icon: Leaf, key: 'welcome.feature2' },
    { icon: Droplets, key: 'welcome.feature3' },
    { icon: Heart, key: 'welcome.feature4' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      {/* Theme Toggle */}
      <div className="absolute top-4 right-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="rounded-full bg-card/80 backdrop-blur-sm border-border/50 hover:bg-card"
        >
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </div>

      {/* Progress Indicator */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-2 z-50">
        {['language', 'role', 'welcome'].map((s, i) => (
          <div
            key={s}
            className={`h-2 rounded-full transition-all duration-300 ${
              step === s ? 'w-8 bg-primary' : 
              ['language', 'role', 'welcome'].indexOf(step) > i ? 'w-2 bg-primary/60' : 'w-2 bg-muted'
            }`}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* Step 1: Language Selection */}
        {step === 'language' && (
          <motion.div
            key="language"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-lg space-y-8 text-center"
          >
            <div className="space-y-4">
              <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Globe className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                {t('lang.title')} 🌍
              </h1>
            </div>

            <div className="grid gap-3">
              {languages.map((lang) => (
                <motion.div
                  key={lang.code}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card
                    onClick={() => handleLanguageSelect(lang.code)}
                    className={`p-4 cursor-pointer transition-all duration-300 border-2 ${
                      selectedLang === lang.code
                        ? 'border-primary bg-primary/5 shadow-lg shadow-primary/20'
                        : 'border-border/50 hover:border-primary/50 hover:bg-card/80'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span className="text-2xl">{lang.flag}</span>
                        <div className="text-left">
                          <p className="font-semibold text-foreground">{lang.native}</p>
                          <p className="text-sm text-muted-foreground">{lang.name}</p>
                        </div>
                      </div>
                      {selectedLang === lang.code && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-6 h-6 rounded-full bg-primary flex items-center justify-center"
                        >
                          <Check className="w-4 h-4 text-primary-foreground" />
                        </motion.div>
                      )}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            <p className="text-sm text-muted-foreground">
              {t('lang.changeNote')}
            </p>

            <Button
              onClick={goToNextStep}
              disabled={!selectedLang}
              className="w-full"
              size="lg"
            >
              {t('common.next')}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        )}

        {/* Step 2: Role Selection */}
        {step === 'role' && (
          <motion.div
            key="role"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-lg space-y-8 text-center"
          >
            <div className="space-y-4">
              <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Sprout className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                {t('role.title')}
              </h1>
              <p className="text-muted-foreground">{t('role.subtitle')}</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {roles.map((role) => {
                const Icon = role.icon;
                return (
                  <motion.div
                    key={role.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Card
                      onClick={() => handleRoleSelect(role.id)}
                      className={`p-4 cursor-pointer transition-all duration-300 border-2 h-full ${
                        selectedRole === role.id
                          ? 'border-primary bg-primary/5 shadow-lg shadow-primary/20'
                          : 'border-border/50 hover:border-primary/50 hover:bg-card/80'
                      }`}
                    >
                      <div className="flex flex-col items-center text-center gap-3">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          selectedRole === role.id ? 'bg-primary/20' : 'bg-muted'
                        }`}>
                          <Icon className={`w-6 h-6 ${
                            selectedRole === role.id ? 'text-primary' : 'text-muted-foreground'
                          }`} />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">{t(role.labelKey)}</p>
                          <p className="text-xs text-muted-foreground mt-1">{t(role.descKey)}</p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={goToPrevStep}
                className="flex-1"
                size="lg"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t('common.back')}
              </Button>
              <Button
                onClick={goToNextStep}
                disabled={!selectedRole}
                className="flex-1"
                size="lg"
              >
                {t('common.next')}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </motion.div>
        )}

        {/* Step 3: Welcome Screen */}
        {step === 'welcome' && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-lg space-y-8 text-center"
          >
            <div className="space-y-4">
              <motion.div 
                className="mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg shadow-primary/30"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sprout className="w-10 h-10 text-primary-foreground" />
              </motion.div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                {t('welcome.title')} 🌱
              </h1>
              <p className="text-muted-foreground">{t('welcome.subtitle')}</p>
            </div>

            <div className="space-y-3">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.key}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="p-4 border-border/50 bg-card/50 backdrop-blur-sm">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <p className="text-left text-foreground font-medium">{t(feature.key)}</p>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>

            <div className="space-y-3">
              <Button
                onClick={handleComplete}
                className="w-full"
                size="lg"
              >
                {t('welcome.continue')}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                variant="ghost"
                onClick={goToPrevStep}
                className="w-full"
                size="lg"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t('common.back')}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Onboarding;
