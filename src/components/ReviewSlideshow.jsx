import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import axios from 'axios';

const ReviewSlideshow = () => {
  const [reviews, setReviews] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [slideDirection, setSlideDirection] = useState('next');
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const slideshowRef = useRef(null);

  useEffect(() => {
    fetchReviews();
  }, []);

  useEffect(() => {
    if (reviews.length > 1) {
      const interval = setInterval(() => {
        setSlideDirection('next');
        setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
      }, 4000); // Change slide every 4 seconds

      return () => clearInterval(interval);
    }
  }, [reviews.length]);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8000/api/v1/review/active');
      console.log('Reviews API Response:', response.data);
      setReviews(response.data.reviews || []);
      console.log('Reviews state set:', response.data.reviews?.length || 0, 'reviews');
    } catch (error) {
      console.error('Error fetching reviews:', error);
      // Fallback to mock data if API fails
      setReviews([
        {
          _id: '1',
          customerName: 'Sarah Johnson',
          rating: 5,
          review: 'Absolutely incredible experience! The Golden Triangle tour exceeded all expectations. Every detail was perfectly planned.',
          image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150'
        },
        {
          _id: '2',
          customerName: 'Michael Chen',
          rating: 5,
          review: 'Kerala backwaters tour was magical. The houseboat experience and local hospitality made it unforgettable.',
          image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150'
        },
        {
          _id: '3',
          customerName: 'Emma Thompson',
          rating: 5,
          review: 'Professional service from start to finish. The Rajasthan desert safari was the highlight of our India trip.',
          image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Touch handlers for swipe
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    }
    if (isRightSwipe) {
      prevSlide();
    }
  };

  const nextSlide = () => {
    setSlideDirection('next');
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  };

  const prevSlide = () => {
    setSlideDirection('prev');
    setCurrentIndex((prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length);
  };

  const goToSlide = (index) => {
    setSlideDirection(index > currentIndex ? 'next' : 'prev');
    setCurrentIndex(index);
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  if (loading) {
    return (
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-white mb-4">
              What Our Travelers Say
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Real experiences from real travelers who have explored India with us
            </p>
          </div>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </section>
    );
  }

  console.log('Current reviews state:', reviews);
  console.log('Current index:', currentIndex);
  
  if (reviews.length === 0) {
    console.log('No reviews found, showing fallback');
    return (
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-white mb-4">
              What Our Travelers Say
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Real experiences from real travelers who have explored India with us
            </p>
          </div>
          <div className="text-center">
            <p className="text-gray-500">Loading reviews...</p>
          </div>
        </div>
      </section>
    );
  }

  const currentReview = reviews[currentIndex];
  console.log('Current review:', currentReview);

  return (
    <section className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 opacity-50"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-white mb-4">
            What Our Travelers Say
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Real experiences from real travelers who have explored India with us
          </p>
          <div className="mt-4 text-sm text-gray-500">
            Debug: {reviews.length} reviews loaded, Current Index: {currentIndex}
          </div>
        </div>

        <div 
          ref={slideshowRef}
          className="relative max-w-4xl mx-auto"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* Main Review Card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden">
            <div className="relative h-80 overflow-hidden">
              <img
                src={currentReview?.image}
                alt={`Journey by ${currentReview?.customerName}`}
                className="w-full h-full object-cover transition-transform duration-700 ease-in-out hover:scale-110"
                onError={(e) => {
                  e.target.src = 'https://images.pexels.com/photos/3881104/pexels-photo-3881104.jpeg?auto=compress&cs=tinysrgb&w=800';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>
            <div className="p-8">
              <div className="flex items-center space-x-1 mb-4">
                {renderStars(currentReview?.rating || 5)}
              </div>
              <blockquote className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-6 italic">
                "{currentReview?.review || 'Amazing experience!'}"
              </blockquote>
              <div className="font-semibold text-lg text-gray-900 dark:text-white">
                {currentReview?.customerName || 'Customer'}
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          {reviews.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-14 h-14 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full shadow-xl flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 z-20"
              >
                <ChevronLeft className="w-7 h-7" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-14 h-14 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full shadow-xl flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 z-20"
              >
                <ChevronRight className="w-7 h-7" />
              </button>
            </>
          )}
        </div>

        {/* Dots Indicator */}
        {reviews.length > 1 && (
          <div className="flex justify-center mt-8 space-x-3">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-4 h-4 rounded-full transition-all duration-300 ease-in-out ${
                  index === currentIndex
                    ? 'bg-blue-600 scale-150 shadow-lg'
                    : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 hover:scale-110'
                }`}
              />
            ))}
          </div>
        )}

        {/* Review Counter */}
        <div className="text-center mt-6 text-sm text-gray-500">
          Review {currentIndex + 1} of {reviews.length}
        </div>
      </div>
    </section>
  );
};

export default ReviewSlideshow; 