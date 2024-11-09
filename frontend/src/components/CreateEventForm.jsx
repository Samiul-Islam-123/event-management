import React, { useState } from 'react';
import axios from 'axios';
import { useUser } from '@clerk/clerk-react';
import { useFormData } from '../context/FormDataContext';

function CreateEventForm({ onCancel }) {
  const { user } = useUser();
  const { saveFormData } = useFormData();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    date: '',
    limit: '',
    location: '',
    price: '',
    posterURL: '',
    qrCodeURL: '', // Field for payment QR code URL
    organizer: localStorage.getItem('user_id')?.toString() || '' // Organizer's user ID
  });

  const [poster, setPoster] = useState(null); // Event poster image file
  const [qrCode, setQrCode] = useState(null); // Payment QR code image file
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handlePosterChange = (e) => {
    setPoster(e.target.files[0]); // Capture the selected poster file
  };



  const handleQrCodeChange = (e) => {
    setQrCode(e.target.files[0]);
  }

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name) newErrors.name = 'Event name is required';
    if (!formData.description) newErrors.description = 'Description is required';
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.limit) newErrors.limit = 'Attendee limit is required';
    if (!formData.location) newErrors.location = 'Location is required';
    if (!formData.price) newErrors.price = 'Ticket price is required';
    if (!poster) newErrors.poster = 'An event poster image is required';
    if (!qrCode) newErrors.qrCode = 'A QR code for payment is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const formDataObj = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataObj.append(key, formData[key]);
      });

      // Upload the poster image
      const posterData = new FormData();
      posterData.append('poster', poster);
      const posterResponse = await axios.post(`${import.meta.env.VITE_API_URL}/event/poster`, posterData);
      if (posterResponse.data.success) {
        formDataObj.append('posterURL', posterResponse.data.url);
      } else {
        throw new Error('Failed to upload poster');
      }

      // Upload the QR code image
      const qrCodeData = new FormData();
      qrCodeData.append('qrCode', qrCode);
      const qrCodeResponse = await axios.post(`${import.meta.env.VITE_API_URL}/event/qrCode`, qrCodeData);
      if (qrCodeResponse.data.success) {
        formDataObj.append('qrCodeURL', qrCodeResponse.data.url);
      } else {
        throw new Error('Failed to upload QR code');
      }

      // Store the updated formData in session storage
      sessionStorage.setItem('formData', JSON.stringify(formDataObj));

      const response = await axios.post(`${import.meta.env.VITE_API_URL}/payment/checkout-session`, {
        price: 20, // $20 for creating event
        name: formData.name
      }, {
        headers: { 'Content-Type': 'application/json' }
      });

      console.log(response);

      // Reset form after submission
      setFormData({
        name: '',
        description: '',
        date: '',
        limit: '',
        location: '',
        price: '',
        organizer: user.id || ''
      });
      setPoster(null);
      setQrCode(null);
      setErrors({});

      if (response.data.success) {
        window.location.href = response.data.url;
      } else {
        alert(response.data.message);
      }

      onCancel();
    } catch (error) {
      console.error('Error creating event:', error);
      alert('Failed to create event. Please try again.');
    }
  };

  const handleCancel = () => {
    setFormData({
      name: '',
      description: '',
      date: '',
      limit: '',
      location: '',
      price: '',
      organizer: user.id || ''
    });
    setPoster(null);
    setQrCode(null);
    setErrors({});
    onCancel();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Create New Event (for $20)</h1>
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

        <div className="mb-4">
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">Ticket Price ($)</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            min="0"
            className="mt-1 block w-full rounded-md border-gray-200 border shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50"
          />
          {errors.price && <p className="mt-2 text-sm text-red-600">{errors.price}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="poster" className="block text-sm font-medium text-gray-700">Event Poster</label>
          <input
            type="file"
            id="poster"
            name="poster"
            onChange={handlePosterChange}
            className="mt-1 block w-full rounded-md border-gray-200 border shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50"
            accept="image/*"
          />
          {errors.poster && <p className="mt-2 text-sm text-red-600">{errors.poster}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="qrCode" className="block text-sm font-medium text-gray-700">Payment QR Code</label>
          <input
            type="file"
            id="qrCode"
            name="qrCode"
            onChange={handleQrCodeChange}
            className="mt-1 block w-full rounded-md border-gray-200 border shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50"
            accept="image/*"
          />
          {errors.qrCode && <p className="mt-2 text-sm text-red-600">{errors.qrCode}</p>}
        </div>

        <div className="mt-6 flex space-x-4">
          <button
            type="submit"
            className="w-full px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            Proceed to payment
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="w-full px-4 py-2 border border-gray-200 text-gray-700 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateEventForm;
