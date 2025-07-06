import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Response Error:', error.response?.data || error.message);
    // For deployment, fall back to mock data if API is not available
    if (error.code === 'ECONNREFUSED' || error.code === 'ERR_NETWORK') {
      console.warn('API not available, using mock data');
      return Promise.resolve({ data: [] });
    }
    return Promise.reject(error);
  }
);

// Packages API with fallback to mock data
export const packagesAPI = {
  getAll: async (params = {}) => {
    try {
      const response = await api.get('/packages', { params });
      return response;
    } catch (error) {
      console.warn('Using mock packages data');
      return { data: { packages: mockPackages, pagination: { currentPage: 1, totalPages: 1, totalPackages: mockPackages.length } } };
    }
  },
  getById: async (id) => {
    try {
      const response = await api.get(`/packages/${id}`);
      return response;
    } catch (error) {
      console.warn('Using mock package data');
      const foundPackage = mockPackages.find(pkg => pkg._id === id);
      return { data: foundPackage };
    }
  },
  create: (data) => api.post('/packages', data),
  update: (id, data) => api.put(`/packages/${id}`, data),
  delete: (id) => api.delete(`/packages/${id}`),
  getStats: () => api.get('/packages/stats'),
};

// Enquiries API with fallback
export const enquiriesAPI = {
  create: async (data) => {
    try {
      const response = await api.post('/enquiries', data);
      return response;
    } catch (error) {
      console.warn('Enquiry submitted (mock mode)');
      return { data: { message: 'Enquiry submitted successfully', enquiry: { ...data, _id: Date.now().toString() } } };
    }
  },
  getAll: async (params = {}) => {
    try {
      const response = await api.get('/enquiries', { params });
      return response;
    } catch (error) {
      console.warn('Using mock enquiries data');
      return { data: { enquiries: [], pagination: { currentPage: 1, totalPages: 1, totalEnquiries: 0 } } };
    }
  },
  getById: (id) => api.get(`/enquiries/${id}`),
  updateStatus: (id, data) => api.patch(`/enquiries/${id}`, data),
  delete: (id) => api.delete(`/enquiries/${id}`),
  getStats: () => api.get('/enquiries/stats'),
};

// Utility functions
export const seedData = () => api.post('/seed');
export const healthCheck = () => api.get('/health');

