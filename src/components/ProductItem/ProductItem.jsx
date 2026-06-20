import { useContext, useState } from 'react';
import { cartContext } from '../../context/Cart/Cart';
import { Link } from 'react-router-dom';
import StarRating from '../StarRating/StarRating';
import { toast } from 'react-hot-toast';

export default function ProductItem({ product, isWished, handleWishlist }) {
  const { addProduct } = useContext(cartContext);
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const onAddToCart = async (e) => {
    e.preventDefault();
    if (isAdded) return;
    
    setIsAdding(true);
    try {
      await addProduct(product._id);
      setIsAdded(true);
      // Reset the button state after 3 seconds so they can buy again if they want
      setTimeout(() => setIsAdded(false), 3000);
    } catch (error) {
      console.error("Failed to add to cart", error);
    } finally {
      setIsAdding(false);
    }
  };

  const onWishlistToggle = (e) => {
    e.preventDefault();
    handleWishlist(product._id);
  };

  return (
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-3 flex">
      <div className="relative bg-white mx-auto hover:scale-105 transition-all duration-400 hover:shadow-amazon-orange/30 shadow-md rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700 flex flex-col w-full group overflow-hidden">
        <Link to={`/product/${product._id}`} className="flex flex-col h-full relative">
          
          {/* Wishlist Button Overlay */}
          <button
            onClick={onWishlistToggle}
            className={`absolute top-3 right-3 z-20 w-10 h-10 rounded-full flex items-center justify-center transition-all bg-white shadow-md hover:scale-110 ${
              isWished 
                ? 'text-red-500 hover:bg-red-50' 
                : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
            }`}
            aria-label={isWished ? "Remove from wishlist" : "Add to wishlist"}
          >
            <i className={`fa-heart ${isWished ? 'fa-solid' : 'fa-regular'} text-xl`}></i>
          </button>

          <img
            className="rounded-t-lg sm:object-cover object-contain object-top w-full h-64"
            src={product.imageCover}
            alt={product.title}
          />
          <div className="px-5 py-4 flex flex-col flex-grow">
            <span className="text-sm text-amazon-orange font-semibold mb-1 uppercase tracking-wider block truncate">
              {product.category.name}
            </span>
            <h3 className="text-gray-900 font-bold text-lg leading-tight mb-2 dark:text-white line-clamp-2 min-h-[3rem]">
              {product.title}
            </h3>
            
            <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between">
              <span className="text-xl font-extrabold text-amazon-dark dark:text-white">
                EGP {product.price}
              </span>
              <div className="flex items-center gap-1 bg-amazon-light px-2 py-1 rounded">
                <StarRating rating={product.ratingsAverage} size="text-sm" />
                <span className="text-xs font-bold text-amazon-dark">
                  {product.ratingsAverage}
                </span>
              </div>
            </div>
          </div>
        </Link>
        
        {/* Quick Add Button - Appears on hover */}
        <div className="px-4 pb-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all absolute bottom-0 left-0 right-0 bg-white pt-2 rounded-b-lg">
          <button
            onClick={onAddToCart}
            disabled={isAdding || isAdded}
            className={`w-full py-2.5 rounded-lg font-bold text-sm transition-all flex items-center justify-center gap-2 ${
              isAdded 
                ? 'bg-amazon-dark text-white border border-amazon-dark' 
                : 'bg-amazon-orange hover:bg-opacity-90 text-white shadow-md'
            }`}
          >
            {isAdding ? (
              <><i className="fa-solid fa-spinner animate-spin"></i> Adding...</>
            ) : isAdded ? (
              <><i className="fa-solid fa-check text-amazon-orange"></i> Added</>
            ) : (
              <><i className="fa-solid fa-cart-plus"></i> Add to Cart</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
