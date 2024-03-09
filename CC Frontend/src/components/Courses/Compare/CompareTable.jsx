import React, { useState, useEffect } from "react";
import "./comparetable.css";
import Navbar from "../../Homeeg/NavbarEg";
import { useCompareContext } from "../../../custom_hooks/CompareContext";
import Downnav from "../Explore/Downnav";
import axios from "axios";

const CompareTable = () => {
  const { compareData } = useCompareContext();
  console.log(compareData);
  const courseIds = [...compareData];

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // Use Promise.all to fetch all courses concurrently
    Promise.all(
      courseIds.map((courseId) =>
        axios
          .get(
            `https://courseconnectapi-production.up.railway.app/api/courses?ID=${courseId}`
          )
          .then((response) => response.data.Courses[0])
      )
    )
      .then((coursesData) => {
        setCourses(coursesData);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error fetching data", error);
        setLoading(false);
      });
  }, []); // Use courseIds as a dependency


  return (
    <div className="compare-table-wrapper">
      <Navbar />
      <h1>Compare and Choose</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="compare-table-container">
          <table id="customers">
            <tbody>
              <tr>
                <th className="compare-attributes">Course Title</th>
                <th>
                  <div className="compare-title compare-common">
                    {courses[0].title}
                  </div>
                </th>
                <th>
                  <div className="compare-title compare-common">
                    {courses[1].title}
                  </div>
                </th>
              </tr>
              <tr>
                <td className="compare-attributes">Course Img</td>
                <td>
                  <div className="compare-img compare-common">
                    <img
                      src={courses[0].images}
                      alt=".."
                      className="compare_img"
                    />
                  </div>
                </td>
                <td>
                  <div className="compare-img compare-common">
                    <img
                      src={courses[1].images}
                      alt=".."
                      className="compare_img"
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td className="compare-attributes">Course Description</td>
                <td>
                  <div
                    className="compare-description compare-common"
                    style={{ display: "block" }}
                  >
                    {courses[0].description}
                  </div>
                </td>
                <td>
                  <div
                    className="compare-description compare-common"
                    style={{ display: "block" }}
                  >
                    {courses[1].description}
                  </div>
                </td>
              </tr>
              <tr>
                <td className="compare-attributes">Platform</td>
                <td>
                  <div className="compare-platform compare-common">
                    {courses[0].platform}
                  </div>
                </td>
                <td>
                  <div className="compare-platform compare-common">
                    {courses[1].platform}
                  </div>
                </td>
              </tr>
              <tr>
                <td className="compare-attributes">Level</td>
                <td>
                  <div className="compare-level compare-common">
                    {courses[0].level}
                  </div>
                </td>
                <td>
                  <div className="compare-level compare-common">
                    {courses[1].level}
                  </div>
                </td>
              </tr>
              <tr>
                <td className="compare-attributes">Course Ratings</td>
                <td>
                  <div className="compare-ratings compare-common">
                    {courses[0].platform === "Udemy"
                      ? courses[0].ratings.slice(7, 11) + " ratings out of 5"
                      : courses[0].ratings + " ratings out of 5"}
                  </div>
                </td>
                <td>
                  <div className="compare-ratings compare-common">
                    {courses[1].platform === "Udemy"
                      ? courses[1].ratings.slice(7, 11) + " ratings out of 5"
                      : courses[1].ratings + " ratings out of 5"}
                  </div>
                </td>
              </tr>
              <tr>
                <td className="compare-attributes">Reviews Count</td>
                <td>
                  <div className="compare-reviews-count compare-common">
                    {courses[0].reviews_count}
                  </div>
                </td>
                <td>
                  <div className="compare-reviews-count compare-common">
                    {courses[1].reviews_count}
                  </div>
                </td>
              </tr>
              <tr>
                <td className="compare-attributes">Students Count</td>
                <td>
                  <div className="compare-students-count compare-common">
                    {courses[0].students_count}
                  </div>
                </td>
                <td>
                  <div className="compare-students-count compare-common">
                    {courses[1].students_count}
                  </div>
                </td>
              </tr>
              <tr>
                <td className="compare-attributes">Course Duration</td>
                <td>
                  <div className="compare-course-duration compare-common">
                    {courses[0].duration}
                  </div>
                </td>
                <td>
                  <div className="compare-course-duration compare-common">
                    {courses[1].duration}
                  </div>
                </td>
              </tr>
              <tr>
                <td className="compare-attributes">Paid</td>
                <td>
                  <div className="compare-paid compare-common">
                    {courses[0].paid}
                  </div>
                </td>
                <td>
                  <div className="compare-paid compare-common">
                    {courses[1].paid}
                  </div>
                </td>
              </tr>
              <tr>
                <td className="compare-attributes">Link</td>
                <td>
                  <div className="compare-links compare-common">
                    <a href={courses[0].urls}>{courses[0].urls}</a>
                  </div>
                </td>
                <td>
                  <div className="compare-links compare-common">
                    <a href={courses[1].urls}>{courses[1].urls}</a>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      <div className="">
        <Downnav />
      </div>
    </div>
  );
};

export default CompareTable;
