import { useContext } from 'react';
import { productsContext } from '../../context/Products/Products';
import { wishlistContext } from '../../context/Wishlist/Wishlist';
import ProductItem from '../ProductItem/ProductItem';

export default function BestSellers() {
  const { data } = useContext(productsContext);
  const { addToWishlist } = useContext(wishlistContext);
  // Using generic handleWishlist
  const handleWishlist = async (id) => {
    await addToWishlist(id);
  };

  // Get top 8 products to simulate Best Sellers
  const bestSellers = data ? data.slice(8, 16) : [];

  if (!bestSellers || bestSellers.length === 0) return null;

  return (
    <section className="py-16 bg-white">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-amazon-black mb-4">
            Best Sellers
          </h2>
          <div className="w-24 h-1 bg-amazon-orange mx-auto rounded"></div>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
            Discover our most popular products based on sales. Updated frequently to bring you the best deals.
          </p>
        </div>

        <div className="flex flex-wrap mx-[-12px]">
          {bestSellers.map((product) => (
            <ProductItem
              key={product._id}
              product={product}
              isWished={false} // Would ideally check user wishlist IDs
              handleWishlist={handleWishlist}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
