import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa'; // Font Awesome icon

const Pagenotfound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-6 text-center">
      <h1 className="text-7xl font-extrabold text-blue-600 drop-shadow-md mb-4">
        404
      </h1>
      <p className="text-2xl font-semibold text-gray-800 mb-2">
        Oops! Page not found.
      </p>
      <p className="text-lg text-gray-600 mb-6">
        The page you’re looking for doesn’t exist or has been moved.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-xl shadow-md hover:bg-blue-700 transition duration-300"
      >
        <FaArrowLeft className="text-white text-lg" />
        Back to Home
      </Link>
    </div>
  );
};

export default Pagenotfound;
