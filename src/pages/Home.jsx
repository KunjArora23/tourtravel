import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, MapPin, Clock, Users, Award, Shield, Headphones } from 'lucide-react';
import axios from 'axios';
import Hero from '../components/Hero';
import TourCard from '../components/TourCard';
// import EnquiryForm from '../components/EnquiryForm';
import ReviewSlideshow from '../components/ReviewSlideshow';

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
    <div className="min-h-screen bg-background text-text">
      {/* Hero Section */}
      <Hero />

      {/* Stats Section */}
      <section className="py-16 bg-rolex-champagne text-rolex-green">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2 text-rolex-gold">
                {stats.customers.toLocaleString()}+
              </div>
              <div className="text-rolex-mutedChampagne">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2 text-rolex-gold">
                {stats.destinations}+
              </div>
              <div className="text-rolex-mutedChampagne">Destinations</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2 text-rolex-gold">
                {stats.years}+
              </div>
              <div className="text-rolex-mutedChampagne">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2 text-rolex-gold">
                {stats.tours}+
              </div>
              <div className="text-rolex-mutedChampagne">Tour Packages</div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Slideshow Section */}
      <section className="py-20 bg-background-dark text-text-dark">
        <ReviewSlideshow />
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-rolex-darkGreen text-rolex-champagne">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-rolex-gold mb-4">
              Why Choose Us
            </h2>
            <p className="text-xl text-rolex-mutedChampagne max-w-3xl mx-auto">
              We're committed to providing exceptional travel experiences with unmatched service quality
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="w-20 h-20 bg-rolex-gold/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-rolex-gold transition-colors duration-300">
                  <feature.icon className="w-10 h-10 text-rolex-gold group-hover:text-rolex-darkGreen transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-semibold text-rolex-gold mb-3">
                  {feature.title}
                </h3>
                <p className="text-rolex-champagne leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-rolex-gold via-rolex-champagne to-rolex-gold text-rolex-green">
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
              className="bg-rolex-green text-rolex-gold hover:bg-rolex-brassHover hover:text-white px-8 py-4 rounded-full font-semibold text-lg transition-colors duration-300 shadow-lg"
            >
              Plan My Trip
            </button>
            <Link
              to="/tours"
              className="bg-transparent border-2 border-rolex-green text-rolex-green hover:bg-rolex-green hover:text-rolex-gold px-8 py-4 rounded-full font-semibold text-lg transition-colors duration-300 shadow-lg"
            >
              Browse Tours
            </Link>
          </div>
        </div>
      </section>

      {/* Enquiry Form Modal */}
     
    </div>
  );
};

export default Home;