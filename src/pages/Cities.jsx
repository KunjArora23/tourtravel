import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CityTourCard from './cityTourCard';
import { set } from 'mongoose';
import { toast } from 'react-toastify';

const Cities = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get('http://localhost:8000/api/v1/city/getAll'); // Update API endpoint if needed
        setTours(data.data);
        console.log('Fetched tours:', data);
        // toast.success('Tours fetched successfully');
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch tours:', error);
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-bold font-display mb-4">
            Explore Our Tours
          </h1>
          <p className="text-lg md:text-xl opacity-90">
            Discover incredible destinations across India with our expertly crafted tour packages.
          </p>
        </div>
      </section>

      {/* Tour List Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          {loading ? (
            <p className="text-center text-gray-600 dark:text-gray-300 text-xl">Loading tours...</p>
          ) : tours.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tours.map((tour) => (
                <CityTourCard key={tour._id} tour={tour} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600 dark:text-gray-300 text-xl">No tours available</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Cities;