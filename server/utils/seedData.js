// import Package from '../models/Package.js';

// const samplePackages = [
//   {
//     title: 'Golden Triangle Classic',
//     description: 'Experience India\'s most iconic destinations with our classic Golden Triangle tour covering Delhi, Agra, and Jaipur. Witness the magnificent Taj Mahal, explore royal palaces, and immerse yourself in rich cultural heritage.',
//     duration: 7,
//     price: 899,
//     location: 'Delhi, Agra, Jaipur',
//     category: 'cultural',
//     difficulty: 'easy',
//     images: [
//       'https://images.pexels.com/photos/3881104/pexels-photo-3881104.jpeg?auto=compress&cs=tinysrgb&w=800',
//       'https://images.pexels.com/photos/1098365/pexels-photo-1098365.jpeg?auto=compress&cs=tinysrgb&w=800',
//       'https://images.pexels.com/photos/2406949/pexels-photo-2406949.jpeg?auto=compress&cs=tinysrgb&w=800'
//     ],
//     highlights: [
//       'Visit the iconic Taj Mahal at sunrise',
//       'Explore the majestic Red Fort in Delhi',
//       'Discover the stunning Amber Fort in Jaipur',
//       'Experience authentic Rajasthani cuisine',
//       'Shop at vibrant local bazaars',
//       'Professional English-speaking guide'
//     ],
//     itinerary: [
//       { day: 1, title: 'Arrival in Delhi', description: 'Airport pickup and transfer to hotel. Evening orientation and welcome dinner.' },
//       { day: 2, title: 'Delhi City Tour', description: 'Visit Red Fort, Jama Masjid, India Gate, and Humayun\'s Tomb.' },
//       { day: 3, title: 'Delhi to Agra', description: 'Drive to Agra (4 hours). Visit Taj Mahal at sunset.' },
//       { day: 4, title: 'Agra Exploration', description: 'Sunrise at Taj Mahal, visit Agra Fort and Mehtab Bagh.' },
//       { day: 5, title: 'Agra to Jaipur', description: 'Drive to Jaipur via Fatehpur Sikri. Check into heritage hotel.' },
//       { day: 6, title: 'Jaipur Sightseeing', description: 'Explore Amber Fort, City Palace, Hawa Mahal, and Jantar Mantar.' },
//       { day: 7, title: 'Departure', description: 'Transfer to Jaipur airport or continue to Delhi.' }
//     ],
//     inclusions: [
//       'Accommodation in 4-star hotels',
//       'Daily breakfast and dinner',
//       'Private air-conditioned vehicle',
//       'Professional guide',
//       'All monument entrance fees',
//       'Airport transfers'
//     ],
//     exclusions: [
//       'International flights',
//       'Lunch (except on tour days)',
//       'Personal expenses',
//       'Tips and gratuities',
//       'Travel insurance'
//     ],
//     bestTime: 'October to March',
//     tags: ['heritage', 'culture', 'monuments', 'photography'],
//     featured: true
//   },
//   {
//     title: 'Kerala Backwaters & Hills',
//     description: 'Discover God\'s Own Country with our comprehensive Kerala tour featuring serene backwaters, lush hill stations, and pristine beaches. Experience traditional houseboats, spice plantations, and Ayurvedic treatments.',
//     duration: 8,
//     price: 1150,
//     location: 'Kerala',
//     category: 'cultural',
//     difficulty: 'easy',
//     images: [
//       'https://images.pexels.com/photos/962464/pexels-photo-962464.jpeg?auto=compress&cs=tinysrgb&w=800',
//       'https://images.pexels.com/photos/2132126/pexels-photo-2132126.jpeg?auto=compress&cs=tinysrgb&w=800',
//       'https://images.pexels.com/photos/1007426/pexels-photo-1007426.jpeg?auto=compress&cs=tinysrgb&w=800'
//     ],
//     highlights: [
//       'Luxury houseboat stay in Alleppey backwaters',
//       'Tea plantation tour in Munnar',
//       'Spice garden visit in Thekkady',
//       'Traditional Kathakali dance performance',
//       'Ayurvedic spa treatments',
//       'Beach relaxation in Kovalam'
//     ],
//     itinerary: [
//       { day: 1, title: 'Arrival in Kochi', description: 'Airport pickup, city tour including Chinese fishing nets and Fort Kochi.' },
//       { day: 2, title: 'Kochi to Munnar', description: 'Drive to Munnar (4 hours), visit tea plantations and tea museum.' },
//       { day: 3, title: 'Munnar Exploration', description: 'Visit Eravikulam National Park, Mattupetty Dam, and Echo Point.' },
//       { day: 4, title: 'Munnar to Thekkady', description: 'Drive to Thekkady, spice plantation tour and boat ride in Periyar Lake.' },
//       { day: 5, title: 'Thekkady to Alleppey', description: 'Drive to Alleppey, check into luxury houseboat for backwater cruise.' },
//       { day: 6, title: 'Alleppey to Kovalam', description: 'Disembark houseboat, drive to Kovalam beach resort.' },
//       { day: 7, title: 'Kovalam Beach Day', description: 'Relax at beach, optional Ayurvedic treatments and local sightseeing.' },
//       { day: 8, title: 'Departure', description: 'Transfer to Trivandrum airport for departure.' }
//     ],
//     inclusions: [
//       'Luxury houseboat accommodation',
//       'Beach resort stay',
//       'All meals during houseboat',
//       'Private transportation',
//       'Professional guide',
//       'All entrance fees'
//     ],
//     exclusions: [
//       'Flights',
//       'Meals not mentioned',
//       'Personal expenses',
//       'Ayurvedic treatments',
//       'Travel insurance'
//     ],
//     bestTime: 'September to March',
//     tags: ['backwaters', 'nature', 'relaxation', 'houseboat'],
//     featured: true
//   },
//   {
//     title: 'Rajasthan Royal Heritage',
//     description: 'Embark on a royal journey through the land of kings and queens. Experience magnificent palaces, desert safaris, and rich cultural traditions in Rajasthan\'s most spectacular cities.',
//     duration: 12,
//     price: 1850,
//     location: 'Rajasthan',
//     category: 'luxury',
//     difficulty: 'easy',
//     images: [
//       'https://images.pexels.com/photos/3889929/pexels-photo-3889929.jpeg?auto=compress&cs=tinysrgb&w=800',
//       'https://images.pexels.com/photos/3010168/pexels-photo-3010168.jpeg?auto=compress&cs=tinysrgb&w=800',
//       'https://images.pexels.com/photos/2325446/pexels-photo-2325446.jpeg?auto=compress&cs=tinysrgb&w=800'
//     ],
//     highlights: [
//       'Stay in heritage palace hotels',
//       'Camel safari in Thar Desert',
//       'Sunset boat ride on Lake Pichola',
//       'Traditional Rajasthani folk performances',
//       'Visit to local artisan workshops',
//       'Royal dining experiences'
//     ],
//     itinerary: [
//       { day: 1, title: 'Arrival in Jaipur', description: 'Airport pickup, check into heritage hotel, evening city orientation.' },
//       { day: 2, title: 'Jaipur City Tour', description: 'Visit Amber Fort, City Palace, Hawa Mahal, and Jantar Mantar.' },
//       { day: 3, title: 'Jaipur to Pushkar', description: 'Drive to Pushkar, visit holy lake and Brahma Temple.' },
//       { day: 4, title: 'Pushkar to Jodhpur', description: 'Drive to Blue City, visit Mehrangarh Fort and Jaswant Thada.' },
//       { day: 5, title: 'Jodhpur Exploration', description: 'Explore old city markets, visit Umaid Bhawan Palace.' },
//       { day: 6, title: 'Jodhpur to Jaisalmer', description: 'Drive to Golden City, evening at leisure.' },
//       { day: 7, title: 'Jaisalmer Fort & Desert', description: 'Visit Jaisalmer Fort, evening camel safari and desert camping.' },
//       { day: 8, title: 'Jaisalmer to Udaipur', description: 'Long drive to City of Lakes (8 hours) with stops.' },
//       { day: 9, title: 'Udaipur City Tour', description: 'Visit City Palace, Jagdish Temple, and sunset boat ride.' },
//       { day: 10, title: 'Udaipur Leisure', description: 'Visit Saheliyon ki Bari, local markets, and cultural show.' },
//       { day: 11, title: 'Udaipur to Delhi', description: 'Flight to Delhi, last-minute shopping and sightseeing.' },
//       { day: 12, title: 'Departure', description: 'Transfer to international airport for departure.' }
//     ],
//     inclusions: [
//       'Heritage hotel accommodation',
//       'Desert camping experience',
//       'All meals',
//       'Private vehicle with driver',
//       'Professional guide',
//       'Camel safari',
//       'Cultural performances'
//     ],
//     exclusions: [
//       'International flights',
//       'Personal expenses',
//       'Tips',
//       'Travel insurance',
//       'Optional activities'
//     ],
//     bestTime: 'October to March',
//     tags: ['heritage', 'desert', 'luxury', 'culture'],
//     featured: true
//   },
//   {
//     title: 'Himalayan Adventure Trek',
//     description: 'Challenge yourself with an unforgettable trekking adventure in the Indian Himalayas. Experience breathtaking mountain views, pristine valleys, and traditional mountain culture.',
//     duration: 14,
//     price: 1650,
//     location: 'Himachal Pradesh',
//     category: 'adventure',
//     difficulty: 'challenging',
//     images: [
//       'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=800',
//       'https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg?auto=compress&cs=tinysrgb&w=800',
//       'https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=800'
//     ],
//     highlights: [
//       'Trek to 4,500m altitude',
//       'Spectacular mountain panoramas',
//       'Traditional mountain villages',
//       'Alpine meadows and glacial lakes',
//       'Professional mountain guides',
//       'Camping under starlit skies'
//     ],
//     itinerary: [
//       { day: 1, title: 'Arrival in Delhi', description: 'Airport pickup, overnight in Delhi.' },
//       { day: 2, title: 'Delhi to Manali', description: 'Drive to Manali (12 hours), check into hotel.' },
//       { day: 3, title: 'Manali Acclimatization', description: 'Rest day, local sightseeing and gear check.' },
//       { day: 4, title: 'Manali to Base Camp', description: 'Drive to trek starting point, first day of trekking.' },
//       { day: 5, title: 'Trek Day 1', description: 'Trek through pine forests to first camp (3,200m).' },
//       { day: 6, title: 'Trek Day 2', description: 'Ascend to alpine meadows camp (3,800m).' },
//       { day: 7, title: 'Trek Day 3', description: 'Cross high pass to glacial valley (4,200m).' },
//       { day: 8, title: 'Summit Day', description: 'Early morning summit attempt (4,500m), return to base.' },
//       { day: 9, title: 'Descent Day 1', description: 'Begin descent through different route.' },
//       { day: 10, title: 'Descent Day 2', description: 'Continue descent to road head.' },
//       { day: 11, title: 'Return to Manali', description: 'Drive back to Manali, celebration dinner.' },
//       { day: 12, title: 'Manali to Delhi', description: 'Drive back to Delhi, overnight.' },
//       { day: 13, title: 'Delhi Sightseeing', description: 'City tour and shopping.' },
//       { day: 14, title: 'Departure', description: 'Transfer to airport for departure.' }
//     ],
//     inclusions: [
//       'Professional mountain guides',
//       'All camping equipment',
//       'Meals during trek',
//       'Transportation',
//       'Permits and fees',
//       'First aid kit'
//     ],
//     exclusions: [
//       'Personal trekking gear',
//       'Travel insurance',
//       'Emergency evacuation',
//       'Personal expenses',
//       'Tips for guides'
//     ],
//     bestTime: 'May to September',
//     tags: ['trekking', 'mountains', 'adventure', 'camping'],
//     featured: false
//   },
//   {
//     title: 'Goa Beach Paradise',
//     description: 'Relax and unwind on the pristine beaches of Goa. Enjoy water sports, beach parties, Portuguese heritage, and delicious seafood in India\'s premier beach destination.',
//     duration: 6,
//     price: 750,
//     location: 'Goa',
//     category: 'budget',
//     difficulty: 'easy',
//     images: [
//       'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=800',
//       'https://images.pexels.com/photos/1007426/pexels-photo-1007426.jpeg?auto=compress&cs=tinysrgb&w=800',
//       'https://images.pexels.com/photos/1320684/pexels-photo-1320684.jpeg?auto=compress&cs=tinysrgb&w=800'
//     ],
//     highlights: [
//       'Beautiful beaches of North and South Goa',
//       'Water sports and beach activities',
//       'Portuguese colonial architecture',
//       'Vibrant nightlife and beach parties',
//       'Delicious Goan cuisine',
//       'Spice plantation tour'
//     ],
//     itinerary: [
//       { day: 1, title: 'Arrival in Goa', description: 'Airport pickup, check into beach resort, evening at leisure.' },
//       { day: 2, title: 'North Goa Beaches', description: 'Visit Calangute, Baga, and Anjuna beaches. Water sports.' },
//       { day: 3, title: 'Old Goa Heritage', description: 'Explore churches, spice plantation tour, river cruise.' },
//       { day: 4, title: 'South Goa Beaches', description: 'Visit Colva, Benaulim, and Palolem beaches.' },
//       { day: 5, title: 'Adventure Day', description: 'Dudhsagar Falls trip or water sports activities.' },
//       { day: 6, title: 'Departure', description: 'Last-minute shopping and transfer to airport.' }
//     ],
//     inclusions: [
//       'Beach resort accommodation',
//       'Daily breakfast',
//       'Airport transfers',
//       'Sightseeing tours',
//       'Spice plantation visit'
//     ],
//     exclusions: [
//       'Flights',
//       'Lunch and dinner',
//       'Water sports charges',
//       'Personal expenses',
//       'Alcoholic beverages'
//     ],
//     bestTime: 'November to March',
//     tags: ['beach', 'relaxation', 'nightlife', 'water sports'],
//     featured: false
//   },
//   {
//     title: 'Spiritual India Journey',
//     description: 'Embark on a transformative spiritual journey through India\'s most sacred destinations. Experience ancient temples, holy rivers, and spiritual practices.',
//     duration: 10,
//     price: 1200,
//     location: 'Varanasi, Rishikesh, Haridwar',
//     category: 'spiritual',
//     difficulty: 'easy',
//     images: [
//       'https://images.pexels.com/photos/3881104/pexels-photo-3881104.jpeg?auto=compress&cs=tinysrgb&w=800',
//       'https://images.pexels.com/photos/2325446/pexels-photo-2325446.jpeg?auto=compress&cs=tinysrgb&w=800',
//       'https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg?auto=compress&cs=tinysrgb&w=800'
//     ],
//     highlights: [
//       'Sunrise boat ride on Ganges',
//       'Yoga and meditation sessions',
//       'Ancient temple visits',
//       'Spiritual discourses',
//       'Aarti ceremonies',
//       'Ashram experiences'
//     ],
//     itinerary: [
//       { day: 1, title: 'Arrival in Delhi', description: 'Airport pickup, overnight in Delhi.' },
//       { day: 2, title: 'Delhi to Haridwar', description: 'Drive to Haridwar, evening Ganga Aarti.' },
//       { day: 3, title: 'Haridwar to Rishikesh', description: 'Visit Rishikesh, yoga capital of the world.' },
//       { day: 4, title: 'Rishikesh Spiritual Day', description: 'Yoga sessions, temple visits, meditation.' },
//       { day: 5, title: 'Rishikesh to Varanasi', description: 'Flight to Varanasi, evening temple visit.' },
//       { day: 6, title: 'Varanasi Ghats', description: 'Sunrise boat ride, visit to Sarnath.' },
//       { day: 7, title: 'Varanasi Exploration', description: 'Temple visits, spiritual discourses.' },
//       { day: 8, title: 'Varanasi to Bodhgaya', description: 'Drive to Bodhgaya, visit Mahabodhi Temple.' },
//       { day: 9, title: 'Bodhgaya to Delhi', description: 'Flight back to Delhi, last day sightseeing.' },
//       { day: 10, title: 'Departure', description: 'Transfer to airport for departure.' }
//     ],
//     inclusions: [
//       'Accommodation in ashrams/hotels',
//       'All meals',
//       'Yoga sessions',
//       'Spiritual guide',
//       'All transfers',
//       'Temple visits'
//     ],
//     exclusions: [
//       'International flights',
//       'Personal expenses',
//       'Donations',
//       'Travel insurance',
//       'Optional activities'
//     ],
//     bestTime: 'October to March',
//     tags: ['spiritual', 'yoga', 'temples', 'meditation'],
//     featured: false
//   },
//   {
//     title: 'Wildlife Safari Adventure',
//     description: 'Experience India\'s incredible wildlife with visits to premier national parks. Spot tigers, elephants, and diverse bird species in their natural habitat.',
//     duration: 9,
//     price: 1400,
//     location: 'Ranthambore, Bharatpur, Jim Corbett',
//     category: 'wildlife',
//     difficulty: 'easy',
//     images: [
//       'https://images.pexels.com/photos/792381/pexels-photo-792381.jpeg?auto=compress&cs=tinysrgb&w=800',
//       'https://images.pexels.com/photos/1661179/pexels-photo-1661179.jpeg?auto=compress&cs=tinysrgb&w=800',
//       'https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg?auto=compress&cs=tinysrgb&w=800'
//     ],
//     highlights: [
//       'Tiger spotting in Ranthambore',
//       'Bird watching in Bharatpur',
//       'Elephant safari in Jim Corbett',
//       'Nature photography opportunities',
//       'Wildlife expert guides',
//       'Jungle lodge accommodation'
//     ],
//     itinerary: [
//       { day: 1, title: 'Arrival in Delhi', description: 'Airport pickup, overnight in Delhi.' },
//       { day: 2, title: 'Delhi to Ranthambore', description: 'Drive to Ranthambore, evening at leisure.' },
//       { day: 3, title: 'Ranthambore Safari', description: 'Morning and evening tiger safari.' },
//       { day: 4, title: 'Ranthambore to Bharatpur', description: 'Drive to Bharatpur, visit Keoladeo National Park.' },
//       { day: 5, title: 'Bharatpur Bird Watching', description: 'Full day bird watching with expert guide.' },
//       { day: 6, title: 'Bharatpur to Jim Corbett', description: 'Drive to Jim Corbett National Park.' },
//       { day: 7, title: 'Jim Corbett Safari', description: 'Morning elephant safari, evening jeep safari.' },
//       { day: 8, title: 'Jim Corbett to Delhi', description: 'Drive back to Delhi, evening at leisure.' },
//       { day: 9, title: 'Departure', description: 'Transfer to airport for departure.' }
//     ],
//     inclusions: [
//       'Jungle lodge accommodation',
//       'All safari activities',
//       'Expert naturalist guides',
//       'All meals',
//       'Transportation',
//       'Park entry fees'
//     ],
//     exclusions: [
//       'Flights',
//       'Personal expenses',
//       'Camera fees',
//       'Travel insurance',
//       'Tips for guides'
//     ],
//     bestTime: 'October to April',
//     tags: ['wildlife', 'safari', 'nature', 'photography'],
//     featured: false
//   },
//   {
//     title: 'Luxury Palace Experience',
//     description: 'Indulge in the ultimate luxury experience staying in converted palace hotels. Enjoy royal treatment, fine dining, and exclusive experiences.',
//     duration: 8,
//     price: 2500,
//     location: 'Udaipur, Jaipur, Jodhpur',
//     category: 'luxury',
//     difficulty: 'easy',
//     images: [
//       'https://images.pexels.com/photos/3010168/pexels-photo-3010168.jpeg?auto=compress&cs=tinysrgb&w=800',
//       'https://images.pexels.com/photos/2325446/pexels-photo-2325446.jpeg?auto=compress&cs=tinysrgb&w=800',
//       'https://images.pexels.com/photos/3889929/pexels-photo-3889929.jpeg?auto=compress&cs=tinysrgb&w=800'
//     ],
//     highlights: [
//       'Stay in heritage palace hotels',
//       'Private butler service',
//       'Royal dining experiences',
//       'Exclusive palace tours',
//       'Luxury spa treatments',
//       'Private cultural performances'
//     ],
//     itinerary: [
//       { day: 1, title: 'Arrival in Udaipur', description: 'Airport pickup, check into Lake Palace Hotel.' },
//       { day: 2, title: 'Udaipur Royal Experience', description: 'Private palace tours, sunset boat ride.' },
//       { day: 3, title: 'Udaipur to Jodhpur', description: 'Private transfer to Umaid Bhawan Palace.' },
//       { day: 4, title: 'Jodhpur Palace Life', description: 'Exclusive palace experiences, spa treatments.' },
//       { day: 5, title: 'Jodhpur to Jaipur', description: 'Transfer to Rambagh Palace, royal welcome.' },
//       { day: 6, title: 'Jaipur Royal Tour', description: 'Private tours of Amber Fort and City Palace.' },
//       { day: 7, title: 'Jaipur Luxury Day', description: 'Shopping with personal shopper, cultural show.' },
//       { day: 8, title: 'Departure', description: 'Private transfer to airport.' }
//     ],
//     inclusions: [
//       'Luxury palace accommodation',
//       'All meals with wine',
//       'Private butler service',
//       'Luxury vehicle with chauffeur',
//       'Spa treatments',
//       'Private tours'
//     ],
//     exclusions: [
//       'International flights',
//       'Personal shopping',
//       'Additional spa treatments',
//       'Travel insurance',
//       'Gratuities'
//     ],
//     bestTime: 'October to March',
//     tags: ['luxury', 'palace', 'royal', 'exclusive'],
//     featured: false
//   }
// ];

// export const seedPackages = async () => {
//   try {
//     // Clear existing packages
//     await Package.deleteMany({});
//     console.log('Existing packages cleared');

//     // Insert sample packages
//     const packages = await Package.insertMany(samplePackages);
//     console.log(`${packages.length} sample packages inserted successfully`);

//     return packages;
//   } catch (error) {
//     console.error('Error seeding packages:', error);
//     throw error;
//   }
// };

// export { samplePackages };