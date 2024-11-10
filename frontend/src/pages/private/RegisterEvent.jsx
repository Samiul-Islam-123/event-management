import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";

const RegisterForm = ({ details, ticketQuantity, setTicketQuantity }) => {
    const { user } = useUser();

    const [formData, setFormData] = useState({
        username: user.fullName,
        email: user.emailAddresses[0].emailAddress,
        contactNumber: "",
        verificationCode: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleQuantityChange = (newQuantity) => {
        if (newQuantity >= 1) {
            setTicketQuantity(newQuantity);
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const parsedDate = new Date(details.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "2-digit",
        });

        try {
            const emailData = {
                to: details.organizer.email,
                subject: `Ticket Purchase Request for ${formData.username}`,
                body: `
            Hello,

            You have received a ticket purchase request from a customer for the event: ${details.eventName}.

            Event Details:
            - Name: ${details.name}
            - Date: ${parsedDate}
            - Location: ${details.location}
            - Tickets requested: ${ticketQuantity}

            Please verify payment before approving.
            Thank you!`,
                html: `
            <p>Hello,</p>
            <p>You have received a ticket purchase request from a customer for the event:</p>
            <div>
                <p><strong>Event Name:</strong> ${details.name}</p>
                <p><strong>Date:</strong> ${parsedDate}</p>
                <p><strong>Location:</strong> ${details.location}</p>
                <p><strong>Tickets requested:</strong> ${ticketQuantity}</p>
            </div>
            <p>Please verify payment before approving.</p>
            <p>Thank you!</p>
            <p>Best regards,<br>Your Company/Event Team</p>
        `,
            };

            const TicketRes = await axios.post(
                `${import.meta.env.VITE_API_URL}/ticket/request-ticket`,
                {
                    event: details._id,
                    customer: localStorage.getItem("user_id"),
                    quantity: ticketQuantity,
                }
            );

            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/email/send-email`,
                emailData
            );

            if (response.data.message === "Email sent successfully") {
                alert("Email sent successfully");
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.log(error);
            alert("An error occurred during registration. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form
            onSubmit={handleFormSubmit}
            className="flex flex-col items-center gap-6 p-6 bg-white rounded-lg shadow-md w-[100%]"
        >
            <h2 className="text-3xl font-semibold text-[#E167FF] mb-4">
                Event Registration
            </h2>

            <div className="flex flex-wrap gap-5 w-full ">
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

                <label className="text-xl font-medium flex flex-col">
                    Contact Number
                    <input
                        type="tel"
                        name="contactNumber"
                        value={formData.contactNumber}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#E167FF]"
                    />
                </label>

                <div className="text-xl font-medium flex flex-col">
                    Number of Tickets
                    <div className="flex items-center mt-2">
                        <button
                            type="button"
                            onClick={() =>
                                handleQuantityChange(ticketQuantity - 1)
                            }
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
                            onClick={() =>
                                handleQuantityChange(ticketQuantity + 1)
                            }
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
                            ${(details.price)*ticketQuantity}
                        </h1>
                    </div>
                </div>
            </div>

            {details && (
                <div className="mt-6 text-center">
                    <p className="text-xl font-semibold text-gray-700">
                        Scan QR Code to Pay and then click Request to pay
                    </p>
                    <img
                        src={details.qrURL}
                        alt="QR Code for Payment"
                        className="mx-auto w-48 h-48 mt-4"
                    />
                </div>
            )}

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
