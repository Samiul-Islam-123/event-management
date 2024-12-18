import React, { createContext, useContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';

const DataContext = createContext();

export function DataProvider({ children }) {
  const [dynamicData, setDynamicData] = useState({});

  const [language, setLanguage] = useState('en');
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
    eventCard: {
      title: "Events",
      organizedBy: "Organized By",
      searchButton : "Search",
      searchResults : "Search Results"
    },
    eventDetails: {
      eventPosterAlt: "Event Poster",
      eventanalytics : "Event Analytics",
      ticketPriceLabel: "Ticket Price:",
      ticketPrice: "$",
      ticketsOverview: "Ticket Overview",
      totalTickets: "Total Tickets:",
      ticketsSold: "Tickets Sold:",
      ticketsRemaining: "Tickets Remaining:",
      financialOverview: "Financial Overview",
      pricePerTicket: "Price per Ticket:",
      totalSales: "Total Sales:",
      editEventButton: "Edit Event",
      manageTicketsButton: "Manage Tickets",
      viewTicketButton: "View ticket",
      registerButton: "Register for Event",
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

  const translateTexts = async (data, target) => {
    const flattened = flattenObject(data);
    const translations = {};
  
    for (const [key, text] of Object.entries(flattened)) {
      if (typeof text === "string" && text.trim()) {
        try {
          const res = await fetch("http://127.0.0.1:5000/translate", {
            method: "POST",
            body: JSON.stringify({
              q: text,
              source: "auto",
              target: target,
              format: "text",
              alternatives: 3,
              api_key: "", // Make sure to include your API key if necessary
            }),
            headers: { "Content-Type": "application/json" },
          });
  
          // Handle non-2xx responses
          if (!res.ok) {
            throw new Error(`Error: ${res.status} - ${res.statusText}`);
          }
  
          const translatedData = await res.json();
          translations[key] = translatedData.translatedText || text;
        } catch (error) {
          // Alert the user in case of an error
          alert(`Error translating text for key "${key}": ${error.message}`);
          translations[key] = text; // Fallback to the original text
        }
      } else {
        translations[key] = text;
      }
    }
  
    return unflattenObject(translations);
  };
  
  

  const translateAllData = async (targetLanguage) => {
    try {
      const translatedDefaultTexts = await translateTexts(defaultTexts, targetLanguage);
      const translatedDynamicData = await translateTexts(dynamicData, targetLanguage);
  
      setDefaultTexts(translatedDefaultTexts);
      setDynamicData(translatedDynamicData);
    } catch (error) {
      console.error("Error during translation:", error);
    }
  };
  
  const addEventData = (newData) => {
    setDynamicData((prevData) => ({
      ...prevData,
      ...newData,
    }));
  };
  

  useEffect(() => {
    const startTranslation = async () => {
      if (language !== "en") {
        await translateAllData(language);
      }
    };
  
    startTranslation();
  }, [language]);
  

  useEffect(() => {
    console.log(dynamicData)
  },[dynamicData])
  

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
      }}
    >
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

