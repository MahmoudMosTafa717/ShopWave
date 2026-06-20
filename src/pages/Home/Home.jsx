import { Helmet } from 'react-helmet';
import HeroSection from '../../components/Home/HeroSection';
import FeaturedSlider from '../../components/Home/FeaturedSlider';
import CategoryCards from '../../components/Home/CategoryCards';
import BestSellers from '../../components/Home/BestSellers';
import PromoBanner from '../../components/Home/PromoBanner';
import WhyChooseUs from '../../components/Home/WhyChooseUs';
import Testimonials from '../../components/Home/Testimonials';

export default function Home() {
  return (
    <div className="w-full">
      <Helmet>
        <title>ShopWave - Discover More, Spend Less</title>
      </Helmet>
      
      <div id="hero"><HeroSection /></div>
      <div id="featured"><FeaturedSlider /></div>
      <div id="categories"><CategoryCards /></div>
      <div id="promo"><PromoBanner /></div>
      <div id="bestsellers"><BestSellers /></div>
      <div id="whychooseus"><WhyChooseUs /></div>
      <div id="testimonials"><Testimonials /></div>
    </div>
  );
}
