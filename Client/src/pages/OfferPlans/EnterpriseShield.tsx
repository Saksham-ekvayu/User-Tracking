import { SecurityFormModal } from "@/components/Modals/SecurityFormModal";
import { useUserTracking } from "@/Contexts/UserTrackingContext";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  FaBuilding,
  FaGlobe,
  FaShieldAlt,
  FaUserTie,
  FaChartLine,
  FaCogs,
  FaHandshake,
  FaLock,
  FaClipboardCheck,
  FaCertificate,
} from "react-icons/fa";

const enterpriseOffers = [
  {
    id: 1,
    title: "Global Security Operations",
    description: "Worldwide security infrastructure management and monitoring",
    icon: FaGlobe,
    price: "Custom Pricing",
    features: [
      "Global SOC Coverage",
      "Multi-region Support",
      "24/7 Expert Team",
    ],
  },
  {
    id: 2,
    title: "Corporate Risk Management",
    description: "Comprehensive risk assessment and mitigation strategies",
    icon: FaChartLine,
    price: "Custom Pricing",
    features: ["Risk Analytics", "Compliance Management", "Strategic Planning"],
  },
  {
    id: 3,
    title: "Executive Protection",
    description: "Specialized security services for corporate executives",
    icon: FaUserTie,
    price: "Custom Pricing",
    features: ["Personal Security", "Travel Protection", "Threat Assessment"],
  },
  {
    id: 4,
    title: "Infrastructure Security",
    description: "End-to-end protection for critical infrastructure",
    icon: FaBuilding,
    price: "Custom Pricing",
    features: ["Physical Security", "Access Control", "Emergency Response"],
  },
  {
    id: 5,
    title: "Custom Security Solutions",
    description: "Tailored security implementations for unique requirements",
    icon: FaCogs,
    price: "Custom Pricing",
    features: [
      "Bespoke Solutions",
      "Integration Support",
      "Custom Development",
    ],
  },
  {
    id: 6,
    title: "Strategic Partnerships",
    description: "Long-term security collaboration and support",
    icon: FaHandshake,
    price: "Custom Pricing",
    features: [
      "Dedicated Account Team",
      "Strategic Planning",
      "Priority Support",
    ],
  },
  {
    id: 7,
    title: "Advanced Compliance",
    description: "Comprehensive regulatory compliance management",
    icon: FaClipboardCheck,
    price: "Custom Pricing",
    features: ["Audit Support", "Policy Management", "Regulatory Updates"],
  },
  {
    id: 8,
    title: "Zero Trust Architecture",
    description: "Implementation of zero trust security framework",
    icon: FaLock,
    price: "Custom Pricing",
    features: [
      "Identity Verification",
      "Access Management",
      "Security Monitoring",
    ],
  },
  {
    id: 9,
    title: "Enterprise Certification",
    description: "Security certifications and compliance programs",
    icon: FaCertificate,
    price: "Custom Pricing",
    features: ["ISO Certification", "Industry Standards", "Best Practices"],
  },
  {
    id: 10,
    title: "Total Shield Protection",
    description: "Complete enterprise security ecosystem",
    icon: FaShieldAlt,
    price: "Custom Pricing",
    features: ["Full Coverage", "Integration", "Managed Services"],
  },
];

function EnterpriseShield() {
  const { totalVisitCount } = useUserTracking();
  const [selectedOffer, setSelectedOffer] = useState<
    null | (typeof enterpriseOffers)[0]
  >(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter offers based on odd/even totalVisitCount
  const filteredOffers = enterpriseOffers?.filter((offer) => {
    if (totalVisitCount % 2 === 0) {
      // Show even numbered offers for even visits
      return offer.id % 2 === 0;
    } else {
      // Show odd numbered offers for odd visits
      return offer.id % 2 === 1;
    }
  });

  const handleClick = (offer: (typeof enterpriseOffers)[0]) => {
    setSelectedOffer(offer);
    setIsModalOpen(true);
  };

  return (
    <section className="bg-background lg:py-16 py-5 px-3 lg:px-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl font-bold text-primary mb-4">
          Enterprise Shield Solutions
        </h1>
        <p className="text-muted-foreground text-lg">
          Custom-built security solutions for large enterprises
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredOffers?.map((offer, index) => (
          <motion.div
            key={offer.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-card rounded-xl p-6 shadow-lg hover:border-primary transition-all duration-300 border-2 border-primary/20 flex flex-col justify-between"
          >
            <div className="flex items-center mb-4">
              {/* <div className="p-3 bg-primary/10 rounded-lg">
                <offer.icon className="w-6 h-6 text-primary" />
              </div> */}
              <h3 className="text-xl font-semibold">{offer.title}</h3>
            </div>
            <p className="text-muted-foreground mb-4">{offer.description}</p>
            <div className="text-xl font-bold text-primary mb-4">
              {offer.price}
            </div>
            <ul className="space-y-2">
              {offer.features.map((feature, i) => (
                <li key={i} className="flex items-center text-sm">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></div>
                  {feature}
                </li>
              ))}
            </ul>
            <button
              onClick={() => handleClick(offer)}
              className="w-full mt-6 bg-primary text-white py-2 rounded-lg hover:bg-primary/90 transition-colors duration-300"
            >
              Get Started
            </button>
          </motion.div>
        ))}
      </div>
      {selectedOffer && (
        <SecurityFormModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          offerDetails={{
            id: selectedOffer.id,
            title: selectedOffer.title,
            price: selectedOffer.price,
          }}
        />
      )}
    </section>
  );
}

export default EnterpriseShield;
