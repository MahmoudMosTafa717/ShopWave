import { useContext, useEffect, useState } from 'react';
import { wishlistContext } from '../../context/Wishlist/Wishlist';
import { cartContext } from '../../context/Cart/Cart';
import { Link } from 'react-router-dom';
import Spinner from '../../components/Spinner/Spinner';
import { Helmet } from 'react-helmet';

export default function Wishlist() {
  const { getWishlist, deleteWishlistItem } = useContext(wishlistContext);
  const { addProduct } = useContext(cartContext);
  const [data, setData] = useState(null);

  const handleDeleteItem = async (id) => {
    await deleteWishlistItem(id);
    main();
  };

  const handleAddToCart = async (id) => {
    await addProduct(id);
    await deleteWishlistItem(id);
    main();
  };

  async function main() {
    try {
      const result = await getWishlist();
      setData(result);
    } catch (err) {
      setData([]);
    }
  }

  useEffect(() => {
    main();
  }, []);

  return (
    <>
      <Helmet>
        <title>ShopWave - Wishlist</title>
      </Helmet>
      <div className="container py-10 flex flex-wrap">
        <h1 className="text-3xl font-extrabold text-amazon-dark mb-6 w-full">Your Wishlist</h1>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full bg-white border border-gray-100">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-16 py-3">
                  <span className="sr-only">Image</span>
                </th>
                <th scope="col" className="px-6 py-3">
                  Product
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {data ? (
                data.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="text-center text-xl h-40 font-bold md:text-2xl lg:text-3xl text-gray-400"
                    >
                      <div className="flex flex-col items-center justify-center space-y-4">
                        <i className="fas fa-heart-crack text-5xl"></i>
                        <span>Your wishlist is empty.</span>
                        <Link to="/" className="text-sm font-medium text-amazon-blue hover:text-amazon-orange underline">
                          Explore Products
                        </Link>
                      </div>
                    </td>
                  </tr>
                ) : (
                  data.map((product) => (
                    <tr
                      key={product._id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <td className="p-4">
                        <Link to={`/product/${product._id}`}>
                          <img
                            src={product.imageCover}
                            className="w-16 md:w-32 max-w-full max-h-full rounded-lg"
                            alt={product.title}
                          />
                        </Link>
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                        <Link
                          to={`/product/${product._id}`}
                          className="hover:text-amazon-orange transition-colors"
                        >
                          {product.title}
                        </Link>
                      </td>
                      <td className="px-6 py-4 font-semibold text-amazon-dark text-lg">
                        EGP {product.price}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col sm:flex-row gap-3">
                          <button
                            onClick={() => handleAddToCart(product._id)}
                            className="text-white bg-amazon-orange hover:bg-opacity-90 focus:ring-4 focus:ring-amazon-orange/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center shadow-md transition-all flex items-center justify-center gap-2"
                          >
                            <i className="fas fa-cart-plus"></i> Add to Cart
                          </button>
                          <button
                            onClick={() => handleDeleteItem(product._id)}
                            className="text-red-600 hover:text-red-800 border border-red-200 hover:bg-red-50 focus:ring-4 focus:ring-red-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-all flex items-center justify-center gap-2"
                          >
                            <i className="fas fa-trash-can"></i> Remove
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )
              ) : (
                <tr>
                  <td colSpan="4" className="py-20 text-center">
                    <Spinner />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
