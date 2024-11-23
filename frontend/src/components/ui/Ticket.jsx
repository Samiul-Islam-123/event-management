import React, { useState } from "react";
import jsPDF from "jspdf";

const Ticket = ({ data }) => {
  const { _id, customer, event } = data;

  const [showPreview, setShowPreview] = useState(false);
  const [pdfContent, setPdfContent] = useState(null);
  //console.log(event)

  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  const generatePdfContent = (callback) => {
    const doc = new jsPDF();

    // Load poster image
    const loadImage = (url, callback) => {
      const img = new Image();
      img.crossOrigin = "anonymous"; // Handle CORS for external images
      img.src = url;
      img.onload = () => {
        callback(img);
      };
    };

    loadImage(event.poster, (img) => {
      // Add poster to PDF
      const aspectRatio = img.width / img.height;
      const imgWidth = 160;
      const imgHeight = imgWidth / aspectRatio;

      doc.addImage(img, "JPEG", 25, 20, imgWidth, imgHeight);

      // Add title below the poster
      const yPosition = 20 + imgHeight + 10; // Adjust based on the image height
      doc.setFontSize(20);
      doc.text("Event Ticket", 105, yPosition, { align: "center" });

      // Add event details
      doc.setFontSize(14);
      doc.text(`Event Name: ${event.name}`, 20, yPosition + 20);
      doc.text(
        `Event Date: ${new Date(event.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}`,
        20,
        yPosition + 30
      );
      doc.text(`Location: ${event.location}`, 20, yPosition + 40);
      doc.text(`Description: ${event.description}`, 20, yPosition + 50, {
        maxWidth: 170,
      });

      // Add organizer details
      console.log(event)
      doc.text(`Organizer: ${event.organizer.username}`, 20, yPosition + 70);
//      doc.text(`Contact: ${event.organizer.contact}`, 20, yPosition + 80);

      // Add customer details
      doc.text(`Customer: ${customer.username}`, 20, yPosition + 100);

      // Add ticket ID
      doc.setFontSize(12);
      doc.text(`Ticket ID: ${_id}`, 20, yPosition + 120);

      // Set the preview PDF content
      callback(doc.output("datauristring"));
    });
  };

  const handlePreview = () => {
    generatePdfContent((pdfUri) => {
      setPdfContent(pdfUri);
      setShowPreview(true);
    });
  };

  const downloadPdf = () => {
    generatePdfContent((pdfUri) => {
      const doc = new jsPDF();
      doc.loadFile(pdfUri);
      doc.save(`ticket-${_id}.pdf`);
    });
  };

  return (
    <div>
      {/* Ticket Card */}
      <div
        style={{ cursor: "pointer" }}
        onClick={handlePreview}
        className="w-[290px] h-[360px] rounded-lg flex flex-col overflow-hidden border border-black m-3 shadow-lg shadow-gray-200 hover:shadow-gray-400 hover:scale-105 transition-all ease-in-out"
      >
        {/* Poster Section */}
        <div className="w-full h-[45%] bg-slate-300 overflow-hidden">
          <img
            src={event.poster}
            alt="ticket poster"
            className="object-cover h-full w-full"
          />
        </div>

        {/* Content Section */}
        <div className="p-3 flex flex-col justify-between flex-1">
          {/* Event Name */}
          <h1 className="text-xl font-semibold">{event.name}</h1>

          {/* Event Date */}
          <p className="font-semibold text-gray-600">
            {new Date(event.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>

          {/* Truncated Event Description */}
          <p className="opacity-70">{truncateText(event.description, 45)}</p>

          {/* Customer Info */}
          <p className="font-medium">
            <br />
            <span className="text-xl">{customer.username}</span>
          </p>

          {/* Bottom Section */}
          <div className="flex justify-between items-center">
            {/* Location */}
            <p className="text-gray-700 font-semibold">
              Location: <span className="text-xl">{event.location}</span>
            </p>

            {/* Ticket Price */}
            <p className="text-2xl font-semibold text-[#E167FF]">
              ${event.price}
            </p>
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
          onClick={() => setShowPreview(false)}
        >
          <div
            className="bg-white p-4 rounded-lg w-[90%] md:w-[70%] relative"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-semibold mb-4">Ticket Preview</h2>
            <iframe
              src={pdfContent}
              title="PDF Preview"
              className="w-full h-[400px] border"
            ></iframe>
            <div className="mt-4 flex justify-end space-x-4">
              <button
                onClick={() => setShowPreview(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded"
              >
                Close
              </button>
              <button
                onClick={downloadPdf}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Download
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Ticket;
