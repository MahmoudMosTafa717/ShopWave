import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import Slider from 'react-slick/lib/slider.js';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { cartContext } from '../../context/Cart/Cart.jsx';
import { productsContext } from '../../context/Products/Products.jsx';
import { wishlistContext } from '../../context/Wishlist/Wishlist.jsx';
import { authContext } from '../../context/Auth/Auth.jsx';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Spinner from '../../components/Spinner/Spinner';

export default function ProductDetails() {
  const { addProduct, cartItemIds } = useContext(cartContext);
  const { renderStars } = useContext(productsContext);
  const { userToken } = useContext(authContext);
  const navigate = useNavigate();
  const [ProdDetails, setProdDetails] = useState([]);

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 1500,
    pauseOnHover: true,
  };

  const { id } = useParams();

  const { addToWishlist, wishlistItemsIds } = useContext(wishlistContext);

  useEffect(() => {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then((response) => {
        setProdDetails(response.data.data);
      })
      .catch((error) => {
        throw error;
      });
  }, [id]);

  if (!ProdDetails || (Array.isArray(ProdDetails) && ProdDetails.length === 0)) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] w-full">
        <Spinner />
      </div>
    );
  }

  const isAddedToCart = cartItemIds && ProdDetails && cartItemIds.includes(ProdDetails.id);
  const isAddedToWishlist = wishlistItemsIds && ProdDetails && wishlistItemsIds.includes(ProdDetails.id);

  const handleAddToCart = () => {
    if (!isAddedToCart) {
      addProduct(ProdDetails.id);
    }
  };

  const handleAddToWishlist = () => {
    if (!isAddedToWishlist) {
      addToWishlist(ProdDetails.id);
    }
  };

  return (
    <>
      <Helmet>
        <title>{ProdDetails.title || 'Product Details'} - ShopWave</title>
        <meta name="description" content={ProdDetails.description || 'View details and purchase this product on ShopWave.'} />
      </Helmet>

      <div className="container dark:bg-gray-800 py-12">
        <div className="flex flex-col md:flex-row md:space-x-8">
          <div className="w-full md:w-1/3 mb-8 md:mb-0">
            <div className="rounded-lg mb-7 dark:bg-gray-700 bg-white p-4 shadow-sm border border-gray-100">
              <Slider {...settings}>
                {ProdDetails.images
                  ? ProdDetails.images.map((img, index) => (
                      <div key={index} className="w-full h-[460px]">
                        <img
                          className="w-full h-full object-contain rounded-lg"
                          src={img}
                          alt={`Product image ${index + 1}`}
                        />
                      </div>
                    ))
                  : ''}
              </Slider>
            </div>
            <div className="flex mt-4 space-x-4">
              {isAddedToCart ? (
                <button
                  disabled
                  className="w-1/2 bg-gray-200 text-amazon-dark cursor-not-allowed py-2 px-4 rounded-lg font-bold flex justify-center items-center gap-2"
                >
                  <i className="fa-solid fa-check text-green-600"></i> Added
                </button>
              ) : (
                <button
                  onClick={handleAddToCart}
                  className="w-1/2 bg-amazon-orange hover:bg-opacity-90 dark:bg-amazon-orange text-white py-2 px-4 rounded-lg font-bold dark:hover:bg-opacity-80 transition-all"
                >
                  Add to cart
                </button>
              )}
              
              {isAddedToWishlist ? (
                <button
                  disabled
                  className="w-1/2 bg-gray-200 text-amazon-dark cursor-not-allowed py-2 px-4 rounded-lg font-bold flex justify-center items-center gap-2"
                >
                  <i className="fa-solid fa-heart text-amazon-orange"></i> Saved
                </button>
              ) : (
                <button 
                  onClick={handleAddToWishlist}
                  className="w-1/2 bg-amazon-light dark:bg-gray-700 text-amazon-dark dark:text-white py-2 px-4 rounded-lg font-bold hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
                >
                  Add to Wishlist
                </button>
              )}
            </div>
          </div>

          <div className="w-full md:w-2/3 bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
              {ProdDetails.title}
            </h2>

            <div className="mb-8">
              <span className="text-xl font-bold text-gray-700 dark:text-gray-300 block mb-2">
                Product Description:
              </span>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                {ProdDetails.description}
              </p>
            </div>

            <div className="border-t border-gray-100 pt-6">
              <div className="flex justify-between items-center mb-6">
                <div className="text-xl font-bold text-gray-800 dark:text-white">
                  Rating
                </div>
                <div className="flex items-center">
                  <span className="flex text-amazon-orange" aria-label={`Rating: ${ProdDetails.ratingsAverage} out of 5`}>
                    {ProdDetails.ratingsAverage ? renderStars(Math.round(ProdDetails.ratingsAverage)).map(
                      (star, index) => (
                        <span key={index} className="transform scale-125 mx-1">
                          {star}
                        </span>
                      )
                    ) : ''}
                  </span>
                  <span className="bg-amazon-light text-amazon-dark text-lg font-bold px-3 py-1 rounded dark:bg-amazon-dark dark:text-amazon-light ml-4">
                    {ProdDetails.ratingsAverage}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center text-gray-900 dark:text-white bg-gray-50 p-6 rounded-lg border border-gray-100">
                <div className="text-2xl font-bold text-gray-700 dark:text-gray-300">
                  Price
                </div>
                <div className="text-3xl font-extrabold text-amazon-dark">
                  EGP {ProdDetails.price}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
