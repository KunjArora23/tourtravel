import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, Globe, Users } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    inquiryType: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitted(true);
    setIsSubmitting(false);

    // Reset form after delay
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        inquiryType: 'general'
      });
    }, 3000);
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Visit Our Office',
      details: [
        '123 Travel Street, Connaught Place',
        'New Delhi, India 110001',
        'Open Mon-Sat: 9:00 AM - 7:00 PM'
      ]
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: [
        '+91 98765 43210 (Primary)',
        '+91 98765 43211 (WhatsApp)',
        '24/7 Emergency Support'
      ]
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: [
        'info@incredibletours.com',
        'bookings@incredibletours.com',
        'support@incredibletours.com'
      ]
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: [
        'Monday - Friday: 9:00 AM - 7:00 PM',
        'Saturday: 9:00 AM - 5:00 PM',
        'Sunday: 10:00 AM - 4:00 PM'
      ]
    }
  ];

  const offices = [
    {
      city: 'New Delhi',
      address: 'Shop No. 16, Municipal Market, Connaught Circle, Railway Colony, Connaught Place, New Delhi, Delhi 110001',
      phone: '+91 85279 21295',
      email: 'rpiipt@gmail.com'
    },

  ];

  const faqs = [
    {
      question: 'How far in advance should I book my tour?',
      answer: 'We recommend booking at least 2-3 months in advance, especially for peak season (October to March) and popular destinations like the Golden Triangle.'
    },
    {
      question: 'Do you provide customized tour packages?',
      answer: 'Yes! We specialize in creating personalized itineraries based on your interests, budget, and travel dates. Contact us to discuss your requirements.'
    },
    {
      question: 'What is included in your tour packages?',
      answer: 'Our packages typically include accommodation, transportation, professional guides, entrance fees, and specified meals. Specific inclusions vary by package.'
    },
    {
      question: 'Is travel insurance included?',
      answer: 'Travel insurance is not included but highly recommended. We can help you arrange comprehensive travel insurance for your trip.'
    },
    {
      question: 'What is your cancellation policy?',
      answer: 'Cancellation policies vary by package and season. Generally, cancellations 30+ days before departure receive full refund minus processing fees.'
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 animate-fade-in">
              Get in Touch
            </h1>
            <p className="text-xl md:text-2xl opacity-90 leading-relaxed animate-slide-up">
              Ready to plan your dream trip to India? Our travel experts are here to help
              you create an unforgettable journey.
            </p>
          </div>
        </div>
      </section>



      {/* Contact Form & Map */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <div className="mb-8">
                <h2 className="text-4xl font-display font-bold text-gray-900 dark:text-white mb-4">
                  Send Us a Message
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>
              </div>

              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200"
                        placeholder="Enter your phone number"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Inquiry Type
                      </label>
                      <select
                        name="inquiryType"
                        value={formData.inquiryType}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200"
                      >
                        <option value="general">General Inquiry</option>
                        <option value="booking">Tour Booking</option>
                        <option value="custom">Custom Package</option>
                        <option value="support">Customer Support</option>
                        <option value="partnership">Partnership</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200"
                      placeholder="Enter subject"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="6"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors duration-200 resize-none"
                      placeholder="Tell us about your travel plans, preferences, or any questions you have..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white py-4 rounded-lg font-semibold text-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-6 h-6" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <div className="text-center py-12 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl">
                  <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center mx-auto mb-6">
                    <MessageCircle className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-lg">
                    Thank you for contacting us. We'll get back to you within 24 hours.
                  </p>
                </div>
              )}
            </div>
            {/* Contact Info Cards */}


            {/* Map & Office Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Our Offices
                </h3>
                <div className="space-y-6">
                  {offices.map((office, index) => (
                    <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
                      <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                        {office.city}
                      </h4>
                      <div className="space-y-2 text-gray-600 dark:text-gray-400">
                        <div className="flex items-start space-x-3">
                          <MapPin className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                          <span>{office.address}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Phone className="w-5 h-5 text-primary-600 flex-shrink-0" />
                          <span>{office.phone}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Mail className="w-5 h-5 text-primary-600 flex-shrink-0" />
                          <span>{office.email}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="rounded-xl overflow-hidden w-full h-64 md:h-96 shadow-md">
                <iframe
                  title="S & C Tours and Travels Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224345.90678543528!2d77.2179743!3d28.6357043!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfdb7ba097727%3A0xecad9f2750bfaf9!2sS%20%26%20C%20Tours%20and%20Travels!5e0!3m2!1sen!2sin!4v1720000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="border-0"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-white mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Find answers to common questions about our tours and services
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {faq.answer}
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
            Ready to Plan Your Adventure?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Our travel experts are standing by to help you create the perfect Indian adventure.
            Contact us today to get started!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-primary-600 hover:bg-gray-100 px-8 py-4 rounded-full font-semibold text-lg transition-colors duration-300 flex items-center justify-center space-x-2">
              <Phone className="w-5 h-5" />
              <span>Call Now</span>
            </button>
            <button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-600 px-8 py-4 rounded-full font-semibold text-lg transition-colors duration-300 flex items-center justify-center space-x-2">
              <MessageCircle className="w-5 h-5" />
              <span>WhatsApp</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;