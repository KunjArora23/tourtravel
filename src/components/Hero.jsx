import React, { useState, useEffect } from 'react';
import { ChevronRight, Search, Play } from 'lucide-react';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      image: 'https://images.pexels.com/photos/3881104/pexels-photo-3881104.jpeg?auto=compress&cs=tinysrgb&w=1600',
      title: 'Discover Incredible India',
      subtitle: 'Experience the magic of diverse cultures, ancient monuments, and breathtaking landscapes',
      cta: 'Explore Tours'
    },
    {
      image: 'https://images.pexels.com/photos/962464/pexels-photo-962464.jpeg?auto=compress&cs=tinysrgb&w=1600',
      title: 'Serene Backwaters of Kerala',
      subtitle: 'Float through palm-fringed canals and experience the tranquil beauty of God\'s Own Country',
      cta: 'View Kerala Tours'
    },
    {
      image: 'https://images.pexels.com/photos/3889929/pexels-photo-3889929.jpeg?auto=compress&cs=tinysrgb&w=1600',
      title: 'Royal Rajasthan Adventures',
      subtitle: 'Journey through magnificent palaces, desert safaris, and royal heritage',
      cta: 'Book Rajasthan'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative h-screen overflow-hidden ">
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
            <div className="absolute inset-0 bg-black/40" />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <div className="space-y-6 animate-fade-in">
              <h1 className="text-5xl md:text-7xl font-display font-bold text-white leading-tight">
                {slides[currentSlide].title}
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 max-w-2xl leading-relaxed">
                {slides[currentSlide].subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button className="group bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2">
                  <span>{slides[currentSlide].cta}</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
                {/* <button className="group bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 border border-white/30 flex items-center justify-center space-x-2">
                  <Play className="w-5 h-5" />
                  <span>Watch Video</span>
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
    

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-white w-8' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;