import { Cpu, Brain, LineChart } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Cpu,
    title: "Sensors Collect Data",
    description:
      "Our smart sensors continuously monitor soil moisture, humidity, temperature, and light levels around your plants, gathering thousands of data points daily.",
    color: "primary",
  },
  {
    number: "02",
    icon: Brain,
    title: "AI Analyzes Health",
    description:
      "Our advanced machine learning algorithms process the sensor data, compare it with our extensive plant database, and identify patterns that indicate health status.",
    color: "secondary",
  },
  {
    number: "03",
    icon: LineChart,
    title: "You Receive Guidance",
    description:
      "Get personalized recommendations, predictions, and actionable insights delivered to your dashboard and mobile device in real-time.",
    color: "primary",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 lg:py-32 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            How It Works
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Simple Steps to
            <span className="text-gradient-primary"> Smarter</span> Plant Care
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Our system works seamlessly behind the scenes so you can focus on
            what matters—growing beautiful, healthy plants.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-border to-transparent -translate-y-1/2" />

          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <div key={index} className="relative group">
                {/* Step card */}
                <div className="relative bg-card rounded-3xl p-8 shadow-soft hover:shadow-elevated transition-all duration-500 border border-border/50 hover:border-primary/30 text-center">
                  {/* Step number badge */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground text-sm font-bold shadow-glow">
                    {index + 1}
                  </div>

                  {/* Icon */}
                  <div
                    className={`w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 ${
                      step.color === "primary"
                        ? "bg-gradient-primary shadow-glow"
                        : "bg-gradient-gold shadow-gold"
                    }`}
                  >
                    <step.icon className="w-10 h-10 text-primary-foreground" />
                  </div>

                  {/* Large number watermark */}
                  <div className="absolute top-4 right-4 font-display text-6xl font-bold text-border/20 group-hover:text-primary/10 transition-colors duration-500">
                    {step.number}
                  </div>

                  <h3 className="font-display text-2xl font-semibold text-foreground mb-4">
                    {step.title}
                  </h3>

                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Arrow connector for mobile */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden flex justify-center my-6">
                    <div className="w-0.5 h-8 bg-border" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
