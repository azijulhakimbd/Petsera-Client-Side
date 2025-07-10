import React from "react";
import HowItsWork from "../../Pages/Home/HowItsWork/HowItsWork";
import HeroSlider from "../../Pages/Home/HeroSlider/HeroSlider";
import PetsCategory from "../../Pages/Home/PetsCategory/PetsCategory";

const HomeLayout = () => {
  return <div>
    <div className="py-10">
      <HeroSlider></HeroSlider>
    </div>
    <PetsCategory></PetsCategory>
    <HowItsWork></HowItsWork>
  </div>;
};

export default HomeLayout;
