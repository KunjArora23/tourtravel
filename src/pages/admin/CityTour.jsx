import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
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

const CityTours = () => {
  const { cityId } = useParams();
  const [tours, setTours] = useState([]);
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

  const fetchTours = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/v1/admin/get-tours/city/${cityId}`, {
        withCredentials: true,
      });
      // Sort tours by order field
      const sortedTours = (res.data.tours || []).sort((a, b) => (a.order || 0) - (b.order || 0));
      setTours(sortedTours);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch tours");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (tourId) => {
    if (!window.confirm("Are you sure you want to delete this tour?")) return;
    try {
      await axios.delete(`http://localhost:8000/api/v1/admin/delete-tour/${tourId}`, {
        withCredentials: true,
      });
      setTours((prev) => prev.filter((t) => t._id !== tourId));
      toast.success("Tour deleted successfully");
    } catch (err) {
      console.error("Delete failed", err);
      toast.error("Failed to delete tour");
    }
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setTours((items) => {
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

  const saveNewOrder = async (updatedTours) => {
    try {
      setReordering(true);
      
      // Create array of tour orders for batch update
      const tourOrders = updatedTours.map((tour, index) => ({
        tourId: tour._id,
        order: index
      }));

      await axios.post('http://localhost:8000/api/v1/tour/admin/reorder', {
        tourOrders
      });

      toast.success('Tour order updated successfully');
    } catch (error) {
      console.error('Error updating tour order:', error);
      toast.error('Failed to update tour order');
      // Revert to original order if save fails
      fetchTours();
    } finally {
      setReordering(false);
    }
  };

  useEffect(() => {
    fetchTours();
  }, [cityId]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Tours in City</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Drag and drop tours to reorder them within this city.
          </p>
        </div>
        <button
          onClick={() => navigate(`/admin/addtour/${cityId}`)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
        >
          Add New Tour
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
      ) : tours.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">No tours found for this city.</p>
          <button
            onClick={() => navigate(`/admin/addtour/${cityId}`)}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
          >
            Add First Tour
          </button>
        </div>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={tours.map(tour => tour._id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-4">
              {tours.map((tour, index) => (
                <SortableTourCard 
                  key={tour._id}
                  tour={tour}
                  index={index}
                  totalTours={tours.length}
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

const SortableTourCard = ({ tour, index, totalTours, onDelete, reordering, onNavigate }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: tour._id });

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
            {index + 1} of {totalTours}
          </span>
        </div>

        {/* Tour Content */}
        <div className="flex-1">
          <div className="flex">
            {/* Tour Image */}
            <div className="w-48 h-32 overflow-hidden">
              <img
                src={tour.image || "https://via.placeholder.com/400x300?text=Tour+Image"}
                alt={tour.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/400x300?text=Tour+Image";
                }}
              />
            </div>

            {/* Tour Info */}
            <div className="flex-1 p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {tour.title}
                </h3>
                <div className="flex space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onNavigate(`/admin/edit-tour/${tour._id}`);
                    }}
                    className="text-blue-600 hover:text-blue-700 p-1"
                    title="Edit Tour"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(tour._id);
                    }}
                    className="text-red-600 hover:text-red-700 p-1"
                    title="Delete Tour"
                  >
                    🗑️
                  </button>
                </div>
              </div>
              
              <div className="space-y-1 mb-3">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  <strong>Destination:</strong> {tour.destinations?.join(", ")}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  <strong>Duration:</strong> {tour.duration}
                </p>
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => onNavigate(`/admin/tour/${tour._id}`)}
                  className="px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded hover:bg-blue-700 transition-colors"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CityTours;