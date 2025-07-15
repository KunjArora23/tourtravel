import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import TourDetail from './pages/admin/TourDetail.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import AdminLogin from './pages/AdminLogin.jsx';
import FloatingCTA from './components/FloatingCTA.jsx';

import AnimatedPageWrapper from './components/AnimatedPageWrapper.jsx';
import MultiContactButton from './components/MultiContact.jsx';
import ChatbotWidget from './components/ChatbotWidget.jsx';
import CityTourListPage from './pages/Cities.jsx';
import CityTourDetailPage from './pages/CityTourDetailpage.jsx';
import TourDetailPage from './pages/TourDetailUser.jsx';
import { ThemeProvider } from './contexts/ThemeContext.jsx';
import DownloadPopup from './components/DownloadPopup.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import AdminDashboard from './pages/admin/AdminDashboarsd.jsx';
import CreateCity from './pages/admin/Createcity.jsx';
import AddTour from './pages/admin/AddTour.jsx';
import CityList from './pages/admin/Citylist.jsx';
import CityTours from './pages/admin/CityTour.jsx';
import TourDetailUser from './pages/TourDetailUser.jsx';
import EditCity from './pages/admin/EditCity.jsx';
import EditTour from './pages/admin/EditTour.jsx';
import ReviewManagement from './pages/admin/ReviewManagement.jsx';
import FeaturedTours from './pages/admin/FeaturedTours.jsx';
import Cities from './pages/Cities.jsx';
import { Scroll } from 'lucide-react';
import ScrollToTop from './components/ScrollToTop.jsx';
import ContactSubmissions from './pages/admin/ContactSubmissions.jsx';

function App() {
  return (

    <ThemeProvider>


      <Router>
        <ScrollToTop/>
          <AuthProvider>

            <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
              <Header />
              <main>
                <AnimatedPageWrapper>

                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/tours" element={<Cities />} />
                    <Route path="/tours/:id" element={<TourDetail />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/citytour/:id" element={<CityTourDetailPage />} />
                    {/* <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} /> */}
                    <Route path="/tour/:id" element={<TourDetailUser />} />

                    {/* admin routes */}
                    <Route path="/admin" element={<AdminLogin />} />
                    <Route path="/admin/dashboard" element={<AdminDashboard />} />
                    <Route path="/admin/createcity" element={<CreateCity />} />
                    <Route path="/admin/addtour/:cityId" element={<AddTour />} />
                    <Route path="/admin/getcities" element={<CityList />} />
                    <Route path="/admin/city/:cityId/tours" element={<CityTours />} />
                    <Route path="/admin/tour/:id" element={<TourDetail />} />
                    <Route path="/admin/editcity/:id" element={<EditCity />} />
                    <Route path="/admin/edit-tour/:id" element={<EditTour />} />
                    <Route path="/admin/reviews" element={<ReviewManagement />} />
                    <Route path="/admin/featured-tours" element={<FeaturedTours />} />
                    <Route path="/admin/contact-submissions" element={<ContactSubmissions />} />

                  </Routes>
                </AnimatedPageWrapper>
              </main>
              <Footer />
            </div>

          </AuthProvider>
       
      </Router>
      {/* <DownloadPopup /> */}

      <MultiContactButton />
      <ChatbotWidget position="bottom-left" />
      <ToastContainer position="bottom-right" autoClose={2000} pauseOnHover />
    </ThemeProvider>
  );
}

export default App;