import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'hi' | 'gu';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Language Selection
    'lang.title': 'Which language are you comfortable with?',
    'lang.changeNote': 'You can change this later',
    'lang.english': 'English',
    'lang.hindi': 'हिंदी (Hindi)',
    'lang.gujarati': 'ગુજરાતી (Gujarati)',
    'lang.other': 'Other',
    
    // Role Selection
    'role.title': 'How would you describe yourself?',
    'role.subtitle': 'This helps us personalize your experience',
    'role.farmer': 'Farmer',
    'role.farmerDesc': 'I grow crops professionally',
    'role.hobbyist': 'Home Gardener',
    'role.hobbyistDesc': 'I love caring for plants at home',
    'role.researcher': 'Researcher',
    'role.researcherDesc': 'I study plant science',
    'role.commercial': 'Commercial Grower',
    'role.commercialDesc': 'I manage large-scale operations',
    
    // Welcome Screen
    'welcome.title': 'Welcome to GrowSense AI',
    'welcome.subtitle': 'Your intelligent plant care companion',
    'welcome.feature1': 'Real-time plant health monitoring',
    'welcome.feature2': 'AI-powered disease detection',
    'welcome.feature3': 'Smart water predictions',
    'welcome.feature4': 'Personalized care recommendations',
    'welcome.continue': 'Get Started',
    'welcome.skip': 'Skip Onboarding',
    
    // Common
    'common.next': 'Next',
    'common.back': 'Back',
    'common.skip': 'Skip',
  },
  hi: {
    // Language Selection
    'lang.title': 'आप किस भाषा में सहज हैं?',
    'lang.changeNote': 'आप इसे बाद में बदल सकते हैं',
    'lang.english': 'English',
    'lang.hindi': 'हिंदी (Hindi)',
    'lang.gujarati': 'ગુજરાતી (Gujarati)',
    'lang.other': 'अन्य',
    
    // Role Selection
    'role.title': 'आप खुद को कैसे बताएंगे?',
    'role.subtitle': 'इससे हमें आपके अनुभव को निजीकृत करने में मदद मिलती है',
    'role.farmer': 'किसान',
    'role.farmerDesc': 'मैं पेशेवर रूप से फसल उगाता हूं',
    'role.hobbyist': 'घरेलू बागवान',
    'role.hobbyistDesc': 'मुझे घर पर पौधों की देखभाल पसंद है',
    'role.researcher': 'शोधकर्ता',
    'role.researcherDesc': 'मैं पौधों का अध्ययन करता हूं',
    'role.commercial': 'व्यावसायिक उत्पादक',
    'role.commercialDesc': 'मैं बड़े पैमाने पर काम संभालता हूं',
    
    // Welcome Screen
    'welcome.title': 'GrowSense AI में आपका स्वागत है',
    'welcome.subtitle': 'आपका बुद्धिमान पौधों की देखभाल का साथी',
    'welcome.feature1': 'रीयल-टाइम पौधों की स्वास्थ्य निगरानी',
    'welcome.feature2': 'AI-संचालित रोग पहचान',
    'welcome.feature3': 'स्मार्ट पानी की भविष्यवाणी',
    'welcome.feature4': 'व्यक्तिगत देखभाल सिफारिशें',
    'welcome.continue': 'शुरू करें',
    'welcome.skip': 'ऑनबोर्डिंग छोड़ें',
    
    // Common
    'common.next': 'आगे',
    'common.back': 'पीछे',
    'common.skip': 'छोड़ें',
  },
  gu: {
    // Language Selection
    'lang.title': 'તમે કઈ ભાષામાં આરામદાયક છો?',
    'lang.changeNote': 'તમે આ પછીથી બદલી શકો છો',
    'lang.english': 'English',
    'lang.hindi': 'हिंदी (Hindi)',
    'lang.gujarati': 'ગુજરાતી (Gujarati)',
    'lang.other': 'અન્ય',
    
    // Role Selection
    'role.title': 'તમે તમારી જાતને કેવી રીતે વર્ણવશો?',
    'role.subtitle': 'આ અમને તમારા અનુભવને વ્યક્તિગત બનાવવામાં મદદ કરે છે',
    'role.farmer': 'ખેડૂત',
    'role.farmerDesc': 'હું વ્યાવસાયિક રીતે પાક ઉગાડું છું',
    'role.hobbyist': 'ઘરેલું બાગવાની',
    'role.hobbyistDesc': 'મને ઘરે છોડની સંભાળ ગમે છે',
    'role.researcher': 'સંશોધક',
    'role.researcherDesc': 'હું છોડ વિજ્ઞાનનો અભ્યાસ કરું છું',
    'role.commercial': 'વ્યાવસાયિક ઉત્પાદક',
    'role.commercialDesc': 'હું મોટા પાયે કામગીરી સંભાળું છું',
    
    // Welcome Screen
    'welcome.title': 'GrowSense AI માં આપનું સ્વાગત છે',
    'welcome.subtitle': 'તમારો બુદ્ધિશાળી છોડ સંભાળ સાથી',
    'welcome.feature1': 'રીયલ-ટાઇમ છોડ આરોગ્ય દેખરેખ',
    'welcome.feature2': 'AI-સંચાલિત રોગ ઓળખ',
    'welcome.feature3': 'સ્માર્ટ પાણીની આગાહી',
    'welcome.feature4': 'વ્યક્તિગત સંભાળ ભલામણો',
    'welcome.continue': 'શરૂ કરો',
    'welcome.skip': 'ઓનબોર્ડિંગ છોડો',
    
    // Common
    'common.next': 'આગળ',
    'common.back': 'પાછળ',
    'common.skip': 'છોડો',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('preferred-language');
    return (saved as Language) || 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('preferred-language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || translations['en'][key] || key;
  };

  useEffect(() => {
    const saved = localStorage.getItem('preferred-language');
    if (saved) {
      setLanguageState(saved as Language);
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
