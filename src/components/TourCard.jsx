import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, MapPin, Star, Users, Calendar } from 'lucide-react';

const TourCard = ({ tour, featured = false }) => {
  return (
    <div className={`group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ${
      featured ? 'ring-2 ring-primary-200 dark:ring-primary-800' : ''
    }`}>
      {/* Image */}
      <div className="relative overflow-hidden h-64">
        <img
          src={tour.images[0]}
          alt={tour.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Price Badge */}
        <div className="absolute top-4 right-4 bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
          ${tour.price}
        </div>
        
        {/* Featured Badge */}
        {featured && (
          <div className="absolute top-4 left-4 bg-accent-600 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
            <Star className="w-3 h-3 fill-current" />
            <span>Featured</span>
          </div>
        )}
        
        {/* Location */}
        <div className="absolute bottom-4 left-4 text-white">
          <div className="flex items-center space-x-1 text-sm">
            <MapPin className="w-4 h-4" />
            <span>{tour.location}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="space-y-4">
          {/* Title */}
          <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200">
            {tour.title}
          </h3>

          {/* Description */}
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed line-clamp-2">
            {tour.description}
          </p>

          {/* Tour Details */}
          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{tour.duration} Days</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span>2-15 People</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>Daily</span>
            </div>
          </div>

          {/* Highlights */}
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Highlights:</h4>
            <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
              {tour.highlights.slice(0, 2).map((highlight, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-1.5 flex-shrink-0" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Actions */}
          <div className="flex space-x-3 pt-4">
            <Link
              to={`/tours/${tour._id}`}
              className="flex-1 bg-primary-600 hover:bg-primary-700 text-white text-center py-3 rounded-lg font-semibold transition-colors duration-200"
            >
              View Details
            </Link>
            <button className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
              <Users className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourCard;