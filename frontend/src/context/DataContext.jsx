import React, { createContext, useContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { FullScreenLoader } from "../components/FullScreenLoader";
import { useTranslation } from "react-i18next";
import Eng from '../locales/en.json'
import Fr from '../locales/fr.json'

const DataContext = createContext();

export function DataProvider({ children }) {

  const { t, i18n } = useTranslation();

  const [dynamicData, setDynamicData] = useState({});
  const [loading, setLoading] = useState(false)


  const [language, setLanguage] = useState('en');
  const [defaultTexts, setDefaultTexts] = useState(Eng);

  // const flattenObject = (obj, prefix = "", result = {}) => {
  //   for (const [key, value] of Object.entries(obj)) {
  //     const newKey = prefix ? `${prefix}.${key}` : key;
  //     if (typeof value === "object" && value !== null && !Array.isArray(value)) {
  //       flattenObject(value, newKey, result);
  //     } else {
  //       result[newKey] = value;
  //     }
  //   }
  //   return result;
  // };
  
  // const unflattenObject = (flatObj) => {
  //   const result = {};
  //   for (const [key, value] of Object.entries(flatObj)) {
  //     const keys = key.split(".");
  //     keys.reduce((acc, k, i) => {
  //       if (i === keys.length - 1) {
  //         acc[k] = value;
  //       } else {
  //         acc[k] = acc[k] || {};
  //       }
  //       return acc[k];
  //     }, result);
  //   }
  //   return result;
  // };

  // const translateTexts = async (data, target) => {
  //   setLoading(true);
  //   const flattened = flattenObject(data);
  //   const translations = {};
  
  //   for (const [key, text] of Object.entries(flattened)) {
  //     // Skip translation if text is empty, null, or undefined
  //     if (typeof text === "string" && text.trim()) {
  //       try {
  //         const res = await fetch("http://127.0.0.1:5000/translate", {
  //           method: "POST",
  //           body: JSON.stringify({
  //             q: text,
  //             source: "auto",
  //             target: target,
  //             format: "text",
  //             alternatives: 3,
  //             api_key: "", // Include your API key if necessary
  //           }),
  //           headers: { "Content-Type": "application/json" },
  //         });
  
  //         // Handle non-2xx responses
  //         if (!res.ok) {
  //           throw new Error(`Error: ${res.status} - ${res.statusText}`);
  //         }
  
  //         const translatedData = await res.json();
  //         translations[key] = translatedData.translatedText || text;
  //       } catch (error) {
  //         console.error(`Error translating text for key "${key}": ${error.message}`);
  //         translations[key] = text; // Fallback to the original text
  //       }
  //     } else {
  //       translations[key] = text; // Preserve original value if it is not a valid string
  //     }
  //   }
  //   setLoading(false);
  //   return unflattenObject(translations);
  // };
  
  
  

  // const translateAllData = async (targetLanguage) => {
  //   try {
  //     const translatedDefaultTexts = await translateTexts(defaultTexts, targetLanguage);
  //     const translatedDynamicData = await translateTexts(dynamicData, targetLanguage);
  
  //     setDefaultTexts(translatedDefaultTexts);
  //     setDynamicData(translatedDynamicData);
  //   } catch (error) {
  //     console.error("Error during translation:", error);
  //   }
  // };
  
  const addEventData = (newData) => {
    setDynamicData((prevData) => ({
      ...prevData,
      ...newData,
    }));
  };
  

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng); // Dynamically switch language
  };
  

  useEffect(() => {
    // const startTranslation = async () => {
      
    //     await translateAllData(language);
    //     console.log(defaultTexts)
    // };

    // // Change both title[0] and title[1] based on language
    // setDefaultTexts((prevTexts) => ({
    //   ...prevTexts,
    //   hero: {
    //     ...prevTexts.hero,
    //     title: [
    //       language === "en" ? "Live the moment," : "Vivez l'instant,", // title[0] for English or French
    //       language === "en" ? "Love the experience." : "Aimez l'expérience.", // title[1] for English or French
    //     ],
    //   },
    //   info: {
    //     ...prevTexts.info,
    //     title: [
    //       language === "en" ? "We inspire" : "Nous inspire", // title[0] for English or French
    //       language === "en" ? "people to go out more" : "les gens à sortir plus"
    //     ]
    //   }
    // }));
  
    // startTranslation();
    // changeLanguage(language)

    // console.log(t(defaultTexts.info.description))

    language === 'en' ? setDefaultTexts(Eng) : setDefaultTexts(Fr)

  }, [language]);
  

  // useEffect(() => {
  //   console.log(dynamicData)
  // },[dynamicData])
  

  return (
    <DataContext.Provider
      value={{
        defaultTexts,
        setDefaultTexts,
        dynamicData,
        setDynamicData,
        addEventData,
        language,
        setLanguage,
        setLoading
      }}
    >
      {loading ? <FullScreenLoader /> : (<></>)}
      {children}
    </DataContext.Provider>
  );
  
}

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
}

