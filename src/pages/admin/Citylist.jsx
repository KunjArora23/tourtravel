import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GripVertical } from 'lucide-react';
import { toast } from 'react-toastify';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const CityList = () => {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reordering, setReordering] = useState(false);
  const navigate = useNavigate();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const fetchCities = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:8000/api/v1/city/getAll");
      setCities(res.data?.data || res.data?.cities || []);
      setError(null);
    } catch (error) {
      console.error("Error fetching cities:", error);
      setError("Failed to load cities. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCities();
  }, []);

  const handleDelete = async (e, cityId) => {
    e.stopPropagation();
    if (!window.confirm("Are you sure you want to delete this city and all its tours?")) return;

    try {
      await axios.delete(`http://localhost:8000/api/v1/admin/delete-city/${cityId}`, { withCredentials: true });
      toast.success("City deleted successfully");
      fetchCities(); // Refresh city list
    } catch (error) {
      console.error("Error deleting city:", error);
      toast.error("Failed to delete city");
    }
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setCities((items) => {
        const oldIndex = items.findIndex(item => item._id === active.id);
        const newIndex = items.findIndex(item => item._id === over.id);
        
        const newItems = arrayMove(items, oldIndex, newIndex);
        
        // Update order values based on new positions
        const updatedItems = newItems.map((item, index) => ({
          ...item,
          order: index
        }));
        
        // Save the new order to the backend
        saveNewOrder(updatedItems);
        
        return updatedItems;
      });
    }
  };

  const saveNewOrder = async (updatedCities) => {
    try {
      setReordering(true);
      
      // Create array of city orders for batch update
      const cityOrders = updatedCities.map((city, index) => ({
        cityId: city._id,
        order: index
      }));

      await axios.post('http://localhost:8000/api/v1/city/admin/reorder', {
        cityOrders
      });

      toast.success('City order updated successfully');
    } catch (error) {
      console.error('Error updating city order:', error);
      toast.error('Failed to update city order');
      // Revert to original order if save fails
      fetchCities();
    } finally {
      setReordering(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Cities Management</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Drag and drop cities to reorder them. The order will be reflected on the user interface.
          </p>
        </div>
        <button
          onClick={() => navigate('/admin/createcity')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
        >
          Add New City
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
          <p>{error}</p>
        </div>
      ) : cities.length === 0 ? (
        <div className="text-center py-12">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">No cities found</h3>
          <p className="mt-1 text-gray-500 dark:text-gray-400">Get started by adding a new city.</p>
        </div>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={cities.map(city => city._id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-4">
              {cities.map((city, index) => (
                <SortableCityCard 
                  key={city._id}
                  city={city}
                  index={index}
                  totalCities={cities.length}
                  onDelete={handleDelete}
                  reordering={reordering}
                  onNavigate={navigate}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
};

const SortableCityCard = ({ city, index, totalCities, onDelete, reordering, onNavigate }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: city._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700 ${
        isDragging ? 'shadow-2xl scale-105' : ''
      }`}
    >
      <div className="flex">
        {/* Drag Handle */}
        <div 
          {...attributes}
          {...listeners}
          className="w-16 bg-gray-50 dark:bg-gray-700 p-4 flex flex-col items-center justify-center cursor-grab active:cursor-grabbing"
        >
          <GripVertical className="w-5 h-5 text-gray-400" />
          <span className="text-xs text-gray-500 mt-1">
            {index + 1} of {totalCities}
          </span>
        </div>

        {/* City Content */}
        <div className="flex-1">
          <div className="flex">
            {/* City Image */}
            <div className="w-48 h-32 overflow-hidden">
              <img
                src={city.image}
                alt={city.title}
                className="h-full w-full object-cover"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/300x200?text=City+Image";
                }}
              />
            </div>

            {/* City Info */}
            <div className="flex-1 p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {city.title}
                </h3>
                <div className="flex space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onNavigate(`/admin/editcity/${city._id}`);
                    }}
                    className="text-yellow-600 hover:text-yellow-700 p-1"
                    title="Edit City"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={(e) => onDelete(e, city._id)}
                    className="text-red-600 hover:text-red-700 p-1"
                    title="Delete City"
                  >
                    🗑️
                  </button>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                {city.description}
              </p>
              
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {city.tours?.length || 0} tours available
                </span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => onNavigate(`/admin/city/${city._id}/tours`)}
                    className="px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded hover:bg-blue-700 transition-colors"
                  >
                    View Tours
                  </button>
                  <button
                    onClick={() => onNavigate(`/admin/addtour/${city._id}`)}
                    className="px-3 py-1 bg-green-600 text-white text-xs font-medium rounded hover:bg-green-700 transition-colors"
                  >
                    Add Tour
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CityList;