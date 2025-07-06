
import React from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Admin Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;