// src/pages/admin/EditCity.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditCity = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [city, setCity] = useState({ title: "", description: "" });
    const [image, setImage] = useState(null);

    useEffect(() => {
        const fetchCity = async () => {
            try {
                const res = await axios.get(`http://localhost:8000/api/v1/city/get/${id}`);
                setCity({
                    title: res.data.city.title,
                    description: res.data.city.description,
                });
            } catch (error) {
                console.error("Error fetching city:", error);
            }
        };

        fetchCity();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", city.title);
        formData.append("description", city.description);
        if (image) formData.append("image", image);

        try {
            await axios.put(`http://localhost:8000/api/v1/admin/updatecity/${id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true,
            });
            alert("City updated successfully!");
            navigate("/admin/getcities");
        } catch (error) {
            console.error("Error updating city:", error);
            alert("Failed to update city.");
        }
    };

    return (
        <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow mt-10">
            <h2 className="text-2xl font-bold mb-6">Edit City</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="City Title"
                    value={city.title}
                    onChange={(e) => setCity({ ...city, title: e.target.value })}
                    required
                    className="w-full border border-gray-300 px-4 py-2 rounded"
                />
                <textarea
                    placeholder="Description"
                    value={city.description}
                    onChange={(e) => setCity({ ...city, description: e.target.value })}
                    required
                    className="w-full border border-gray-300 px-4 py-2 rounded min-h-[180px] resize-y"
                ></textarea>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                    className="block"
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                >
                    Update City
                </button>
            </form>
        </div>
    );
};

export default EditCity;