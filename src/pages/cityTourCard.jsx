// components/CityTourCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const CityTourCard = ({ tour }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/citytour/${tour._id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      <img
        src={tour.image || '/default-tour.jpg'}
        alt={tour.title}
        className="h-52 w-full object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          {tour.title}
        </h3>
        <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">
          {tour.description?.slice(0, 120)}...
        </p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">
            {tour.tours?.length || 0} tours available
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            Click to explore
          </span>
        </div>
      </div>
    </div>
  );
};

export default CityTourCard;