import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";

const RegisterForm = ({ details }) => {

  const {user} = useUser()
  console.log(user)
  

  const [formData, setFormData] = useState({
    username: user.fullName,
    email: user.emailAddresses[0].emailAddress,
    contactNumber: "",
    verificationCode: "",
  });
  const [qrImage, setQrImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const parsedDate = new Date(
      details.date
    ).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      day: "2-digit"
    })

    try {
      const emailData = {
        to: details.organizer.email, // Replace with the recipient's email or dynamically pass it
        subject: `Ticket Purchase Request for ${formData.username}`,
        body: `
            Hello,
    
            You have received a ticket purchase request from a customer for the event: ${details.eventName}.
    
            Event Details:
            - Name: ${details.name}
            - Date: ${parsedDate}
            - Location: ${details.location}
    
            Before approving this request and sending the QR code for payment to the customer, please check if the customer has completed their payment. 
            If the payment is successful, you can approve the request and send the QR code to the customer. Once approved, the customer will be able to complete the payment and secure their ticket.
    
            Thank you!`,
        html: `
            <p>Hello,</p>
            <p>You have received a ticket purchase request from a customer for the event:</p>
            <div>
                <p><strong>Event Name:</strong> ${details.name}</p>
                <p><strong>Date:</strong> ${parsedDate}</p>
                <p><strong>Location:</strong> ${details.location}</p>
            </div>
            <p>Before approving this request and sending the QR code for payment to the customer, please verify if the customer has completed their payment.</p>
            <p>If the payment is successful, you can approve the request and send the QR code for payment to the customer. Once approved, the customer will be able to secure their ticket.</p>
    
            <p>To approve the request and send the QR code, click the button below:</p>
    
            <a href="${import.meta.env.VITE_CLIENT_URL}/app/profile" 
               style="padding: 10px 20px; background-color: #E167FF; color: white; text-decoration: none; border-radius: 5px;">Go to profile</a>
    
            <p>Thank you!</p>
            <p>Best regards,<br>Your Company/Event Team</p>
        `
    };



    const TicketRes = await axios.post(`${import.meta.env.VITE_API_URL}/ticket/request-ticket`,{
      event : details._id,
      customer : localStorage.getItem('user_id')
    });

    console.log(TicketRes)
    

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
      console.log(error)
      alert("An error occurred during registration. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="flex flex-col gap-6 p-6 bg-white rounded-lg shadow-md w-full md:w-1/2">
      <h2 className="text-3xl font-semibold text-[#E167FF] mb-4">Event Registration</h2>

      <label className="text-xl font-medium">
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

      <label className="text-xl font-medium">
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

      <label className="text-xl font-medium">
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


      {details && (
        <div className="mt-6 text-center">
          <p className="text-xl font-semibold text-gray-700">Scan QR Code to Pay and then click Request to pay</p>
          <img src={details.qrURL} alt="QR Code for Payment" className="mx-auto w-48 h-48 mt-4" />
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
