import React, { useState } from 'react';
import axios from 'axios';
import { useUser } from '@clerk/clerk-react';

function CreateEventForm({ onCancel }) { // Accept user as a prop
  
    const {user} = useUser()
  
    const [formData, setFormData] = useState({
    name: '',
    description: '',
    date: '',
    limit: '',
    location: '',
    organizer: localStorage.getItem('user_id').toString() || '' // Set the organizer to user.id by default
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name) newErrors.name = 'Event name is required';
    if (!formData.description) newErrors.description = 'Description is required';
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.limit) newErrors.limit = 'Attendee limit is required';
    if (!formData.location) newErrors.location = 'Location is required';
    if (!formData.organizer) newErrors.organizer = 'Organizer name is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      try {
        // Make an API call to save event data
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/event`, formData);
        
        // Handle successful response
        console.log('Event created successfully:', response.data);
        
        // Reset form after successful submission
        setFormData({
          name: '',
          description: '',
          date: '',
          limit: '',
          location: '',
          organizer: '' // Reset organizer to user.id
        });
        setErrors({});
        alert('Event created successfully!');
        onCancel(); // Call onCancel to close the modal after submission
      } catch (error) {
        console.error('Error creating event:', error);
        alert('Failed to create event. Please try again.');
      }
    }
  };

  const handleCancel = () => {
    setFormData({
      name: '',
      description: '',
      date: '',
      limit: '',
      location: '',
      organizer: user.id || '' // Reset organizer to user.id
    });
    setErrors({});
    onCancel(); // Call the onCancel prop to close the modal
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Create New Event</h1>
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Event Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-200 border shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50"
          />
          {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            name="description"
            rows="3"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-200 border shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50"
          ></textarea>
          {errors.description && <p className="mt-2 text-sm text-red-600">{errors.description}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-200 border shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50"
          />
          {errors.date && <p className="mt-2 text-sm text-red-600">{errors.date}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="limit" className="block text-sm font-medium text-gray-700">Attendee Limit</label>
          <input
            type="number"
            id="limit"
            name="limit"
            value={formData.limit}
            onChange={handleChange}
            min="1"
            className="mt-1 block w-full rounded-md border-gray-200 border shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50"
          />
          {errors.limit && <p className="mt-2 text-sm text-red-600">{errors.limit}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-200 border shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50"
          />
          {errors.location && <p className="mt-2 text-sm text-red-600">{errors.location}</p>}
        </div>

        <div className="mt-6 flex space-x-4">
          <button
            type="submit"
            className="w-full px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            Create Event
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="w-full px-4 py-2 border border-gray-200 border text-gray-700 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateEventForm;
