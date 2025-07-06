# Incredible Tours - MERN Stack Travel Website

A comprehensive travel tour website built with the MERN stack, featuring responsive design, dark/light theme toggle, and a complete admin panel for managing tour packages and customer enquiries.

## ✨ Features

### Frontend
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Dark/Light Theme**: Smooth theme toggle with system preference detection
- **Hero Slideshow**: Beautiful image carousel with destination highlights
- **Tour Listings**: Advanced filtering by destination, duration, price, and search
- **Tour Details**: Comprehensive pages with image galleries, itineraries, and highlights
- **Enquiry System**: Modal forms with validation and user feedback
- **Admin Panel**: Complete CRUD operations for packages and enquiry management

### Backend
- **RESTful API**: Express.js with MongoDB integration
- **Data Models**: Package and Enquiry schemas with validation
- **Filtering**: Advanced query parameters for tour search
- **CORS Support**: Cross-origin requests enabled
- **Error Handling**: Comprehensive error responses

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd incredible-tours
   ```

2. **Install dependencies**
   ```bash
   # Install frontend dependencies
   npm install
   
   # Install backend dependencies (if separated)
   cd server && npm install && cd ..
   ```

3. **Environment setup**
   ```bash
   # Copy environment template
   cp .env.example .env
   
   # Edit .env with your configuration
   # Set MONGODB_URI for your database connection
   ```

4. **Start development servers**
   ```bash
   # Start frontend (Vite dev server)
   npm run dev
   
   # In another terminal, start backend
   npm run server:dev
   ```

5. **Seed sample data** (optional)
   ```bash
   # Make a POST request to seed sample tour packages
   curl -X POST http://localhost:5000/api/seed
   ```

## 🏗️ Project Structure

```
incredible-tours/
├── src/                          # Frontend React application
│   ├── components/               # Reusable UI components
│   │   ├── Header.jsx           # Navigation with theme toggle
│   │   ├── Footer.jsx           # Site footer with links
│   │   ├── Hero.jsx             # Homepage hero slideshow
│   │   ├── TourCard.jsx         # Tour package cards
│   │   └── EnquiryForm.jsx      # Contact/enquiry modal
│   ├── pages/                   # Main application pages
│   │   ├── Home.jsx             # Landing page with features
│   │   ├── Tours.jsx            # Tour listings with filters
│   │   ├── TourDetail.jsx       # Individual tour details
│   │   └── Admin.jsx            # Admin dashboard
│   ├── contexts/                # React contexts
│   │   └── ThemeContext.jsx     # Dark/light theme management
│   ├── utils/                   # Utility functions
│   │   └── api.js               # API calls and mock data
│   └── App.tsx                  # Main app component with routing
├── server/                      # Backend Express application
│   └── index.js                 # Express server with MongoDB
├── public/                      # Static assets
├── package.json                 # Dependencies and scripts
├── tailwind.config.js           # Tailwind CSS configuration
├── vite.config.ts              # Vite configuration
└── README.md                   # Project documentation
```

## 🎨 Design System

### Color Palette
- **Primary**: Orange (#F97316) - Warm, travel-inspired
- **Secondary**: Blue (#0EA5E9) - Trust and reliability  
- **Accent**: Green (#10B981) - Success and nature
- **Neutrals**: Gray scale for text and backgrounds

### Typography
- **Display**: Playfair Display (elegant headings)
- **Body**: Inter (clean, readable text)

### Components
- **Cards**: Rounded corners with hover animations
- **Buttons**: Multiple variants with smooth transitions
- **Forms**: Comprehensive validation with error states
- **Modals**: Backdrop blur with smooth animations

## 🔧 Configuration

### Environment Variables

```env
# Database
MONGODB_URI=mongodb://localhost:27017/incredible-tours

# Server
PORT=5000

# Frontend API URL
VITE_API_URL=http://localhost:5000/api

# Optional: Admin security
ADMIN_TOKEN=your-secret-token
```

### Theme Customization

The theme system supports:
- Automatic dark/light mode detection
- Manual theme toggle
- Persistent user preference
- Smooth color transitions

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

## 🛠️ API Endpoints

### Packages
```
GET    /api/packages           # Get all packages (with filters)
GET    /api/packages/:id       # Get single package
POST   /api/packages           # Create new package
PUT    /api/packages/:id       # Update package
DELETE /api/packages/:id       # Delete package
```

### Enquiries
```
POST   /api/enquiries          # Create new enquiry
GET    /api/enquiries          # Get all enquiries
PATCH  /api/enquiries/:id      # Update enquiry status
```

### Utility
```
POST   /api/seed               # Seed sample data
GET    /api/health             # Health check
```

## 🚀 Deployment

### Frontend (Netlify/Vercel)
1. Build the project: `npm run build`
2. Deploy the `dist` folder
3. Set environment variable: `VITE_API_URL=https://your-api-domain.com/api`

### Backend (Heroku/Railway)
1. Set environment variables in hosting platform
2. Ensure `MONGODB_URI` points to MongoDB Atlas
3. Deploy with: `npm run server`

### Database (MongoDB Atlas)
1. Create a MongoDB Atlas cluster
2. Add connection string to `MONGODB_URI`
3. Whitelist deployment server IPs

## 🧪 Development

### Available Scripts
```bash
npm run dev          # Start frontend development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run server       # Start backend server
npm run server:dev   # Start backend with nodemon
npm run lint         # Run ESLint
```

### Adding New Tours
1. Use the Admin panel at `/admin`
2. Or make API calls to `/api/packages`
3. Include required fields: title, description, location, duration, price

### Customizing Styles
- Modify `tailwind.config.js` for design system changes
- Update CSS custom properties for theme colors
- Components use Tailwind utility classes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support, email support@incredibletours.com or create an issue in the repository.

---

**Built with ❤️ using React, Express, MongoDB, and Tailwind CSS**# tourtravel
