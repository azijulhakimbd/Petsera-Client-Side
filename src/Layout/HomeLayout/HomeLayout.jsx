import React from "react";
import HowItsWork from "../../Pages/Home/HowItsWork/HowItsWork";
import HeroSlider from "../../Pages/Home/HeroSlider/HeroSlider";
import PetsCategory from "../../Pages/Home/PetsCategory/PetsCategory";
import AdoptCallToAction from "../../Pages/Home/AdoptCallToAction/AdoptCallToAction";
import AboutUs from "../../Pages/Home/AboutUs/AboutUs";
import FeaturedPets from "../../Pages/Home/FeaturedPets/FeaturedPets";
import FAQSection from "../../Pages/Home/FAQ/FAQSection";

const HomeLayout = () => {
  return <div>
    {/* Hero Slider */}
    <div className="py-10">
      <HeroSlider></HeroSlider>
    </div>
    {/* Category */}
    <PetsCategory></PetsCategory>
    {/* Call To Action */}
    <AdoptCallToAction></AdoptCallToAction>
    {/* Feature Pets */}
    <FeaturedPets></FeaturedPets>
     {/* About As */}
    <AboutUs></AboutUs>
    {/* How Its Work */}
    <HowItsWork></HowItsWork>
    {/* FAQ */}
    <FAQSection></FAQSection>
  </div>;
};

export default HomeLayout;
