import React, { useState, useEffect } from 'react';
import { ChevronRight, Search, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [featuredTours, setFeaturedTours] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Fallback slides if no featured tours
  const fallbackSlides = [
    {
      image: 'https://images.pexels.com/photos/3881104/pexels-photo-3881104.jpeg?auto=compress&cs=tinysrgb&w=1600',
      title: 'Discover Incredible India',
      subtitle: 'Experience the magic of diverse cultures, ancient monuments, and breathtaking landscapes',
      cta: 'Explore Tours',
      link: '/tours'
    },
    {
      image: 'https://images.pexels.com/photos/962464/pexels-photo-962464.jpeg?auto=compress&cs=tinysrgb&w=1600',
      title: 'Serene Backwaters of Kerala',
      subtitle: 'Float through palm-fringed canals and experience the tranquil beauty of God\'s Own Country',
      cta: 'View Kerala Tours',
      link: '/tours'
    },
    {
      image: 'https://images.pexels.com/photos/3889929/pexels-photo-3889929.jpeg?auto=compress&cs=tinysrgb&w=1600',
      title: 'Royal Rajasthan Adventures',
      subtitle: 'Journey through magnificent palaces, desert safaris, and royal heritage',
      cta: 'Book Rajasthan',
      link: '/tours'
    }
  ];

  useEffect(() => {
    fetchFeaturedTours();
  }, []);

  const fetchFeaturedTours = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8000/api/v1/tour/featured');
      if (response.data.success && response.data.tours.length > 0) {
        setFeaturedTours(response.data.tours);
      }
    } catch (error) {
      console.error('Error fetching featured tours:', error);
    } finally {
      setLoading(false);
    }
  };

  // Use featured tours if available, otherwise use fallback slides
  const slides = featuredTours.length > 0 
    ? featuredTours.map(tour => ({
        image: tour.image || 'https://images.pexels.com/photos/3881104/pexels-photo-3881104.jpeg?auto=compress&cs=tinysrgb&w=1600',
        title: tour.title,
        subtitle: `Experience ${tour.duration} of amazing adventures in ${tour.city?.name || 'India'}`,
        cta: 'See Package',
        link: `/tour/${tour._id}`,
        isTour: true
      }))
    : fallbackSlides;

  useEffect(() => {
    if (slides.length > 1) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [slides.length]);

  if (loading) {
    return (
      <section className="relative h-screen overflow-hidden bg-background-dark">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-rolex-gold"></div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Slideshow */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div
              className="w-full h-full bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${slide.image})` }}
            />
            {/* No overlay, keep image clear */}
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <div className="space-y-6 animate-fade-in bg-black/30 p-8 rounded-2xl shadow-xl">
              <h1 className="text-5xl md:text-7xl font-display font-bold text-rolex-gold leading-tight drop-shadow-lg">
                {slides[currentSlide].title}
              </h1>
              <p className="text-xl md:text-2xl text-rolex-champagne max-w-2xl leading-relaxed">
                {slides[currentSlide].subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  to={slides[currentSlide].link}
                  className="group bg-rolex-gold hover:bg-rolex-brassHover text-rolex-green px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 shadow-lg border-2 border-rolex-gold"
                >
                  <span>{slides[currentSlide].cta}</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      {slides.length > 1 && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 border border-rolex-gold ${
                index === currentSlide 
                  ? 'bg-rolex-gold w-8' 
                  : 'bg-rolex-gold/50 hover:bg-rolex-gold/75'
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default Hero;