import React from "react";
import "./searchcard.css";
import { Link } from "react-router-dom";
import compare from "../Course_Card/compare.png";
import { useCompareContext } from "../../../custom_hooks/CompareContext";

const SearchCard = ({ data }) => {

  const { setCompareData } = useCompareContext();
  const handleCompare = () => {
    setCompareData((prev) => {
      const updatedCompareData = [...prev, data.ID];
      // Ensure that only the last two items are kept
      return updatedCompareData.slice(-2);
    });
    console.log("clicked");
  };
  

  return (
    <li className="cards__item">
      <div className="card">
        <div className="card__image">
          <img src={data.images} alt="" />
        </div>
        <div className="card__content">
          <Link to={`./${data.ID}`}>
            <div className="card__title">{data.title}</div>
          </Link>
          <p className="card__text">{data.platform}</p>
          <div className="searchcard-compare-btn">
            <Link to={`./${data.ID}`}>
              <button className="searchcard-btn btn--block card__btn">
                Know More
              </button>
            </Link>
            <div className="compare-img-coursecard" onClick={handleCompare}>
              <img src={compare} alt="Compare" />
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default SearchCard;
