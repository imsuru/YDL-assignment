import React, { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-red-700 text-white py-2 px-8 flex justify-between items-center relative">
      {/* Logo Section */}
      <div className="flex items-center">
        <img
          src="./images/logo.jpg"
          alt="Logo"
          className="h-12 w-12 rounded-full object-cover"
        />
        <span className="ml-4 text-lg font-bold">Tomato</span>
      </div>

      {/* Burger Menu for Mobile */}
      <button
        className="sm:hidden flex flex-col justify-center items-center gap-1"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <span className="w-6 h-1 bg-white"></span>
        <span className="w-6 h-1 bg-white"></span>
        <span className="w-6 h-1 bg-white"></span>
      </button>

      {/* Navigation Menu */}
      <nav
        className={`${
          isMenuOpen ? "flex" : "hidden"
        } sm:flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 absolute sm:static top-full left-0 w-full sm:w-auto bg-red-700 sm:bg-transparent items-center sm:items-baseline justify-center sm:justify-start py-4 sm:py-0`}
      >
        <a
          href="#home"
          className="block sm:inline-block text-white hover:underline"
        >
          Home
        </a>
        <a
          href="#about"
          className="block sm:inline-block text-white hover:underline"
        >
          About
        </a>
        <a
          href="#contact"
          className="block sm:inline-block text-white hover:underline"
        >
          Contact Us
        </a>
      </nav>
    </header>
  );
};

export default Header;
