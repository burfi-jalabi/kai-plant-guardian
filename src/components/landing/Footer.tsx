import { Sprout } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground py-12 lg:py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Logo & Tagline */}
          <div className="flex flex-col items-center lg:items-start gap-4">
            <a href="#" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
                <Sprout className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-display text-xl font-semibold text-background">
                GrowSense AI
              </span>
            </a>
            <p className="text-background/60 text-sm max-w-xs text-center lg:text-left">
              AI-powered plant health monitoring and predictive care for farmers
              and gardeners worldwide.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-8">
            <a
              href="#about"
              className="text-background/60 hover:text-background text-sm transition-colors"
            >
              About
            </a>
            <a
              href="#challenges"
              className="text-background/60 hover:text-background text-sm transition-colors"
            >
              Challenges
            </a>
            <a
              href="#services"
              className="text-background/60 hover:text-background text-sm transition-colors"
            >
              Services
            </a>
            <a
              href="#how-it-works"
              className="text-background/60 hover:text-background text-sm transition-colors"
            >
              How It Works
            </a>
          </div>

          <p className="text-background/40 text-sm">
            © {currentYear} GrowSense AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
