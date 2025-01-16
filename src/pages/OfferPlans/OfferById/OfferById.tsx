import { Link, useLocation, useParams } from "react-router-dom";
import {
  basicOffers,
  advancedOffers,
  enterpriseOffers,
} from "../../../../Data.json";

function OfferById() {
  const { id } = useParams();
  const location = useLocation();

  const getOfferType = () => {
    if (location.pathname.includes("basic-security")) {
      return basicOffers;
    } else if (location.pathname.includes("advanced-protection")) {
      return advancedOffers;
    } else if (location.pathname.includes("enterprise-shield")) {
      return enterpriseOffers;
    }
    return [];
  };

  const offer = getOfferType().find((offer) => offer.id === Number(id));

  return (
    <div className="min-h-screen bg-gray-50">
      {offer ? (
        <>
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-primary to-indigo-700 text-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h1 className="text-4xl font-bold mb-4">{offer.title}</h1>
              <p className="text-xl text-blue-100 mb-6">{offer.description}</p>
              <div className="flex items-center">
                <span className="text-3xl font-bold">${offer.price}</span>
                <span className="ml-2 text-blue-200">/month</span>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Features Section */}
            <section className="mb-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                Key Features
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {offer.features?.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <svg
                      className="w-6 h-6 text-green-500 mt-1 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <p className="text-gray-600">{feature}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Benefits Section */}
            <section className="mb-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                Benefits
              </h2>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <ul className="space-y-4 list-disc">
                  {offer.benefits?.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Terms & Conditions */}
            <section className="mb-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                Terms & Conditions
              </h2>
              <div className="prose max-w-none text-gray-600">
                <p className="mb-4">1. Subscription Terms</p>
                <ul className="list-disc pl-5 mb-4">
                  {offer.terms.subscription.map((term, index) => (
                    <li key={index}>{term}</li>
                  ))}
                </ul>

                <p className="mb-4">2. Payment Terms</p>
                <ul className="list-disc pl-5 mb-4">
                  {offer.terms.payment.map((term, index) => (
                    <li key={index}>{term}</li>
                  ))}
                </ul>

                <p className="mb-4">3. Cancellation Policy</p>
                <ul className="list-disc pl-5">
                  {offer.terms.cancellation.map((term, index) => (
                    <li key={index}>{term}</li>
                  ))}
                </ul>
              </div>
            </section>

            {/* FAQ Section */}
            <section className="mb-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                Frequently Asked Questions
              </h2>
              <div className="space-y-6">
                {offer.faq?.map((item, index) => (
                  <div key={index}>
                    <h3 className="text-lg font-semibold mb-2">
                      {item.question}
                    </h3>
                    <p className="text-gray-600">{item.answer}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* CTA Section */}
            <section className="text-center">
              <Link
                to={"/contact-us"}
                className="bg-primary hover:bg-primary/80 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors duration-200"
              >
                Get Started
              </Link>
              <p className="mt-4 text-gray-500">
                Need help? Contact our sales team
              </p>
            </section>
          </div>
        </>
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Offer not found
          </h2>
          <p className="text-gray-600">
            The requested offer details are not available.
          </p>
        </div>
      )}
    </div>
  );
}

export default OfferById;
