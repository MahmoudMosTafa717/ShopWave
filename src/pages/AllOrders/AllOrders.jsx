import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { authContext } from '../../context/Auth/Auth';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import Spinner from '../../components/Spinner/Spinner';

export default function AllOrders() {
  const { userToken } = useContext(authContext);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (userToken) {
      try {
        const decoded = jwtDecode(userToken);
        const userId = decoded.id;
        
        axios
          .get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`)
          .then((res) => {
            setOrders(res.data);
            setIsLoading(false);
          })
          .catch((err) => {
            setError('Failed to fetch your orders. Please try again later.');
            setIsLoading(false);
          });
      } catch (err) {
        setError('Invalid user session.');
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  }, [userToken]);

  return (
    <>
      <Helmet>
        <title>ShopWave - Order History</title>
        <meta name="description" content="View your past orders and tracking information." />
      </Helmet>
      
      <div className="container py-16">
        <h1 className="text-3xl font-extrabold text-amazon-black mb-8 border-l-4 border-amazon-orange pl-4">
          Your Orders
        </h1>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Spinner />
          </div>
        ) : error ? (
          <div className="bg-red-100 text-red-700 p-4 rounded-lg">
            {error}
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="w-24 h-24 bg-amazon-light rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-box-open text-4xl text-gray-400"></i>
            </div>
            <h2 className="text-2xl font-bold text-gray-700 mb-4">You have no orders yet</h2>
            <p className="text-gray-500 mb-8">Start exploring our catalog and discover amazing deals.</p>
            <Link
              to="/"
              className="inline-block bg-amazon-orange hover:bg-opacity-90 text-white font-bold px-8 py-3 rounded-lg transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
                <div className="bg-amazon-light px-6 py-4 border-b border-gray-200 flex flex-wrap justify-between items-center text-sm">
                  <div className="flex space-x-8">
                    <div>
                      <p className="text-gray-500 font-medium uppercase text-xs mb-1">Order Placed</p>
                      <p className="font-bold text-amazon-dark">{new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 font-medium uppercase text-xs mb-1">Total</p>
                      <p className="font-bold text-amazon-dark">EGP {order.totalOrderPrice}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 font-medium uppercase text-xs mb-1">Payment Method</p>
                      <p className="font-bold text-amazon-dark capitalize">{order.paymentMethodType}</p>
                    </div>
                  </div>
                  <div className="mt-4 sm:mt-0 text-right">
                    <p className="text-gray-500 font-medium uppercase text-xs mb-1">Order ID</p>
                    <p className="font-bold text-amazon-dark">#{order.id}</p>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex flex-wrap gap-4 items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${order.isDelivered ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {order.isDelivered ? 'Delivered' : 'Processing'}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${order.isPaid ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
                        {order.isPaid ? 'Paid' : 'Unpaid'}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {order.cartItems.map((item) => (
                      <div key={item._id} className="flex space-x-4">
                        <div className="w-20 h-20 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                          <img src={item.product.imageCover} alt={item.product.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 flex flex-col justify-center">
                          <Link to={`/product/${item.product.id}`} className="font-bold text-amazon-blue hover:text-amazon-orange text-sm line-clamp-2 mb-1">
                            {item.product.title}
                          </Link>
                          <p className="text-gray-500 text-sm">Qty: {item.count}</p>
                          <p className="font-bold text-amazon-dark text-sm">EGP {item.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
