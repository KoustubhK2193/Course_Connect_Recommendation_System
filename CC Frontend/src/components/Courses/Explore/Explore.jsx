import React, { useState, useEffect } from "react";
import CourseCard from "../Course_Card/CourseCard";
import axios from "axios";
import "./Explore.css";
import Downnav from "./Downnav";
import SkeletonCard from "../Course_Card/SkeletonCard";
import NavbarEg from "../../Homeeg/NavbarEg";
import { usePagination } from "../../../custom_hooks/usePagination";
import Pagination from "@mui/material/Pagination";

const fetchData = async (page) => {
  const response = await axios.get(
    `https://courseconnectapi-production.up.railway.app/api/courses?page=${page}`
  );
  return response.data.Courses;
};

function shuffleArray(array) {
  // Create a copy of the array to avoid modifying the original array
  const shuffledArray = [...array];

  // Fisher-Yates shuffle algorithm
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  return shuffledArray;
}

export default function Explore() {
  const [allData, setAllData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [
    totalPages,
    startPageIndex,
    endPageIndex,
    currentPageIndex,
    displayPage,
  ] = usePagination(30, allData.length);

  const fetchDataAndSetState = async () => {
    try {
      setIsLoading(true);

      const promises = Array.from({ length: 311 }, (_, i) => fetchData(i + 1));
      const results = await Promise.all(promises);

      // Combine all data into a single array
      const combinedData = results.reduce((acc, data) => [...acc, ...data], []);
      const shuffledData = shuffleArray(combinedData);
      setAllData(shuffledData);
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
    <div className="explore-wrapper">
      <NavbarEg />
      <div className="row my-3 mx-3">
        {/* <h1 style={{ fontSize: "40px", textAlign: "center" }}>Courses List</h1> */}
        {isLoading && allData.length === 0 ? (
          <SkeletonCard />
        ) : (
          <div className="course_container">
            {(() => {
              const displayCourses = [];
              for (let i = startPageIndex; i <= endPageIndex; i++) {
                displayCourses.push(
                  <div key={allData[i].ID}>
                    <CourseCard data={allData[i]} />
                  </div>
                );
              }
              return displayCourses;
            })()}
          </div>
        )}
        <div className="explore_pagination">
          <Pagination
            color="primary"
            showFirstButton
            showLastButton
            count={totalPages}
            page={currentPageIndex}
            onChange={(event, value) => displayPage(value)}
            defaultPage={1}
            boundaryCount={2}
            size="large"
          />
        </div>
      </div>
      <div style={{ position: "fixed", bottom: "0px", zIndex: "1000" }}>
        <Downnav />
      </div>
    </div>
  );
}
