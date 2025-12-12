import {
  Droplets,
  Thermometer,
  ShieldCheck,
  Activity,
  BarChart3,
  Bell,
} from "lucide-react";

const services = [
  {
    icon: Droplets,
    title: "Watering Prediction",
    description:
      "AI-powered algorithms analyze soil moisture, weather forecasts, and plant needs to predict exactly when and how much to water.",
    features: ["Smart scheduling", "Weather integration", "Custom thresholds"],
  },
  {
    icon: Thermometer,
    title: "Environmental Monitoring",
    description:
      "Real-time tracking of moisture, humidity, temperature, and light levels with detailed historical data and trend analysis.",
    features: ["24/7 monitoring", "Historical data", "Trend analysis"],
  },
  {
    icon: ShieldCheck,
    title: "Early Disease Detection",
    description:
      "Advanced image recognition and sensor data analysis to detect plant diseases before visible symptoms appear.",
    features: ["AI image analysis", "Pathogen database", "Treatment guides"],
  },
  {
    icon: Activity,
    title: "Live Plant Status",
    description:
      "Real-time dashboard showing the current health status of all your plants with instant alerts for any anomalies.",
    features: ["Real-time updates", "Multi-plant view", "Mobile app"],
  },
  {
    icon: BarChart3,
    title: "Health Insights",
    description:
      "Comprehensive analytics and reports on plant health trends, growth patterns, and optimization recommendations.",
    features: ["Growth tracking", "Performance metrics", "Recommendations"],
  },
  {
    icon: Bell,
    title: "Smart Notifications",
    description:
      "Intelligent alert system that notifies you about critical conditions, upcoming tasks, and preventive actions.",
    features: ["Priority alerts", "Custom schedules", "Multi-channel"],
  },
];

const Services = () => {
  return (
    <section id="services" className="py-24 lg:py-32 bg-card relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Our Services
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Solutions That
            <span className="text-gradient-gold"> Transform</span> Plant Care
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Our comprehensive suite of AI-powered tools addresses every aspect of
            modern plant care, from prediction to prevention.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative bg-background rounded-3xl p-8 shadow-soft hover:shadow-elevated transition-all duration-500 border border-border/50 hover:border-primary/30 overflow-hidden"
            >
              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-gradient-primary flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-glow">
                  <service.icon className="w-7 h-7 text-primary-foreground" />
                </div>

                <h3 className="font-display text-2xl font-semibold text-foreground mb-3">
                  {service.title}
                </h3>

                <p className="text-muted-foreground leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Feature tags */}
                <div className="flex flex-wrap gap-2">
                  {service.features.map((feature, featureIndex) => (
                    <span
                      key={featureIndex}
                      className="inline-block px-3 py-1 rounded-full bg-muted text-muted-foreground text-xs font-medium"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              {/* Background glow */}
              <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
