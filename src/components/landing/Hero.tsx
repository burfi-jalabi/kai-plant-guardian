import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-plants.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

const Hero = () => {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero pt-20">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-soft" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse-soft" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="text-center lg:text-left">
            <div className="animate-fade-up">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                {t('hero.badge')}
              </span>
            </div>

            <h1 className="animate-fade-up-delay-1 font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-tight mb-6">
              {t('hero.title1')}{" "}
              <span className="text-gradient-primary">{t('hero.title2')}</span>
              <br />
              <span className="text-gradient-gold">{t('hero.title3')}</span>
            </h1>

            <p className="animate-fade-up-delay-2 text-lg lg:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
              {t('hero.description')}
            </p>

            <div className="animate-fade-up-delay-3 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button variant="hero" size="xl" asChild>
                <Link to="/auth">{t('common.getStarted')}<ArrowRight className="w-5 h-5" /></Link>
              </Button>
              <Button variant="heroOutline" size="xl">
                <Play className="w-5 h-5" />{t('common.watchDemo')}
              </Button>
            </div>

            <div className="animate-fade-up-delay-3 mt-12 pt-8 border-t border-border/50">
              <p className="text-sm text-muted-foreground mb-4">{t('hero.trusted')}</p>
              <div className="flex items-center justify-center lg:justify-start gap-8">
                <div className="text-center">
                  <p className="text-2xl font-bold text-foreground">10K+</p>
                  <p className="text-xs text-muted-foreground">{t('hero.activeUsers')}</p>
                </div>
                <div className="w-px h-10 bg-border" />
                <div className="text-center">
                  <p className="text-2xl font-bold text-foreground">95%</p>
                  <p className="text-xs text-muted-foreground">{t('hero.accuracy')}</p>
                </div>
                <div className="w-px h-10 bg-border" />
                <div className="text-center">
                  <p className="text-2xl font-bold text-foreground">50+</p>
                  <p className="text-xs text-muted-foreground">{t('hero.species')}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative animate-fade-up-delay-2">
            <div className="relative rounded-3xl overflow-hidden shadow-elevated animate-float">
              <img src={heroImage} alt="AI-powered plant health monitoring" className="w-full h-auto object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
            </div>

            <div className="absolute -bottom-6 -left-6 glass rounded-2xl p-4 shadow-elevated animate-fade-up-delay-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center">
                  <span className="text-xl">🌱</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{t('hero.plantHealth')}</p>
                  <p className="text-xs text-muted-foreground">{t('hero.optimal')} • 98%</p>
                </div>
              </div>
            </div>

            <div className="absolute -top-4 -right-4 glass rounded-2xl p-4 shadow-elevated animate-fade-up-delay-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-gold flex items-center justify-center">
                  <span className="text-xl">💧</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{t('hero.nextWatering')}</p>
                  <p className="text-xs text-muted-foreground">{t('hero.inHours')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" className="fill-card" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
