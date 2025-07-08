import React from "react";

const HowItsWork = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      {/* Title */}
      <h2 className="text-3xl font-semibold text-center mb-16 relative">
        <span className="inline-block border-b-2 border-primary pb-1">
          HOW IT WORKS?
        </span>
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left: Steps */}
        <div className="space-y-12">
          {/* Step 1 */}
          <div className="flex items-start gap-6">
            <div className="bg-primary text-primary-foreground p-4 rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-medium">Search Pet</h3>
              <p className="text-muted-foreground">
                Find your furry companion by searching on our app. Use filters
                to narrow down your search and find a match for your lifestyle.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex items-start gap-6">
            <div className="bg-secondary text-secondary-foreground p-4 rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16h6m2 0a2 2 0 002-2v-4a6 6 0 10-12 0v4a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-medium">Connect with Pet Parent</h3>
              <p className="text-muted-foreground">
                Learn more about the pet's personality, history, and specific
                care needs by connecting with their current parent.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex items-start gap-6">
            <div className="bg-accent text-accent-foreground p-4 rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.318 6.318a4.5 4.5 0 010 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-medium">Adopt Love</h3>
              <p className="text-muted-foreground">
                When it’s the right fit, start your journey with your new pet.
                Filled with love, companionship, and unforgettable moments.
              </p>
            </div>
          </div>
        </div>

        {/* Right: Mobile Image */}
        <div className="flex justify-center">
          <img
            src="https://i.postimg.cc/3r4H7H6r/pet-app-ui.png"
            alt="Pet App UI"
            className="rounded-3xl shadow-lg w-72 lg:w-96"
          />
        </div>
      </div>
    </section>
  );
};

export default HowItsWork;
