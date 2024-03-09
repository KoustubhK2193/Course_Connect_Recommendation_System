
import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const DataContext = createContext();
const fetchData = async (page) => {
    const response = await axios.get(
      `https://courseconnectapi-production.up.railway.app/api/courses?page=${page}`
    );
    return response.data.Courses;
  };

export const useDataContext = () => {
  return useContext(DataContext);
};

export const DataProvider = ({ children }) => {
  
    const [allData, setAllData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);


  const fetchDataAndSetState = async () => {
    try {
      setIsLoading(true);

      const promises = Array.from({ length: 311 }, (_, i) =>
        fetchData(i + 1)
      );
      const results = await Promise.all(promises);

      // Combine all data into a single array
      const combinedData = results.reduce(
        (acc, data) => [...acc, ...data],
        []
      );

      setAllData(combinedData);
    } catch (error) {
      console.error("Error:", error);
      setAllData([]);
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    fetchDataAndSetState();
  }, []);

  return (
    <DataContext.Provider value={{ allData }}>
      {children}
    </DataContext.Provider>
  );
};
