import { Target, Heart, Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const AboutUs = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-24 lg:py-32 bg-card relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">{t('about.badge')}</span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            {t('about.title')}<span className="text-gradient-primary"> {t('about.titleHighlight')}</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">{t('about.description')}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="group bg-gradient-card rounded-3xl p-8 shadow-soft hover:shadow-elevated transition-all duration-500 border border-border/50 hover:border-primary/20">
            <div className="w-14 h-14 rounded-2xl bg-gradient-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Heart className="w-7 h-7 text-primary-foreground" />
            </div>
            <h3 className="font-display text-2xl font-semibold text-foreground mb-4">{t('about.whoWeAre')}</h3>
            <p className="text-muted-foreground leading-relaxed">{t('about.whoWeAreDesc')}</p>
          </div>

          <div className="group bg-gradient-card rounded-3xl p-8 shadow-soft hover:shadow-elevated transition-all duration-500 border border-border/50 hover:border-primary/20">
            <div className="w-14 h-14 rounded-2xl bg-gradient-gold flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Sparkles className="w-7 h-7 text-secondary-foreground" />
            </div>
            <h3 className="font-display text-2xl font-semibold text-foreground mb-4">{t('about.whyBuilt')}</h3>
            <p className="text-muted-foreground leading-relaxed">{t('about.whyBuiltDesc')}</p>
          </div>

          <div className="group bg-gradient-card rounded-3xl p-8 shadow-soft hover:shadow-elevated transition-all duration-500 border border-border/50 hover:border-primary/20">
            <div className="w-14 h-14 rounded-2xl bg-gradient-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Target className="w-7 h-7 text-primary-foreground" />
            </div>
            <h3 className="font-display text-2xl font-semibold text-foreground mb-4">{t('about.mission')}</h3>
            <p className="text-muted-foreground leading-relaxed">{t('about.missionDesc')}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
