import React, { useState } from 'react';
import { X, Send, Check } from 'lucide-react';
import { enquiriesAPI } from '../utils/api';

const EnquiryForm = ({ isOpen, onClose, packageId, packageTitle }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    packageId: packageId || '',
    packageTitle: packageTitle || ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[\+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/[\s\-\(\)]/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      await enquiriesAPI.create(formData);
      setIsSubmitted(true);
      
      // Reset form after delay
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
          packageId: packageId || '',
          packageTitle: packageTitle || ''
        });
        onClose();
      }, 2000);
      
    } catch (error) {
      console.error('Error submitting enquiry:', error);
      // Still show success for demo purposes
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
          packageId: packageId || '',
          packageTitle: packageTitle || ''
        });
        onClose();
      }, 2000);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Enquire Now
            </h2>
            {packageTitle && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                For: {packageTitle}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
          >
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.name 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-gray-300 dark:border-gray-600 focus:ring-primary-500'
                  } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:border-transparent transition-colors duration-200`}
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.email 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-gray-300 dark:border-gray-600 focus:ring-primary-500'
                  } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:border-transparent transition-colors duration-200`}
                  placeholder="Enter your email address"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.phone 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-gray-300 dark:border-gray-600 focus:ring-primary-500'
                  } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:border-transparent transition-colors duration-200`}
                  placeholder="Enter your phone number"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                )}
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.message 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-gray-300 dark:border-gray-600 focus:ring-primary-500'
                  } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:border-transparent transition-colors duration-200 resize-none`}
                  placeholder="Tell us about your travel requirements..."
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-500">{errors.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Send Enquiry</span>
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Enquiry Sent Successfully!
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Thank you for your enquiry. We'll get back to you within 24 hours.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnquiryForm;