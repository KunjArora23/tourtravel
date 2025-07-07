import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const CityTourDetailPage = () => {
  const { id } = useParams();
  const [city, setCity] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCityDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/v1/city/gettours/${id}`);
        setCity(res.data.city);
      } catch (error) {
        console.error("Failed to fetch city details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCityDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-gray-500 dark:text-gray-300">
        Loading city details...
      </div>
    );
  }

  if (!city) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-red-500">
        City not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* City Hero Image */}
      <section className="h-[400px] w-full">
        <img
          src={city.image}
          alt={city.title}
          className="w-full h-full object-cover"
        />
      </section>

      {/* City Info */}
      <section className="py-12 px-4 container mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Welcome to {city.title}
        </h1>
        <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-700 dark:text-gray-300">
          {city.description}
        </p>
      </section>

      {/* Tours Section */}
      <section className="py-10 px-4 container mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-10 text-center">
          Explore Top Tours in {city.title}
        </h2>

        {city.tours?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {city.tours.map((tour) => (
              <div
                key={tour._id}
                onClick={() => navigate(`/tour/${tour._id}`)}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 cursor-pointer overflow-hidden"
              >
                {tour.image && (
                  <img
                    src={tour.image}
                    alt={tour.title}
                    className="w-full h-48 object-cover"
                    onError={(e) =>
                      (e.target.src = "https://via.placeholder.com/600x400?text=Tour+Image")
                    }
                  />
                )}

                <div className="p-5">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                    {tour.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                    <strong>Duration:</strong> {tour.duration}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    <strong>Destinations:</strong> {tour.destinations.join(', ')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 dark:text-gray-300">
            No tours available for this city.
          </p>
        )}
      </section>
    </div>
  );
};

export default CityTourDetailPage;