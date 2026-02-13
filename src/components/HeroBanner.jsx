import { motion } from "framer-motion";
import { Truck, RotateCcw, Award, ShieldCheck } from "lucide-react";
import { useSearchParams } from "react-router-dom";

const features = [
  { icon: Truck, label: "Free Delivery" },
  { icon: RotateCcw, label: "Easy Returns" },
  { icon: Award, label: "High Quality" },
  { icon: ShieldCheck, label: "Security Guarantee" },
];

const HeroBanner = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  if (category) return null;

  return (
    <section>
      <div className="relative overflow-hidden bg-gradient-to-br from-[hsl(var(--hero-gradient-start))] to-[hsl(var(--hero-gradient-end))] py-20 md:py-32">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyem0wLTMwVjBoLTJ2NEgyNHYyaDEwVjBoMnptLTQgMjhWMTZoLTh2MTZoOHptLTYtMnYtMTJoNHYxMmgtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="font-display text-4xl md:text-6xl lg:text-7xl font-black text-primary-foreground mb-4 drop-shadow-lg"
          >
            E-Commerce Solutions
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto"
          >
            Discover the latest trends in fashion, electronics, and jewellery at unbeatable prices.
          </motion.p>
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8 rounded-full bg-accent px-8 py-3 font-semibold text-accent-foreground shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            Shop Now
          </motion.button>
        </div>
      </div>

      <div className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {features.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center justify-center gap-3 py-2">
                <Icon className="h-6 w-6 text-primary" />
                <span className="text-sm font-semibold uppercase tracking-wider text-foreground">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
