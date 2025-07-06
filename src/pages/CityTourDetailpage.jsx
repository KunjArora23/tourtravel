import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const CityTourDetailPage = () => {
  const { id } = useParams();
  const [city, setCity] = useState(null);
  const [loading, setLoading] = useState(true);


  // Inside component
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
      {/* City Details Header */}
      <section className="relative h-[400px] w-full">
        <img
          src={city.image}
          alt={city.title}
          className="w-full h-full object-cover brightness-75"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to {city.title}</h1>
          <p className="max-w-3xl text-lg">{city.description}</p>
        </div>
      </section>

      {/* Tours Section */}
      <section className="py-16 px-4 container mx-auto">
        <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-10 text-center">
          Tours Available in {city.title}
        </h2>

        {city.tours?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {city.tours.map((tour) => (
              <div
                key={tour._id}
                onClick={() => navigate(`/tour/${tour._id}`)}
                className="cursor-pointer bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
              >
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {tour.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  Duration: {tour.duration}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Destinations: {tour.destinations.join(', ')}
                </p>
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