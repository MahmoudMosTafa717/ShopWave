import CategorySlider from '../../components/CategorySlider/CategorySlider';
import Products from '../../components/Products/Products';
import MainSlider from '../../components/MainSlider/MainSlider';
import { Helmet } from 'react-helmet';

export default function Home() {
  return (
    <>
      <Helmet>
        <title>ShopWave - Home</title>
      </Helmet>
      <MainSlider />
      <CategorySlider />
      <Products />
    </>
  );
}
