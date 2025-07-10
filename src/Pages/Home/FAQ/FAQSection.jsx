import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const faqs = [
  {
    question: "How can I adopt a pet from Petsera?",
    answer:
      "Browse available pets by category, view details, and click on 'Adopt Me'. You'll need to create an account, fill out an adoption form, and wait for approval.",
  },
  {
    question: "Is there an adoption fee?",
    answer:
      "Some pets may have a small adoption fee to cover vaccinations or rescue care. The fee will be shown on the pet's detail page.",
  },
  {
    question: "Can I donate to help rescued animals?",
    answer:
      "Absolutely! Visit the 'Donation Campaigns' section to support pets in need. You can donate to individual pets or general rescue missions.",
  },
  {
    question: "Is my donation secure?",
    answer:
      "Yes, all payments are processed securely via Stripe. We never store your card information.",
  },
  {
    question: "How do I become a volunteer or pet rider?",
    answer:
      "Click on 'Be a Rider' or 'Volunteer With Us' in the footer. Submit the application form, and our team will contact you shortly.",
  },
];

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="max-w-4xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-900 dark:text-gray-100">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border rounded-xl bg-white dark:bg-gray-800 shadow-md dark:border-gray-700 transition"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center p-4 text-left text-lg font-medium text-gray-900 dark:text-white"
            >
              {faq.question}
              {activeIndex === index ? (
                <FaChevronUp className="text-gray-600 dark:text-gray-300" />
              ) : (
                <FaChevronDown className="text-gray-600 dark:text-gray-300" />
              )}
            </button>

            {activeIndex === index && (
              <div className="px-4 pb-4 text-gray-600 dark:text-gray-300">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;
