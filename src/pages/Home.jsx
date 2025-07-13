import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, MapPin, Clock, Users, Award, Shield, Headphones } from 'lucide-react';
import axios from 'axios';
import Hero from '../components/Hero';
import TourCard from '../components/TourCard';
import EnquiryForm from '../components/EnquiryForm';
import ReviewSlideshow from '../components/ReviewSlideshow';
import { mockPackages, packagesAPI } from '../utils/api';

const Home = () => {
  const [featuredTours, setFeaturedTours] = useState([]);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    customers: 0,
    destinations: 0,
    years: 0,
    tours: 0
  });

  useEffect(() => {
    const loadFeaturedTours = async () => {
      try {
        // Use the new featured tours endpoint that respects order
        const response = await axios.get('http://localhost:8000/api/v1/tour/featured');
        const tours = response.data.tours || [];
        setFeaturedTours(tours);
      } catch (error) {
        console.warn('Using fallback featured tours');
        setFeaturedTours(mockPackages.filter(pkg => pkg.featured).slice(0, 3));
      } finally {
        setLoading(false);
      }
    };

    loadFeaturedTours();

    // Animate stats counter
    const targetStats = { customers: 25000, destinations: 50, years: 25, tours: 2000 };
    const duration = 2000;
    const steps = 50;
    const increment = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;

      setStats({
        customers: Math.floor(targetStats.customers * progress),
        destinations: Math.floor(targetStats.destinations * progress),
        years: Math.floor(targetStats.years * progress),
        tours: Math.floor(targetStats.tours * progress)
      });

      if (step >= steps) {
        clearInterval(timer);
        setStats(targetStats);
      }
    }, increment);

    return () => clearInterval(timer);
  }, []);

  const testimonials = [
    {
      name: 'Sarah Johnson',
      location: 'United States',
      rating: 5,
      text: 'Absolutely incredible experience! The Golden Triangle tour exceeded all expectations. Every detail was perfectly planned.',
      image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      name: 'Michael Chen',
      location: 'Canada',
      rating: 5,
      text: 'Kerala backwaters tour was magical. The houseboat experience and local hospitality made it unforgettable.',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      name: 'Emma Thompson',
      location: 'United Kingdom',
      rating: 5,
      text: 'Professional service from start to finish. The Rajasthan desert safari was the highlight of our India trip.',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150'
    }
  ];

  const features = [
    {
      icon: Award,
      title: 'Award Winning',
      description: 'Recognized as the leading tour operator in India for 3 consecutive years'
    },
    {
      icon: Shield,
      title: 'Safe & Secure',
      description: 'Your safety is our priority with comprehensive insurance and 24/7 support'
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      description: 'Round-the-clock customer support to assist you throughout your journey'
    },
    {
      icon: Users,
      title: 'Expert Guides',
      description: 'Experienced local guides who bring destinations to life with their stories'
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <Hero />

      {/* Stats Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">
                {stats.customers.toLocaleString()}+
              </div>
              <div className="text-primary-100">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">
                {stats.destinations}+
              </div>
              <div className="text-primary-100">Destinations</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">
                {stats.years}+
              </div>
              <div className="text-primary-100">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">
                {stats.tours}+
              </div>
              <div className="text-primary-100">Tour Packages</div>
            </div>
          </div>
        </div>
      </section>

  




      {/* Reviews Slideshow Section */}
      <ReviewSlideshow />
      {/* Why Choose Us Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-white mb-4">
              Why Choose Us
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              We're committed to providing exceptional travel experiences with unmatched service quality
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="w-20 h-20 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary-600 transition-colors duration-300">
                  <feature.icon className="w-10 h-10 text-primary-600 dark:text-primary-400 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Ready for Your Next Adventure?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Let us create a personalized itinerary that matches your travel dreams.
            Contact our travel experts today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setIsEnquiryOpen(true)}
              className="bg-white text-primary-600 hover:bg-gray-100 px-8 py-4 rounded-full font-semibold text-lg transition-colors duration-300"
            >
              Plan My Trip
            </button>
            <Link
              to="/tours"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-600 px-8 py-4 rounded-full font-semibold text-lg transition-colors duration-300"
            >
              Browse Tours
            </Link>
          </div>
        </div>
      </section>

      {/* Enquiry Form Modal */}
      <EnquiryForm
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
      />
    </div>
  );
};

export default Home;