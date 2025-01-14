import React, { useState } from "react";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";

const RegisterForm = ({ details, ticketQuantity, setTicketQuantity }) => {
    const { user } = useUser();

    const [formData, setFormData] = useState({
        username: user?.fullName || "",
        email: user?.emailAddresses[0]?.emailAddress || "",
        contactNumber: "",
        verificationCode: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const [selectedPrice, setSelectedPrice] = useState(
        Array.isArray(details.price) && details.price.length > 0 ? details.price[0].value : details.price || 0
    );

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleQuantityChange = (newQuantity) => {
        if (newQuantity >= 1) {
            setTicketQuantity(newQuantity);
        }
    };

    const handlePriceSelection = (value) => {
        setSelectedPrice(value);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/payment/checkout-session-split`,
                {
                    ticketQuantity,
                    organizerAccountId: details.organizer.stripe_id,
                    eventOwnerAccountId: 'acct_1QLrAdATuFnOEMSe', // from env
                    unitAmount: selectedPrice,
                }
            );

            sessionStorage.setItem('ticket-data', JSON.stringify({
                eventID: details._id,
                customerID: localStorage.getItem("user_id"),
                ticketCount: ticketQuantity,
            }));

            window.location.href = response.data.url;
        } catch (error) {
            console.error(error);
            alert('An error occurred during registration. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form
            onSubmit={handleFormSubmit}
            className="flex flex-col items-center gap-6 p-6 bg-white rounded-lg shadow-md w-[100%]"
        >
            <h2 className="text-3xl font-semibold text-[#E167FF] mb-4">Event Registration</h2>

            <div className="flex flex-wrap gap-5 w-full">
                <label className="text-xl font-medium flex flex-col">
                    Username
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#E167FF]"
                    />
                </label>

                <label className="text-xl font-medium flex flex-col">
                    Email
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#E167FF]"
                    />
                </label>

                <div className="text-xl font-medium flex flex-col">
                    Ticket Price
                    {Array.isArray(details.price) ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                            {details.price.map((p, index) => (
                                <div
                                    key={index}
                                    className={`flex flex-col items-start p-4 bg-gray-50 rounded-lg shadow-sm border cursor-pointer ${
                                        selectedPrice === p.value ? "border-[#E167FF]" : ""
                                    }`}
                                    onClick={() => handlePriceSelection(p.value)}
                                >
                                    {p.label && (
                                        <p className="text-sm font-medium text-gray-500">{p.label}</p>
                                    )}
                                    <p className="text-lg font-bold text-[#E167FF]">
                                        {p.value ? `$${p.value}` : 'N/A'}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <h1 className="text-3xl font-bold text-[#E167FF]">
                            {details.price || 'N/A'}
                        </h1>
                    )}
                </div>

                <div className="text-xl font-medium flex flex-col">
                    Number of Tickets
                    <div className="flex items-center mt-2">
                        <button
                            type="button"
                            onClick={() => handleQuantityChange(ticketQuantity - 1)}
                            className="px-4 py-2 text-white bg-[#E167FF] rounded-l-md hover:bg-[#3D004D] transition-all ease-in-out"
                        >
                            -
                        </button>
                        <input
                            type="number"
                            name="ticketQuantity"
                            value={ticketQuantity}
                            readOnly
                            className="w-20 text-center px-4 py-2 border-t border-b border-gray-300"
                        />
                        <button
                            type="button"
                            onClick={() => handleQuantityChange(ticketQuantity + 1)}
                            className="px-4 py-2 text-white bg-[#E167FF] rounded-r-md hover:bg-[#3D004D] transition-all ease-in-out"
                        >
                            +
                        </button>
                    </div>
                </div>

                <div className="text-xl font-medium flex flex-col">
                    Total Price:
                    <div className="flex items-center mt-2 px-4 py-2 rounded-xl border">
                        <h1 className="text-xl font-semibold text-[#E167FF]">
                            ${selectedPrice * ticketQuantity}
                        </h1>
                    </div>
                </div>
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 mt-4 font-semibold text-white bg-[#E167FF] rounded-lg hover:bg-[#3D004D] transition-all ease-in-out"
            >
                {isSubmitting ? "Registering..." : "Request ticket"}
            </button>
        </form>
    );
};

export default RegisterForm;
