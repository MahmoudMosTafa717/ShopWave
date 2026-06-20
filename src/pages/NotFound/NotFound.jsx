import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>ShopWave - 404 Not Found</title>
      </Helmet>
      <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8 dark:bg-gray-800">
        <div className="text-center">
          <p className="text-base font-bold text-amazon-orange">404</p>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-5xl dark:text-white">
            Page not found
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-600 dark:text-gray-400">
            Sorry, we couldn't find the page you're looking for.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to="/"
              className="rounded-md bg-amazon-orange px-5 py-3 text-sm font-bold text-white shadow-sm hover:bg-opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amazon-orange transition-all"
            >
              Go back home
            </Link>
            <Link
              to="/categories"
              className="text-sm font-semibold text-gray-900 dark:text-white hover:text-amazon-orange transition-colors"
            >
              Browse Categories <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
