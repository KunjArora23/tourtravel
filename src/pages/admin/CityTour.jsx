import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const CityTours = () => {
  const { cityId } = useParams();
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchTours = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/v1/admin/get-tours/city/${cityId}`,{
        withCredentials: true // Include credentials for session management
      });
      setTours(res.data.tours || []);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to load tours");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (tourId) => {
    if (!window.confirm("Are you sure you want to delete this tour?")) return;
    try {
      await axios.delete(`http://localhost:8000/api/v1/admin/delete-tour/${tourId}`,{
        withCredentials: true
      });
      setTours((prev) => prev.filter((t) => t._id !== tourId)); // Remove from UI
    } catch (err) {
      console.error("Delete failed", err);
      alert("Failed to delete tour");
    }
  };

  useEffect(() => {
    fetchTours();
  }, [cityId]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Tours in City</h2>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : tours.length === 0 ? (
        <p>No tours found for this city.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {tours.map((tour) => (
            <div
              key={tour._id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 hover:shadow-lg transition cursor-pointer relative"
              onClick={() => navigate(`/admin/tour/${tour._id}`)}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation(); // prevent card click
                  handleDelete(tour._id);
                }}
                className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white px-2 py-1 text-xs rounded"
              >
                Delete
              </button>

              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                {tour.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                <strong>Destination:</strong> {tour.destination}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                <strong>Duration:</strong> {tour.duration}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CityTours;