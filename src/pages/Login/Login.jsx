import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authContext } from '../../context/Auth/Auth';
import { Helmet } from 'react-helmet';

export default function Login() {
  const [err, setErr] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { setUserToken } = useContext(authContext);

  const buttonProps = {
    type: 'submit',
    className:
      'sm:w-36 w-full text-white bg-amazon-orange hover:bg-opacity-90 focus:ring-4 focus:outline-none focus:ring-amazon-orange/50 font-bold rounded-lg text-sm px-5 py-2.5 text-center transition-all shadow-md',
  };

  const loginData = { email: 'demo1@demo.com', password: '123456@demo' };

  const navigate = useNavigate();

  function handleLogin(data) {
    setIsLoading(true);
    axios
      .post('https://ecommerce.routemisr.com/api/v1/auth/signin', data)
      .then((res) => {
        setUserToken(res.data.token);
        localStorage.setItem('authToken', res.data.token);
        setErr(null);
        setIsLoading(false);
        if (res.data.message === 'success') {
          navigate('/');
        }
      })
      .catch((err) => {
        setIsLoading(false);
        setErr(err.response?.data?.message || 'An error occurred');
      });
  }

  function handleDemoLogin() {
    setIsLoading(true);
    const savedEmail = localStorage.getItem('shopwave_demo_email');
    const savedPassword = localStorage.getItem('shopwave_demo_password');

    if (savedEmail && savedPassword) {
      axios
        .post('https://ecommerce.routemisr.com/api/v1/auth/signin', {
          email: savedEmail,
          password: savedPassword,
        })
        .then((res) => {
          setUserToken(res.data.token);
          localStorage.setItem('authToken', res.data.token);
          setErr(null);
          setIsLoading(false);
          if (res.data.message === 'success') {
            navigate('/');
          }
        })
        .catch(() => {
          // If login fails (e.g. account expired or deleted from API), register a new one
          registerAndLoginNewDemoAccount();
        });
    } else {
      registerAndLoginNewDemoAccount();
    }
  }

  function registerAndLoginNewDemoAccount() {
    const randomSuffix = Math.floor(100000 + Math.random() * 900000);
    const email = `demo_${Date.now()}_${randomSuffix}@shopwave.com`;
    const password = `DemoPassword@${randomSuffix}`;
    const name = `Demo User ${randomSuffix}`;
    const prefixes = ['010', '011', '012', '015'];
    const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const randomDigits = Math.floor(10000000 + Math.random() * 90000000);
    const phone = `${randomPrefix}${randomDigits}`;

    const signupData = {
      name,
      email,
      password,
      rePassword: password,
      phone,
    };

    axios
      .post('https://ecommerce.routemisr.com/api/v1/auth/signup', signupData)
      .then((res) => {
        localStorage.setItem('shopwave_demo_email', email);
        localStorage.setItem('shopwave_demo_password', password);

        axios
          .post('https://ecommerce.routemisr.com/api/v1/auth/signin', { email, password })
          .then((loginRes) => {
            setUserToken(loginRes.data.token);
            localStorage.setItem('authToken', loginRes.data.token);
            setErr(null);
            setIsLoading(false);
            if (loginRes.data.message === 'success') {
              navigate('/');
            }
          })
          .catch(() => {
            fallbackToDefaultDemo();
          });
      })
      .catch(() => {
        fallbackToDefaultDemo();
      });
  }

  function fallbackToDefaultDemo() {
    axios
      .post('https://ecommerce.routemisr.com/api/v1/auth/signin', loginData)
      .then((res) => {
        setUserToken(res.data.token);
        localStorage.setItem('authToken', res.data.token);
        setErr(null);
        setIsLoading(false);
        if (res.data.message === 'success') {
          navigate('/');
        }
      })
      .catch((err) => {
        setIsLoading(false);
        setErr(err.response?.data?.message || 'An error occurred');
      });
  }

  const validate = Yup.object({
    email: Yup.string()
      .required('Email is required')
      .email('Email is not valid'),

    password: Yup.string().required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: handleLogin,
    validationSchema: validate,
  });

  return (
    <>
      <Helmet>
        <title>ShopWave - Login</title>
        <meta name="description" content="Log in to your ShopWave account to access your orders, wishlist, and fast checkout." />
      </Helmet>

      <div className="container py-16">
        <form
          method="post"
          className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-xl border border-gray-100"
          onSubmit={formik.handleSubmit}
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold text-amazon-dark mb-2">Welcome Back</h1>
            <p className="text-gray-500">Sign in to continue shopping</p>
          </div>
          
          {err && <div className="bg-red-100 text-red-700 py-2 px-4 rounded-lg mb-6 text-sm font-medium">{err}</div>}
          
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
          <div className="relative z-0 w-full group mb-2">
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
          <div className="flex justify-end mb-6">
            <Link
              to="/forgotPassword"
              className="text-amazon-blue hover:text-amazon-orange text-sm font-medium transition-colors"
            >
              Forgot password?
            </Link>
          </div>
          <div className="flex space-x-3">
            {isLoading ? (
              <button {...buttonProps} disabled>
                <i className="fa-solid fa-spinner animate-spin"></i>
              </button>
            ) : (
              <button {...buttonProps}>Login</button>
            )}

            {isLoading ? (
              <button
                type="button"
                className="w-full text-amazon-dark bg-gray-100 hover:bg-gray-200 font-bold rounded-lg text-sm px-5 py-2.5 text-center transition-all"
                disabled
              >
                <i className="fa-solid fa-spinner animate-spin"></i>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleDemoLogin}
                className="w-full text-amazon-dark bg-gray-100 hover:bg-gray-200 font-bold rounded-lg text-sm px-5 py-2.5 text-center transition-all"
              >
                Demo Login
              </button>
            )}
          </div>
          
          <div className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="text-amazon-blue hover:text-amazon-orange font-bold">
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
