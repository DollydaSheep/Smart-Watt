"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidemenu() {
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();
  
  // Handle mobile/desktop view
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkIfMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);
  
  // Helper function to determine if a link is active
  const isActive = (path) => {
    return pathname === path || (path !== '/' && pathname.startsWith(path));
  };

  // Navigation items
  const navItems = [
    { 
      path: '/', 
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        />
      ),
      label: 'Home'
    },
    { 
      path: '/devices', 
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      ),
      label: 'Devices'
    },
    { 
      path: '/insights', 
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
        />
      ),
      label: 'Insights'
    },
    { 
      path: '/menu', 
      icon: (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 6h16M4 12h16M4 18h16"
        />
      ),
      label: 'Menu'
    }
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex flex-col w-16 h-screen bg-black/90 backdrop-blur-sm fixed left-0 top-0 z-40">
        {/* Logo */}
        <div className="flex justify-center py-4 pt-7">
          <img 
            src="/SVG/EmblemWhite.svg"  
            alt="SWEmblem" 
            className="h-10 w-10 filter brightness-0 invert"
          />
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 flex flex-col items-center py-4 space-y-6">
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={item.path}
              className={`group relative flex items-center justify-center w-full py-2 ${
                isActive(item.path) 
                  ? 'text-blue-400' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                {item.icon}
              </svg>
              <span className="absolute left-full ml-2 whitespace-nowrap bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                {item.label}
              </span>
            </Link>
          ))}
        </nav>
        
        {/* Logout */}
        <div className="py-4 border-t border-gray-800">
          <button className="w-full flex justify-center text-gray-400 hover:text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-t border-gray-800 pb-safe">
        <div className="flex justify-around px-2 pt-2 pb-4">
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={item.path}
              className={`flex flex-col items-center justify-center py-2 px-3 w-full ${
                isActive(item.path) 
                  ? 'text-blue-400' 
                  : 'text-gray-400'
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={isActive(item.path) ? 2 : 1.5}
              >
                {item.icon}
              </svg>
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
