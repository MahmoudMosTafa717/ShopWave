import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { authContext } from '../../context/Auth/Auth';

export default function ResetPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const navigate = useNavigate();
  const { setUserToken } = useContext(authContext);

  const buttonProps = {
    type: 'submit',
    className:
      'text-white bg-amazon-orange hover:bg-opacity-90 focus:ring-4 focus:outline-none focus:ring-amazon-orange/50 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center select-none',
  };

  const validate = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    newPassword: Yup.string()
      .required('Password is required')
      .matches(
        /^[A-Z][a-z0-9]{5,10}$/,
        'Password must start with uppercase and contain 5-10 letters/numbers'
      ),
  });

  async function handleResetPassword(values) {
    setIsLoading(true);
    setErrorMsg(null);
    try {
      const response = await axios.put(
        'https://ecommerce.routemisr.com/api/v1/auth/resetPassword',
        values
      );
      if (response.data.token) {
        setUserToken(response.data.token);
        localStorage.setItem('authToken', response.data.token);
        navigate('/');
      }
    } catch (error) {
      setErrorMsg(error.response.data.message);
    }
    setIsLoading(false);
  }

  const formik = useFormik({
    initialValues: {
      email: '',
      newPassword: '',
    },
    validationSchema: validate,
    onSubmit: handleResetPassword,
  });

  return (
    <>
      <Helmet>
        <title>ShopWave - Reset Password</title>
      </Helmet>

      <div className="container py-16 max-w-md mx-auto">
        <h2 className="text-3xl font-extrabold text-amazon-dark mb-6 text-center">
          Set New Password
        </h2>
        {errorMsg && (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            <span className="font-medium">Error!</span> {errorMsg}
          </div>
        )}
        <form onSubmit={formik.handleSubmit} className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="email"
              name="email"
              id="email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-amazon-orange peer"
              placeholder=" "
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label
              htmlFor="email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-amazon-orange peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email Address
            </label>
            {formik.errors.email && formik.touched.email ? (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 mt-2"
                role="alert"
              >
                <span className="font-medium">Error!</span>{' '}
                {formik.errors.email}
              </div>
            ) : null}
          </div>
          
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="password"
              name="newPassword"
              id="newPassword"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-amazon-orange peer"
              placeholder=" "
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <label
              htmlFor="newPassword"
              className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-amazon-orange peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              New Password
            </label>
            {formik.errors.newPassword && formik.touched.newPassword ? (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 mt-2"
                role="alert"
              >
                <span className="font-medium">Error!</span>{' '}
                {formik.errors.newPassword}
              </div>
            ) : null}
          </div>

          <div className="flex justify-center">
            <button {...buttonProps} disabled={isLoading}>
              {isLoading ? (
                <i className="fa-solid fa-spinner animate-spin"></i>
              ) : (
                'Reset Password'
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
