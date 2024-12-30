import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useData } from '../context/DataContext';

const EditEvent = () => {
    const { eventID } = useParams();
    const navigate = useNavigate();
    const { setLoading } = useData();
    
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        date: '',
        location: '',
        price: '',
        limit: '',
        poster: null
    });
    
    const [previewImage, setPreviewImage] = useState(null);
    const [errors, setErrors] = useState({});

    // Fetch current event data
    const fetchEventDetails = async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/event/${eventID}`
            );
            if (response.data.success) {
                const event = response.data.event;
                setFormData({
                    name: event.name,
                    description: event.description,
                    date: new Date(event.date).toISOString().split('T')[0],
                    location: event.location,
                    price: event.price,
                    limit: event.limit,
                    poster: null
                });
                setPreviewImage(event.poster);
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.error('Error fetching event:', error);
            alert('Failed to fetch event details');
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchEventDetails();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({
                ...prev,
                poster: file
            }));
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.description.trim()) newErrors.description = 'Description is required';
        if (!formData.date) newErrors.date = 'Date is required';
        if (!formData.location.trim()) newErrors.location = 'Location is required';
        if (!formData.price || formData.price <= 0) newErrors.price = 'Valid price is required';
        if (!formData.limit || formData.limit <= 0) newErrors.limit = 'Valid ticket limit is required';
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!validateForm()) return;
    
        setLoading(true);
    
        try {
            // Create FormData to handle both the poster and other fields
            const formDataToSend = new FormData();
            formDataToSend.append('name', formData.name);
            formDataToSend.append('description', formData.description);
            formDataToSend.append('date', formData.date);
            formDataToSend.append('location', formData.location);
            formDataToSend.append('price', formData.price);
            formDataToSend.append('limit', formData.limit);
            formDataToSend.append('oldImageUrl', previewImage); // Pass the current poster URL as oldImageUrl
    
            if (formData.poster) {
                formDataToSend.append('poster', formData.poster); // Add the new poster file if uploaded
            }
    
            // Send the PUT request
            const response = await axios.put(
                `${import.meta.env.VITE_API_URL}/event/${eventID}`,
                formDataToSend,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
    
            if (response.data.success) {
                alert('Event updated successfully!');
                navigate(`/app/eventDetails/${eventID}`);
            } else {
                alert(response.data.message || 'Failed to update event');
            }
        } catch (error) {
            console.error('Error updating event:', error);
            alert('Failed to update event');
        }
    
        setLoading(false);
    };
    
    

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-semibold text-gray-900 mb-8">Edit Event</h1>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Event Image */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Event Poster</label>
                        <div className="mt-2">
                            {previewImage && (
                                <img 
                                    src={previewImage} 
                                    alt="Event preview" 
                                    className="mb-4 w-full h-64 object-cover rounded-lg"
                                />
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="w-full"
                            />
                        </div>
                    </div>

                    {/* Event Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Event Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${errors.name ? 'border-red-500' : ''}`}
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            rows={4}
                            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${errors.description ? 'border-red-500' : ''}`}
                        />
                        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                    </div>

                    {/* Date and Location */}
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Date</label>
                            <input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleInputChange}
                                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${errors.date ? 'border-red-500' : ''}`}
                            />
                            {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Location</label>
                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleInputChange}
                                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${errors.location ? 'border-red-500' : ''}`}
                            />
                            {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
                        </div>
                    </div>

                    {/* Price and Ticket Limit */}
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Price ($)</label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleInputChange}
                                min="0"
                                step="0.01"
                                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${errors.price ? 'border-red-500' : ''}`}
                            />
                            {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Ticket Limit</label>
                            <input
                                type="number"
                                name="limit"
                                value={formData.limit}
                                onChange={handleInputChange}
                                min="1"
                                className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${errors.limit ? 'border-red-500' : ''}`}
                            />
                            {errors.limit && <p className="text-red-500 text-sm mt-1">{errors.limit}</p>}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={() => navigate(`/app/eventDetails/${eventID}`)}
                            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
                        >
                            Cancel
                        </button>
                        <button
                       
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                        >
                            Update Event
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditEvent;