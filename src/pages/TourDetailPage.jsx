// pages/TourDetailPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const TourDetailPage = () => {
  const { id } = useParams();
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const { data } = await axios.get(`http://localhost:8000/api/v1/tour/${id}`);
        setTour(data.tour);
      } catch (error) {
        console.error("Failed to fetch tour:", error);
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
    <div className="min-h-screen bg-white dark:bg-gray-900 py-16 px-4 container mx-auto">
      {/* Tour Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {tour.title}
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-2">
          Duration: {tour.duration}
        </p>
        <p className="text-md text-gray-600 dark:text-gray-400">
          Destinations Covered: {tour.destinations.join(', ')}
        </p>
      </div>

      {/* Itinerary Section */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
          Tour Itinerary
        </h2>
        <div className="space-y-6">
          {tour.itinerary?.map((item, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700"
            >
              <h3 className="text-xl font-semibold text-primary-600 dark:text-primary-400 mb-2">
                {item.day}: {item.title}
              </h3>
              <p className="text-gray-700 dark:text-gray-300">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TourDetailPage;