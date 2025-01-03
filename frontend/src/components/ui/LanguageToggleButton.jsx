import React, { useEffect } from "react";
import { useData } from "../../context/DataContext";

const LanguageDropdown = () => {
  const { language, setLanguage } = useData();
  useEffect(() => {
    console.log(language)
  },[language]);
  const languages = [
    { code: "EN", name: "English", flag: "🇺🇸" },
    { code: "FR", name: "French", flag: "🇫🇷" },
    { code: "ES", name: "Spain", flag: "🇪🇸" },
    { code: "DE", name: "German", flag: "🇩🇪" },
    { code: "NL", name: "Dutch", flag: "🇯🇵" },
  ];

  const handleLanguageChange = (e) => {
    e.preventDefault();
    setLanguage(e.target.value);
  };

  return (
    <div className="relative">
      <select
        value={language}
        onChange={handleLanguageChange}
        className="w-full px-2 py-2 text-sm border border-black rounded-lg bg-black bg-opacity-20 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {languages.map((lang) => (
          <option
            key={lang.code}
            value={lang.code}
            className="bg-black bg-opacity-90 text-white"
          >
            {lang.flag} {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageDropdown;
