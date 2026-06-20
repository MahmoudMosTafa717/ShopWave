import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const navigate = useNavigate();

  const buttonProps = {
    type: 'submit',
    className:
      'text-white bg-amazon-orange hover:bg-opacity-90 focus:ring-4 focus:outline-none focus:ring-amazon-orange/50 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center',
  };

  const validate = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
  });

  async function handleForgotPassword(values) {
    setIsLoading(true);
    setErrorMsg(null);
    try {
      const response = await axios.post(
        'https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',
        values
      );
      if (response.data.statusMsg === 'success') {
        navigate('verifyCode');
      }
    } catch (error) {
      setErrorMsg(error.response?.data?.message || 'An error occurred');
    }
    setIsLoading(false);
  }

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: validate,
    onSubmit: handleForgotPassword,
  });

  return (
    <>
      <Helmet>
        <title>ShopWave - Forgot Password</title>
      </Helmet>

      <div className="container py-16 max-w-md mx-auto">
        <h2 className="text-3xl font-extrabold text-amazon-dark mb-6 text-center">
          Reset Your Password
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
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 text-center">
            Enter the email address associated with your account and we'll send you a code to reset your password.
          </p>
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
          <div className="flex justify-center">
            <button {...buttonProps} disabled={isLoading}>
              {isLoading ? (
                <i className="fa-solid fa-spinner animate-spin"></i>
              ) : (
                'Send Reset Code'
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
