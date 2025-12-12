import { Droplets, Skull, Database, Eye, HelpCircle, TrendingDown } from "lucide-react";

const challenges = [
  {
    icon: Droplets,
    title: "Wrong Watering",
    description:
      "Over-watering or under-watering leads to root damage, nutrient deficiency, and stunted growth. Most plant deaths occur from improper watering.",
    color: "primary",
  },
  {
    icon: TrendingDown,
    title: "Low Survival Rate",
    description:
      "Without proper monitoring, up to 40% of plants fail within the first year. Traditional methods can't catch problems until it's too late.",
    color: "secondary",
  },
  {
    icon: Database,
    title: "Lack of Data",
    description:
      "Farmers and gardeners operate blindly without real-time data on soil conditions, humidity levels, and light exposure for their specific plants.",
    color: "primary",
  },
  {
    icon: Eye,
    title: "Unseen Early Diseases",
    description:
      "Plant diseases often show visible symptoms only after significant damage. By then, saving the plant becomes extremely difficult.",
    color: "secondary",
  },
  {
    icon: HelpCircle,
    title: "No Expert Guidance",
    description:
      "Access to agricultural experts is limited and expensive. Most growers rely on generic advice that doesn't fit their specific situation.",
    color: "primary",
  },
  {
    icon: Skull,
    title: "Preventable Plant Loss",
    description:
      "Billions of dollars worth of crops and plants are lost annually due to preventable issues that could be detected and addressed early.",
    color: "secondary",
  },
];

const Challenges = () => {
  return (
    <section id="challenges" className="py-24 lg:py-32 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/4 w-72 h-72 bg-destructive/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-destructive/10 text-destructive text-sm font-medium mb-4">
            The Challenges
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Problems Farmers &<span className="text-gradient-primary"> Gardeners</span> Face
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Understanding the pain points is the first step to solving them. These
            are the real challenges our community faces every day.
          </p>
        </div>

        {/* Challenges Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {challenges.map((challenge, index) => (
            <div
              key={index}
              className="group relative bg-card rounded-2xl p-6 shadow-soft hover:shadow-elevated transition-all duration-500 border border-border/50 hover:border-destructive/20 overflow-hidden"
            >
              {/* Background glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-destructive/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 ${
                    challenge.color === "primary"
                      ? "bg-primary/10 text-primary"
                      : "bg-secondary/20 text-secondary-foreground"
                  }`}
                >
                  <challenge.icon className="w-6 h-6" />
                </div>

                <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                  {challenge.title}
                </h3>

                <p className="text-muted-foreground text-sm leading-relaxed">
                  {challenge.description}
                </p>
              </div>

              {/* Decorative number */}
              <div className="absolute -bottom-4 -right-4 font-display text-8xl font-bold text-border/30 group-hover:text-destructive/10 transition-colors duration-500">
                {index + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Challenges;
