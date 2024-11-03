import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#3D004D] text-white py-10 px-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-start md:items-center">
        {/* Left Section - Company Name */}
        <div className="mb-8 md:mb-0">
          <h1 className="text-6xl font-bold text-[#E167FF] qwigley-regular">Les sorties de Diane</h1>
          <p className="text-base text-white mt-2">Your Gateway to Events</p>
        </div>

        {/* Center Section - Navigation Links */}
        <div className="flex flex-col md:flex-row gap-10 text-base">
          <div>
            <h2 className="text-[#E167FF] font-semibold mb-3">Quick Links</h2>
            <ul>
              <li><a href="#" className="hover:text-[#E167FF]">Home</a></li>
              {/* <li><a href="#" className="hover:text-[#E167FF]">About Us</a></li> */}
              <li><a href="#" className="hover:text-[#E167FF]">Events</a></li>
              {/* <li><a href="#" className="hover:text-[#E167FF]">FAQ</a></li> */}
              <li><a href="#" className="hover:text-[#E167FF]">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h2 className="text-[#E167FF] font-semibold mb-3">User Links</h2>
            <ul>
              <li><a href="#" className="hover:text-[#E167FF]">My Account</a></li>
              <li><a href="#" className="hover:text-[#E167FF]">Order History</a></li>
              <li><a href="#" className="hover:text-[#E167FF]">Tickets</a></li>
            </ul>
          </div>
          <div>
            <h2 className="text-[#E167FF] font-semibold mb-3">Legal</h2>
            <ul>
              <li><a href="#" className="hover:text-[#E167FF]">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-[#E167FF]">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        {/* Right Section - Social Media & Contact */}
        <div className="flex flex-col items-start gap-6">
          <div className="flex gap-6">
            <a href="#" className="text-[#E167FF] hover:text-white">Facebook</a>
            <a href="#" className="text-[#E167FF] hover:text-white">Twitter</a>
            <a href="#" className="text-[#E167FF] hover:text-white">Instagram</a>
          </div>
          <form className="mt-4 flex flex-col">
            <label htmlFor="newsletter" className="text-base text-white">Subscribe to our newsletter</label>
            <div className=" flex gap-2">
            <input
              type="email"
              id="newsletter"
              placeholder="Email address"
              className="mt-3 p-3 rounded-md bg-white text-black focus:outline-none"
            />
            <button className="mt-3 px-5 py-3 bg-[#E167FF] text-white rounded-md hover:bg-white hover:text-[#3D004D]">
              Subscribe
            </button>
            </div>
          </form>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-700 mt-10 pt-5 text-center text-base text-white">
        © {new Date().getFullYear()} Les sorties de Diane. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
