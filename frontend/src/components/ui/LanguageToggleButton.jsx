import React, { useState } from "react";

const LanguageToggleSlider = () => {
  const [language, setLanguage] = useState("ENG");

  const toggleLanguage = () => {
    setLanguage((prevLanguage) => (prevLanguage === "ENG" ? "FRE" : "ENG"));
  };

  return (
    <div
      onClick={toggleLanguage}
      className="relative w-16 h-8 bg-gray-300 rounded-full cursor-pointer flex items-center transition-colors duration-300"
    >
      <div
        className={`absolute top-1 w-6 h-6 rounded-full transition-transform duration-300 ${
          language === "ENG" ? "translate-x-1 bg-blue-500" : "translate-x-9 bg-green-500"
        }`}
      ></div>
      <span
        className={`absolute left-1 text-xs font-semibold transition-opacity ${
          language === "ENG" ? "opacity-100 text-blue-800" : "opacity-0"
        }`}
      >
        ENG
      </span>
      <span
        className={`absolute right-2 text-xs font-semibold transition-opacity ${
          language === "FRE" ? "opacity-100 text-green-800" : "opacity-0"
        }`}
      >
        FRE
      </span>
    </div>
  );
};

export default LanguageToggleSlider;
