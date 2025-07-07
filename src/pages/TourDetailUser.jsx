import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const TourDetailUser = () => {
  const { id } = useParams();
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const { data } = await axios.get(`http://localhost:8000/api/v1/tour/${id}`, {
          withCredentials: true,
        });
        setTour(data.tour);
        toast.success("Tour fetched successfully");
      } catch (error) {
        console.error("Failed to fetch tour:", error);
        toast.error("Failed to load tour");
      } finally {
        setLoading(false);
      }
    };

    fetchTour();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-gray-500 dark:text-gray-300">
        Loading tour...
      </div>
    );
  }

  if (!tour) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-red-500">
        Tour not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pb-16">
      {/* Tour Image */}
      {tour.image && (
        <div className="w-full h-[400px]">
          <img
            src={tour.image}
            alt={tour.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/600x400?text=Tour+Image";
            }}
          />
        </div>
      )}

      {/* Tour Info */}
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {tour.title}
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-1">
          Duration: {tour.duration}
        </p>
        <p className="text-md text-gray-600 dark:text-gray-400">
          Destinations: {tour.destinations.join(', ')}
        </p>
      </div>

      {/* Itinerary Section */}
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          Tour Itinerary
        </h2>
        <div className="space-y-6 max-w-4xl mx-auto">
          {tour.itinerary?.map((item, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700"
            >
              <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-2">
                Day {item.day}: {item.title}
              </h3>
              <p className="text-gray-700 dark:text-gray-300">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TourDetailUser;