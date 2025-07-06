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
    return <p className="text-center text-gray-600 py-10 text-lg">Loading...</p>;

  if (!tour)
    return <p className="text-center text-red-600 py-10 text-lg">Tour not found</p>;

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 bg-white shadow-lg rounded-xl">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">{tour.title}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700 text-sm">
        <div className="space-y-2">
          <p><span className="font-semibold">Duration:</span> {tour.duration}</p>
          <p><span className="font-semibold">Destinations:</span> {tour.destinations.join(", ")}</p>
          <p><span className="font-semibold">City ID:</span> {tour.city}</p>
        </div>

        <div className="space-y-2">
          <p><span className="font-semibold">Created:</span> {new Date(tour.createdAt).toLocaleString()}</p>
          <p><span className="font-semibold">Updated:</span> {new Date(tour.updatedAt).toLocaleString()}</p>
        </div>
      </div>

      <hr className="my-6 border-gray-200" />

      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Itinerary</h2>
        {tour.itinerary?.length > 0 ? (
          <ul className="space-y-4">
            {tour.itinerary.map((item, index) => (
              <li
                key={index}
                className="border border-gray-200 rounded-lg p-4 bg-gray-50 shadow-sm"
              >
                <p className="text-blue-600 font-semibold mb-1">
                  Day {item.day}: {item.title}
                </p>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No itinerary added yet.</p>
        )}
      </div>
    </div>
  );
};

export default TourDetail;