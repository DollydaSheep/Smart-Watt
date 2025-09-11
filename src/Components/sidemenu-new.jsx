"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Sidemenu() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  
  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);
  
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };
  
  const isActive = (path) => {
    return pathname === path || (path !== '/' && pathname.startsWith(path));
  };

  return (
    <div className="flex ">
      {/* Mobile menu button */}
      <button 
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="fixed top-4 left-4 z-50 p-2 rounded-md text-gray-400 hover:text-white focus:outline-none md:hidden"
        aria-label="Toggle menu"
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          {isMobileMenuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          )}
        </svg>
      </button>
      
      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-40 transform transition-all duration-300 ease-in-out ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0 md:relative`}>
        <div className={`flex h-screen flex-col justify-between bg-black ${isCollapsed ? 'w-16' : 'w-64'}`}>
          <div>
            <div className="flex flex-col items-center pt-8 pb-4 border-b border-gray-800">
              <div className="relative w-10 h-10 mb-2">
                <Image
                  src="/SVG/SWEmblem.svg"
                  alt="SmartWatt"
                  fill
                  className="object-contain"
                />
              </div>
              {!isCollapsed && (
                <span className="text-xl font-bold text-white mt-2">SmartWatt</span>
              )}
            </div>
            
            <div className="flex-1 overflow-y-auto py-4">
              <nav className="space-y-1 px-2">
                <Link
                  href="/"
                  className={`group relative flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                    isActive('/') ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <svg
                    className="h-5 w-5 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                  {!isCollapsed && <span className="ml-3">Dashboard</span>}
                  {isCollapsed && (
                    <span className="absolute left-full ml-4 whitespace-nowrap rounded bg-gray-900 px-2 py-1 text-sm text-white opacity-0 group-hover:opacity-100">
                      Dashboard
                    </span>
                  )}
                </Link>

                <Link
                  href="/Statistics"
                  className={`group relative flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                    isActive('/Statistics') ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <svg
                    className="h-5 w-5 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                  {!isCollapsed && <span className="ml-3">Statistics</span>}
                  {isCollapsed && (
                    <span className="absolute left-full ml-4 whitespace-nowrap rounded bg-gray-900 px-2 py-1 text-sm text-white opacity-0 group-hover:opacity-100">
                      Statistics
                    </span>
                  )}
                </Link>

                <Link
                  href="#"
                  className="group relative flex items-center px-3 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-800 hover:text-white"
                >
                  <svg
                    className="h-5 w-5 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    />
                  </svg>
                  {!isCollapsed && <span className="ml-3">Billing</span>}
                  {isCollapsed && (
                    <span className="absolute left-full ml-4 whitespace-nowrap rounded bg-gray-900 px-2 py-1 text-sm text-white opacity-0 group-hover:opacity-100">
                      Billing
                    </span>
                  )}
                </Link>

                <Link
                  href="#"
                  className="group relative flex items-center px-3 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-800 hover:text-white"
                >
                  <svg
                    className="h-5 w-5 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  {!isCollapsed && <span className="ml-3">Settings</span>}
                  {isCollapsed && (
                    <span className="absolute left-full ml-4 whitespace-nowrap rounded bg-gray-900 px-2 py-1 text-sm text-white opacity-0 group-hover:opacity-100">
                      Settings
                    </span>
                  )}
                </Link>
              </nav>
            </div>
          </div>

          {/* User profile */}
          <div className="border-t border-gray-800 p-4">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center text-white">
                <span className="text-xs font-medium">U</span>
              </div>
              {!isCollapsed && (
                <div className="ml-3">
                  <p className="text-sm font-medium text-white">User</p>
                  <p className="text-xs text-gray-400">user@example.com</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Toggle button for desktop */}
      <button 
        onClick={toggleCollapse}
        className="hidden md:flex items-center justify-center fixed bottom-4 left-4 z-50 h-10 w-10 rounded-full bg-gray-800 text-gray-400 hover:text-white focus:outline-none"
        aria-label={isCollapsed ? "Expand menu" : "Collapse menu"}
      >
        <svg 
          className={`h-5 w-5 transform transition-transform duration-200 ${isCollapsed ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
    </div>
  );
}
