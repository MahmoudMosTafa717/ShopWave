import { Link } from 'react-router-dom';
import logo from '../../assets/shopWave-logo-bgr.png';
import { useContext } from 'react';
import { authContext } from '../../context/Auth/Auth';

export default function Footer() {
  const { userToken } = useContext(authContext);

  return (
    <>
      <footer className="bg-amazon-dark border-t border-gray-800 mt-6 text-white">
        <div className=" p-6 mx-auto">
          <div className="lg:flex">
            <div className="w-full -mx-6 lg:w-2/5">
              <div className="px-6">
                <a href="#">
                  <img className="w-auto h-7" src={logo} alt="Site Logo" />
                </a>
                <div className="max-w-sm mt-2 text-gray-400">
                  Discover More, Spend Less - Shop the Best at Your Fingertips!
                </div>
              </div>
            </div>
            <div className="mt-6 lg:mt-0 lg:flex-1">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                <div>
                  <h3 className="text-white uppercase font-bold">
                    Other Sites
                  </h3>
                  <a
                    href="https://diagnotech-frontend.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block mt-2 text-sm text-gray-300 hover:text-amazon-orange hover:underline transition-colors"
                  >
                    DiagnoTech
                  </a>
                  <a
                    href="https://mohamedwael21.github.io/finance-tracker-pro"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block mt-2 text-sm text-gray-300 hover:text-amazon-orange hover:underline transition-colors"
                  >
                    Finance Tracker Pro
                  </a>
                  <a
                    href="https://naqla-recruiter.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block mt-2 text-sm text-gray-300 hover:text-amazon-orange hover:underline transition-colors"
                  >
                    Naqla Recruiter
                  </a>
                </div>
                <div>
                  <h3 className="text-white uppercase font-bold">
                    Jump to
                  </h3>
                  {userToken ? (
                    <>
                      <Link
                        to="/"
                        className="block mt-2 text-sm text-gray-300 hover:text-amazon-orange hover:underline transition-colors"
                      >
                        <i className="fa-fw  fas fa-home"></i> Home
                      </Link>
                      <Link
                        to="/wishlist"
                        className="block mt-2 text-sm text-gray-300 hover:text-amazon-orange hover:underline transition-colors"
                      >
                        <i className="fa-fw  fas fa-heart"></i> Wishlist
                      </Link>
                      <Link
                        to="/cart"
                        className="block mt-2 text-sm text-gray-300 hover:text-amazon-orange hover:underline transition-colors"
                      >
                        <i className="fa-fw  fas fa-shopping-cart"></i> Cart
                      </Link>
                      <Link
                        to="/brands"
                        className="block mt-2 text-sm text-gray-300 hover:text-amazon-orange hover:underline transition-colors"
                      >
                        <i className="fa-fw  fas fas fa-tags"></i> Brands
                      </Link>
                      <Link
                        to="/categories"
                        className="block mt-2 text-sm text-gray-300 hover:text-amazon-orange hover:underline transition-colors"
                      >
                        <i className="fa-fw  fas fa-list"></i> Categories
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        to="login"
                        className="block mt-2 text-sm text-gray-300 hover:text-amazon-orange hover:underline transition-colors"
                      >
                        <i className="fas fa-sign-in-alt"></i> Login
                      </Link>
                      <Link
                        to="register"
                        className="block mt-2 text-sm text-gray-300 hover:text-amazon-orange hover:underline transition-colors"
                      >
                        <i className="fas fa-user-plus fa-fw"></i> Register
                      </Link>
                    </>
                  )}
                </div>
                <div>
                  <h3 className="text-white uppercase font-bold">
                    Contact
                  </h3>
                  <span className="block mt-2 text-sm text-gray-300 hover:text-amazon-orange hover:underline transition-colors">
                    <a href="mailto:mhmodmostafa127@gmail.com">
                      mhmodmostafa127@gmail.com
                    </a>
                  </span>
                  <span className="block space-x-2 mt-2 text-sm text-gray-300">
                    <a
                      href="https://www.linkedin.com/in/mahmoud-mostafa-saber/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-amazon-orange transition-colors"
                    >
                      <i className="fa-lg fa-fw  fab fa-linkedin"></i>
                    </a>
                    <a
                      href="https://github.com/MahmoudMosTafa717"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-amazon-orange transition-colors"
                    >
                      <i className="fa-lg fa-fw  fab fa-github"></i>
                    </a>
                    <a
                      href="mailto:mhmodmostafa127@gmail.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-amazon-orange transition-colors"
                    >
                      <i className="fa-lg fa-fw  far fa-envelope"></i>
                    </a>
                    <a
                      href="https://mahmoud-mostafa.pages.dev/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-amazon-orange transition-colors"
                    >
                      <i className="fa-lg fa-fw fas fa-globe"></i>
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <hr className="h-px my-4 bg-gray-700 border-none" />
          <div>
            <div className="text-center text-gray-400">
              &quot;It does not matter how slowly you go as long as you do not
              stop.&quot;
            </div>
          </div>
          <div>
            <div className="text-center italic py-3 text-gray-400">
              Made with love and passion by Mahmoud Mostafa
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
