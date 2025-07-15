import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock } from 'lucide-react';

const TourCard = ({ tour }) => {
  return (
    <div className="group bg-white rounded-3xl shadow-xl overflow-hidden border border-rolex-gold/30 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.03] cursor-pointer relative">
      {/* Image */}
      <div className="relative h-56 md:h-64 w-full overflow-hidden">
        <img
          src={tour.image}
          alt={tour.title}
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
          draggable={false}
        />
        {/* Price Badge */}
        {tour.price && (
          <div className="absolute top-4 right-4 bg-rolex-gold text-rolex-green px-4 py-2 rounded-full font-bold text-lg shadow-lg animate-fade-in border-2 border-rolex-gold">
            ₹{tour.price}
          </div>
        )}
      </div>
      {/* Content */}
      <div className="p-6 flex flex-col gap-2">
        <h3 className="text-2xl font-extrabold font-display text-rolex-green mb-1 line-clamp-2">
          {tour.title}
        </h3>
        <div className="flex items-center gap-2 text-rolex-gold mb-2">
          <MapPin className="w-5 h-5" />
          <span className="font-semibold text-base">{tour.city?.name || 'India'}</span>
        </div>
        <div className="flex items-center gap-2 text-rolex-mutedChampagne mb-2">
          <Clock className="w-5 h-5" />
          <span className="text-base">{tour.duration}</span>
        </div>
        <p className="text-rolex-charcoal mb-4 line-clamp-2">
          {tour.description || (tour.itinerary && tour.itinerary[0]?.description) || ''}
        </p>
        <Link
          to={`/tour/${tour._id}`}
          className="mt-auto inline-block px-6 py-3 rounded-full bg-rolex-gold text-rolex-green font-bold shadow hover:bg-rolex-brassHover hover:text-white hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-rolex-gold border-2 border-rolex-gold"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default TourCard;