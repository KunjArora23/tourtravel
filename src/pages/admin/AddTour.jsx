import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const AddTour = () => {
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");
  const [destinations, setDestinations] = useState("");
  const [itinerary, setItinerary] = useState([{ day: "", title: "", description: "" }]);
  const [image, setImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { cityId } = useParams();

  const handleItineraryChange = (index, field, value) => {
    const newItinerary = [...itinerary];
    newItinerary[index][field] = value;
    setItinerary(newItinerary);
  };

  const addItineraryField = () => {
    setItinerary([...itinerary, { day: "", title: "", description: "" }]);
  };

  const removeItineraryField = (index) => {
    if (itinerary.length > 1) {
      const newItinerary = [...itinerary];
      newItinerary.splice(index, 1);
      setItinerary(newItinerary);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("duration", duration);
    formData.append("cityId", cityId);
    formData.append("destinations", JSON.stringify(
      destinations.split(",").map(d => d.trim()).filter(d => d)
    ));
    formData.append("itinerary", JSON.stringify(itinerary));

    if (image) {
      formData.append("image", image);
    }

    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/admin/createtour",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Tour created successfully!");
      setTitle("");
      setDuration("");
      setDestinations("");
      setItinerary([{ day: "", title: "", description: "" }]);
      setImage(null);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error creating tour");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Add New Tour</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Tour Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Tour Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="E.g., Golden Triangle Tour"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            required
          />
        </div>

        {/* Duration */}
        <div>
          <label htmlFor="duration" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Duration
          </label>
          <input
            id="duration"
            type="text"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder="E.g., 5 days / 4 nights"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            required
          />
        </div>

        {/* Destinations */}
        <div>
          <label htmlFor="destinations" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Destinations (comma separated)
          </label>
          <input
            id="destinations"
            type="text"
            value={destinations}
            onChange={(e) => setDestinations(e.target.value)}
            placeholder="E.g., Delhi, Agra, Jaipur"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            required
          />
        </div>

        {/* Image Upload */}
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Tour Image (optional)
          </label>
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full text-sm text-gray-700 dark:text-white"
          />
        </div>

        {/* Itinerary */}
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Itinerary
          </label>

          {itinerary.map((item, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
              <div className="md:col-span-1">
                <input
                  type="text"
                  value={item.day}
                  onChange={(e) => handleItineraryChange(index, "day", e.target.value)}
                  placeholder="Day"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>

              <div className="md:col-span-4">
                <input
                  type="text"
                  value={item.title}
                  onChange={(e) => handleItineraryChange(index, "title", e.target.value)}
                  placeholder="Title"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>

              <div className="md:col-span-6">
                <input
                  type="text"
                  value={item.description}
                  onChange={(e) => handleItineraryChange(index, "description", e.target.value)}
                  placeholder="Description"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>

              <div className="md:col-span-1">
                {itinerary.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeItineraryField(index)}
                    className="text-red-500 hover:text-red-700 dark:hover:text-red-400"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addItineraryField}
            className="flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Day
          </button>
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full px-4 py-2 rounded-md text-white font-medium ${
              isSubmitting
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
            }`}
          >
            {isSubmitting ? "Creating..." : "Create Tour"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTour;