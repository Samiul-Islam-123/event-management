import React, { useState } from "react";
import { useData } from "../../context/DataContext";

const LanguageToggleSlider = () => {
  const {language, setLanguage} = useData();

  const toggleLanguage = () => {
    setLanguage((prevLanguage) => (prevLanguage === "EN" ? "FR" : "EN"));
  };

  return (
    <div
      onClick={toggleLanguage}
      className="relative w-16 h-8 bg-gray-300 rounded-full cursor-pointer flex items-center transition-colors duration-300"
    >
      <div
        className={`absolute top-1 w-6 h-6 rounded-full transition-transform duration-300 ${
          language === "en" ? "translate-x-1 bg-blue-500" : "translate-x-9 bg-green-500"
        }`}
      ></div>
      <span
        className={`absolute left-1 text-xs font-semibold transition-opacity ${
          language === "en" ? "opacity-100 text-blue-800" : "opacity-0"
        }`}
      >
        EN
      </span>
      <span
        className={`absolute right-2 text-xs font-semibold transition-opacity ${
          language === "fr" ? "opacity-100 text-green-800" : "opacity-0"
        }`}
      >
        FR
      </span>
    </div>
  );
};

export default LanguageToggleSlider;
