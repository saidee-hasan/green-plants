import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  AiOutlineMenu, 
  AiOutlineClose, 
  AiOutlineShoppingCart,
  AiOutlineSearch
} from 'react-icons/ai';
import { 
  FiUser, 
  FiChevronDown,
  FiHeart
} from 'react-icons/fi';
import { BsFlower1, BsSun } from 'react-icons/bs';
import { RiPlantLine } from 'react-icons/ri';
import { IoMdNotificationsOutline } from 'react-icons/io'; // Still imported, not used
import { MdOutlineDashboard } from 'react-icons/md'; // Added for Dashboard
import Container from '../Container';
import useAuth from '../../../hooks/useAuth';
import logo from '../../../assets/images/logo-flat.png';
import avatarImg from '../../../assets/images/placeholder.jpg';

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('');
  const dropdownRef = useRef(null);
  const searchRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Track active link
  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logOut();
    setIsOpen(false);
    navigate('/');
  };

  // Mock data
  const cartItems = 3;
  const wishlistItems = 2;
  const notifications = 1; // Still present, not used visually

  return (
    <header className={`fixed w-full z-50 transition-all duration-500 ${
      scrolled 
        ? 'bg-white/95 shadow-sm py-2 backdrop-blur-md border-b border-green-50' 
        : 'bg-white/90 py-4 backdrop-blur-sm'
    }`}>
      <Container>
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <img 
              src={logo} 
              alt="GreenThumb" 
              className="h-12 w-auto transition-transform duration-500 group-hover:scale-105" 
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link 
              to="/plants" 
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                activeLink === '/plants' 
                  ? 'bg-green-100 text-green-700' 
                  : 'text-gray-700 hover:bg-green-50'
              }`}
            >
              <RiPlantLine className="text-lg" />
              <span className="font-medium">Plants</span>
            </Link>
            
            <Link 
              to="/gardening-kits" 
              className={`px-3 py-2 rounded-lg transition-colors ${
                activeLink === '/gardening-kits' 
                  ? 'bg-green-100 text-green-700' 
                  : 'text-gray-700 hover:bg-green-50'
              }`}
            >
              <span className="font-medium">Kits</span>
            </Link>
            
            <Link 
              to="/blog" 
              className={`px-3 py-2 rounded-lg transition-colors ${
                activeLink === '/blog' 
                  ? 'bg-green-100 text-green-700' 
                  : 'text-gray-700 hover:bg-green-50'
              }`}
            >
              <span className="font-medium">Blog</span>
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-6">
            <button 
              onClick={() => setSearchOpen(true)}
              className="p-2 text-gray-600 hover:text-green-700 transition-colors"
            >
              <AiOutlineSearch className="text-xl" />
            </button>
            
            <Link 
              to="/wishlist" 
              className="relative p-2 text-gray-600 hover:text-green-700 transition-colors"
            >
              <FiHeart className="text-xl" />
              {wishlistItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center text-xs font-bold text-white bg-red-500 rounded-full">
                  {wishlistItems}
                </span>
              )}
            </Link>
            
            <Link 
              to="/cart" 
              className="relative p-2 text-gray-600 hover:text-green-700 transition-colors"
            >
              <AiOutlineShoppingCart className="text-xl" />
              {cartItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center text-xs font-bold text-white bg-green-600 rounded-full">
                  {cartItems}
                </span>
              )}
            </Link>

            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button 
                  onClick={() => setIsOpen(!isOpen)}
                  className="flex items-center gap-2 pl-2 pr-3 py-1 rounded-full bg-green-50 hover:bg-green-100 transition-colors"
                >
                  <img
                    className="w-8 h-8 rounded-full object-cover border-2 border-white shadow-sm"
                    src={user?.photoURL || avatarImg}
                    alt={user.displayName || 'User'}
                  />
                  <FiChevronDown className={`text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
                    <div className="px-4 py-3 border-b border-gray-100 bg-green-50">
                      <p className="font-medium text-gray-900">{user.displayName || 'Welcome'}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                    <Link
                      to="/dashboard"
                      className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-green-50 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      <MdOutlineDashboard className="text-gray-500" />
                      <span>Dashboard</span>
                    </Link>
                    <Link
                      to="/account"
                      className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-green-50 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      <FiUser className="text-gray-500" />
                      <span>My Account</span>
                    </Link>
                    <Link
                      to="/orders"
                      className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-green-50 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      <BsFlower1 className="text-gray-500" />
                      <span>My Orders</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-green-50 transition-colors"
                    >
                      <BsSun className="text-gray-500" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link
                  to="/login"
                  className="px-5 py-2 text-green-700 hover:bg-green-50 rounded-lg transition-colors font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-5 py-2 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-lg shadow-md hover:shadow-lg transition-all font-medium"
                >
                  Join Now
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-4">
            <button 
              onClick={() => setSearchOpen(!searchOpen)} // Toggle search on mobile
              className="p-2 text-gray-700"
            >
              <AiOutlineSearch className="text-xl" />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)} // Toggle main mobile menu
              className="p-2 text-gray-700"
            >
              {isOpen ? ( // Changed: Now isOpen controls the main mobile menu, not just user dropdown
                <AiOutlineClose className="text-xl" />
              ) : (
                <AiOutlineMenu className="text-xl" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        {searchOpen && (
          <div ref={searchRef} className="lg:hidden mt-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search plants, tools, and more..."
                className="w-full pl-4 pr-10 py-3 rounded-full border border-gray-200 focus:border-green-400 focus:ring-2 focus:ring-green-100 outline-none transition-all bg-white text-gray-800"
              />
              <AiOutlineSearch className="absolute right-3 top-3.5 text-gray-400 text-xl" />
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {isOpen && ( // This isOpen controls the entire mobile navigation panel
          <div className="lg:hidden bg-white shadow-lg rounded-xl mt-3 overflow-hidden border border-gray-100">
            <div className="divide-y divide-gray-100">
              <div className="px-4 py-3 bg-green-50">
                {user ? (
                  <div className="flex items-center gap-3">
                    <img
                      className="w-10 h-10 rounded-full object-cover border-2 border-white"
                      src={user?.photoURL || avatarImg}
                      alt={user.displayName || 'User'}
                    />
                    <div>
                      <p className="font-medium">{user.displayName || 'Welcome'}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                  </div>
                ) : (
                  <p className="font-medium text-gray-800">Welcome to GreenThumb</p>
                )}
              </div>
              
              <nav className="py-2">
                <Link
                  to="/plants"
                  className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-green-50 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <RiPlantLine />
                  <span>Plants</span>
                </Link>
                <Link
                  to="/gardening-kits"
                  className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-green-50 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <BsFlower1 />
                  <span>Gardening Kits</span>
                </Link>
                <Link
                  to="/blog"
                  className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-green-50 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <BsSun />
                  <span>Blog</span>
                </Link>
              </nav>
              
              <div className="py-2">
                <Link
                  to="/wishlist"
                  className="flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-green-50 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex items-center gap-3">
                    <FiHeart />
                    <span>Wishlist</span>
                  </div>
                  {wishlistItems > 0 && (
                    <span className="px-2 py-0.5 text-xs font-bold text-white bg-red-500 rounded-full">
                      {wishlistItems}
                    </span>
                  )}
                </Link>
                <Link
                  to="/cart"
                  className="flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-green-50 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex items-center gap-3">
                    <AiOutlineShoppingCart />
                    <span>Cart</span>
                  </div>
                  {cartItems > 0 && (
                    <span className="px-2 py-0.5 text-xs font-bold text-white bg-green-600 rounded-full">
                      {cartItems}
                    </span>
                  )}
                </Link>
              </div>
              
              {user ? (
                <div className="py-2">
                  <Link
                    to="/dashboard"
                    className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-green-50 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <MdOutlineDashboard />
                    <span>Dashboard</span>
                  </Link>
                  <Link
                    to="/account"
                    className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-green-50 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <FiUser />
                    <span>My Account</span>
                  </Link>
                  <Link
                    to="/orders"
                    className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-green-50 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <BsFlower1 /> 
                    <span>My Orders</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-green-50 transition-colors"
                  >
                    <BsSun />
                    <span>Sign Out</span>
                  </button>
                </div>
              ) : (
                <div className="p-4 grid grid-cols-2 gap-3">
                  <Link
                    to="/login"
                    className="px-4 py-2 text-center text-green-700 border border-green-200 rounded-lg hover:bg-green-50 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="px-4 py-2 text-center bg-green-600 text-white rounded-lg shadow-sm hover:bg-green-700 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </Container>
      {/* Removed the <hr /> tag from here */}
    </header>
  );
};

export default Navbar;