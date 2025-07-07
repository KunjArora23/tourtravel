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
      const res = await axios.get(`http://localhost:8000/api/v1/admin/get-tours/city/${cityId}`, {
        withCredentials: true,
      });
      setTours(res.data.tours || []);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch tours");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (tourId) => {
    if (!window.confirm("Are you sure you want to delete this tour?")) return;
    try {
      await axios.delete(`http://localhost:8000/api/v1/admin/delete-tour/${tourId}`, {
        withCredentials: true,
      });
      setTours((prev) => prev.filter((t) => t._id !== tourId));
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
        <p className="text-gray-600 dark:text-gray-300">Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : tours.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No tours found for this city.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {tours.map((tour) => (
            <div
              key={tour._id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer relative"
              onClick={() => navigate(`/admin/tour/${tour._id}`)}
            >
              {/* Image */}
              <div className="h-48 w-full overflow-hidden rounded-t-lg">
                <img
                  src={tour.image || "https://via.placeholder.com/400x300?text=Tour+Image"}
                  alt={tour.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/400x300?text=Tour+Image";
                  }}
                />
              </div>

              {/* Delete Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(tour._id);
                }}
                className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white px-2 py-1 text-xs rounded"
              >
                Delete
              </button>

              {/* Edit Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/admin/edit-tour/${tour._id}`);
                }}
                className="absolute bottom-2 right-2 bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 text-xs rounded"
              >
                Edit
              </button>

              {/* Tour Info */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                  {tour.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  <strong>Destination:</strong> {tour.destinations?.join(", ")}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  <strong>Duration:</strong> {tour.duration}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CityTours;