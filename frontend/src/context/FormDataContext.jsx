// FormDataContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';

const FormDataContext = createContext();

export const useFormData = () => {
    return useContext(FormDataContext);
};

export const FormDataProvider = ({ children }) => {
    const [formData, setFormData] = useState(null);
    
    useEffect(() => {
        console.log(formData)
    },[formData])

    const saveFormData = (data) => {
        setFormData(data);
    };

    const clearFormData = () => {
        setFormData(null);
    };

    return (
        <FormDataContext.Provider value={{ formData, saveFormData, clearFormData }}>
            {children}
        </FormDataContext.Provider>
    );
};