// Mock data for development and fallback
export const mockPackages = [
  {
    _id: '1',
    title: 'Golden Triangle Classic',
    description: 'Experience India\'s most iconic destinations with our classic Golden Triangle tour covering Delhi, Agra, and Jaipur.',
    duration: 7,
    price: 899,
    location: 'Delhi, Agra, Jaipur',
    category: 'cultural',
    difficulty: 'easy',
    images: [
      'https://images.pexels.com/photos/3881104/pexels-photo-3881104.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1098365/pexels-photo-1098365.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2406949/pexels-photo-2406949.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    highlights: [
      'Visit the iconic Taj Mahal at sunrise',
      'Explore the majestic Red Fort in Delhi',
      'Discover the stunning Amber Fort in Jaipur',
      'Experience authentic Rajasthani cuisine'
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Delhi', description: 'Airport pickup and transfer to hotel.' },
      { day: 2, title: 'Delhi City Tour', description: 'Visit Red Fort, Jama Masjid, and India Gate.' },
      { day: 3, title: 'Delhi to Agra', description: 'Drive to Agra and visit Taj Mahal at sunset.' },
      { day: 4, title: 'Agra to Jaipur', description: 'Visit Agra Fort, then drive to Jaipur.' },
      { day: 5, title: 'Jaipur Sightseeing', description: 'Explore Amber Fort, City Palace, and Hawa Mahal.' },
      { day: 6, title: 'Jaipur Local', description: 'Local markets and cultural experiences.' },
      { day: 7, title: 'Departure', description: 'Transfer to airport for departure.' }
    ],
    featured: true,
    tags: ['heritage', 'culture', 'monuments']
  },
  {
    _id: '2',
    title: 'Kerala Backwaters & Hills',
    description: 'Discover God\'s Own Country with serene backwaters, lush hill stations, and pristine beaches.',
    duration: 8,
    price: 1150,
    location: 'Kerala',
    category: 'cultural',
    difficulty: 'easy',
    images: [
      'https://images.pexels.com/photos/962464/pexels-photo-962464.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2132126/pexels-photo-2132126.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    highlights: [
      'Luxury houseboat stay in Alleppey',
      'Tea plantation tour in Munnar',
      'Spice garden visit in Thekkady',
      'Traditional Kathakali dance performance'
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Kochi', description: 'Airport pickup and city tour.' },
      { day: 2, title: 'Kochi to Munnar', description: 'Drive to Munnar, tea plantation visit.' },
      { day: 3, title: 'Munnar Exploration', description: 'Visit national park and scenic spots.' },
      { day: 4, title: 'Munnar to Thekkady', description: 'Spice plantation tour.' },
      { day: 5, title: 'Thekkady to Alleppey', description: 'Check into luxury houseboat.' }
    ],
    featured: true,
    tags: ['backwaters', 'nature', 'relaxation']
  },
  {
    _id: '3',
    title: 'Rajasthan Royal Heritage',
    description: 'Embark on a royal journey through magnificent palaces and desert landscapes.',
    duration: 12,
    price: 1850,
    location: 'Rajasthan',
    category: 'luxury',
    difficulty: 'easy',
    images: [
      'https://images.pexels.com/photos/3889929/pexels-photo-3889929.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/3010168/pexels-photo-3010168.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    highlights: [
      'Stay in heritage palace hotels',
      'Camel safari in Thar Desert',
      'Sunset boat ride on Lake Pichola',
      'Traditional Rajasthani folk performances'
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Jaipur', description: 'Airport pickup and heritage hotel check-in.' },
      { day: 2, title: 'Jaipur City Tour', description: 'Visit Amber Fort and City Palace.' }
    ],
    featured: true,
    tags: ['heritage', 'desert', 'luxury']
  },
  {
    _id: '4',
    title: 'Himalayan Adventure Trek',
    description: 'Challenge yourself with an unforgettable trekking adventure in the Indian Himalayas.',
    duration: 14,
    price: 1650,
    location: 'Himachal Pradesh',
    category: 'adventure',
    difficulty: 'challenging',
    images: [
      'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    highlights: [
      'Trek to 4,500m altitude',
      'Spectacular mountain panoramas',
      'Traditional mountain villages',
      'Alpine meadows and glacial lakes'
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Delhi', description: 'Airport pickup, overnight in Delhi.' },
      { day: 2, title: 'Delhi to Manali', description: 'Drive to Manali, check into hotel.' }
    ],
    featured: false,
    tags: ['trekking', 'mountains', 'adventure']
  },
  {
    _id: '5',
    title: 'Goa Beach Paradise',
    description: 'Relax and unwind on the pristine beaches of Goa with water sports and nightlife.',
    duration: 6,
    price: 750,
    location: 'Goa',
    category: 'budget',
    difficulty: 'easy',
    images: [
      'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1007426/pexels-photo-1007426.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    highlights: [
      'Beautiful beaches of North and South Goa',
      'Water sports and beach activities',
      'Portuguese colonial architecture',
      'Vibrant nightlife and beach parties'
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Goa', description: 'Airport pickup, check into beach resort.' },
      { day: 2, title: 'North Goa Beaches', description: 'Visit Calangute, Baga, and Anjuna beaches.' }
    ],
    featured: false,
    tags: ['beach', 'relaxation', 'nightlife']
  },
  {
    _id: '6',
    title: 'Spiritual India Journey',
    description: 'Embark on a transformative spiritual journey through India\'s most sacred destinations.',
    duration: 10,
    price: 1200,
    location: 'Varanasi, Rishikesh, Haridwar',
    category: 'spiritual',
    difficulty: 'easy',
    images: [
      'https://images.pexels.com/photos/3881104/pexels-photo-3881104.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2325446/pexels-photo-2325446.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    highlights: [
      'Sunrise boat ride on Ganges',
      'Yoga and meditation sessions',
      'Ancient temple visits',
      'Spiritual discourses'
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Delhi', description: 'Airport pickup, overnight in Delhi.' },
      { day: 2, title: 'Delhi to Haridwar', description: 'Drive to Haridwar, evening Ganga Aarti.' }
    ],
    featured: false,
    tags: ['spiritual', 'yoga', 'temples']
  },
  {
    _id: '7',
    title: 'Wildlife Safari Adventure',
    description: 'Experience India\'s incredible wildlife with visits to premier national parks.',
    duration: 9,
    price: 1400,
    location: 'Ranthambore, Bharatpur, Jim Corbett',
    category: 'wildlife',
    difficulty: 'easy',
    images: [
      'https://images.pexels.com/photos/792381/pexels-photo-792381.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1661179/pexels-photo-1661179.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    highlights: [
      'Tiger spotting in Ranthambore',
      'Bird watching in Bharatpur',
      'Elephant safari in Jim Corbett',
      'Nature photography opportunities'
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Delhi', description: 'Airport pickup, overnight in Delhi.' },
      { day: 2, title: 'Delhi to Ranthambore', description: 'Drive to Ranthambore, evening at leisure.' }
    ],
    featured: false,
    tags: ['wildlife', 'safari', 'nature']
  },
  {
    _id: '8',
    title: 'Luxury Palace Experience',
    description: 'Indulge in the ultimate luxury experience staying in converted palace hotels.',
    duration: 8,
    price: 2500,
    location: 'Udaipur, Jaipur, Jodhpur',
    category: 'luxury',
    difficulty: 'easy',
    images: [
      'https://images.pexels.com/photos/3010168/pexels-photo-3010168.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2325446/pexels-photo-2325446.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    highlights: [
      'Stay in heritage palace hotels',
      'Private butler service',
      'Royal dining experiences',
      'Exclusive palace tours'
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Udaipur', description: 'Airport pickup, check into Lake Palace Hotel.' },
      { day: 2, title: 'Udaipur Royal Experience', description: 'Private palace tours, sunset boat ride.' }
    ],
    featured: false,
    tags: ['luxury', 'palace', 'royal']
  }
];

export default api;