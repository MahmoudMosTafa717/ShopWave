import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

export default function AllOrders() {
  return (
    <>
      <Helmet>
        <title>Order Successful</title>
      </Helmet>
      <div className="container flex flex-col items-center justify-center mt-20 text-center">
        <div className="bg-green-100 text-green-800 p-8 rounded-lg shadow-md max-w-lg w-full mx-auto">
          <i className="fa-solid fa-circle-check text-6xl mb-4"></i>
          <h1 className="text-3xl font-bold mb-2">Order Placed Successfully!</h1>
          <p className="text-green-700 mb-6">
            Thank you for shopping with us. Your payment was successful and your order is being processed.
          </p>
          <Link
            to="/"
            className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 transition duration-300"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </>
  );
}
