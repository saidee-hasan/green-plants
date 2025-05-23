import { useState } from 'react';
import { GrLogout } from 'react-icons/gr';
import { FiSettings, FiUser, FiGrid, FiMessageSquare, FiUsers, FiShoppingCart, FiPieChart, FiBriefcase, FiPackage, FiFileText } from 'react-icons/fi'; // Using Fi for consistency
import { AiOutlineBars } from 'react-icons/ai';
import { Link, NavLink } from 'react-router-dom';

import MenuItem from './Menu/MenuItem'; // We'll assume MenuItem is styled well or we'll give it guidance
import useAuth from '../../../hooks/useAuth';
import useRole from '../../../hooks/useRole';

import AdminMenu from './Menu/AdminMenu';
import SellerMenu from './Menu/SellerMenu';
import CustomerMenu from './Menu/CustomerMenu';
import logo from '../../../assets/images/logo-flat.png';
import placeholderAvatar from '../../../assets/images/placeholder.jpg'; // Add a placeholder avatar

const Sidebar = () => {
  const { user, logOut } = useAuth(); // Get user for avatar/name
  const [isActive, setActive] = useState(false);
  const [role, isLoading] = useRole();

  const handleToggle = () => {
    setActive(!isActive);
  };

  // Define base classes for NavLink in MenuItem if MenuItem doesn't handle it fully
  // This is illustrative; your MenuItem should ideally handle its active state via NavLink
  const navLinkBaseClass = "flex items-center py-2.5 px-4 my-1 transition-colors duration-200 transform rounded-lg focus:outline-none";
  const navLinkActive = "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-md hover:shadow-lg";
  const navLinkInactive = "text-gray-600 hover:bg-green-50 hover:text-green-700";


  // If your MenuItem component itself uses NavLink and handles active states,
  // you might not need the above classes here, but pass them to MenuItem or ensure MenuItem has similar styling.

  return (
    <>
      {/* Small Screen Navbar - Refined */}
      <div className='bg-white text-gray-800 flex justify-between items-center md:hidden shadow-sm sticky top-0 z-40 px-4 h-16'>
        <Link to='/' className='block'>
          <img
            src={logo}
            alt='GreenThumb Logo'
            className="h-9 w-auto" 
          />
        </Link>

        <button
          onClick={handleToggle}
          className='p-2 focus:outline-none focus:ring-2 focus:ring-green-500 rounded-md'
        >
          <AiOutlineBars className='h-6 w-6 text-green-600' />
        </button>
      </div>

      {/* Sidebar - Premium Design */}
      <div
        className={`z-30 md:fixed flex flex-col justify-between overflow-x-hidden bg-slate-50 w-72 space-y-6 px-4 py-6 absolute inset-y-0 left-0 transform border-r border-slate-200 
        ${isActive ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}
         md:translate-x-0 transition-transform duration-300 ease-in-out md:shadow-none`}
      >
        {/* Top Section: Logo and Branding */}
        <div className="flex-grow flex flex-col">
          <div className='hidden md:flex flex-col items-start mb-8 px-2'>
            <Link to='/' className="flex items-center gap-3 group">
              <img
                src={logo}
                alt='GreenThumb Logo'
                className="h-12 w-auto transition-transform duration-300 group-hover:rotate-[5deg] group-hover:scale-105"
              />
           
            </Link>
          </div>

          {/* Nav Items - With Loading State and Scroll */}
          <div className='flex-1'>
            {isLoading ? (
              <div className="px-2 space-y-3 mt-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-11 bg-slate-200 rounded-lg animate-pulse"></div>
                ))}
              </div>
            ) : (
              <nav className="space-y-1 overflow-y-auto max-h-[calc(100vh-280px)] custom-scrollbar pr-1"> 
                {/* Adjust max-h & 280px based on logo and footer height */}
                {role === 'customer' && <CustomerMenu navLinkBaseClass={navLinkBaseClass} navLinkActive={navLinkActive} navLinkInactive={navLinkInactive} />}
                {role === 'seller' && <SellerMenu navLinkBaseClass={navLinkBaseClass} navLinkActive={navLinkActive} navLinkInactive={navLinkInactive} />}
                {role === 'admin' && <AdminMenu navLinkBaseClass={navLinkBaseClass} navLinkActive={navLinkActive} navLinkInactive={navLinkInactive} />}
              </nav>
            )}
          </div>
        </div>

        {/* Bottom Section: User Profile & Logout */}
        <div className="pt-4 border-t border-slate-200">
            {user && (
                <Link 
                    to="/dashboard/profile"
                    className="flex items-center p-3 mb-3 rounded-lg hover:bg-slate-200/70 transition-colors duration-200"
                >
                    <img 
                        src={user.photoURL || placeholderAvatar} 
                        alt={user.displayName || "User"}
                        className="w-10 h-10 rounded-full object-cover border-2 border-green-200 shadow-sm"
                    />
                    <div className="ml-3">
                        <p className="text-sm font-semibold text-slate-700">{user.displayName || "User Profile"}</p>
                        <p className="text-xs text-slate-500">{user.email || "View Profile"}</p>
                    </div>
                </Link>
            )}
          
          {/* General Settings Link (if not part of role-specific menus) */}
          {/* You might want to move this into role-specific menus or handle its display conditionally */}
          {!user && ( // Show generic profile link if user not loaded yet, or remove if handled by user block
             <MenuItem
                icon={FiUser} // Changed to FiUser
                label='Profile'
                address='/dashboard/profile'
                // Pass styling props if MenuItem needs them
             />
          )}

          <button
            onClick={logOut}
            className={`${navLinkBaseClass} ${navLinkInactive} w-full text-red-500 hover:bg-red-500/10 hover:text-red-600 group`}
          >
            <GrLogout className='w-5 h-5 group-hover:scale-110 transition-transform' />
            <span className='mx-4 font-medium'>Logout</span>
          </button>
        </div>
      </div>
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1; // slate-300
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8; // slate-500
        }
      `}</style>
    </>
  );
};

export default Sidebar;