import React, { useEffect, useState } from "react";
import "./course_details.css";
import Rating from "@mui/material/Rating";
import NavbarEg from "../../../Homeeg/NavbarEg";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useParams } from "react-router-dom";
import axios from 'axios'
import loading2 from '../../../../Animation3.json'
import Lottie from "lottie-react";
import compare from '../../Course_Card/compare.png'
import { useCompareContext } from "../../../../custom_hooks/CompareContext";

const CourseDetailsCard = () => {
  useEffect(() => {
    AOS.init();
  }, [])

  const [course, setCourse] = useState({});
  const [loading, setLoading] = useState(true); 
  const { courseId } = useParams();

  const { setCompareData } = useCompareContext();
 
  const handleCompare = () => {
    // addToCompare(data.ID);
    setCompareData((prev) => [...prev, courseId].slice(-2))
    console.log("cliked")
  };

  useEffect(() => {
    setLoading(true)
    axios
      .get(
        `https://courseconnectapi-production.up.railway.app/api/courses?ID=${courseId}`
      )
      .then((response) => {
        const data = response.data.Courses;
        setCourse(data[0]);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error fetching data", error);
        setLoading(false);
      });
  }, [courseId]); // Use ID as a dependency


  const description = course.description || ""; // Use an empty string as a fallback
 const [desc, setDesc] = useState(description.substring(0, 200));
  const [readMore, setReadMore] = useState(true);

  const handleClick = () => {
    if (!readMore) {
      setDesc(description.substring(0, 200));
      setReadMore(!readMore);
    } else {
      setDesc(description);
      setReadMore(!readMore);
    }
  };

  const domain = course.domain;
  const certificationType = course.course_certification_type;
  const instructor = course.instructor ;
  const organization = course.organization;
  const prerequisites = course.prerequisites;
  const skills = course.skills ;
  const platform = course.platform;
  const lecturesCount = course.lectures_count;
  let platform_url;
  let platform_img ;
  if(platform === 'Coursera'){
    platform_url = 'https://www.coursera.org/'
    platform_img = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAkFBMVEUAVtL///8AUdEAT9EAVNIAStAARc8AR88ATdAAS9AAQ89bg9x7meEAQs5PeNmYrufe5fe5yO75+/7Cz/DQ2vTy9fxqjd7k6vkAP86htelGddmKpORjiN3W3/Wuv+zv8/s+cNhUftuOp+WmueofYNQuZ9aBneJ0k+C+y+/K1fI1a9ciYdQTW9Otv+wANc2kt+mjb0cJAAAG4klEQVR4nO2ZW3uqOhCGMQkhCUXBM1Wp2qrV2t3//+82kAMR6Fry7Mv9vTdFEob5JslkQoMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMD/E0aFoIT1NBAqKH1sYDV/ulFbpJ6JX4xT2t9gHmNez44XQyCh2l82m5dxGNGHBiY4ic+bzfKkpP+2mp4bLKqh5YPqdtnUxmgUjo1x0n5r2Wdzjilv3kq0BRYQzrabm34Hk2r/stlc9rUXEa94tPVnmDrMRob5RXmPCnlMTcOiuHEjiWz1rbHtKXJ9gzOySktWkzDMF6PRilfGl3Nr/LpVXlTU6+fUNKQv9q1kqS0wftiVDae6f/hRmJ7Tb0bVor6Mn5cob1ZFzVvMrQ/Jxm8YzQIdahK3FU6sQqovinvtRSYD+vFgPP2yo0Xvc79hEUf69ov+vX6v/6g6FD9+zzEZDVTIz6MWhY40I2m7JQ7/olDoi0yH+UzJqW3ioCXKuN2QJ75CbXFXyiZs9djxPFAhz9uvKqdqHbpg0W25yKcUGl5J1LWxr54S267tb+UpNLdkvxtDFMrOCFbMojJnvPW1VEPwtMKIbkZdRBm9ztBWnGVb4QtlfNXX9XmF7OaemKa7Jlp7xrPGmB/FMrU/p3BeTES009dvx+XlXSeL9FA+lTi3d8VP5kL5wXyFq6w4sfDbc2M68nhSoTIulC9Ooii56ZxaUELG1tLsoFTyMbE/s/BPCqV7ikaSBsr8EpJSGZWpZbVNiDdQszuXMkwORmM5dVzTNE5CyZrBnsdcJfdNI/I5hU5Hvq77l6m9DOup3I24zXRxnceZdGnnzp5QOF/XySoxP+tfjKeXpH5EmSGc6F4B5cb4B3MKb6JqCT/NT/0kE9F1mMLQTMUicXcul6R8LbsbOwdpGphzSzyh8Eu7brau0TzgoioHdB61S2O2tm9lzNq2Cj/rLcvZW4a259qF/imFxoMpbzZiXWrZFFFw12AnTBr9XeFKmXi5iM83JxWavVAc9T3K6/KlKlD+0aHeRVbhsu5ra4uZatygQxTakcplu8UObuBVgtwUPvzvCj9NyIm/KSyyJa9LPzf1OkyVVaiLGVss7T03wmKAQrsMu51NElwp7x41G8sH/V1hqC8KGzLlykGtIBfUGe9DWoW6jDexmK49N2zUnlMYd0NkFOqlf416TN/E8wrdwDuNB2GN98HEo0I9y1PfDbuKn1N4+K2zcWLHvXv0onufBoxhOYrLVuVwIH8YQ0F7FfpukNcBCu06/OmuQ7vmvHvSbL7dXCrd2aKrMKAqzvytehoa46sia/jUtGepSQf+YhGD6tLE5NLIy6VhdW1H5aU5uDGu/XxTVqF7h4uHVZj5IWPV6XPSnCTOXBuf/hN2CB4V0mPHjWCdDlFoY/TplnK0md9LjcxMhalw2tW3HR87uY/CBmr6u8KyViBVjufUlkWf3Bg/ho0nwth6VOjcaI7foS0JBtY0xVrvP0m11vLyyK3M6lmZTaw5K44J+9BXb6YkiWxTVyGT9H20r02waKkbd1FijO9dt/VPnrCuQudGaosF7k5dQ+vS1VJxnoz1yl4s3XoYLbbrUEp+tzkxLdeELTeztSBEJG7T6ygUYTVw06965tOTVShsSF4qA4RGrLR+rcuOlkI7TctzeSKFjMS7fdfTZwvvGLNaNQlhS5ry/y3Liyb7Vcc7u+7KM8M2PjcrrK3QTcz8ppTamwVU1u52aEZvk+3r4Wwyz510FLLmgPlWTHJXIj2v8JfzYcZ/OcKN8mrtkJ7z66NCvcJCb1toonehAdn3Pn9jbYVuQ+vyn8741/q03fnOUDLTJbrq37M5ix4UuvrdZ1HtQHLZ0zIPO2NYRqnvED1IYc93mm+96LufUkaZOYO0B3jXrzCgh65nr7VnYVdivRA7CgN+bPWbDlXY+dZ2sNt86ztZOb/czkvH/v3cxJkHLYWB2Le/shzMtiBOrc8Tx6Qn01RE8cPZPhtSlxqYivu/l7Jk2Wic5lQ0z9APl2CmL2tb01iFM7fTkWjiaywYbYxfvAAWd5Oczh2FAZXNSlpclBiusPr6zF97v3lTdTp+7lbpNY+5fKjPGb/l1zTdZZeIstP4tWRcVgqkxvOPCfV6zObpanf92YYPNqj62mS7NL2+b6PQNlgLD++S0bKYl168x4qWCWJZ8TX0E/9v/7dgIox4FMpuxHSLrD7uM+cV6/kPBqNhpG20zTvjXkPfv0DKMZCNF6T1PwUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP8D/gXh7GRQOwdYpAAAAABJRU5ErkJggg=='
    
  } else if(platform === 'Udemy'){
    platform_url = 'https://www.udemy.com/'
    platform_img = 'data:image/png;base64,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'
  } else {
    platform_url = 'https://www.udacity.com/'
    platform_img = 'data:image/png;base64,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'
  }
    
  return (
    <div className="card-details-wrapper">
      <div className="card-details-navbar">
        <NavbarEg />
      </div>

      <div className="card-details-container">
        {
          loading ? (
            <Lottie animationData={loading2} />
          ) : (
            <div className="card-square">
          <div className="card-square-left">
            <div className="left-logo-name">
              <a href={platform_url} target="_blank" data-aos='fade' data-aos-duration="1000">{platform}</a>
            </div>
            <div className="left-logo" data-aos='fade' data-aos-duration="1000">
              <img
                src={platform_img}
                alt=".."
              />
            </div>
            <div className="left-img">
              <a href="#">
                <img
                  src={course.images}
                  alt=".."
                  data-aos='fade-up' data-aos-duration="1000"
                />
              </a>
            </div>
            <div className="left-btn">
              <a className="course_url" href={course.urls} target="_blank">
                <button className="button-55" role="button">
                  Go to Course
                </button>
              </a>
            </div>
          </div>
          <div className="compare-img-coursecard details-compare" onClick={handleCompare}>
              <img src={compare} alt="Compare" />
            </div>
          <div className="card-square-right">
            <div className="card-right-title">
              <a href={course.urls}>
                <h1 data-aos='fade-left' data-aos-duration="1000">{course.title}</h1>
              </a>
            </div>

            <div className="card-right-desc" onClick={handleClick}>
              {readMore ? desc : description}
              <span onClick={handleClick}>
                {readMore ? " Read more ..." : " Read less"}
              </span>
            </div>

            <div className="card-right-numbers">
              <div id="right-ratings" className="card-right-flex">
                <span className="right-span">
                  {
                    course.platform==='Udemy' ? (
                      <>
                      <Rating
                    name="half-rating-read"
                    defaultValue={parseInt(course.ratings.slice(7,11), 10)}
                    precision={0.1}
                    size="large"
                    readOnly
                  />
                  <p>{course.ratings.slice(7,11)} out of 5</p>
                  </>
                    ) : (
                      <>
                      <Rating
                    name="half-rating-read"
                    defaultValue={parseInt(course.ratings, 10)}
                    precision={0.1}
                    size="large"
                    readOnly
                  />
                  <p>{course.ratings} out of 5</p>
                  </>
                    )
                  }
                  
                </span>
                <span
                  id="reviews-count"
                  className="right-span"
                  style={{ height: "fit-content" }}
                >
                  Number of Reviews : {course.reviews_count}
                </span>
              </div>

              <div id="level-students" className="card-right-flex">
                <span className="right-span" >Difficulty Level : Hard</span>
                <span className="right-span">
                  No of Enrolled Students : {course.students_count}
                </span>
              </div>

              <div id="duration-lecturesCount" className="card-right-flex">
                <span className="right-span">
                  Duration of Course : {course.duration}
                </span>

                
                <span className="right-span">
                {lecturesCount !== "Image Not Found" && (
                    <div className="details-card-domain common_shadow">
                      No of Lectures: {lecturesCount}
                    </div>
                  )}
                </span>
              </div>

              <div id="domain-certificationType" className="card-right-flex">
                <span className="right-span" >
                  {domain !== "Not Available" && (
                    <div className="details-card-domain common_shadow">
                      Domain: {domain}
                    </div>
                  )}
                </span>

                <span className="right-span">
                  {certificationType !== "Not Available" && (
                    <div className="details-card-certificationType common_shadow">
                      Certification Type: {certificationType}
                    </div>
                  )}
                </span>
              </div>

              <div
                id="paid"
                className="card-right-flex right-span"
                style={{ display: "block" }}
              >
                Paid : Yes
                <p>
                  (As prices changes continuously, so price is not given here)
                </p>
              </div>

              <div
                id="organization-instructor"
                className="card-right-flex right-span"
              >
                {organization !== "Not Available" &&
                  `Organization: ${organization}`}
                {instructor !== "Not Available" && `Instructor: ${instructor}`}
              </div>

              <div id="prerequisites" className="card-right-flex right-span">
                {prerequisites !== "Image Not Found" &&
                  `Prerequisites: ${prerequisites}`}
              </div>
            </div>

            <div className="right-skills">
              {skills === "Not Available" ? (
                ""
              ) : (
                <div className="details-card-actual-skills">
                  <span>Skills you can gain are from this course : </span>
                  <br />
                  {skills}
                </div>
              )}
            </div>
          </div>
        </div>
          )
        }
        
      </div>
      <div className="card-details-footer">
        Copyright © CourseConnect.com | 2023 All Rights Reserved.
      </div>
    </div>
  );
};

export default CourseDetailsCard;
