
import React from "react";
import { useNavigate } from "react-router-dom";
import { Star } from "lucide-react";

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Admin Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Add City Card */}
          <div
            onClick={() => navigate("/admin/createcity")}
            className="cursor-pointer bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition"
          >
            <h2 className="text-xl font-semibold text-blue-600 mb-2">Add City</h2>
            <p className="text-gray-600">
              Create a new city tour package with title, description, and a cover image.
            </p>
          </div>

          {/* Manage Tours Card */}
          <div
            onClick={() => navigate("/admin/getcities")}
            className="cursor-pointer bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition"
          >
            <h2 className="text-xl font-semibold text-green-600 mb-2">Manage Tours</h2>
            <p className="text-gray-600">
              View existing cities and add tours inside each city package.
            </p>
          </div>

          {/* Featured Tours Card */}
          <div
            onClick={() => navigate("/admin/featured-tours")}
            className="cursor-pointer bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition"
          >
            <div className="flex items-center mb-2">
              <Star className="w-5 h-5 text-yellow-500 mr-2" />
              <h2 className="text-xl font-semibold text-yellow-600">Featured Tours</h2>
            </div>
            <p className="text-gray-600">
              Select which tours to display in the hero section slideshow on the home page.
            </p>
          </div>

          {/* Manage Reviews Card */}
          <div
            onClick={() => navigate("/admin/reviews")}
            className="cursor-pointer bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition"
          >
            <h2 className="text-xl font-semibold text-purple-600 mb-2">Manage Reviews</h2>
            <p className="text-gray-600">
              Add, edit, and manage customer reviews that appear on the home page.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;