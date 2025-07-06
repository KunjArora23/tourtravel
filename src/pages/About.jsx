import React from 'react';
import { Award, Users, Globe, Heart, Shield, Clock, Star, MapPin } from 'lucide-react';

const About = () => {
  const stats = [
    { icon: Users, label: 'Happy Travelers', value: '50,000+' },
    { icon: Globe, label: 'Destinations', value: '100+' },
    { icon: Award, label: 'Awards Won', value: '25+' },
    { icon: Star, label: 'Average Rating', value: '4.9/5' }
  ];

  const values = [
    {
      icon: Heart,
      title: 'Passion for Travel',
      description: 'We believe travel transforms lives and creates lasting memories. Our passion drives us to craft extraordinary experiences.'
    },
    {
      icon: Shield,
      title: 'Trust & Safety',
      description: 'Your safety and satisfaction are our top priorities. We maintain the highest standards in all our services.'
    },
    {
      icon: Users,
      title: 'Expert Team',
      description: 'Our experienced travel experts and local guides ensure authentic and enriching travel experiences.'
    },
    {
      icon: Globe,
      title: 'Sustainable Tourism',
      description: 'We promote responsible travel that benefits local communities and preserves cultural heritage.'
    }
  ];

  const team = [
    {
      name: 'Rajesh Kumar',
      role: 'Founder & CEO',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: '15+ years in travel industry, passionate about showcasing India\'s beauty.'
    },
    {
      name: 'Priya Sharma',
      role: 'Head of Operations',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Expert in luxury travel planning with attention to every detail.'
    },
    {
      name: 'Amit Patel',
      role: 'Adventure Specialist',
      image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Mountain guide and adventure expert with 200+ successful expeditions.'
    },
    {
      name: 'Meera Singh',
      role: 'Cultural Heritage Expert',
      image: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=300',
      description: 'Art historian specializing in Indian culture and heritage tours.'
    }
  ];

  const milestones = [
    { year: '2010', event: 'Founded Incredible Tours with a vision to showcase India\'s diversity' },
    { year: '2013', event: 'Launched luxury heritage tours, partnering with palace hotels' },
    { year: '2016', event: 'Expanded to adventure tourism with Himalayan trekking expeditions' },
    { year: '2019', event: 'Received "Best Tour Operator" award from India Tourism Board' },
    { year: '2021', event: 'Introduced sustainable tourism practices and eco-friendly tours' },
    { year: '2024', event: 'Celebrating 50,000+ satisfied travelers and expanding globally' }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 animate-fade-in">
              About Incredible Tours
            </h1>
            <p className="text-xl md:text-2xl opacity-90 leading-relaxed animate-slide-up">
              For over a decade, we've been crafting extraordinary travel experiences that showcase 
              the incredible diversity, rich heritage, and warm hospitality of India.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white dark:from-gray-900 to-transparent"></div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-600 transition-colors duration-300">
                  <stat.icon className="w-8 h-8 text-primary-600 dark:text-primary-400 group-hover:text-white transition-colors duration-300" />
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 dark:text-gray-400 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-white mb-6">
                Our Story
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
                Born from a passion for travel and a deep love for India's incredible heritage
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  Incredible Tours was founded in 2010 with a simple yet powerful vision: to share the magic 
                  of India with travelers from around the world. What started as a small family business has 
                  grown into one of India's most trusted travel companies.
                </p>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  We believe that travel is more than just visiting places – it's about creating connections, 
                  understanding cultures, and making memories that last a lifetime. Every tour we design is 
                  crafted with care, attention to detail, and a deep respect for local traditions.
                </p>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  From the snow-capped Himalayas to the tropical backwaters of Kerala, from ancient monuments 
                  to vibrant festivals, we showcase India in all its incredible diversity. Our experienced 
                  team of travel experts and local guides ensure that every journey is authentic, safe, and unforgettable.
                </p>
              </div>
              <div className="relative">
                <img
                  src="https://images.pexels.com/photos/3881104/pexels-photo-3881104.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Our Story"
                  className="rounded-2xl shadow-luxury w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-white mb-6">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              The principles that guide everything we do and shape every experience we create
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg hover:shadow-luxury transition-shadow duration-300 group">
                <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary-600 transition-colors duration-300">
                  <value.icon className="w-8 h-8 text-primary-600 dark:text-primary-400 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-white mb-6">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Passionate travel experts dedicated to creating extraordinary experiences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="group">
                <div className="relative overflow-hidden rounded-2xl mb-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {member.name}
                  </h3>
                  <p className="text-primary-600 dark:text-primary-400 font-semibold mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    {member.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-white mb-6">
              Our Journey
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Key milestones in our journey to becoming India's premier travel company
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary-200 dark:bg-primary-800"></div>
              
              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <div key={index} className="relative flex items-start">
                    <div className="flex-shrink-0 w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      {milestone.year.slice(-2)}
                    </div>
                    <div className="ml-8 bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg flex-1">
                      <div className="text-primary-600 dark:text-primary-400 font-bold text-lg mb-2">
                        {milestone.year}
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {milestone.event}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Let us create an unforgettable travel experience tailored just for you. 
            Discover the incredible beauty and diversity of India with our expert team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-primary-600 hover:bg-gray-100 px-8 py-4 rounded-full font-semibold text-lg transition-colors duration-300">
              Plan Your Trip
            </button>
            <button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-600 px-8 py-4 rounded-full font-semibold text-lg transition-colors duration-300">
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;