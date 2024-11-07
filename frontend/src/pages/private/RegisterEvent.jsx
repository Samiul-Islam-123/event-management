import React, { useState } from 'react';
import axios from 'axios';
import { useUser } from '@clerk/clerk-react';

function RegisterEvent({ eventId, onCancel }) {
  const { user } = useUser();

  // Initialize form data
  const [formData, setFormData] = useState({
    name: user.fullName || '', // Prefill user's name if available
    email: user.emailAddress || '', // Prefill user's email if available
    phone: '',
    tickets: 1,
    qrCode: null, // New state for QR code image
  });

  const [errors, setErrors] = useState({});
  
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Handle QR code file selection
  const handleQRCodeChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      qrCode: e.target.files[0] // Capture the selected file
    }));
  };

  // Validate form
  const validateForm = () => {
    let newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    if (formData.tickets < 1) newErrors.tickets = 'At least 1 ticket is required';
    if (!formData.qrCode) newErrors.qrCode = 'QR code for payment is required';
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      try {
        // Upload the QR code image if it exists
        const formDataObj = new FormData();
        formDataObj.append('name', formData.name);
        formDataObj.append('email', formData.email);
        formDataObj.append('phone', formData.phone);
        formDataObj.append('tickets', formData.tickets);
        formDataObj.append('eventId', eventId);
        formDataObj.append('qrCode', formData.qrCode); // Append QR code image file

        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/events/register`,
          formDataObj,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        );

        if (response.data.success) {
          alert('Registration successful');
          onCancel();
        } else {
          alert(response.data.message || 'Registration failed');
        }
      } catch (error) {
        console.error('Error registering for event:', error);
        alert('Failed to register for event. Please try again.');
      }
    }
  };

  // Handle cancel
  const handleCancel = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      tickets: 1,
      qrCode: null,
    });
    setErrors({});
    onCancel();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Register for Event</h1>
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
        {/* Existing fields */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
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
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-200 border shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50"
          />
          {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-200 border shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50"
          />
          {errors.phone && <p className="mt-2 text-sm text-red-600">{errors.phone}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="tickets" className="block text-sm font-medium text-gray-700">Number of Tickets</label>
          <input
            type="number"
            id="tickets"
            name="tickets"
            value={formData.tickets}
            onChange={handleChange}
            min="1"
            className="mt-1 block w-full rounded-md border-gray-200 border shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50"
          />
          {errors.tickets && <p className="mt-2 text-sm text-red-600">{errors.tickets}</p>}
        </div>

        {/* New QR code upload field */}
        <div className="mb-4">
          <label htmlFor="qrCode" className="block text-sm font-medium text-gray-700">QR Code for Payment</label>
          <input
            type="file"
            id="qrCode"
            name="qrCode"
            onChange={handleQRCodeChange}
            className="mt-1 block w-full rounded-md border-gray-200 border shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50"
            accept="image/*"
          />
          {errors.qrCode && <p className="mt-2 text-sm text-red-600">{errors.qrCode}</p>}
        </div>

        {/* Submit and Cancel buttons */}
        <div className="mt-6 flex space-x-4">
          <button
            type="submit"
            className="w-full px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            Register
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

export default RegisterEvent;
