import React, { useState } from 'react';
import axios from 'axios';
import Nav from '../../components/Nav';
import { useData } from '../../context/DataContext';

function ContactPage() {
  const { defaultTexts } = useData();
  const { contactPage } = defaultTexts;

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = contactPage.form.name.error;
    if (!formData.email.trim()) {
      newErrors.email = contactPage.form.email.error;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = contactPage.form.email.invalidError;
    }
    if (!formData.message.trim()) newErrors.message = contactPage.form.message.error;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);
      setSuccess('');
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/feedback`, formData);
      if (response.status === 200 || response.status === 201) {
        setSuccess(contactPage.successMessage);
        setFormData({ name: '', email: '', message: '' });
      }
    } catch (error) {
      setErrors({ api: contactPage.apiError });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
        <Nav />
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">{contactPage.title}</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {errors.api && (
            <p className="text-red-600 text-center text-sm">{errors.api}</p>
          )}
          {success && (
            <p className="text-green-600 text-center text-sm">{success}</p>
          )}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              {contactPage.form.name.label}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder={contactPage.form.name.placeholder}
              className={`mt-1 block w-full p-3 border ${
                errors.name ? 'border-red-600' : 'border-gray-300'
              } rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500`}
            />
            {errors.name && (
              <p className="text-red-600 text-sm mt-1">{errors.name}</p>
            )}
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              {contactPage.form.email.label}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={contactPage.form.email.placeholder}
              className={`mt-1 block w-full p-3 border ${
                errors.email ? 'border-red-600' : 'border-gray-300'
              } rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500`}
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">{errors.email}</p>
            )}
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
              {contactPage.form.message.label}
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              placeholder={contactPage.form.message.placeholder}
              className={`mt-1 block w-full p-3 border ${
                errors.message ? 'border-red-600' : 'border-gray-300'
              } rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500`}
            ></textarea>
            {errors.message && (
              <p className="text-red-600 text-sm mt-1">{errors.message}</p>
            )}
          </div>
          <button
            type="submit"
            className={`w-full bg-blue-600 text-white py-3 px-4 rounded-lg shadow-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={loading}
          >
            {loading ? contactPage.form.submitButton.loading : contactPage.form.submitButton.default}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ContactPage;

