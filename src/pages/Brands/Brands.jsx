import { useEffect } from 'react';
import axios from 'axios';
import Spinner from '../../components/Spinner/Spinner';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet';

export default function Brands() {
  // Queries
  const { data } = useQuery({
    queryKey: ['brands'],
    queryFn: getBrands,
  });

  async function getBrands() {
    return axios
      .get('https://ecommerce.routemisr.com/api/v1/brands')
      .then((response) => response.data.data)
      .catch((error) => {
        throw error;
      });
  }

  async function main() {
    await getBrands();
  }

  useEffect(() => {
    main();
  }, []);

  return (
    <>
      <Helmet>
        <title>ShopWave - Brands</title>
      </Helmet>
      <div className="container flex flex-wrap items-center">
        <h3 className="text-3xl font-extrabold text-amazon-dark mb-5 w-full">Our Brands</h3>
        {data ? (
          data.map((brand) => (
            <div
              className="w-full lg:md:w-1/4 md:w-1/3 sm:w-1/2 p-3"
              key={brand._id}
            >
              <div className="relative bg-white mx-auto transition-shadow hover:shadow-amazon-orange/30 shadow-md rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700">
                <img
                  className="rounded-t-lg sm:object-cover object-contain object-top w-full h-80"
                  src={brand.image}
                  alt={brand.title}
                />
                <div className="px-5 py-2">
                  <h3 className="text-gray-900 overflow-hidden text-ellipsis whitespace-nowrap font-semibold text-xl tracking-tight dark:text-white">
                    {brand.name}
                  </h3>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="w-full">
            <Spinner />
          </div>
        )}
      </div>
    </>
  );
}
