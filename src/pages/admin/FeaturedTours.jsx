import React, { useState, useEffect } from 'react';
import { Star, StarOff, Eye, Edit, Trash2, Plus, GripVertical } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  // DragEndEvent,
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

const FeaturedTours = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(null);
  const [reordering, setReordering] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    fetchTours();
  }, []);

  const fetchTours = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8000/api/v1/tour/admin/all');
      setTours(response.data.tours || []);
    } catch (error) {
      console.error('Error fetching tours:', error);
      toast.error('Failed to fetch tours');
    } finally {
      setLoading(false);
    }
  };

  const toggleFeatured = async (tourId) => {
    try {
      setUpdating(tourId);
      const response = await axios.patch(`http://localhost:8000/api/v1/tour/admin/${tourId}/toggle-featured`);
      
      // Update the tour in the local state
      setTours(prevTours => 
        prevTours.map(tour => 
          tour._id === tourId 
            ? { ...tour, featured: !tour.featured }
            : tour
        )
      );

      toast.success(response.data.message);
    } catch (error) {
      console.error('Error toggling featured status:', error);
      toast.error('Failed to update featured status');
    } finally {
      setUpdating(null);
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

  const featuredTours = tours.filter(tour => tour.featured);
  const nonFeaturedTours = tours.filter(tour => !tour.featured);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Featured Tours Management
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Drag and drop tours to reorder them. The order will be reflected on the home page.
              </p>
            </div>
            <Link
              to="/admin/dashboard"
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <Star className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Featured Tours</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{featuredTours.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <StarOff className="w-6 h-6 text-gray-600 dark:text-gray-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Non-Featured</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{nonFeaturedTours.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                <Plus className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Tours</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{tours.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Tours Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <Star className="w-6 h-6 text-yellow-500 mr-2" />
            Currently Featured ({featuredTours.length})
          </h2>
          {featuredTours.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 text-center">
              <StarOff className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400">No tours are currently featured</p>
            </div>
          ) : (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={featuredTours.map(tour => tour._id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-4">
                  {featuredTours.map((tour, index) => (
                    <SortableTourCard 
                      key={tour._id} 
                      tour={tour} 
                      onToggleFeatured={toggleFeatured}
                      updating={updating}
                      reordering={reordering}
                      isFeatured={true}
                      index={index}
                      totalFeatured={featuredTours.length}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          )}
        </div>

        {/* Non-Featured Tours Section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <StarOff className="w-6 h-6 text-gray-500 mr-2" />
            Available Tours ({nonFeaturedTours.length})
          </h2>
          {nonFeaturedTours.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 text-center">
              <Star className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400">All tours are currently featured!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {nonFeaturedTours.map((tour) => (
                <TourCard 
                  key={tour._id} 
                  tour={tour} 
                  onToggleFeatured={toggleFeatured}
                  updating={updating}
                  isFeatured={false}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const SortableTourCard = ({ tour, onToggleFeatured, updating, reordering, isFeatured, index, totalFeatured }) => {
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
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden ${
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
          <GripVertical className="w-6 h-6 text-gray-400" />
          <span className="text-xs text-gray-500 mt-1">
            {index + 1} of {totalFeatured}
          </span>
        </div>

        {/* Tour Content */}
        <div className="flex-1">
          <div className="flex">
            {/* Tour Image */}
            <div className="w-48 h-48 overflow-hidden">
              <img
                src={tour.image || 'https://images.pexels.com/photos/3881104/pexels-photo-3881104.jpeg?auto=compress&cs=tinysrgb&w=800'}
                alt={tour.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://images.pexels.com/photos/3881104/pexels-photo-3881104.jpeg?auto=compress&cs=tinysrgb&w=800';
                }}
              />
            </div>

            {/* Tour Info */}
            <div className="flex-1 p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {tour.title}
                </h3>
                <button
                  onClick={() => onToggleFeatured(tour._id)}
                  disabled={updating === tour._id}
                  className={`p-2 rounded-full shadow-lg transition-all duration-200 ${
                    isFeatured 
                      ? 'bg-yellow-500 hover:bg-yellow-600 text-white' 
                      : 'bg-gray-500 hover:bg-gray-600 text-white'
                  } ${updating === tour._id ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {updating === tour._id ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : isFeatured ? (
                    <Star className="w-4 h-4" />
                  ) : (
                    <StarOff className="w-4 h-4" />
                  )}
                </button>
              </div>
              
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Duration: {tour.duration}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                City: {tour.city?.name || 'Unknown'}
              </p>
              
              {/* Actions */}
              <div className="flex space-x-2">
                <Link
                  to={`/admin/tour/${tour._id}`}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 px-3 rounded-lg transition-colors duration-200 flex items-center justify-center"
                >
                  <Eye className="w-4 h-4 mr-1" />
                  View
                </Link>
                <Link
                  to={`/admin/edit-tour/${tour._id}`}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white text-sm py-2 px-3 rounded-lg transition-colors duration-200 flex items-center justify-center"
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TourCard = ({ tour, onToggleFeatured, updating, isFeatured }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Tour Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={tour.image || 'https://images.pexels.com/photos/3881104/pexels-photo-3881104.jpeg?auto=compress&cs=tinysrgb&w=800'}
          alt={tour.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = 'https://images.pexels.com/photos/3881104/pexels-photo-3881104.jpeg?auto=compress&cs=tinysrgb&w=800';
          }}
        />
        <div className="absolute top-2 right-2">
          <button
            onClick={() => onToggleFeatured(tour._id)}
            disabled={updating === tour._id}
            className={`p-2 rounded-full shadow-lg transition-all duration-200 ${
              isFeatured 
                ? 'bg-yellow-500 hover:bg-yellow-600 text-white' 
                : 'bg-gray-500 hover:bg-gray-600 text-white'
            } ${updating === tour._id ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {updating === tour._id ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : isFeatured ? (
              <Star className="w-4 h-4" />
            ) : (
              <StarOff className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Tour Info */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
          {tour.title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          Duration: {tour.duration}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
          City: {tour.city?.name || 'Unknown'}
        </p>
        
        {/* Actions */}
        <div className="flex space-x-2">
          <Link
            to={`/admin/tour/${tour._id}`}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 px-3 rounded-lg transition-colors duration-200 flex items-center justify-center"
          >
            <Eye className="w-4 h-4 mr-1" />
            View
          </Link>
          <Link
            to={`/admin/edit-tour/${tour._id}`}
            className="flex-1 bg-gray-600 hover:bg-gray-700 text-white text-sm py-2 px-3 rounded-lg transition-colors duration-200 flex items-center justify-center"
          >
            <Edit className="w-4 h-4 mr-1" />
            Edit
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturedTours; 