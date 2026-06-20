import logo from '../../assets/shopWave-logo-bgr.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { authContext } from '../../context/Auth/Auth';
import { initFlowbite } from 'flowbite';
import { productsContext } from '../../context/Products/Products';
import { cartContext } from '../../context/Cart/Cart';
import toast from 'react-hot-toast';

export default function Navbar() {
  const { userToken, setUserToken } = useContext(authContext);
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { data, setSearchRes } = useContext(productsContext);
  const { numOfCartItems } = useContext(cartContext);

  function logout() {
    setUserToken(null);
    localStorage.removeItem('authToken');
  }

  const navigate = useNavigate();
  function handleSearch(e) {
    if (e.key === 'Enter') {
      const query = e.target.value;

      const filteredProducts = data.filter((product) =>
        product.title.toLowerCase().includes(query.toLowerCase().trim())
      );

      setSearchRes(filteredProducts);
      navigate('/search');
    }
  }

  const handleProtectedNavigation = (e, path) => {
    if (!userToken) {
      e.preventDefault();
      toast.error('Please login to continue.');
      navigate('/login');
    }
  };

  useEffect(() => {
    initFlowbite();
  }, []);

  return (
    <>
      <nav className="fixed top-0 w-full z-50">
        {/* Main Top Navbar */}
        <div className="bg-amazon-dark border-b border-gray-700 shadow-sm px-4 py-3 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse mr-4 lg:mr-8 shrink-0"
          >
            <img src={logo} className="h-8 bg-white p-1 rounded" alt="ShopWave Logo" />
          </Link>
          
          <div className="flex-1 max-w-4xl mx-auto hidden lg:block">
            <div className="relative flex">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                </svg>
              </div>
              <input
                type="text"
                onKeyUp={(e) => handleSearch(e)}
                className="block w-full p-2.5 ps-10 text-sm text-gray-900 border-0 rounded-lg bg-white focus:ring-2 focus:ring-amazon-orange outline-none"
                placeholder="Search products, categories, brands..."
                aria-label="Search"
              />
              <button className="absolute right-0 top-0 bottom-0 px-4 bg-amazon-orange text-white rounded-r-lg hover:bg-opacity-90 font-bold transition-colors">
                Search
              </button>
            </div>
          </div>
          
          <div className="flex space-x-4 items-center ml-auto lg:ml-8 shrink-0">
            {userToken ? (
              <div className="hidden lg:flex items-center gap-4">
                <div className="text-white text-sm">
                  <span className="block text-xs text-gray-300">Hello, User</span>
                  <span className="font-bold">Account & Lists</span>
                </div>
                <Link
                  to="/login"
                  onClick={logout}
                  className="border-2 border-gray-500 text-gray-300 hover:text-white hover:border-white font-medium rounded-lg text-sm px-4 py-2 transition-all"
                >
                  Logout
                </Link>
              </div>
            ) : (
              <div className="hidden lg:flex items-center gap-3">
                <div className="text-white text-sm mr-2">
                  <span className="block text-xs text-gray-300">Hello, sign in</span>
                  <span className="font-bold">Account & Lists</span>
                </div>
                <Link
                  to="/login"
                  className="text-white hover:text-amazon-orange font-medium text-sm px-3 py-2 transition-colors border border-transparent"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="bg-amazon-orange hover:bg-opacity-90 text-white font-bold rounded-lg text-sm px-4 py-2 transition-all shadow-md shadow-amazon-orange/20"
                >
                  Sign up
                </Link>
              </div>
            )}

            <Link to="/cart" aria-label="Cart" onClick={(e) => handleProtectedNavigation(e, '/cart')} className="relative flex items-center text-white hover:text-amazon-orange transition-colors ml-4 mr-2 group">
              <div className="relative">
                <i className="fas fa-shopping-cart fa-2x"></i>
                {userToken && numOfCartItems > 0 && (
                  <span className="absolute -top-1 -right-2 bg-amazon-orange text-amazon-dark text-xs font-bold px-1.5 py-0.5 rounded-full border-2 border-amazon-dark group-hover:border-amazon-orange transition-colors">
                    {numOfCartItems}
                  </span>
                )}
              </div>
              <span className="hidden lg:block font-bold mt-2 ml-1">Cart</span>
            </Link>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white rounded-lg lg:hidden hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle Menu"
            >
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown & Search (Hidden on Desktop) */}
        <div className={`lg:hidden bg-amazon-light text-amazon-dark ${isMobileMenuOpen ? 'block' : 'hidden'}`} id="mobile-menu">
          <div className="p-3 bg-amazon-dark">
            <input
              type="text"
              onKeyUp={(e) => handleSearch(e)}
              className="block w-full p-2.5 text-sm text-gray-900 border-0 rounded-lg bg-white focus:ring-2 focus:ring-amazon-orange outline-none"
              placeholder="Search ShopWave..."
            />
          </div>
          <ul className="flex flex-col font-medium p-4 space-y-2">
            <li><Link to="/" className="block py-2 text-amazon-dark font-bold border-b border-gray-300">Home</Link></li>
            <li><Link to="/categories" className="block py-2 text-amazon-dark font-bold border-b border-gray-300">Categories</Link></li>
            <li><Link to="/brands" className="block py-2 text-amazon-dark font-bold border-b border-gray-300">Brands</Link></li>
            <li><Link to="/wishlist" onClick={(e) => handleProtectedNavigation(e, '/wishlist')} className="block py-2 text-amazon-dark font-bold border-b border-gray-300">Wishlist</Link></li>
            {userToken ? (
              <>
                <li><Link to="/allorders" className="block py-2 text-amazon-dark font-bold border-b border-gray-300">Orders</Link></li>
                <li><Link to="/login" onClick={logout} className="block py-2 text-red-600 font-bold mt-2">Logout</Link></li>
              </>
            ) : (
              <div className="flex gap-4 mt-4">
                <Link to="/login" className="flex-1 text-center py-2 border-2 border-amazon-dark text-amazon-dark rounded font-bold">Log in</Link>
                <Link to="/register" className="flex-1 text-center py-2 bg-amazon-orange text-white rounded font-bold">Sign up</Link>
              </div>
            )}
          </ul>
        </div>

        {/* Secondary Sub-Navbar (Persistent across all pages) */}
        <div className="hidden lg:flex bg-amazon-light text-amazon-dark px-4 py-1.5 shadow-sm text-sm font-medium items-center overflow-x-auto whitespace-nowrap">
          <div className="flex items-center gap-6 max-w-screen-xl mx-auto w-full">
            {/* Menu Icon */}
            <button className="flex items-center gap-1 font-bold hover:text-amazon-orange border border-transparent hover:border-white px-2 py-1 rounded transition-colors">
              <i className="fa-solid fa-bars"></i> All
            </button>
            
            {userToken ? (
              <>
                <Link to="/allorders" className="hover:text-amazon-orange border border-transparent hover:border-white px-2 py-1 rounded transition-colors">Your Orders</Link>
                <Link to="/wishlist" className="hover:text-amazon-orange border border-transparent hover:border-white px-2 py-1 rounded transition-colors">Wishlist</Link>
                <Link to="/categories" className="hover:text-amazon-orange border border-transparent hover:border-white px-2 py-1 rounded transition-colors">Categories</Link>
                <Link to="/brands" className="hover:text-amazon-orange border border-transparent hover:border-white px-2 py-1 rounded transition-colors">Brands</Link>
                <Link to="/cart" className="hover:text-amazon-orange border border-transparent hover:border-white px-2 py-1 rounded transition-colors">Cart</Link>
              </>
            ) : (
              <>
                <a href="/#categories" className="hover:text-amazon-orange border border-transparent hover:border-white px-2 py-1 rounded transition-colors">Categories</a>
                <a href="/#bestsellers" className="hover:text-amazon-orange border border-transparent hover:border-white px-2 py-1 rounded transition-colors">Best Sellers</a>
                <a href="/#promo" className="hover:text-amazon-orange border border-transparent hover:border-white px-2 py-1 rounded transition-colors">Today's Deals</a>
                <a href="/#whychooseus" className="hover:text-amazon-orange border border-transparent hover:border-white px-2 py-1 rounded transition-colors">Customer Service</a>
                <a href="/#testimonials" className="hover:text-amazon-orange border border-transparent hover:border-white px-2 py-1 rounded transition-colors">Testimonials</a>
              </>
            )}
          </div>
        </div>
      </nav>
      {/* Spacer to prevent content from hiding behind fixed navbars */}
      <div className="h-[110px] lg:h-[114px] w-full"></div>
    </>
  );
}
