import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditTour = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [tour, setTour] = useState({
    title: "",
    duration: "",
    destinations: [],
    itinerary: [],
  });
  const [image, setImage] = useState(null);
  const [newDay, setNewDay] = useState({ day: "", title: "", description: "" });

  useEffect(() => {
    const fetchTour = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/v1/tour/${id}`);
        setTour({
          title: res.data.tour.title,
          duration: res.data.tour.duration,
          destinations: res.data.tour.destinations,
          itinerary: res.data.tour.itinerary,
        });
      } catch (error) {
        console.error("Error fetching tour:", error);
      }
    };

    fetchTour();
  }, [id]);

  const handleChange = (e) => {
    setTour({ ...tour, [e.target.name]: e.target.value });
  };

  const handleDestinationChange = (index, value) => {
    const updated = [...tour.destinations];
    updated[index] = value;
    setTour({ ...tour, destinations: updated });
  };

  const handleItineraryChange = (index, field, value) => {
    const updated = [...tour.itinerary];
    updated[index][field] = value;
    setTour({ ...tour, itinerary: updated });
  };

  const addItineraryDay = () => {
    setTour({ ...tour, itinerary: [...tour.itinerary, newDay] });
    setNewDay({ day: "", title: "", description: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("title", tour.title);
    form.append("duration", tour.duration);
    form.append("destinations", JSON.stringify(tour.destinations));
    form.append("itinerary", JSON.stringify(tour.itinerary));
    if (image) form.append("image", image);

    try {
      await axios.put(`http://localhost:8000/api/v1/admin/updatetour/${id}`, form, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      alert("Tour updated successfully");
      navigate(`/admin/city/${tour.city}/tours`);
    } catch (error) {
      console.error("Update failed", error);
      alert("Failed to update tour");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow mt-10">
      <h2 className="text-2xl font-bold mb-4">Edit Tour</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={tour.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full border px-4 py-2 rounded"
          required
        />
        <input
          type="text"
          name="duration"
          value={tour.duration}
          onChange={handleChange}
          placeholder="Duration"
          className="w-full border px-4 py-2 rounded"
          required
        />

        {/* Destinations */}
        <div className="space-y-2">
          <label className="font-semibold">Destinations:</label>
          {tour.destinations.map((dest, index) => (
            <input
              key={index}
              value={dest}
              onChange={(e) => handleDestinationChange(index, e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
          ))}
          <button
            type="button"
            onClick={() => setTour({ ...tour, destinations: [...tour.destinations, ""] })}
            className="text-sm text-blue-600"
          >
            + Add Destination
          </button>
        </div>

        {/* Itinerary */}
        <div>
          <label className="font-semibold">Itinerary:</label>
          {tour.itinerary.map((item, index) => (
            <div key={index} className="grid grid-cols-3 gap-2 mb-2">
              <input
                value={item.day}
                onChange={(e) => handleItineraryChange(index, "day", e.target.value)}
                placeholder="Day"
                className="border px-2 py-1 rounded"
              />
              <input
                value={item.title}
                onChange={(e) => handleItineraryChange(index, "title", e.target.value)}
                placeholder="Title"
                className="border px-2 py-1 rounded"
              />
              <input
                value={item.description}
                onChange={(e) => handleItineraryChange(index, "description", e.target.value)}
                placeholder="Description"
                className="border px-2 py-1 rounded"
              />
            </div>
          ))}

          {/* Add new itinerary day */}
          <div className="grid grid-cols-3 gap-2 mt-2">
            <input
              value={newDay.day}
              onChange={(e) => setNewDay({ ...newDay, day: e.target.value })}
              placeholder="Day"
              className="border px-2 py-1 rounded"
            />
            <input
              value={newDay.title}
              onChange={(e) => setNewDay({ ...newDay, title: e.target.value })}
              placeholder="Title"
              className="border px-2 py-1 rounded"
            />
            <input
              value={newDay.description}
              onChange={(e) => setNewDay({ ...newDay, description: e.target.value })}
              placeholder="Description"
              className="border px-2 py-1 rounded"
            />
          </div>
          <button
            type="button"
            onClick={addItineraryDay}
            className="text-sm text-blue-600 mt-1"
          >
            + Add Itinerary Day
          </button>
        </div>

        {/* Image */}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Update Tour
        </button>
      </form>
    </div>
  );
};

export default EditTour;