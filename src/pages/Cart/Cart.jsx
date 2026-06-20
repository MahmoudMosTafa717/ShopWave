import { useContext, useEffect, useState } from 'react';
import { cartContext } from '../../context/Cart/Cart';
import { Link } from 'react-router-dom';
import Spinner from '../../components/Spinner/Spinner';
import { Helmet } from 'react-helmet';

export default function Cart() {
  const { getProducts, deleteProduct, updateProductQuantity } =
    useContext(cartContext);

  const [data, setData] = useState(null);

  const handleDeleteProduct = async (id) => {
    await deleteProduct(id);
    main();
  };

  const handleUpdateProductQuantity = async (id, quantity) => {
    await updateProductQuantity(id, quantity);
    main();
  };

  async function main() {
    try {
      const result = await getProducts();
      setData(result);
    } catch (err) {
      setData({ products: [] });
    }
  }

  useEffect(() => {
    main();
  }, []);

  return (
    <>
      <Helmet>
        <title>ShopWave - Cart</title>
      </Helmet>
      <div className="container flex flex-wrap py-10">
        <h1 className="text-3xl font-extrabold text-amazon-dark mb-6 w-full">Shopping Cart</h1>
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
                  Qty
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
                data.products && data.products.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="text-center text-xl h-40 font-bold md:text-2xl lg:text-3xl text-gray-400"
                    >
                      <div className="flex flex-col items-center justify-center space-y-4">
                        <i className="fas fa-cart-arrow-down text-5xl"></i>
                        <span>Your cart is empty.</span>
                        <Link to="/" className="text-sm font-medium text-amazon-blue hover:text-amazon-orange underline">
                          Continue Shopping
                        </Link>
                      </div>
                    </td>
                  </tr>
                ) : (
                  data.products && data.products.map((product) => (
                    <tr
                      key={product._id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <td className="p-4">
                        <Link to={`/product/${product.product._id}`}>
                          <img
                            src={product.product.imageCover}
                            className="w-16 md:w-32 max-w-full max-h-full rounded-lg"
                            alt={product.product.title}
                          />
                        </Link>
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                        <Link
                          to={`/product/${product.product._id}`}
                          className="hover:text-amazon-orange transition-colors"
                        >
                          {product.product.title}
                        </Link>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <button
                            onClick={() => {
                              handleUpdateProductQuantity(
                                product.product._id,
                                product.count - 1
                              );
                            }}
                            className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                            type="button"
                          >
                            <span className="sr-only">Decrease Quantity</span>
                            <svg
                              className="w-3 h-3"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 18 2"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M1 1h16"
                              />
                            </svg>
                          </button>
                          <div>
                            <input
                              type="number"
                              disabled
                              className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 text-center"
                              value={product.count}
                              readOnly
                            />
                          </div>
                          <button
                            onClick={() => {
                              handleUpdateProductQuantity(
                                product.product._id,
                                product.count + 1
                              );
                            }}
                            className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                            type="button"
                          >
                            <span className="sr-only">Increase Quantity</span>
                            <svg
                              className="w-3 h-3"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 18 18"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 1v16M1 9h16"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-semibold text-amazon-dark text-lg">
                        EGP {product.price * product.count}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleDeleteProduct(product.product._id)}
                          className="font-medium text-red-600 hover:text-red-800 hover:underline flex items-center gap-1"
                        >
                          <i className="fa-solid fa-trash-can"></i> Remove
                        </button>
                      </td>
                    </tr>
                  ))
                )
              ) : (
                <tr>
                  <td colSpan="5" className="py-20 text-center">
                    <Spinner />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {data && data.products && data.products.length > 0 && (
          <div className="w-full mt-8 flex justify-end">
            <div className="w-full md:w-1/3 bg-white border border-gray-200 rounded-xl shadow-sm">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h5 className="text-xl font-bold tracking-tight text-gray-900">
                    Subtotal
                  </h5>
                  <span className="text-2xl font-extrabold text-amazon-dark">
                    EGP {data?.totalCartPrice || 0}
                  </span>
                </div>
                <Link
                  to={`/checkout/${data?._id}`}
                  className="w-full text-amazon-dark bg-amazon-orange hover:bg-opacity-90 focus:ring-4 focus:outline-none focus:ring-amazon-orange/50 font-bold rounded-lg text-lg px-5 py-3 text-center block shadow-md transition-all"
                >
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
