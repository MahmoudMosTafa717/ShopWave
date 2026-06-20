import { useEffect } from 'react';
import axios from 'axios';
import Spinner from '../../components/Spinner/Spinner';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

export default function Categories() {
  // Queries
  const { data } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  async function getCategories() {
    return axios
      .get('https://ecommerce.routemisr.com/api/v1/categories')
      .then((response) => response.data.data)
      .catch((error) => {
        throw error;
      });
  }

  async function main() {
    await getCategories();
  }

  useEffect(() => {
    main();
  }, []);

  return (
    <>
      <Helmet>
        <title>ShopWave - Categories</title>
      </Helmet>
      <div className="container flex flex-wrap items-center py-10">
        <h3 className="text-3xl font-extrabold text-amazon-dark mb-8 w-full">Our Categories</h3>
        {data ? (
          data.map((category) => (
            <div
              className="w-full lg:md:w-1/4 md:w-1/3 sm:w-1/2 p-3"
              key={category._id}
            >
              <Link to={`/categories/${category._id}`} className="block relative bg-white mx-auto hover:shadow-xl transition-all shadow-md rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700 hover:-translate-y-1">
                <img
                  className="rounded-t-lg sm:object-cover object-contain object-top w-full h-80"
                  src={category.image}
                  alt={category.name}
                />
                <div className="px-5 py-4 border-t border-gray-100">
                  <h3 className="text-gray-900 overflow-hidden text-ellipsis whitespace-nowrap font-bold text-xl tracking-tight dark:text-white text-center hover:text-amazon-orange transition-colors">
                    {category.name}
                  </h3>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <div className="w-full py-20">
            <Spinner />
          </div>
        )}
      </div>
    </>
  );
}
