import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';

export default function CategoryCards() {
  const { data, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: () => axios.get('https://ecommerce.routemisr.com/api/v1/categories').then((res) => res.data.data),
  });

  if (isLoading) {
    return (
      <div className="py-16 text-center">
        <Spinner />
      </div>
    );
  }

  // Display top 6 categories for the landing page
  const displayCategories = data ? data.slice(0, 6) : [];

  return (
    <section className="py-16 bg-white">
      <div className="container">
        <div className="flex justify-between items-end mb-8 border-l-4 border-amazon-blue pl-3">
          <div>
            <h2 className="text-3xl font-bold text-amazon-black">Shop by Category</h2>
            <p className="text-gray-500 mt-2">Find exactly what you are looking for</p>
          </div>
          <Link to="/categories" className="text-amazon-blue font-medium hover:underline hidden sm:block">
            View All Categories &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {displayCategories.map((category) => (
            <Link
              to="/categories"
              key={category._id}
              className="group flex flex-col items-center bg-amazon-light p-4 rounded-xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="w-24 h-24 mb-4 rounded-full overflow-hidden bg-white shadow-inner flex items-center justify-center p-2">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <h3 className="text-sm font-bold text-center text-amazon-dark group-hover:text-amazon-orange transition-colors">
                {category.name}
              </h3>
            </Link>
          ))}
        </div>
        
        <div className="mt-8 text-center sm:hidden">
          <Link to="/categories" className="text-amazon-blue font-medium hover:underline">
            View All Categories &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
