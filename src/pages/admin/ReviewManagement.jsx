import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Edit, Trash2, Eye, EyeOff, Star, Upload, X, GripVertical } from 'lucide-react';
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

const ReviewManagement = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const [reordering, setReordering] = useState(false);
  const [formData, setFormData] = useState({
    customerName: '',
    rating: 5,
    review: '',
    image: null
  });
  const [imagePreview, setImagePreview] = useState('');

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8000/api/v1/review/');
      // Sort reviews by order field
      const sortedReviews = (response.data.reviews || []).sort((a, b) => (a.order || 0) - (b.order || 0));
      setReviews(sortedReviews);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      toast.error('Failed to fetch reviews');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file
      }));
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.customerName || !formData.review || !formData.image) {
      toast.error('Please fill all required fields');
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('customerName', formData.customerName);
      formDataToSend.append('rating', formData.rating);
      formDataToSend.append('review', formData.review);
      formDataToSend.append('image', formData.image);

      if (editingReview) {
        await axios.put(`http://localhost:8000/api/v1/review/${editingReview._id}`, formDataToSend, {
          withCredentials: true
        });
        toast.success('Review updated successfully');
      } else {
        await axios.post('http://localhost:8000/api/v1/review/create', formDataToSend, {
          withCredentials: true
        });
        toast.success('Review created successfully');
      }

      resetForm();
      fetchReviews();
    } catch (error) {
      console.error('Error saving review:', error);
      toast.error(error.response?.data?.message || 'Failed to save review');
    }
  };

  const handleEdit = (review) => {
    setEditingReview(review);
    setFormData({
      customerName: review.customerName,
      rating: review.rating,
      review: review.review,
      image: null
    });
    setImagePreview(review.image);
    setShowForm(true);
  };

  const handleDelete = async (reviewId) => {
    if (!window.confirm('Are you sure you want to delete this review?')) return;

    try {
      await axios.delete(`http://localhost:8000/api/v1/review/${reviewId}`, {
        withCredentials: true
      });
      toast.success('Review deleted successfully');
      fetchReviews();
    } catch (error) {
      console.error('Error deleting review:', error);
      toast.error('Failed to delete review');
    }
  };

  const handleToggleStatus = async (reviewId) => {
    try {
      await axios.patch(`http://localhost:8000/api/v1/review/${reviewId}/toggle`, {}, {
        withCredentials: true
      });
      toast.success('Review status updated');
      fetchReviews();
    } catch (error) {
      console.error('Error toggling review status:', error);
      toast.error('Failed to update review status');
    }
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setReviews((items) => {
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

  const saveNewOrder = async (updatedReviews) => {
    try {
      setReordering(true);
      
      // Create array of review orders for batch update
      const reviewOrders = updatedReviews.map((review, index) => ({
        reviewId: review._id,
        order: index
      }));

      await axios.post('http://localhost:8000/api/v1/review/admin/reorder', {
        reviewOrders
      });

      toast.success('Review order updated successfully');
    } catch (error) {
      console.error('Error updating review order:', error);
      toast.error('Failed to update review order');
      // Revert to original order if save fails
      fetchReviews();
    } finally {
      setReordering(false);
    }
  };

  const resetForm = () => {
    setFormData({
      customerName: '',
      rating: 5,
      review: '',
      image: null
    });
    setImagePreview('');
    setEditingReview(null);
    setShowForm(false);
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Review Management</h1>
            <p className="text-gray-600 mt-1">
              Drag and drop reviews to reorder them. The order will be reflected in the slideshow.
            </p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>Add Review</span>
          </button>
        </div>

        {/* Add/Edit Form */}
        {showForm && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                {editingReview ? 'Edit Review' : 'Add New Review'}
              </h2>
              <button
                onClick={resetForm}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Customer Name *
                  </label>
                  <input
                    type="text"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rating *
                  </label>
                  <select
                    name="rating"
                    value={formData.rating}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="5">5 Stars</option>
                    <option value="4">4 Stars</option>
                    <option value="3">3 Stars</option>
                    <option value="2">2 Stars</option>
                    <option value="1">1 Star</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Review *
                </label>
                <textarea
                  name="review"
                  value={formData.review}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Write your review here..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Customer Image *
                </label>
                <div className="flex items-center space-x-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required={!editingReview}
                  />
                  {imagePreview && (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-16 h-16 object-cover rounded-lg border"
                    />
                  )}
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {editingReview ? 'Update Review' : 'Add Review'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Reviews List */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No reviews found.</p>
            <button
              onClick={() => setShowForm(true)}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Add First Review
            </button>
          </div>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={reviews.map(review => review._id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-4">
                {reviews.map((review, index) => (
                  <SortableReviewCard 
                    key={review._id}
                    review={review}
                    index={index}
                    totalReviews={reviews.length}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onToggleStatus={handleToggleStatus}
                    reordering={reordering}
                    renderStars={renderStars}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}
      </div>
    </div>
  );
};

const SortableReviewCard = ({ review, index, totalReviews, onEdit, onDelete, onToggleStatus, reordering, renderStars }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: review._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 ${
        isDragging ? 'shadow-2xl scale-105' : ''
      }`}
    >
      <div className="flex">
        {/* Drag Handle */}
        <div 
          {...attributes}
          {...listeners}
          className="w-16 bg-gray-50 p-4 flex flex-col items-center justify-center cursor-grab active:cursor-grabbing"
        >
          <GripVertical className="w-5 h-5 text-gray-400" />
          <span className="text-xs text-gray-500 mt-1">
            {index + 1} of {totalReviews}
          </span>
        </div>

        {/* Review Content */}
        <div className="flex-1">
          <div className="flex">
            {/* Review Image */}
            <div className="w-32 h-32 overflow-hidden">
              <img
                src={review.image}
                alt={review.customerName}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/128x128?text=Customer";
                }}
              />
            </div>

            {/* Review Info */}
            <div className="flex-1 p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {review.customerName}
                  </h3>
                  <div className="flex items-center space-x-1 mt-1">
                    {renderStars(review.rating)}
                    <span className="text-sm text-gray-600">({review.rating}/5)</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => onToggleStatus(review._id)}
                    className={`p-2 rounded-full ${
                      review.isActive 
                        ? 'text-green-600 hover:text-green-700' 
                        : 'text-red-600 hover:text-red-700'
                    }`}
                    title={review.isActive ? 'Deactivate Review' : 'Activate Review'}
                  >
                    {review.isActive ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => onEdit(review)}
                    className="text-blue-600 hover:text-blue-700 p-2"
                    title="Edit Review"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDelete(review._id)}
                    className="text-red-600 hover:text-red-700 p-2"
                    title="Delete Review"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <p className="text-gray-600 text-sm line-clamp-3">
                {review.review}
              </p>
              
              <div className="mt-2 text-xs text-gray-500">
                Created: {new Date(review.createdAt).toLocaleDateString()}
                {review.isActive && (
                  <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                    Active
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewManagement; 