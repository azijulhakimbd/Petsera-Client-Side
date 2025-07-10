import React from "react";
import HowItsWork from "../../Pages/Home/HowItsWork/HowItsWork";
import HeroSlider from "../../Pages/Home/HeroSlider/HeroSlider";
import PetsCategory from "../../Pages/Home/PetsCategory/PetsCategory";
import AdoptCallToAction from "../../Pages/Home/AdoptCallToAction/AdoptCallToAction";

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
    {/* How Its Work */}
    <HowItsWork></HowItsWork>
  </div>;
};

export default HomeLayout;
