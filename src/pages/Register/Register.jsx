import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authContext } from '../../context/Auth/Auth';
import { Helmet } from 'react-helmet';
import toast from 'react-hot-toast';

export default function Register() {
  const [err, setErr] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { setUserToken } = useContext(authContext);

  const buttonProps = {
    type: 'submit',
    className:
      'w-full text-white bg-amazon-orange hover:bg-opacity-90 focus:ring-4 focus:outline-none focus:ring-amazon-orange/50 font-bold rounded-lg text-sm px-5 py-3 text-center transition-all shadow-md mt-4',
  };

  const navigate = useNavigate();

  function handleRegister(data) {
    setIsLoading(true);
    axios
      .post('https://ecommerce.routemisr.com/api/v1/auth/signup', data)
      .then((res) => {
        setErr(null);
        toast.success('Account created successfully');
        setUserToken(res.data.token);
        localStorage.setItem('authToken', res.data.token);
        setIsLoading(false);
        if (res.data.message === 'success') {
          navigate('/login');
        }
      })
      .catch((err) => {
        toast.error('Please try again');
        setIsLoading(false);
        setErr(err.response?.data?.message || 'An error occurred');
      });
  }

  const validate = Yup.object({
    name: Yup.string()
      .required('Name is required')
      .min(3, 'Name must be at least 3 characters'),

    email: Yup.string()
      .required('Email is required')
      .email('Email is not valid'),

    password: Yup.string()
      .min(8, 'Password must be at least 8 characters long')
      .matches(/[A-Za-z]/, 'Password must contain at least one letter')
      .matches(/\d/, 'Password must contain at least one number')
      .matches(
        /[!@#$%^&*(),.?":{}|<>+\-_]/,
        'Password must contain at least one special character'
      )
      .required('Password is required'),

    rePassword: Yup.string()
      .required('Confirm password is required')
      .oneOf([Yup.ref('password')], 'Passwords do not match'),

    phone: Yup.string()
      .required('Phone number is required')
      .matches(
        /^01[0-2|5]{1}[0-9]{8}$/,
        'Phone number is not valid (123-456-7890)'
      ),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: '',
    },
    onSubmit: handleRegister,
    validationSchema: validate,
  });

  return (
    <>
      <Helmet>
        <title>ShopWave - Create Account</title>
        <meta name="description" content="Create a new ShopWave account to start shopping our best deals." />
      </Helmet>

      <div className="container py-16">
        <form
          method="post"
          className="max-w-lg mx-auto bg-white p-8 rounded-2xl shadow-xl border border-gray-100"
          onSubmit={formik.handleSubmit}
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold text-amazon-dark mb-2">Create Account</h1>
            <p className="text-gray-500">Join ShopWave and enjoy exclusive deals</p>
          </div>
          
          {err && <div className="bg-red-100 text-red-700 py-2 px-4 rounded-lg mb-6 text-sm font-medium">{err}</div>}
          
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="name"
              id="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              className="block py-2.5 px-0 w-full text-sm text-amazon-dark bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-amazon-orange peer"
              placeholder=" "
              aria-label="Full Name"
            />
            <label
              htmlFor="name"
              className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-amazon-orange peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Full Name
            </label>
            {formik.errors.name && formik.touched.name && (
              <span className="text-red-500 font-medium text-xs mt-1 block">
                {formik.errors.name}
              </span>
            )}
          </div>
          
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="email"
              name="email"
              id="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className="block py-2.5 px-0 w-full text-sm text-amazon-dark bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-amazon-orange peer"
              placeholder=" "
              aria-label="Email address"
            />
            <label
              htmlFor="email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-amazon-orange peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email address
            </label>
            {formik.errors.email && formik.touched.email && (
              <span className="text-red-500 font-medium text-xs mt-1 block">
                {formik.errors.email}
              </span>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="relative z-0 w-full group">
              <input
                type="password"
                name="password"
                id="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                className="block py-2.5 px-0 w-full text-sm text-amazon-dark bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-amazon-orange peer"
                placeholder=" "
                aria-label="Password"
              />
              <label
                htmlFor="password"
                className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-amazon-orange peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Password
              </label>
              {formik.errors.password && formik.touched.password && (
                <span className="text-red-500 font-medium text-xs mt-1 block">
                  {formik.errors.password}
                </span>
              )}
            </div>
            
            <div className="relative z-0 w-full group">
              <input
                type="password"
                name="rePassword"
                id="rePassword"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.rePassword}
                className="block py-2.5 px-0 w-full text-sm text-amazon-dark bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-amazon-orange peer"
                placeholder=" "
                aria-label="Confirm Password"
              />
              <label
                htmlFor="rePassword"
                className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-amazon-orange peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Confirm password
              </label>
              {formik.errors.rePassword && formik.touched.rePassword && (
                <span className="text-red-500 font-medium text-xs mt-1 block">
                  {formik.errors.rePassword}
                </span>
              )}
            </div>
          </div>
          
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="tel"
              name="phone"
              id="phone"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
              className="block py-2.5 px-0 w-full text-sm text-amazon-dark bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-amazon-orange peer"
              placeholder=" "
              aria-label="Phone Number"
            />
            <label
              htmlFor="phone"
              className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-amazon-orange peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Phone number
            </label>
            {formik.errors.phone && formik.touched.phone && (
              <span className="text-red-500 font-medium text-xs mt-1 block">
                {formik.errors.phone}
              </span>
            )}
          </div>
          
          {isLoading ? (
            <button {...buttonProps} disabled>
              <i className="fa-solid fa-spinner animate-spin"></i>
            </button>
          ) : (
            <button {...buttonProps}>Register</button>
          )}

          <div className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-amazon-blue hover:text-amazon-orange font-bold">
              Log in
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
