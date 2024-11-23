import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";
import { loadStripe } from '@stripe/stripe-js';

let stripePromise;

const getStripe = () => {
    if (!stripePromise) {
        stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
    }
    return stripePromise;
};

const RegisterForm = ({ details, ticketQuantity, setTicketQuantity }) => {
    const { user } = useUser();
    console.log(user)

    const [formData, setFormData] = useState({
        username: user.fullName ? user.fullName : "",
        email: user.emailAddresses[0].emailAddress ? user.emailAddresses[0].emailAddress : "",
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

        console.log({
            ticketQuantity,
            organizerAccountId: details.organizer.stripe_id,
            eventOwnerAccountId: 'acct_1QLrAdATuFnOEMSe',// this is from env
            unitAmount: details.price,
        })

        try {
            const response = await axios.post(import.meta.env.VITE_API_URL + '/payment/checkout-session-split', {
                ticketQuantity,
                organizerAccountId: details.organizer.stripe_id,
                eventOwnerAccountId: 'acct_1QLrAdATuFnOEMSe',// this is from env
                unitAmount: details.price,
            });

            //const { id } = response.data;
            //console.log(details)
            console.log(response)

            sessionStorage.setItem('ticket-data', JSON.stringify({
                eventID: details._id, 
                customerID: localStorage.getItem("user_id"), 
                ticketCount: ticketQuantity
            }));
            // Redirect the user to Stripe's hosted Checkout page
            //const stripe = await getStripe();
            //const { error } = await stripe.redirectToCheckout({ sessionId: id });
            window.location.href = response.data.url;
            // if (error) {
            //     console.log('Error redirecting to checkout', error);
            //     alert('An error occurred. Please try again.');
            // }
        } catch (error) {
            console.log(error);
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

                {/* <label className="text-xl font-medium flex flex-col">
                    Contact Number
                    <input
                        type="tel"
                        name="contactNumber"
                        value={formData.contactNumber}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#E167FF]"
                    />
                </label> */}

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
                            ${(details.price) * ticketQuantity}
                        </h1>
                    </div>
                </div>
            </div>

            {/* {details && (
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
            )} */}

            <button
                type="submit"
                disabled={isSubmitting}
                onClick={() => {
                    console.log("Creating payment intent...")
                }}
                className="w-full px-6 py-3 mt-4 font-semibold text-white bg-[#E167FF] rounded-lg hover:bg-[#3D004D] transition-all ease-in-out"
            >
                {isSubmitting ? "Registering..." : "Request ticket"}
            </button>
        </form>
    );
};

export default RegisterForm;
