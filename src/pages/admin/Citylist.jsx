import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CityList = () => {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchCities = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:8000/api/v1/city/getAll");
      setCities(res.data?.data || res.data?.cities || []);
      setError(null);
    } catch (error) {
      console.error("Error fetching cities:", error);
      setError("Failed to load cities. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCities();
  }, []);

  const handleDelete = async (e, cityId) => {
    e.stopPropagation();
    if (!window.confirm("Are you sure you want to delete this city and all its tours?")) return;

    try {
      await axios.delete(`http://localhost:8000/api/v1/admin/delete-city/${cityId}`,{withCredentials: true});
      alert("City deleted successfully");
      fetchCities(); // Refresh city list
    } catch (error) {
      console.error("Error deleting city:", error);
      alert("Failed to delete city");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Cities</h2>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
          <p>{error}</p>
        </div>
      ) : cities.length === 0 ? (
        <div className="text-center py-12">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">No cities found</h3>
          <p className="mt-1 text-gray-500 dark:text-gray-400">Get started by adding a new city.</p>
        </div>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {cities.map((city) => (
            <div
              key={city._id}
              onClick={() => navigate(`/admin/city/${city._id}/tours`)}
              className="cursor-pointer relative bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              {/* Delete Button */}
              <button
                onClick={(e) => handleDelete(e, city._id)}
                className="absolute top-2 right-2 text-white bg-red-500 hover:bg-red-600 rounded-full px-2 py-1 text-xs shadow-sm z-10"
              >
                🗑️
              </button>

              <div className="h-48 w-full overflow-hidden">
                <img
                  src={city.image}
                  alt={city.title}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/300x200?text=City+Image";
                  }}
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1 line-clamp-1">
                  {city.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                  {city.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {city.tours?.length || 0} tours available
                  </span>
                  <button
                    className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/admin/addtour/${city._id}`);
                    }}
                  >
                    Add Tour
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CityList;