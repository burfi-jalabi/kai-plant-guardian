import { Button } from "@/components/ui/button";
import { ArrowRight, Leaf, Shield, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const FinalCTA = () => {
  const { t } = useLanguage();

  return (
    <section className="py-24 lg:py-32 bg-card relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl translate-y-1/2 translate-x-1/2" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-gradient-primary rounded-3xl p-8 lg:p-12 shadow-glow overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-foreground/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-foreground/20 backdrop-blur-sm mb-8">
                <Leaf className="w-8 h-8 text-primary-foreground" />
              </div>

              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">{t('cta.title')}</h2>
              <p className="text-lg lg:text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-8 leading-relaxed">{t('cta.description')}</p>

              <div className="flex flex-wrap justify-center gap-6 mb-10">
                <div className="flex items-center gap-2 text-primary-foreground/80">
                  <Shield className="w-5 h-5" /><span className="text-sm font-medium">{t('cta.secure')}</span>
                </div>
                <div className="flex items-center gap-2 text-primary-foreground/80">
                  <Zap className="w-5 h-5" /><span className="text-sm font-medium">{t('cta.instant')}</span>
                </div>
                <div className="flex items-center gap-2 text-primary-foreground/80">
                  <Leaf className="w-5 h-5" /><span className="text-sm font-medium">{t('cta.trial')}</span>
                </div>
              </div>

              <Button variant="gold" size="xl" className="text-base sm:text-lg w-full max-w-xs sm:max-w-none sm:w-auto mx-auto" asChild>
                <Link to="/auth">{t('cta.button')}<ArrowRight className="w-5 h-5" /></Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
