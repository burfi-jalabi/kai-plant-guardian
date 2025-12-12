import { Target, Heart, Sparkles } from "lucide-react";

const AboutUs = () => {
  return (
    <section id="about" className="py-24 lg:py-32 bg-card relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            About Us
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Nurturing Plants with
            <span className="text-gradient-primary"> Intelligence</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            We are a passionate team of agricultural experts, data scientists, and
            technology innovators committed to revolutionizing how the world cares
            for plants.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Who We Are */}
          <div className="group bg-gradient-card rounded-3xl p-8 shadow-soft hover:shadow-elevated transition-all duration-500 border border-border/50 hover:border-primary/20">
            <div className="w-14 h-14 rounded-2xl bg-gradient-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Heart className="w-7 h-7 text-primary-foreground" />
            </div>
            <h3 className="font-display text-2xl font-semibold text-foreground mb-4">
              Who We Are
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              A dedicated team combining agricultural expertise with cutting-edge
              AI technology. We understand the challenges farmers and gardeners
              face daily, because we've lived them ourselves.
            </p>
          </div>

          {/* Why We Built This */}
          <div className="group bg-gradient-card rounded-3xl p-8 shadow-soft hover:shadow-elevated transition-all duration-500 border border-border/50 hover:border-primary/20">
            <div className="w-14 h-14 rounded-2xl bg-gradient-gold flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Sparkles className="w-7 h-7 text-secondary-foreground" />
            </div>
            <h3 className="font-display text-2xl font-semibold text-foreground mb-4">
              Why We Built This
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Traditional plant care relies on guesswork and experience. We
              envisioned a world where data and AI empower everyone—from novice
              gardeners to professional farmers—to grow healthier plants.
            </p>
          </div>

          {/* Our Mission */}
          <div className="group bg-gradient-card rounded-3xl p-8 shadow-soft hover:shadow-elevated transition-all duration-500 border border-border/50 hover:border-primary/20">
            <div className="w-14 h-14 rounded-2xl bg-gradient-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Target className="w-7 h-7 text-primary-foreground" />
            </div>
            <h3 className="font-display text-2xl font-semibold text-foreground mb-4">
              Our Mission
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              To democratize precision agriculture through accessible AI
              technology, helping reduce crop loss, conserve water, and enable
              sustainable farming practices for generations to come.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
