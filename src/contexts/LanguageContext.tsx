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
    
    // Settings
    'settings.title': 'Settings',
    'settings.profile': 'Profile Settings',
    'settings.profileDesc': 'Manage your account information',
    'settings.fullName': 'Full Name',
    'settings.email': 'Email',
    'settings.phone': 'Phone',
    'settings.location': 'Location',
    'settings.saveChanges': 'Save Changes',
    'settings.changeAvatar': 'Change Avatar',
    'settings.avatarHint': 'Click to upload (max 5MB)',
    'settings.language': 'Language',
    'settings.languageDesc': 'Choose your preferred language',
    'settings.selectLanguage': 'Select Language',
    'settings.notifications': 'Notifications',
    'settings.notificationsDesc': 'Configure alert preferences',
    'settings.wateringAlerts': 'Watering Alerts',
    'settings.wateringAlertsDesc': 'Get notified when plants need water',
    'settings.diseaseAlerts': 'Disease Alerts',
    'settings.diseaseAlertsDesc': 'Notifications for detected diseases',
    'settings.weeklyReports': 'Weekly Reports',
    'settings.weeklyReportsDesc': 'Summary of plant health and activity',
    'settings.sensorWarnings': 'Sensor Warnings',
    'settings.sensorWarningsDesc': 'Low battery and connectivity issues',
    'settings.connectedDevices': 'Connected Devices',
    'settings.connectedDevicesDesc': 'Manage your sensors and devices',
    'settings.addNewDevice': 'Add New Device',
    'settings.configure': 'Configure',
    'settings.connected': 'Connected',
    'settings.sensors': 'sensors',
    'settings.security': 'Security',
    'settings.securityDesc': 'Password and security options',
    'settings.changePassword': 'Change Password',
    'settings.enable2FA': 'Enable Two-Factor Authentication',
    'settings.deleteAccount': 'Delete Account',
    'settings.helpSupport': 'Help & Support',
    'settings.helpSupportDesc': 'Get help and learn more',
    'settings.documentation': 'Documentation',
    'settings.contactSupport': 'Contact Support',
    'settings.faqs': 'FAQs',

    // Dashboard
    'dashboard.title': 'Dashboard',
    'dashboard.selectPlant': 'Select a plant to view data',
    'dashboard.noPlant': 'No plant selected',
    'dashboard.plantHealth': 'Plant Health',
    'dashboard.soilMoisture': 'Soil Moisture',
    'dashboard.temperature': 'Temperature',
    'dashboard.humidity': 'Humidity',
    'dashboard.lightLevel': 'Light Level',
    'dashboard.todaysReadings': "Today's Readings",
    'dashboard.weeklyOverview': 'Weekly Overview',
    'dashboard.recentAlerts': 'Recent Alerts',
    'dashboard.activeIssues': 'Active Issues',
    'dashboard.viewDetails': 'View Details',
    'dashboard.sensors': 'Sensor Data',
    'dashboard.water': 'Water Prediction',
    'dashboard.disease': 'Disease Detection',
    'dashboard.logout': 'Logout',

    // Sidebar
    'sidebar.mainMenu': 'Main Menu',
    'sidebar.system': 'System',
    'sidebar.dashboard': 'Dashboard',
    'sidebar.sensorData': 'Sensor Data',
    'sidebar.waterPrediction': 'Water Prediction',
    'sidebar.diseaseDetection': 'Disease Detection',
    'sidebar.settings': 'Settings',

    // Alerts
    'alerts.title': 'Alerts',
    'alerts.noAlerts': 'No new alerts',
    'alerts.viewAll': 'View All Alerts',
    'alerts.markRead': 'Mark as Read',

    // Quick Status
    'quickStatus.title': 'Quick Status',
    'quickStatus.activeSensors': 'Active Sensors',
    'quickStatus.warnings': 'Warnings',
    'quickStatus.healthScore': 'Health Score',

    // Help
    'help.title': 'Help Guide',
    'help.gettingStarted': 'Getting Started',
    'help.howToUse': 'How to Use',
    'help.selectPlantHelp': 'Select a plant from the dropdown to view its data',
    'help.sensorHelp': 'Monitor sensor readings in real-time',
    'help.alertsHelp': 'Check alerts for important notifications',
    
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
    'common.login': 'Login',
    'common.getStarted': 'Get Started',
    'common.watchDemo': 'Watch Demo',
    
    // Navbar
    'nav.about': 'About',
    'nav.challenges': 'Challenges',
    'nav.services': 'Services',
    'nav.howItWorks': 'How It Works',
    
    // Hero
    'hero.badge': 'AI-Powered Plant Intelligence',
    'hero.title1': 'Welcome to',
    'hero.title2': 'Predictive',
    'hero.title3': 'GrowSense AI',
    'hero.description': 'Transform your farming and gardening with AI-driven insights. Predict plant health, optimize watering schedules, and detect diseases before they spread.',
    'hero.trusted': 'Trusted by farmers & gardeners worldwide',
    'hero.activeUsers': 'Active Users',
    'hero.accuracy': 'Accuracy Rate',
    'hero.species': 'Plant Species',
    'hero.plantHealth': 'Plant Health',
    'hero.optimal': 'Optimal',
    'hero.nextWatering': 'Next Watering',
    'hero.inHours': 'In 2 hours',
    
    // About Us
    'about.badge': 'About Us',
    'about.title': 'Nurturing Plants with',
    'about.titleHighlight': 'Intelligence',
    'about.description': 'We are a passionate team of agricultural experts, data scientists, and technology innovators committed to revolutionizing how the world cares for plants.',
    'about.whoWeAre': 'Who We Are',
    'about.whoWeAreDesc': "A dedicated team combining agricultural expertise with cutting-edge AI technology. We understand the challenges farmers and gardeners face daily, because we've lived them ourselves.",
    'about.whyBuilt': 'Why We Built This',
    'about.whyBuiltDesc': 'Traditional plant care relies on guesswork and experience. We envisioned a world where data and AI empower everyone—from novice gardeners to professional farmers—to grow healthier plants.',
    'about.mission': 'Our Mission',
    'about.missionDesc': 'To democratize precision agriculture through accessible AI technology, helping reduce crop loss, conserve water, and enable sustainable farming practices for generations to come.',
    
    // Challenges
    'challenges.badge': 'The Challenges',
    'challenges.title': 'Problems Farmers &',
    'challenges.titleHighlight': 'Gardeners',
    'challenges.titleEnd': 'Face',
    'challenges.description': 'Understanding the pain points is the first step to solving them. These are the real challenges our community faces every day.',
    'challenges.wrongWatering': 'Wrong Watering',
    'challenges.wrongWateringDesc': 'Over-watering or under-watering leads to root damage, nutrient deficiency, and stunted growth. Most plant deaths occur from improper watering.',
    'challenges.lowSurvival': 'Low Survival Rate',
    'challenges.lowSurvivalDesc': "Without proper monitoring, up to 40% of plants fail within the first year. Traditional methods can't catch problems until it's too late.",
    'challenges.lackData': 'Lack of Data',
    'challenges.lackDataDesc': 'Farmers and gardeners operate blindly without real-time data on soil conditions, humidity levels, and light exposure for their specific plants.',
    'challenges.unseenDiseases': 'Unseen Early Diseases',
    'challenges.unseenDiseasesDesc': 'Plant diseases often show visible symptoms only after significant damage. By then, saving the plant becomes extremely difficult.',
    'challenges.noExpert': 'No Expert Guidance',
    'challenges.noExpertDesc': "Access to agricultural experts is limited and expensive. Most growers rely on generic advice that doesn't fit their specific situation.",
    'challenges.plantLoss': 'Preventable Plant Loss',
    'challenges.plantLossDesc': 'Billions of dollars worth of crops and plants are lost annually due to preventable issues that could be detected and addressed early.',
    
    // Services
    'services.badge': 'Our Services',
    'services.title': 'Solutions That',
    'services.titleHighlight': 'Transform',
    'services.titleEnd': 'Plant Care',
    'services.description': 'Our comprehensive suite of AI-powered tools addresses every aspect of modern plant care, from prediction to prevention.',
    'services.watering': 'Watering Prediction',
    'services.wateringDesc': 'AI-powered algorithms analyze soil moisture, weather forecasts, and plant needs to predict exactly when and how much to water.',
    'services.wateringF1': 'Smart scheduling',
    'services.wateringF2': 'Weather integration',
    'services.wateringF3': 'Custom thresholds',
    'services.environmental': 'Environmental Monitoring',
    'services.environmentalDesc': 'Real-time tracking of moisture, humidity, temperature, and light levels with detailed historical data and trend analysis.',
    'services.environmentalF1': '24/7 monitoring',
    'services.environmentalF2': 'Historical data',
    'services.environmentalF3': 'Trend analysis',
    'services.disease': 'Early Disease Detection',
    'services.diseaseDesc': 'Advanced image recognition and sensor data analysis to detect plant diseases before visible symptoms appear.',
    'services.diseaseF1': 'AI image analysis',
    'services.diseaseF2': 'Pathogen database',
    'services.diseaseF3': 'Treatment guides',
    'services.status': 'Live Plant Status',
    'services.statusDesc': 'Real-time dashboard showing the current health status of all your plants with instant alerts for any anomalies.',
    'services.statusF1': 'Real-time updates',
    'services.statusF2': 'Multi-plant view',
    'services.statusF3': 'Mobile app',
    'services.insights': 'Health Insights',
    'services.insightsDesc': 'Comprehensive analytics and reports on plant health trends, growth patterns, and optimization recommendations.',
    'services.insightsF1': 'Growth tracking',
    'services.insightsF2': 'Performance metrics',
    'services.insightsF3': 'Recommendations',
    'services.notifications': 'Smart Notifications',
    'services.notificationsDesc': 'Intelligent alert system that notifies you about critical conditions, upcoming tasks, and preventive actions.',
    'services.notificationsF1': 'Priority alerts',
    'services.notificationsF2': 'Custom schedules',
    'services.notificationsF3': 'Multi-channel',
    
    // How It Works
    'howItWorks.badge': 'How It Works',
    'howItWorks.title': 'Simple Steps to',
    'howItWorks.titleHighlight': 'Smarter',
    'howItWorks.titleEnd': 'Plant Care',
    'howItWorks.description': 'Our system works seamlessly behind the scenes so you can focus on what matters—growing beautiful, healthy plants.',
    'howItWorks.step1': 'Sensors Collect Data',
    'howItWorks.step1Desc': 'Our smart sensors continuously monitor soil moisture, humidity, temperature, and light levels around your plants, gathering thousands of data points daily.',
    'howItWorks.step2': 'AI Analyzes Health',
    'howItWorks.step2Desc': 'Our advanced machine learning algorithms process the sensor data, compare it with our extensive plant database, and identify patterns that indicate health status.',
    'howItWorks.step3': 'You Receive Guidance',
    'howItWorks.step3Desc': 'Get personalized recommendations, predictions, and actionable insights delivered to your dashboard and mobile device in real-time.',
    
    // Final CTA
    'cta.title': 'Ready to Transform Your Plant Care?',
    'cta.description': 'Join thousands of farmers and gardeners who have already revolutionized their approach to plant health with AI-powered predictions and insights.',
    'cta.secure': 'Secure & Private',
    'cta.instant': 'Instant Setup',
    'cta.trial': '14-Day Free Trial',
    'cta.button': 'Login to Continue',
    
    // Footer
    'footer.tagline': 'AI-powered plant health monitoring and predictive care for farmers and gardeners worldwide.',
    'footer.followUs': 'Follow us',
    'footer.rights': 'All rights reserved.',
  },
  hi: {
    // Language Selection
    'lang.title': 'आप किस भाषा में सहज हैं?',
    'lang.changeNote': 'आप इसे बाद में बदल सकते हैं',
    'lang.english': 'English',
    'lang.hindi': 'हिंदी (Hindi)',
    'lang.gujarati': 'ગુજરાતી (Gujarati)',
    'lang.other': 'अन्य',
    
    // Settings
    'settings.title': 'सेटिंग्स',
    'settings.profile': 'प्रोफाइल सेटिंग्स',
    'settings.profileDesc': 'अपनी खाता जानकारी प्रबंधित करें',
    'settings.fullName': 'पूरा नाम',
    'settings.email': 'ईमेल',
    'settings.phone': 'फोन',
    'settings.location': 'स्थान',
    'settings.saveChanges': 'बदलाव सहेजें',
    'settings.changeAvatar': 'अवतार बदलें',
    'settings.avatarHint': 'अपलोड करने के लिए क्लिक करें (अधिकतम 5MB)',
    'settings.language': 'भाषा',
    'settings.languageDesc': 'अपनी पसंदीदा भाषा चुनें',
    'settings.selectLanguage': 'भाषा चुनें',
    'settings.notifications': 'सूचनाएं',
    'settings.notificationsDesc': 'अलर्ट प्राथमिकताएं कॉन्फ़िगर करें',
    'settings.wateringAlerts': 'पानी देने की सूचनाएं',
    'settings.wateringAlertsDesc': 'पौधों को पानी की जरूरत होने पर सूचित हों',
    'settings.diseaseAlerts': 'रोग सूचनाएं',
    'settings.diseaseAlertsDesc': 'पहचाने गए रोगों की सूचनाएं',
    'settings.weeklyReports': 'साप्ताहिक रिपोर्ट',
    'settings.weeklyReportsDesc': 'पौधे के स्वास्थ्य और गतिविधि का सारांश',
    'settings.sensorWarnings': 'सेंसर चेतावनियां',
    'settings.sensorWarningsDesc': 'कम बैटरी और कनेक्टिविटी समस्याएं',
    'settings.connectedDevices': 'जुड़े उपकरण',
    'settings.connectedDevicesDesc': 'अपने सेंसर और उपकरण प्रबंधित करें',
    'settings.addNewDevice': 'नया उपकरण जोड़ें',
    'settings.configure': 'कॉन्फ़िगर करें',
    'settings.connected': 'जुड़ा हुआ',
    'settings.sensors': 'सेंसर',
    'settings.security': 'सुरक्षा',
    'settings.securityDesc': 'पासवर्ड और सुरक्षा विकल्प',
    'settings.changePassword': 'पासवर्ड बदलें',
    'settings.enable2FA': 'दो-कारक प्रमाणीकरण सक्षम करें',
    'settings.deleteAccount': 'खाता हटाएं',
    'settings.helpSupport': 'सहायता और समर्थन',
    'settings.helpSupportDesc': 'सहायता प्राप्त करें और अधिक जानें',
    'settings.documentation': 'दस्तावेज़ीकरण',
    'settings.contactSupport': 'समर्थन से संपर्क करें',
    'settings.faqs': 'सामान्य प्रश्न',

    // Dashboard
    'dashboard.title': 'डैशबोर्ड',
    'dashboard.selectPlant': 'डेटा देखने के लिए पौधा चुनें',
    'dashboard.noPlant': 'कोई पौधा चयनित नहीं',
    'dashboard.plantHealth': 'पौधे का स्वास्थ्य',
    'dashboard.soilMoisture': 'मिट्टी की नमी',
    'dashboard.temperature': 'तापमान',
    'dashboard.humidity': 'आर्द्रता',
    'dashboard.lightLevel': 'प्रकाश स्तर',
    'dashboard.todaysReadings': 'आज की रीडिंग',
    'dashboard.weeklyOverview': 'साप्ताहिक अवलोकन',
    'dashboard.recentAlerts': 'हालिया अलर्ट',
    'dashboard.activeIssues': 'सक्रिय समस्याएं',
    'dashboard.viewDetails': 'विवरण देखें',
    'dashboard.sensors': 'सेंसर डेटा',
    'dashboard.water': 'पानी भविष्यवाणी',
    'dashboard.disease': 'रोग पहचान',
    'dashboard.logout': 'लॉगआउट',

    // Sidebar
    'sidebar.mainMenu': 'मुख्य मेनू',
    'sidebar.system': 'सिस्टम',
    'sidebar.dashboard': 'डैशबोर्ड',
    'sidebar.sensorData': 'सेंसर डेटा',
    'sidebar.waterPrediction': 'पानी भविष्यवाणी',
    'sidebar.diseaseDetection': 'रोग पहचान',
    'sidebar.settings': 'सेटिंग्स',

    // Alerts
    'alerts.title': 'अलर्ट',
    'alerts.noAlerts': 'कोई नई अलर्ट नहीं',
    'alerts.viewAll': 'सभी अलर्ट देखें',
    'alerts.markRead': 'पढ़ा हुआ चिह्नित करें',

    // Quick Status
    'quickStatus.title': 'त्वरित स्थिति',
    'quickStatus.activeSensors': 'सक्रिय सेंसर',
    'quickStatus.warnings': 'चेतावनियां',
    'quickStatus.healthScore': 'स्वास्थ्य स्कोर',

    // Help
    'help.title': 'सहायता गाइड',
    'help.gettingStarted': 'शुरू करना',
    'help.howToUse': 'कैसे उपयोग करें',
    'help.selectPlantHelp': 'इसका डेटा देखने के लिए ड्रॉपडाउन से पौधा चुनें',
    'help.sensorHelp': 'रीयल-टाइम में सेंसर रीडिंग की निगरानी करें',
    'help.alertsHelp': 'महत्वपूर्ण सूचनाओं के लिए अलर्ट जांचें',
    
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
    'common.login': 'लॉगिन',
    'common.getStarted': 'शुरू करें',
    'common.watchDemo': 'डेमो देखें',
    
    // Navbar
    'nav.about': 'हमारे बारे में',
    'nav.challenges': 'चुनौतियां',
    'nav.services': 'सेवाएं',
    'nav.howItWorks': 'कैसे काम करता है',
    
    // Hero
    'hero.badge': 'AI-संचालित पौधा बुद्धिमत्ता',
    'hero.title1': 'आपका स्वागत है',
    'hero.title2': 'प्रेडिक्टिव',
    'hero.title3': 'GrowSense AI',
    'hero.description': 'AI-संचालित अंतर्दृष्टि के साथ अपनी खेती और बागवानी को बदलें। पौधों के स्वास्थ्य की भविष्यवाणी करें, पानी देने की समय-सारणी अनुकूलित करें, और बीमारियों का पता लगाएं।',
    'hero.trusted': 'दुनिया भर के किसानों और बागवानों द्वारा विश्वसनीय',
    'hero.activeUsers': 'सक्रिय उपयोगकर्ता',
    'hero.accuracy': 'सटीकता दर',
    'hero.species': 'पौधों की प्रजातियां',
    'hero.plantHealth': 'पौधे का स्वास्थ्य',
    'hero.optimal': 'इष्टतम',
    'hero.nextWatering': 'अगला पानी',
    'hero.inHours': '2 घंटे में',
    
    // About Us
    'about.badge': 'हमारे बारे में',
    'about.title': 'पौधों का पोषण करना',
    'about.titleHighlight': 'बुद्धिमत्ता के साथ',
    'about.description': 'हम कृषि विशेषज्ञों, डेटा वैज्ञानिकों और प्रौद्योगिकी नवप्रवर्तकों की एक जुनूनी टीम हैं जो दुनिया में पौधों की देखभाल के तरीके में क्रांति लाने के लिए प्रतिबद्ध हैं।',
    'about.whoWeAre': 'हम कौन हैं',
    'about.whoWeAreDesc': 'कृषि विशेषज्ञता को अत्याधुनिक AI तकनीक के साथ जोड़ने वाली एक समर्पित टीम। हम किसानों और बागवानों की दैनिक चुनौतियों को समझते हैं, क्योंकि हमने खुद इन्हें अनुभव किया है।',
    'about.whyBuilt': 'हमने यह क्यों बनाया',
    'about.whyBuiltDesc': 'पारंपरिक पौधों की देखभाल अनुमान और अनुभव पर निर्भर करती है। हमने एक ऐसी दुनिया की कल्पना की जहां डेटा और AI सभी को—नौसिखिए बागवानों से लेकर पेशेवर किसानों तक—स्वस्थ पौधे उगाने में सक्षम बनाते हैं।',
    'about.mission': 'हमारा मिशन',
    'about.missionDesc': 'सुलभ AI तकनीक के माध्यम से सटीक कृषि को लोकतांत्रिक बनाना, फसल के नुकसान को कम करने, पानी बचाने और आने वाली पीढ़ियों के लिए टिकाऊ खेती प्रथाओं को सक्षम करने में मदद करना।',
    
    // Challenges
    'challenges.badge': 'चुनौतियां',
    'challenges.title': 'किसानों और',
    'challenges.titleHighlight': 'बागवानों',
    'challenges.titleEnd': 'की समस्याएं',
    'challenges.description': 'समस्याओं को समझना उन्हें हल करने की पहली कदम है। ये वास्तविक चुनौतियां हैं जिनका हमारा समुदाय हर दिन सामना करता है।',
    'challenges.wrongWatering': 'गलत पानी देना',
    'challenges.wrongWateringDesc': 'ज्यादा या कम पानी देने से जड़ों को नुकसान, पोषक तत्वों की कमी और विकास रुक जाता है। ज्यादातर पौधों की मृत्यु अनुचित पानी देने से होती है।',
    'challenges.lowSurvival': 'कम जीवित रहने की दर',
    'challenges.lowSurvivalDesc': 'उचित निगरानी के बिना, 40% तक पौधे पहले वर्ष में विफल हो जाते हैं। पारंपरिक तरीके समस्याओं को तब तक नहीं पकड़ सकते जब तक बहुत देर न हो जाए।',
    'challenges.lackData': 'डेटा की कमी',
    'challenges.lackDataDesc': 'किसान और बागवान मिट्टी की स्थिति, नमी के स्तर और प्रकाश एक्सपोजर पर रीयल-टाइम डेटा के बिना अंधेरे में काम करते हैं।',
    'challenges.unseenDiseases': 'अदृश्य प्रारंभिक रोग',
    'challenges.unseenDiseasesDesc': 'पौधों की बीमारियां अक्सर महत्वपूर्ण क्षति के बाद ही दिखाई देती हैं। तब तक, पौधे को बचाना बेहद मुश्किल हो जाता है।',
    'challenges.noExpert': 'विशेषज्ञ मार्गदर्शन नहीं',
    'challenges.noExpertDesc': 'कृषि विशेषज्ञों तक पहुंच सीमित और महंगी है। ज्यादातर उत्पादक सामान्य सलाह पर निर्भर रहते हैं जो उनकी विशिष्ट स्थिति के अनुकूल नहीं होती।',
    'challenges.plantLoss': 'रोके जा सकने वाला पौधा नुकसान',
    'challenges.plantLossDesc': 'हर साल अरबों रुपये की फसलें और पौधे उन रोकथाम योग्य मुद्दों के कारण खो जाते हैं जिनका जल्दी पता लगाया और संबोधित किया जा सकता था।',
    
    // Services
    'services.badge': 'हमारी सेवाएं',
    'services.title': 'समाधान जो',
    'services.titleHighlight': 'बदल देते हैं',
    'services.titleEnd': 'पौधों की देखभाल',
    'services.description': 'हमारे AI-संचालित उपकरणों का व्यापक सूट आधुनिक पौधों की देखभाल के हर पहलू को संबोधित करता है, भविष्यवाणी से लेकर रोकथाम तक।',
    'services.watering': 'पानी की भविष्यवाणी',
    'services.wateringDesc': 'AI-संचालित एल्गोरिदम मिट्टी की नमी, मौसम के पूर्वानुमान और पौधों की जरूरतों का विश्लेषण करके सटीक रूप से बताते हैं कि कब और कितना पानी देना है।',
    'services.wateringF1': 'स्मार्ट शेड्यूलिंग',
    'services.wateringF2': 'मौसम एकीकरण',
    'services.wateringF3': 'कस्टम थ्रेशोल्ड',
    'services.environmental': 'पर्यावरण निगरानी',
    'services.environmentalDesc': 'विस्तृत ऐतिहासिक डेटा और ट्रेंड विश्लेषण के साथ नमी, आर्द्रता, तापमान और प्रकाश स्तरों की रीयल-टाइम ट्रैकिंग।',
    'services.environmentalF1': '24/7 निगरानी',
    'services.environmentalF2': 'ऐतिहासिक डेटा',
    'services.environmentalF3': 'ट्रेंड विश्लेषण',
    'services.disease': 'प्रारंभिक रोग पहचान',
    'services.diseaseDesc': 'दिखाई देने वाले लक्षण प्रकट होने से पहले पौधों की बीमारियों का पता लगाने के लिए उन्नत छवि पहचान और सेंसर डेटा विश्लेषण।',
    'services.diseaseF1': 'AI छवि विश्लेषण',
    'services.diseaseF2': 'रोगजनक डेटाबेस',
    'services.diseaseF3': 'उपचार गाइड',
    'services.status': 'लाइव पौधा स्थिति',
    'services.statusDesc': 'आपके सभी पौधों की वर्तमान स्वास्थ्य स्थिति दिखाने वाला रीयल-टाइम डैशबोर्ड, किसी भी असामान्यता के लिए तत्काल अलर्ट के साथ।',
    'services.statusF1': 'रीयल-टाइम अपडेट',
    'services.statusF2': 'मल्टी-प्लांट व्यू',
    'services.statusF3': 'मोबाइल ऐप',
    'services.insights': 'स्वास्थ्य अंतर्दृष्टि',
    'services.insightsDesc': 'पौधों के स्वास्थ्य रुझानों, विकास पैटर्न और अनुकूलन सिफारिशों पर व्यापक विश्लेषण और रिपोर्ट।',
    'services.insightsF1': 'विकास ट्रैकिंग',
    'services.insightsF2': 'प्रदर्शन मेट्रिक्स',
    'services.insightsF3': 'सिफारिशें',
    'services.notifications': 'स्मार्ट सूचनाएं',
    'services.notificationsDesc': 'बुद्धिमान अलर्ट सिस्टम जो आपको महत्वपूर्ण स्थितियों, आगामी कार्यों और निवारक कार्रवाइयों के बारे में सूचित करता है।',
    'services.notificationsF1': 'प्राथमिकता अलर्ट',
    'services.notificationsF2': 'कस्टम शेड्यूल',
    'services.notificationsF3': 'मल्टी-चैनल',
    
    // How It Works
    'howItWorks.badge': 'कैसे काम करता है',
    'howItWorks.title': 'सरल कदम',
    'howItWorks.titleHighlight': 'स्मार्ट',
    'howItWorks.titleEnd': 'पौधों की देखभाल के लिए',
    'howItWorks.description': 'हमारा सिस्टम पर्दे के पीछे निर्बाध रूप से काम करता है ताकि आप जो मायने रखता है उस पर ध्यान केंद्रित कर सकें—सुंदर, स्वस्थ पौधे उगाना।',
    'howItWorks.step1': 'सेंसर डेटा एकत्र करते हैं',
    'howItWorks.step1Desc': 'हमारे स्मार्ट सेंसर आपके पौधों के आसपास मिट्टी की नमी, आर्द्रता, तापमान और प्रकाश के स्तर की लगातार निगरानी करते हैं, रोजाना हजारों डेटा पॉइंट्स एकत्र करते हैं।',
    'howItWorks.step2': 'AI स्वास्थ्य का विश्लेषण करता है',
    'howItWorks.step2Desc': 'हमारे उन्नत मशीन लर्निंग एल्गोरिदम सेंसर डेटा को प्रोसेस करते हैं, हमारे व्यापक पौधे डेटाबेस से तुलना करते हैं, और स्वास्थ्य स्थिति का संकेत देने वाले पैटर्न की पहचान करते हैं।',
    'howItWorks.step3': 'आपको मार्गदर्शन मिलता है',
    'howItWorks.step3Desc': 'अपने डैशबोर्ड और मोबाइल डिवाइस पर रीयल-टाइम में व्यक्तिगत सिफारिशें, भविष्यवाणियां और कार्रवाई योग्य अंतर्दृष्टि प्राप्त करें।',
    
    // Final CTA
    'cta.title': 'अपनी पौधों की देखभाल को बदलने के लिए तैयार हैं?',
    'cta.description': 'हजारों किसानों और बागवानों से जुड़ें जिन्होंने पहले से ही AI-संचालित भविष्यवाणियों और अंतर्दृष्टि के साथ पौधों के स्वास्थ्य के प्रति अपने दृष्टिकोण में क्रांति ला दी है।',
    'cta.secure': 'सुरक्षित और निजी',
    'cta.instant': 'तत्काल सेटअप',
    'cta.trial': '14-दिन मुफ्त ट्रायल',
    'cta.button': 'जारी रखने के लिए लॉगिन करें',
    
    // Footer
    'footer.tagline': 'दुनिया भर के किसानों और बागवानों के लिए AI-संचालित पौधा स्वास्थ्य निगरानी और भविष्यवाणी देखभाल।',
    'footer.followUs': 'हमें फॉलो करें',
    'footer.rights': 'सर्वाधिकार सुरक्षित।',
  },
  gu: {
    // Language Selection
    'lang.title': 'તમે કઈ ભાષામાં આરામદાયક છો?',
    'lang.changeNote': 'તમે આ પછીથી બદલી શકો છો',
    'lang.english': 'English',
    'lang.hindi': 'हिंदी (Hindi)',
    'lang.gujarati': 'ગુજરાતી (Gujarati)',
    'lang.other': 'અન્ય',
    
    // Settings
    'settings.title': 'સેટિંગ્સ',
    'settings.profile': 'પ્રોફાઇલ સેટિંગ્સ',
    'settings.profileDesc': 'તમારી એકાઉન્ટ માહિતી મેનેજ કરો',
    'settings.fullName': 'પૂરું નામ',
    'settings.email': 'ઈમેઇલ',
    'settings.phone': 'ફોન',
    'settings.location': 'સ્થાન',
    'settings.saveChanges': 'ફેરફારો સાચવો',
    'settings.changeAvatar': 'અવતાર બદલો',
    'settings.avatarHint': 'અપલોડ કરવા માટે ક્લિક કરો (મહત્તમ 5MB)',
    'settings.language': 'ભાષા',
    'settings.languageDesc': 'તમારી પસંદગીની ભાષા પસંદ કરો',
    'settings.selectLanguage': 'ભાષા પસંદ કરો',
    'settings.notifications': 'સૂચનાઓ',
    'settings.notificationsDesc': 'અલર્ટ પસંદગીઓ કોન્ફિગર કરો',
    'settings.wateringAlerts': 'પાણી આપવાની સૂચનાઓ',
    'settings.wateringAlertsDesc': 'છોડને પાણીની જરૂર હોય ત્યારે સૂચિત થાઓ',
    'settings.diseaseAlerts': 'રોગ સૂચનાઓ',
    'settings.diseaseAlertsDesc': 'ઓળખાયેલ રોગો માટે સૂચનાઓ',
    'settings.weeklyReports': 'સાપ્તાહિક અહેવાલો',
    'settings.weeklyReportsDesc': 'છોડના આરોગ્ય અને પ્રવૃત્તિનો સારાંશ',
    'settings.sensorWarnings': 'સેન્સર ચેતવણીઓ',
    'settings.sensorWarningsDesc': 'ઓછી બેટરી અને કનેક્ટિવિટી સમસ્યાઓ',
    'settings.connectedDevices': 'જોડાયેલ ઉપકરણો',
    'settings.connectedDevicesDesc': 'તમારા સેન્સર અને ઉપકરણો મેનેજ કરો',
    'settings.addNewDevice': 'નવું ઉપકરણ ઉમેરો',
    'settings.configure': 'કોન્ફિગર કરો',
    'settings.connected': 'જોડાયેલ',
    'settings.sensors': 'સેન્સર',
    'settings.security': 'સુરક્ષા',
    'settings.securityDesc': 'પાસવર્ડ અને સુરક્ષા વિકલ્પો',
    'settings.changePassword': 'પાસવર્ડ બદલો',
    'settings.enable2FA': 'બે-પરિબળ પ્રમાણીકરણ સક્ષમ કરો',
    'settings.deleteAccount': 'એકાઉન્ટ કાઢી નાખો',
    'settings.helpSupport': 'મદદ અને સપોર્ટ',
    'settings.helpSupportDesc': 'મદદ મેળવો અને વધુ જાણો',
    'settings.documentation': 'દસ્તાવેજીકરણ',
    'settings.contactSupport': 'સપોર્ટનો સંપર્ક કરો',
    'settings.faqs': 'વારંવાર પૂછાતા પ્રશ્નો',

    // Dashboard
    'dashboard.title': 'ડેશબોર્ડ',
    'dashboard.selectPlant': 'ડેટા જોવા માટે છોડ પસંદ કરો',
    'dashboard.noPlant': 'કોઈ છોડ પસંદ નથી',
    'dashboard.plantHealth': 'છોડનું આરોગ્ય',
    'dashboard.soilMoisture': 'જમીનની ભેજ',
    'dashboard.temperature': 'તાપમાન',
    'dashboard.humidity': 'ભેજ',
    'dashboard.lightLevel': 'પ્રકાશ સ્તર',
    'dashboard.todaysReadings': 'આજની રીડિંગ્સ',
    'dashboard.weeklyOverview': 'સાપ્તાહિક ઝાંખી',
    'dashboard.recentAlerts': 'તાજેતરના અલર્ટ',
    'dashboard.activeIssues': 'સક્રિય સમસ્યાઓ',
    'dashboard.viewDetails': 'વિગતો જુઓ',
    'dashboard.sensors': 'સેન્સર ડેટા',
    'dashboard.water': 'પાણી આગાહી',
    'dashboard.disease': 'રોગ ઓળખ',
    'dashboard.logout': 'લોગઆઉટ',

    // Sidebar
    'sidebar.mainMenu': 'મુખ્ય મેનૂ',
    'sidebar.system': 'સિસ્ટમ',
    'sidebar.dashboard': 'ડેશબોર્ડ',
    'sidebar.sensorData': 'સેન્સર ડેટા',
    'sidebar.waterPrediction': 'પાણી આગાહી',
    'sidebar.diseaseDetection': 'રોગ ઓળખ',
    'sidebar.settings': 'સેટિંગ્સ',

    // Alerts
    'alerts.title': 'અલર્ટ',
    'alerts.noAlerts': 'કોઈ નવી અલર્ટ નથી',
    'alerts.viewAll': 'બધા અલર્ટ જુઓ',
    'alerts.markRead': 'વાંચેલ તરીકે ચિહ્નિત કરો',

    // Quick Status
    'quickStatus.title': 'ઝડપી સ્થિતિ',
    'quickStatus.activeSensors': 'સક્રિય સેન્સર',
    'quickStatus.warnings': 'ચેતવણીઓ',
    'quickStatus.healthScore': 'આરોગ્ય સ્કોર',

    // Help
    'help.title': 'મદદ માર્ગદર્શિકા',
    'help.gettingStarted': 'શરૂઆત કરવી',
    'help.howToUse': 'કેવી રીતે ઉપયોગ કરવો',
    'help.selectPlantHelp': 'તેનો ડેટા જોવા માટે ડ્રોપડાઉનમાંથી છોડ પસંદ કરો',
    'help.sensorHelp': 'રીયલ-ટાઇમમાં સેન્સર રીડિંગ્સ મોનિટર કરો',
    'help.alertsHelp': 'મહત્વપૂર્ણ સૂચનાઓ માટે અલર્ટ તપાસો',
    
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
    'common.login': 'લોગિન',
    'common.getStarted': 'શરૂ કરો',
    'common.watchDemo': 'ડેમો જુઓ',
    
    // Navbar
    'nav.about': 'અમારા વિશે',
    'nav.challenges': 'પડકારો',
    'nav.services': 'સેવાઓ',
    'nav.howItWorks': 'કેવી રીતે કામ કરે છે',
    
    // Hero
    'hero.badge': 'AI-સંચાલિત છોડ બુદ્ધિમત્તા',
    'hero.title1': 'સ્વાગત છે',
    'hero.title2': 'પ્રેડિક્ટિવ',
    'hero.title3': 'GrowSense AI',
    'hero.description': 'AI-સંચાલિત અંતર્દૃષ્ટિ સાથે તમારી ખેતી અને બાગવાનીને બદલો. છોડના આરોગ્યની આગાહી કરો, પાણી આપવાના સમયપત્રકને શ્રેષ્ઠ બનાવો અને રોગોને શોધો.',
    'hero.trusted': 'વિશ્વભરના ખેડૂતો અને બાગવાનો દ્વારા વિશ્વસનીય',
    'hero.activeUsers': 'સક્રિય વપરાશકર્તાઓ',
    'hero.accuracy': 'ચોકસાઈ દર',
    'hero.species': 'છોડની પ્રજાતિઓ',
    'hero.plantHealth': 'છોડનું આરોગ્ય',
    'hero.optimal': 'શ્રેષ્ઠ',
    'hero.nextWatering': 'આગળનું પાણી',
    'hero.inHours': '2 કલાકમાં',
    
    // About Us
    'about.badge': 'અમારા વિશે',
    'about.title': 'છોડનું પોષણ',
    'about.titleHighlight': 'બુદ્ધિમત્તા સાથે',
    'about.description': 'અમે કૃષિ નિષ્ણાતો, ડેટા વૈજ્ઞાનિકો અને ટેકનોલોજી નવીનતાકારોની એક જુસ્સાદાર ટીમ છીએ જે વિશ્વમાં છોડની સંભાળની રીતને બદલવા માટે પ્રતિબદ્ધ છે.',
    'about.whoWeAre': 'અમે કોણ છીએ',
    'about.whoWeAreDesc': 'કૃષિ કુશળતાને અત્યાધુનિક AI ટેકનોલોજી સાથે જોડતી સમર્પિત ટીમ. અમે ખેડૂતો અને બાગવાનોની રોજિંદી પડકારોને સમજીએ છીએ, કારણ કે અમે પોતે તેનો અનુભવ કર્યો છે.',
    'about.whyBuilt': 'અમે આ કેમ બનાવ્યું',
    'about.whyBuiltDesc': 'પરંપરાગત છોડની સંભાળ અનુમાન અને અનુભવ પર આધારિત છે. અમે એવી દુનિયાની કલ્પના કરી જ્યાં ડેટા અને AI દરેકને—નવા બાગવાનોથી લઈને વ્યાવસાયિક ખેડૂતો સુધી—સ્વસ્થ છોડ ઉગાડવા સક્ષમ બનાવે છે.',
    'about.mission': 'અમારું મિશન',
    'about.missionDesc': 'સુલભ AI ટેકનોલોજી દ્વારા ચોક્કસ કૃષિને લોકશાહી બનાવવી, પાકના નુકસાનને ઘટાડવામાં, પાણી બચાવવામાં અને આવનારી પેઢીઓ માટે ટકાઉ ખેતી પ્રથાઓ સક્ષમ કરવામાં મદદ કરવી.',
    
    // Challenges
    'challenges.badge': 'પડકારો',
    'challenges.title': 'ખેડૂતો અને',
    'challenges.titleHighlight': 'બાગવાનોની',
    'challenges.titleEnd': 'સમસ્યાઓ',
    'challenges.description': 'સમસ્યાઓને સમજવી એ તેમને ઉકેલવાનું પ્રથમ પગલું છે. આ વાસ્તવિક પડકારો છે જેનો અમારો સમુદાય દરરોજ સામનો કરે છે.',
    'challenges.wrongWatering': 'ખોટું પાણી આપવું',
    'challenges.wrongWateringDesc': 'વધુ પડતું કે ઓછું પાણી આપવાથી મૂળને નુકસાન, પોષક તત્વોની ઉણપ અને વિકાસ અટકી જાય છે. મોટાભાગના છોડની મૃત્યુ અયોગ્ય પાણી આપવાથી થાય છે.',
    'challenges.lowSurvival': 'ઓછો જીવિત રહેવાનો દર',
    'challenges.lowSurvivalDesc': 'યોગ્ય દેખરેખ વિના, 40% જેટલા છોડ પ્રથમ વર્ષમાં નિષ્ફળ જાય છે. પરંપરાગત પદ્ધતિઓ સમસ્યાઓ ત્યારે સુધી પકડી શકતી નથી જ્યાં સુધી ખૂબ મોડું ન થઈ જાય.',
    'challenges.lackData': 'ડેટાની અછત',
    'challenges.lackDataDesc': 'ખેડૂતો અને બાગવાનો જમીનની સ્થિતિ, ભેજના સ્તર અને પ્રકાશ એક્સપોઝર પર રીયલ-ટાઇમ ડેટા વિના અંધારામાં કામ કરે છે.',
    'challenges.unseenDiseases': 'અદૃશ્ય પ્રારંભિક રોગો',
    'challenges.unseenDiseasesDesc': 'છોડના રોગો ઘણીવાર નોંધપાત્ર નુકસાન પછી જ દેખાય છે. ત્યાં સુધીમાં, છોડને બચાવવો અત્યંત મુશ્કેલ બની જાય છે.',
    'challenges.noExpert': 'નિષ્ણાત માર્ગદર્શન નથી',
    'challenges.noExpertDesc': 'કૃષિ નિષ્ણાતો સુધી પહોંચ મર્યાદિત અને ખર્ચાળ છે. મોટાભાગના ઉત્પાદકો સામાન્ય સલાહ પર આધાર રાખે છે જે તેમની ચોક્કસ પરિસ્થિતિને અનુરૂપ નથી.',
    'challenges.plantLoss': 'અટકાવી શકાય તેવું છોડ નુકસાન',
    'challenges.plantLossDesc': 'દર વર્ષે અબજો રૂપિયાના પાક અને છોડ એવી અટકાવી શકાય તેવી સમસ્યાઓને કારણે ખોવાઈ જાય છે જેને વહેલી તપાસ અને સંબોધિત કરી શકાય છે.',
    
    // Services
    'services.badge': 'અમારી સેવાઓ',
    'services.title': 'ઉકેલો જે',
    'services.titleHighlight': 'બદલી નાખે છે',
    'services.titleEnd': 'છોડની સંભાળ',
    'services.description': 'અમારા AI-સંચાલિત સાધનોનો વ્યાપક સમૂહ આધુનિક છોડની સંભાળના દરેક પાસાને સંબોધે છે, આગાહીથી લઈને નિવારણ સુધી.',
    'services.watering': 'પાણીની આગાહી',
    'services.wateringDesc': 'AI-સંચાલિત એલ્ગોરિધમ્સ જમીનની ભેજ, હવામાન આગાહી અને છોડની જરૂરિયાતોનું વિશ્લેષણ કરીને ચોક્કસ રીતે જણાવે છે કે ક્યારે અને કેટલું પાણી આપવું.',
    'services.wateringF1': 'સ્માર્ટ શેડ્યુલિંગ',
    'services.wateringF2': 'હવામાન એકીકરણ',
    'services.wateringF3': 'કસ્ટમ થ્રેશોલ્ડ',
    'services.environmental': 'પર્યાવરણ દેખરેખ',
    'services.environmentalDesc': 'વિગતવાર ઐતિહાસિક ડેટા અને ટ્રેન્ડ વિશ્લેષણ સાથે ભેજ, ભેજ, તાપમાન અને પ્રકાશ સ્તરોની રીયલ-ટાઇમ ટ્રેકિંગ.',
    'services.environmentalF1': '24/7 દેખરેખ',
    'services.environmentalF2': 'ઐતિહાસિક ડેટા',
    'services.environmentalF3': 'ટ્રેન્ડ વિશ્લેષણ',
    'services.disease': 'પ્રારંભિક રોગ ઓળખ',
    'services.diseaseDesc': 'દેખાતા લક્ષણો દેખાય તે પહેલાં છોડના રોગોને શોધવા માટે અદ્યતન છબી ઓળખ અને સેન્સર ડેટા વિશ્લેષણ.',
    'services.diseaseF1': 'AI છબી વિશ્લેષણ',
    'services.diseaseF2': 'પેથોજન ડેટાબેઝ',
    'services.diseaseF3': 'સારવાર માર્ગદર્શિકાઓ',
    'services.status': 'લાઇવ છોડ સ્થિતિ',
    'services.statusDesc': 'તમારા બધા છોડની વર્તમાન આરોગ્ય સ્થિતિ દર્શાવતું રીયલ-ટાઇમ ડેશબોર્ડ, કોઈપણ અસાધારણતા માટે તાત્કાલિક ચેતવણીઓ સાથે.',
    'services.statusF1': 'રીયલ-ટાઇમ અપડેટ્સ',
    'services.statusF2': 'મલ્ટિ-પ્લાન્ટ વ્યૂ',
    'services.statusF3': 'મોબાઇલ એપ',
    'services.insights': 'આરોગ્ય અંતર્દૃષ્ટિ',
    'services.insightsDesc': 'છોડના આરોગ્ય વલણો, વૃદ્ધિ પેટર્ન અને ઓપ્ટિમાઇઝેશન ભલામણો પર વ્યાપક વિશ્લેષણ અને અહેવાલો.',
    'services.insightsF1': 'વૃદ્ધિ ટ્રેકિંગ',
    'services.insightsF2': 'પ્રદર્શન મેટ્રિક્સ',
    'services.insightsF3': 'ભલામણો',
    'services.notifications': 'સ્માર્ટ સૂચનાઓ',
    'services.notificationsDesc': 'બુદ્ધિશાળી ચેતવણી સિસ્ટમ જે તમને મહત્વપૂર્ણ પરિસ્થિતિઓ, આગામી કાર્યો અને નિવારક ક્રિયાઓ વિશે સૂચિત કરે છે.',
    'services.notificationsF1': 'પ્રાથમિકતા ચેતવણીઓ',
    'services.notificationsF2': 'કસ્ટમ શેડ્યૂલ',
    'services.notificationsF3': 'મલ્ટિ-ચેનલ',
    
    // How It Works
    'howItWorks.badge': 'કેવી રીતે કામ કરે છે',
    'howItWorks.title': 'સરળ પગલાં',
    'howItWorks.titleHighlight': 'સ્માર્ટ',
    'howItWorks.titleEnd': 'છોડ સંભાળ માટે',
    'howItWorks.description': 'અમારી સિસ્ટમ પડદા પાછળ એકીકૃત રીતે કામ કરે છે જેથી તમે શું મહત્વપૂર્ણ છે તેના પર ધ્યાન કેન્દ્રિત કરી શકો—સુંદર, સ્વસ્થ છોડ ઉગાડવા.',
    'howItWorks.step1': 'સેન્સર્સ ડેટા એકત્રિત કરે છે',
    'howItWorks.step1Desc': 'અમારા સ્માર્ટ સેન્સર્સ તમારા છોડની આસપાસ જમીનની ભેજ, ભેજ, તાપમાન અને પ્રકાશ સ્તરોની સતત દેખરેખ રાખે છે, દરરોજ હજારો ડેટા પોઇન્ટ્સ એકત્રિત કરે છે.',
    'howItWorks.step2': 'AI આરોગ્યનું વિશ્લેષણ કરે છે',
    'howItWorks.step2Desc': 'અમારા અદ્યતન મશીન લર્નિંગ એલ્ગોરિધમ્સ સેન્સર ડેટાને પ્રોસેસ કરે છે, અમારા વ્યાપક છોડ ડેટાબેઝ સાથે સરખાવે છે, અને આરોગ્ય સ્થિતિ દર્શાવતી પેટર્ન ઓળખે છે.',
    'howItWorks.step3': 'તમને માર્ગદર્શન મળે છે',
    'howItWorks.step3Desc': 'તમારા ડેશબોર્ડ અને મોબાઇલ ઉપકરણ પર રીયલ-ટાઇમમાં વ્યક્તિગત ભલામણો, આગાહીઓ અને કાર્યવાહીયોગ્ય અંતર્દૃષ્ટિ મેળવો.',
    
    // Final CTA
    'cta.title': 'તમારી છોડ સંભાળને બદલવા તૈયાર છો?',
    'cta.description': 'હજારો ખેડૂતો અને બાગવાનો સાથે જોડાઓ જેમણે પહેલેથી જ AI-સંચાલિત આગાહીઓ અને અંતર્દૃષ્ટિ સાથે છોડના આરોગ્ય પ્રત્યેના તેમના અભિગમમાં ક્રાંતિ લાવી છે.',
    'cta.secure': 'સુરક્ષિત અને ખાનગી',
    'cta.instant': 'તાત્કાલિક સેટઅપ',
    'cta.trial': '14-દિવસ મફત ટ્રાયલ',
    'cta.button': 'ચાલુ રાખવા માટે લોગિન કરો',
    
    // Footer
    'footer.tagline': 'વિશ્વભરના ખેડૂતો અને બાગવાનો માટે AI-સંચાલિત છોડ આરોગ્ય દેખરેખ અને આગાહી સંભાળ.',
    'footer.followUs': 'અમને ફોલો કરો',
    'footer.rights': 'બધા અધિકારો સુરક્ષિત.',
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
