import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Slider from 'react-slick';
import Spinner from '../Spinner/Spinner';
import { Link } from 'react-router-dom';

export default function CategorySlider() {
  const { data } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  function getCategories() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/categories');
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 2,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <div className="container py-6 hidden md:block">
        <h3 className="text-2xl font-bold mb-6 text-amazon-dark">Shop by Category</h3>
        {data ? (
          <Slider {...settings}>
            {data?.data?.data.map((category) => (
              <div key={category._id} className="p-2">
                <Link to={`/categories/${category._id}`} className="block group">
                  <div className="relative rounded-lg overflow-hidden mb-3 aspect-square bg-white shadow-sm border border-gray-100 group-hover:shadow-amazon-orange/30 transition-all duration-300">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="object-contain w-full h-full p-4 group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <h4 className="text-center font-semibold text-gray-800 text-sm group-hover:text-amazon-orange transition-colors">
                    {category.name}
                  </h4>
                </Link>
              </div>
            ))}
          </Slider>
        ) : (
          <Spinner />
        )}
      </div>
    </>
  );
}
