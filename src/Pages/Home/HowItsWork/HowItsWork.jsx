import React, { useContext } from "react";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';
import { AuthContext } from "../../../Context/AuthContext";

const HowItsWork = () => {
  const { loading } = useContext(AuthContext);

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      {/* Title */}
      <h2 className="text-3xl font-semibold text-center mb-16 relative">
        <span className="inline-block border-b-2 border-primary pb-1">
          {loading ? <Skeleton width={200} /> : "HOW IT WORKS?"}
        </span>
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left: Steps */}
        <div className="space-y-12">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-start gap-6">
              <div className={`p-4 rounded-full flex items-center justify-center 
                ${step === 1 ? "bg-primary text-primary-foreground" : step === 2 ? "bg-secondary text-secondary-foreground" : "bg-accent text-accent-foreground"}`}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d={
                      step === 1
                        ? "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        : step === 2
                        ? "M8 10h.01M12 10h.01M16 10h.01M9 16h6m2 0a2 2 0 002-2v-4a6 6 0 10-12 0v4a2 2 0 002 2z"
                        : "M4.318 6.318a4.5 4.5 0 010 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    }
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-medium">
                  {loading ? <Skeleton width={180} /> :
                    step === 1 ? "Search Pet" :
                    step === 2 ? "Connect with Pet Parent" :
                    "Adopt Love"}
                </h3>
                <p className="text-muted-foreground">
                  {loading ? (
                    <Skeleton count={2} />
                  ) : step === 1 ? (
                    "Find your furry companion by searching on our app. Use filters to narrow down your search and find a match for your lifestyle."
                  ) : step === 2 ? (
                    "Learn more about the pet's personality, history, and specific care needs by connecting with their current parent."
                  ) : (
                    "When it’s the right fit, start your journey with your new pet. Filled with love, companionship, and unforgettable moments."
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Right: Mobile Image */}
        <div className="flex justify-center">
          {loading ? (
            <Skeleton height={350} width={300} borderRadius="1.5rem" />
          ) : (
            <img
              src="https://i.postimg.cc/3r4H7H6r/pet-app-ui.png"
              alt="Pet App UI"
              className="rounded-3xl shadow-lg w-72 lg:w-96"
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default HowItsWork;
