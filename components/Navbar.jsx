"use client";

import Link from "next/link";
import { Github, Linkedin, ShoppingCart, CircleUserRound, Menu as MenuIcon, LogIn, LogOut, User } from 'lucide-react';
import { useSession, signOut, SessionProvider } from 'next-auth/react'; 
import { useState } from "react";

function Navbar() {
  const { data: session, status } = useSession();
  const isLoading = status === 'loading';
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); 

  const toggleDropdown = () => {
    setIsDropdownOpen(prev => !prev);
  };
  
  const handleSignOut = () => {
      signOut();
      setIsDropdownOpen(false); 
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        

        <Link href="/" className="text-2xl font-extrabold text-gray-900 flex items-center group">
          <span className="text-orange-600">My</span>Restaurant
          <span className="text-orange-600 ml-1 transition duration-300 group-hover:scale-110">🍽️</span>
        </Link>

        <div className="hidden md:flex items-center space-x-6">
          <Link 
            href="/menu" 
            className="text-gray-600 font-medium hover:text-orange-600 transition duration-150"
          >
            Menu
          </Link>
          <Link 
            href="/orders" 
            className="text-gray-600 font-medium hover:text-orange-600 transition duration-150"
          >
            My Orders
          </Link>
          
          <Link 
            href="/cart" 
            className="p-2 rounded-full bg-orange-50 text-orange-600 hover:bg-orange-100 transition duration-150 relative"
          >
            <ShoppingCart className="w-5 h-5" />
          </Link>
          
          {isLoading ? (
            <div className="w-24 h-10 bg-gray-100 rounded-lg animate-pulse"></div> 
          ) : session ? (
            <div className="relative">
                <button
                    onClick={toggleDropdown}
                    className="flex items-center p-2 rounded-full bg-orange-600 text-white hover:bg-orange-700 transition duration-150 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    title={`Welcome, ${session.user.name || session.user.email}`}
                >
                    <CircleUserRound className="w-6 h-6" />
                </button>

                {isDropdownOpen && (
                    <div className="absolute right-0 mt-3 w-48 bg-white rounded-lg shadow-xl ring-1 ring-black ring-opacity-5 z-20">
                        <div className="py-1">
                            <p className="px-4 py-2 text-xs text-gray-500 truncate border-b border-gray-100 mb-1">
                                Signed in as:<br/> **{session.user.email}**
                            </p>

                            <button
                                onClick={handleSignOut} 
                                className="w-full text-left flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 border-t border-gray-100 mt-1"
                            >
                                <LogOut className="w-4 h-4 mr-2" />
                                Logout
                            </button>
                        </div>
                    </div>
                )}
            </div>
          ) : (

            <Link 
              href="/login" 
              className="flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition duration-150 shadow-md"
            >
              <LogIn className="w-4 h-4 mr-2" />
              Login / Signup
            </Link>
          )}

        </div>

        <button className="md:hidden p-2 text-gray-600 hover:text-orange-600">
            <MenuIcon className="w-6 h-6" />
        </button>
      </div>
    </nav>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-800 antialiased min-h-screen flex flex-col">
        {/* Wrap content inside SessionProvider */}
        <SessionProvider>
            
            <Navbar /> 

            <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
                {children}
            </main>
            
        </SessionProvider>
      </body>
    </html>
  );
}