import type { Metadata } from "next";
import Hero from "../components/sections/Hero";
import ValueProps from "../components/sections/ValueProps";
import ShopByCollection from "../components/sections/ShopByCollection";
import FeaturedProducts from "../components/sections/FeaturedProducts";
import WhyEverwood from "../components/sections/WhyEverwood";
import HowItWorks from "../components/sections/HowItWorks";
import Testimonials from "../components/sections/Testimonials";
import Newsletter from "../components/sections/Newsletter";

export const metadata: Metadata = {
  title: "Everwood Sauna — Premium Saunas for Your Home",
  description:
    "Premium infrared, steam, barrel, and outdoor saunas delivered free across Canada and the USA. Quality craftsmanship at accessible prices. Shop Everwood today.",
};

export default function Home() {
  return (
    <>
      <Hero />
      <ValueProps />
      <ShopByCollection />
      <FeaturedProducts />
      <WhyEverwood />
      <HowItWorks />
      <Testimonials />
      <Newsletter />
    </>
  );
}
