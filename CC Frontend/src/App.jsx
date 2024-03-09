import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Homepage/Home/Home";
import About from "./components/About/About";
import Explore from "./components/Courses/Explore/Explore";
import Contact from "./components/Contact/Contact";
import Search_Explore from "./components/Courses/Explore/Search_Explore";
import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import CourseDetailsCard from "./components/Courses/Explore/Course_Details/CourseDetailsCard";
import HomeEg from "./components/Homeeg/HomeEg";
import CompareTable from "./components/Courses/Compare/COmpareTable";
import { CompareProvider } from "./custom_hooks/CompareContext";

export default function App() {

  const [compareID,setCompareID] = useState([]);
  return (
    <div>
      <CompareProvider>
        <SkeletonTheme baseColor="#313131" highlightColor="#525252">
          <Router>
            <Routes>
              <Route path="/" element={<HomeEg />} />
              <Route path="about/*" element={<About />} />
              <Route path="get_started/" element={<Explore />} />
              <Route
                path="get_started/:courseId"
                element={<CourseDetailsCard />}
              />
              <Route path="get_started/search" element={<Search_Explore />} />
              <Route path="get_started/compare" element={<CompareTable />} />
              <Route
                path="get_started/search/:courseId"
                element={<CourseDetailsCard />}
              />
              <Route path="contact/*" element={<Contact />} />
            </Routes>
          </Router>
        </SkeletonTheme>
      </CompareProvider>

    </div>
  );
}
