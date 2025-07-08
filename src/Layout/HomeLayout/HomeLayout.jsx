import React from "react";
import HowItsWork from "../../Pages/Home/HowItsWork/HowItsWork";
import HeroSlider from "../../Pages/Home/HeroSlider/HeroSlider";

const HomeLayout = () => {
  return <div>
    <div className="py-10">
      <HeroSlider></HeroSlider>
    </div>
    <HowItsWork></HowItsWork>
  </div>;
};

export default HomeLayout;
