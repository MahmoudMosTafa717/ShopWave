import { useContext } from 'react';
import Slider from 'react-slick';
import { productsContext } from '../../context/Products/Products';
import ProductItem from '../ProductItem/ProductItem';
import { wishlistContext } from '../../context/Wishlist/Wishlist';

export default function FeaturedSlider() {
  const { data } = useContext(productsContext);
  const { addToWishlist, deleteWishlistItem } = useContext(wishlistContext);
  // Ideally, we'd get the actual user wishlist, but for simplicity in the slider
  // we can use a basic handler or assume it's just rendering the ProductItem

  // Take top 6 products as featured
  const featuredProducts = data ? data.slice(0, 6) : [];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const handleWishlist = async (id) => {
    // Basic placeholder handler since we reuse ProductItem
    // The actual wishlist state is better managed in a higher component or context hook.
    await addToWishlist(id);
  };

  if (!data || data.length === 0) return null;

  return (
    <section className="py-16 bg-amazon-light">
      <div className="container">
        <h2 className="text-3xl font-bold mb-8 text-amazon-black border-l-4 border-amazon-orange pl-3">
          Featured Products
        </h2>
        <div className="mx-[-12px]"> {/* Negative margin to offset padding inside items */}
          <Slider {...settings}>
            {featuredProducts.map((product) => (
              <div key={product._id} className="px-3">
                {/* We render ProductItem and override its w-full classes via CSS if needed, 
                    but since ProductItem has its own width classes, we might need a custom layout 
                    or adjust ProductItem. Let's create a simpler card for the slider or just use ProductItem. */}
                <div className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden h-full flex flex-col">
                  <div className="relative">
                    <img src={product.imageCover} alt={product.title} className="w-full h-48 object-cover" />
                  </div>
                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="text-lg font-semibold text-amazon-black truncate mb-2">{product.title}</h3>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-amazon-orange font-bold">EGP {product.price}</span>
                      <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">⭐ {product.ratingsAverage}</span>
                    </div>
                    <a href={`/product/${product._id}`} className="mt-auto block text-center bg-amazon-blue text-white py-2 rounded font-medium hover:bg-opacity-90 transition">
                      View Details
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
}
