import React, { createContext, useContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';

const DataContext = createContext();

export function DataProvider({ children }) {
  const [defaultTexts, setDefaultTexts] = useState({
    nav: {
      logo: "Les sorties de Diane",
      menuItems: ["Home", "Events", "Contact"],
      events: {
        title: "Events",
        items: ["All Events", "Upcoming Events", "Featured Events"],
      },
    },
    hero: {
      title: ["Live the moment,", "Love the experience."],
      ctaButton: "All Events",
    },
    info: {
      welcome: "Welcome everyone to Diane's outings",
      title: ["We inspire", "people to go out more"],
      description: "Diane's Nights Out is a series of exceptional events that promise unforgettable evenings filled with culture, elegance, and entertainment. Immerse yourself in the world of art, music, and literature as Diane's Nights Out showcases the talents of renowned artists and performers. Our carefully selected events take place in exclusive venues, creating an intimate and enchanting atmosphere for you to enjoy. From captivating exhibitions to captivating performances, each event is a unique experience that will leave you inspired and wanting more. Join us at Diane's Nights Out and indulge in the beauty of the arts.",
    },
    infoSecond: {
      title: "PARTICIPATE WITH US",
      subtitle: ["Bringing people", "together"],
      description: "Experience the pinnacle of culture, elegance, entertainment, gastronomy and dining at Les Sorties de Diane. This exceptional series of events showcases the talents of renowned artists and performers and immerses you in the world of art, music, literature and gastronomy. Prepare to be captivated by captivating exhibitions and captivating performances held in exclusive venues, creating an intimate and enchanting atmosphere. Each event is a unique experience, one that inspires you and leaves you wanting more. Indulge in the beauty of the arts and join us at Les Sorties de Diane for unforgettable evenings that will ignite your passion.",
    },
    footer: {
      companyName: "Les sorties de Diane",
      tagline: "Your Gateway to Events",
      quickLinks: {
        title: "Quick Links",
        items: ["Home", "Events", "Contact Us"],
      },
      userLinks: {
        title: "User Links",
        items: ["My Account", "Order History", "Tickets"],
      },
      legal: {
        title: "Legal",
        items: ["Privacy Policy", "Terms of Service"],
      },
      socialMedia: ["Facebook", "Twitter", "Instagram"],
      newsletter: {
        label: "Subscribe to our newsletter",
        placeholder: "Email address",
        buttonText: "Subscribe",
      },
      copyright: "© {year} Les sorties de Diane. All rights reserved.",
    },
    contactPage: {
      title: "Contact Us",
      form: {
        name: {
          label: "Name",
          placeholder: "Your Name",
          error: "Name is required.",
        },
        email: {
          label: "Email",
          placeholder: "Your Email",
          error: "Email is required.",
          invalidError: "Please enter a valid email.",
        },
        message: {
          label: "Message",
          placeholder: "Your Message",
          error: "Message cannot be empty.",
        },
        submitButton: {
          default: "Send Message",
          loading: "Sending...",
        },
      },
      apiError: "Something went wrong. Please try again later.",
      successMessage: "Thank you for your feedback! We will get back to you soon.",
    },
    profilePage: {
      createEventButton: "Create New Event",
      tabs: {
        events: "Events Created by Me",
        tickets: "Tickets Bought"
      },
      eventsSection: {
        title: "Events Created by Me",
        noEvents: "No events created yet."
      },
      ticketsSection: {
        title: "Tickets Bought",
        noTickets: "No tickets bought yet."
      }
    },
  });

  const flattenObject = (obj, prefix = "", result = {}) => {
    for (const [key, value] of Object.entries(obj)) {
      const newKey = prefix ? `${prefix}.${key}` : key;
      if (typeof value === "object" && value !== null && !Array.isArray(value)) {
        flattenObject(value, newKey, result);
      } else {
        result[newKey] = value;
      }
    }
    return result;
  };
  
  const unflattenObject = (flatObj) => {
    const result = {};
    for (const [key, value] of Object.entries(flatObj)) {
      const keys = key.split(".");
      keys.reduce((acc, k, i) => {
        if (i === keys.length - 1) {
          acc[k] = value;
        } else {
          acc[k] = acc[k] || {};
        }
        return acc[k];
      }, result);
    }
    return result;
  };

  const translateTexts = async (data) => {
    const flattened = flattenObject(data);
    const translations = {};
  
    for (const [key, text] of Object.entries(flattened)) {
      if (typeof text === "string" && text.trim()) {
        // Call the API to translate (libretranslate, self hosted api)
        const res = await fetch("http://127.0.0.1:5000/translate", {
            method: "POST",
            body: JSON.stringify({
                q: text,
                source: "auto",
                target: "fr",
                format: "text",
                alternatives: 3,
                api_key: ""
            }),
            headers: { "Content-Type": "application/json" },
        });
        const translatedData = await res.json();
        //console.log(translatedData)
        translations[key] = translatedData.translatedText || text; // Use translation or fallback to original
      } else {
        translations[key] = text; // Keep non-string data unchanged
      }
    }
  
    return unflattenObject(translations);
  };

  useEffect(() => {
    const startTranslation = async () => {
      console.log("Starting the translation process...");
      try {
        const translatedData = await translateTexts(defaultTexts);
        //console.log("Translated Data:", translatedData);
        setDefaultTexts(translatedData); // Update state with translated data if needed
      } catch (error) {
        console.error("Error during translation:", error);
      }
    };
  
    startTranslation();
  }, []);

  useEffect(() => {
    console.log(defaultTexts)
  },[defaultTexts])
  

  return (
    <DataContext.Provider value={{ defaultTexts, setDefaultTexts }}>
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

