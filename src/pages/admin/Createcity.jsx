import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function CreateCity() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim() || !description.trim() || !image) {
      return setMessage({ text: "All fields are required.", type: 'error' });
    }

    setLoading(true);
    setMessage({ text: '', type: '' });

    const formData = new FormData();
    formData.append('title', title.trim());
    formData.append('description', description.trim());
    formData.append('image', image);

    try {
      const res = await axios.post(
        'http://localhost:8000/api/v1/admin/createcity', 
        formData, 
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          withCredentials: true
        }
      );
      
      setMessage({ 
        text: res.data.message || 'City created successfully!', 
        type: 'success' 
      });
      
      // Reset form
      setTitle('');
      setDescription('');
      setImage(null);
      setPreview('');
      
      // Redirect after 2 seconds
      setTimeout(() => navigate('/admin/getcities'), 2000);
    } catch (err) {
      setMessage({ 
        text: err.response?.data?.message || 'Error creating city', 
        type: 'error' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
        Add New City
      </h2>
      
      {message.text && (
        <div className={`mb-4 p-3 rounded-md ${
          message.type === 'error' 
            ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-100' 
            : 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-100'
        }`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            City Name
          </label>
          <input
            id="title"
            type="text"
            placeholder="E.g., Paris, Tokyo"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            disabled={loading}
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Description
          </label>
          <textarea
            id="description"
            placeholder="Describe the city and its attractions..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            disabled={loading}
          ></textarea>
        </div>

        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            City Image
          </label>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700 dark:file:bg-blue-900 dark:file:text-blue-100
                  hover:file:bg-blue-100 dark:hover:file:bg-blue-800
                  cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
                disabled={loading}
              />
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                JPEG, PNG, or WEBP (Max 5MB)
              </p>
            </div>
            
            {preview && (
              <div className="flex-shrink-0">
                <img 
                  src={preview} 
                  alt="Preview" 
                  className="h-24 w-24 object-cover rounded-md border border-gray-200 dark:border-gray-600"
                />
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => navigate('/admin/cities')}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className={`px-6 py-2 rounded-md text-white font-medium ${
              loading 
                ? 'bg-blue-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800'
            } transition-colors`}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating...
              </span>
            ) : 'Create City'}
          </button>
        </div>
      </form>
    </div>
  );
}