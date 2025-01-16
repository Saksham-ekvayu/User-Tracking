import { motion } from "framer-motion";
import { Shield, Lock, Database, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const pricingPlans = [
  {
    id: 1,
    name: "Basic Security",
    price: "1999",
    description: "Essential protection for small businesses",
    features: [
      "Vulnerability Assessment",
      "Basic Firewall Setup",
      "Security Consultation",
      "24/7 Basic Monitoring",
      "Monthly Security Reports",
    ],
    icon: Shield,
    featured: false,
    href: "/offers/basic-security",
  },
  {
    id: 2,
    name: "Advanced Protection",
    price: "6999",
    description: "Comprehensive security for growing companies",
    features: [
      "Everything in Basic",
      "Advanced Threat Detection",
      "Incident Response",
      "Employee Security Training",
      "Real-time Monitoring",
    ],
    icon: Lock,
    featured: true,
    href: "/offers/advanced-protection",
  },
  {
    id: 3,
    name: "Enterprise Shield",
    price: "11999",
    description: "Maximum security for large organizations",
    features: [
      "Everything in Advanced",
      "Custom Security Solutions",
      "Dedicated Security Team",
      "Penetration Testing",
      "Compliance Management",
    ],
    icon: Database,
    featured: false,
    href: "/offers/enterprise-shield",
  },
];

const Offers = () => {
  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-primary mb-4">
            Security Solutions Pricing
          </h2>
          <p className="text-muted-foreground text-lg">
            Choose the perfect security package for your business
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {pricingPlans?.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className={`rounded-2xl p-4 flex flex-col justify-between ${
                plan.featured
                  ? "bg-primary text-primary-foreground shadow-xl scale-105"
                  : "bg-card text-card-foreground shadow-md shadow-black/20"
              }`}
            >
              <div className="flex justify-center mb-6">
                <plan.icon className="w-12 h-12" />
              </div>
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <p className="text-sm mb-6">{plan.description}</p>
              <div className="mb-6">
                <span className="text-xl">Starting :- </span>
                <span className="text-4xl font-bold">${plan.price}</span>
                <span className="text-sm">/month</span>
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link to={plan.href}>
                <button
                  // onClick={() => (window.location.href = "/contact-us")}
                  className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${
                    plan.featured
                      ? "bg-background text-primary hover:bg-secondary"
                      : "bg-primary text-primary-foreground hover:bg-primary/90"
                  }`}
                >
                  Get Started
                </button>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center"
        >
          <p className="text-muted-foreground">
            Need a custom solution?{" "}
            <Link to="/contact-us" className="text-primary hover:underline">
              Contact us
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Offers;
