import { useState } from "react";
import { motion } from "framer-motion";
import { useUserTracking } from "../../Contexts/UserTrackingContext";
import { basicOffers } from "../../../Data.json";
import { SecurityFormModal } from "@/components/Modals/SecurityFormModal";

function BasicSecurity() {
  const { totalVisitCount } = useUserTracking();
  const [selectedOffer, setSelectedOffer] = useState<
    null | (typeof basicOffers)[0]
  >(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter offers based on odd/even totalVisitCount
  const filteredOffers = basicOffers?.filter((offer) => {
    if (totalVisitCount % 2 === 0) {
      // Show even numbered offers for even visits
      return offer.id % 2 === 0;
    } else {
      // Show odd numbered offers for odd visits
      return offer.id % 2 === 1;
    }
  });

  const handleClick = (offer: (typeof basicOffers)[0]) => {
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
          Basic Security Solutions
        </h1>
        <p className="text-muted-foreground text-lg">
          Comprehensive security packages for your peace of mind
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
            <div className="text-2xl font-bold text-primary mb-4">
              ${offer.price}/month
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

export default BasicSecurity;
