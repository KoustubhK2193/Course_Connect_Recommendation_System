import React, { createContext, useContext, useState } from "react";

const CompareContext = createContext();

export const useCompareContext = () => {
  return useContext(CompareContext);
};

export const CompareProvider = ({ children }) => {
  const [compareData, setCompareData] = useState([2,6210]);

  const addToCompare = (id) => {
    console.log(id);
    setCompareData((prevData) => {
      if (!prevData.includes(id)) {
        const newData = [...prevData, id].slice(-2);
        console.log(newData); // Change to prevData
        return newData;
      }
      console.log(prevData);
      return prevData;
    });
  };
  

  return (
    <CompareContext.Provider value={{ compareData, addToCompare,setCompareData }}>
      {children}
    </CompareContext.Provider>
  );
};
