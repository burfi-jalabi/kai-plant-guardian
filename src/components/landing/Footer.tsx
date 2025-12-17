import { Sprout, Instagram } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  return (
    <footer className="bg-foreground py-12 lg:py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="flex flex-col items-center lg:items-start gap-4">
            <a href="#" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
                <Sprout className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-display text-xl font-semibold text-background">GrowSense AI</span>
            </a>
            <p className="text-background/60 text-sm max-w-xs text-center lg:text-left">{t('footer.tagline')}</p>
          </div>

          <div className="flex flex-wrap justify-center gap-8">
            <a href="#about" className="text-background/60 hover:text-background text-sm transition-colors">{t('nav.about')}</a>
            <a href="#challenges" className="text-background/60 hover:text-background text-sm transition-colors">{t('nav.challenges')}</a>
            <a href="#services" className="text-background/60 hover:text-background text-sm transition-colors">{t('nav.services')}</a>
            <a href="#how-it-works" className="text-background/60 hover:text-background text-sm transition-colors">{t('nav.howItWorks')}</a>
            <a href="https://www.instagram.com/iguana.4731899/" target="_blank" rel="noopener noreferrer" className="text-background/60 hover:text-background text-sm transition-colors flex items-center gap-1">
              <Instagram className="w-4 h-4" />{t('footer.followUs')}
            </a>
          </div>

          <p className="text-background/40 text-sm">© {currentYear} GrowSense AI. {t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
