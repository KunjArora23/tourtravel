import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const TourDetail = () => {
  const { id } = useParams();
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/v1/tour/${id}`);
        setTour(res.data.tour || null);
      } catch (err) {
        console.error("Error fetching tour:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTour();
  }, [id]);

  if (loading)
    return <p className="text-center text-gray-600 dark:text-gray-300 py-10 text-lg">Loading...</p>;

  if (!tour)
    return <p className="text-center text-red-600 dark:text-red-400 py-10 text-lg">Tour not found</p>;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-white dark:bg-gray-900 rounded-xl shadow-lg transition-colors duration-300">
      {/* Tour Image */}
      {tour.image && (
        <div className="mb-8 rounded-xl overflow-hidden shadow-md">
          <img
            src={tour.image}
            alt={tour.title}
            className="w-full h-72 object-cover rounded-xl"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/600x400?text=Tour+Image";
            }}
          />
        </div>
      )}

      {/* Title */}
      <h1 className="text-4xl font-bold text-blue-700 dark:text-blue-400 mb-6 text-center">
        {tour.title}
      </h1>

      {/* Overview Grid */}
      <div className="grid md:grid-cols-2 gap-8 mb-10 text-gray-800 dark:text-gray-200 text-sm">
        <div className="space-y-3">
          <p><span className="font-medium">⏱ Duration:</span> {tour.duration}</p>
          <p><span className="font-medium">📍 Destinations:</span> {tour.destinations.join(", ")}</p>
         
        </div>

        <div className="space-y-3">
          <p><span className="font-medium">📅 Created:</span> {new Date(tour.createdAt).toLocaleString()}</p>
          <p><span className="font-medium">🕒 Updated:</span> {new Date(tour.updatedAt).toLocaleString()}</p>
        </div>
      </div>

      <hr className="border-gray-300 dark:border-gray-700 mb-8" />

      {/* Itinerary */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">📌 Itinerary</h2>
        {tour.itinerary?.length > 0 ? (
          <ul className="space-y-5">
            {tour.itinerary.map((item, index) => (
              <li
                key={index}
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-800 shadow-sm"
              >
                <p className="text-blue-600 dark:text-blue-400 font-semibold mb-1">
                  Day {item.day}: {item.title}
                </p>
                <p className="text-gray-700 dark:text-gray-300 text-sm">{item.description}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 dark:text-gray-400">No itinerary added yet.</p>
        )}
      </div>
    </div>
  );
};

export default TourDetail;