import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import { useContext, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { authContext } from '../../context/Auth/Auth';

export default function Checkout() {
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const { userToken } = useContext(authContext);

  function handleCheckout(data) {
    setIsLoading(true);

    const config = {
      method: 'post',
      url: `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=${window.location.origin}`,
      headers: {
        token: userToken,
      },
      data: {
        shippingAddress: data,
      },
    };

    axios.request(config).then((response) => {
      setIsLoading(false);

      if (response.data.status === 'success') {
        window.location.href = response.data.session.url;
      }
    });
  }

  const validate = Yup.object({
    city: Yup.string()
      .required('Address is required')
      .min(3, 'Address must be at least 3 characters'),

    details: Yup.string(),

    phone: Yup.string()
      .required('Phone number is required')
      .matches(
        /^01[0-2|5]{1}[0-9]{8}$/,
        'Phone number is not valid (01234567891)'
      ),
  });

  const formik = useFormik({
    initialValues: {
      city: '',
      details: '',
      phone: '',
    },
    onSubmit: handleCheckout,
    validationSchema: validate,
  });

  return (
    <>
      <Helmet>
        <title>ShopWave - Checkout</title>
      </Helmet>

      <div className="bg-gray-50 min-h-screen py-10">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-extrabold text-amazon-dark">Secure Checkout</h1>
            <p className="text-gray-500 mt-2">Please enter your shipping details to complete your order.</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Column: Form */}
            <div className="w-full lg:w-2/3">
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
                <h2 className="text-xl font-bold text-amazon-dark mb-6 border-b pb-4">1. Shipping Address</h2>
                
                <form method="post" onSubmit={formik.handleSubmit}>
                  <div className="space-y-6">
                    <div className="relative z-0 w-full group">
                      <input
                        type="text"
                        name="city"
                        id="city"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.city}
                        className="block py-3 px-0 w-full text-sm text-amazon-dark bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-amazon-orange peer"
                        placeholder=" "
                      />
                      <label
                        htmlFor="city"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-amazon-orange peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        City / Address*
                      </label>
                      {formik.errors.city && formik.touched.city && (
                        <span className="text-red-500 font-medium text-xs mt-1 block">
                          {formik.errors.city}
                        </span>
                      )}
                    </div>

                    <div className="relative z-0 w-full group">
                      <input
                        type="text"
                        name="details"
                        id="details"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.details}
                        className="block py-3 px-0 w-full text-sm text-amazon-dark bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-amazon-orange peer"
                        placeholder=" "
                      />
                      <label
                        htmlFor="details"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-amazon-orange peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Apartment, suite, etc. (optional)
                      </label>
                    </div>

                    <div className="relative z-0 w-full group">
                      <input
                        type="tel"
                        name="phone"
                        id="phone"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.phone}
                        className="block py-3 px-0 w-full text-sm text-amazon-dark bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-amazon-orange peer"
                        placeholder=" "
                      />
                      <label
                        htmlFor="phone"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-amazon-orange peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Phone Number*
                      </label>
                      {formik.errors.phone && formik.touched.phone && (
                        <span className="text-red-500 font-medium text-xs mt-1 block">
                          {formik.errors.phone}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mt-8 flex justify-between items-center border-t pt-6">
                    <Link to="/cart" className="text-amazon-blue hover:text-amazon-orange font-medium text-sm transition-colors">
                      <i className="fa-solid fa-arrow-left mr-2"></i>
                      Return to Cart
                    </Link>
                  </div>
                </form>
              </div>
            </div>

            {/* Right Column: Order Summary & Action */}
            <div className="w-full lg:w-1/3">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 sticky top-24">
                <h2 className="text-xl font-bold text-amazon-dark mb-4 border-b pb-4">2. Payment Method</h2>
                
                <div className="mb-6 p-4 bg-blue-50 border border-blue-100 rounded-lg text-sm text-amazon-dark">
                  <div className="flex items-start gap-3">
                    <i className="fa-brands fa-stripe fa-2x text-[#635BFF]"></i>
                    <div>
                      <p className="font-bold">Secure Online Payment</p>
                      <p className="text-gray-600 mt-1">You will be redirected to Stripe to securely complete your purchase.</p>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={formik.handleSubmit}
                  type="button"
                  disabled={isLoading}
                  className="w-full text-amazon-dark bg-amazon-orange hover:bg-opacity-90 focus:ring-4 focus:outline-none focus:ring-amazon-orange/50 font-bold rounded-lg text-lg px-5 py-4 text-center transition-all shadow-md flex justify-center items-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <i className="fa-solid fa-spinner animate-spin"></i> Processing...
                    </>
                  ) : (
                    <>
                      <i className="fa-solid fa-lock text-sm"></i> Proceed to Payment
                    </>
                  )}
                </button>
                
                <p className="text-xs text-center text-gray-500 mt-4">
                  By placing your order, you agree to ShopWave's privacy notice and conditions of use.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
