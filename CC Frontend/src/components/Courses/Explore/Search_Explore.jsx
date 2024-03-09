import "./search_explore.css";
import searchpng from "./search.png";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Lottie from "lottie-react";
import loading1 from "../../../Animation4.json";
import { useSearchParams, useNavigate } from "react-router-dom";
import SearchCard from "./SearchCard";
import NavbarEg from "../../Homeeg/NavbarEg";
import Downnav from "./Downnav";
import {useDataContext} from '../../../custom_hooks/DataProvider'

function generateRandomArray() {
  const randomArray = [];

  for (let i = 0; i < 250; i++) {
    const randomInteger = Math.floor(Math.random() * (6200)) + 1;
    randomArray.push(randomInteger);
  }

  return randomArray;
}

const Search_Explore = () => {
  const [isSearch, setIsSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [query] = useSearchParams();
  const [paramQuery, setParamQuery] = useState("");
  const [joinedHistory, setJoinedHistory] = useState("");


  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem("searchHistory"));
    if (storedHistory) {
      setSearchHistory([...storedHistory]);
    }
  }, []);

  const { allData } = useDataContext();

  useEffect(() => {
  }, [allData]);

  const recommendData = async () => {
    try {
      setIsLoading(true);
  
      if (query.get("q")) {
        const response = await axios.post("http://127.0.0.1:8000", {
          text: query.get("q"),
        });
  
        const fetchedData = response.data;
        const valuesArray = Object.values(fetchedData);
        const final_data = allData.filter((dummyD) =>
          valuesArray.some((value) => value === dummyD.ID)
        );
        setData(final_data);
      } else {
        if (searchHistory.length > 2) {
          const response = await axios.post("http://127.0.0.1:8000", {
            text: joinedHistory,
          });
  
          const fetchedData = response.data;
          const valuesArray = Object.values(fetchedData);
          const final_data = allData.filter((dummyD) =>
            valuesArray.some((value) => value === dummyD.ID)
          );
          setData(final_data);
        } else {
          const randomArray = generateRandomArray();
          const final_data = allData.filter((dummyD) =>
            randomArray.some((value) => value === dummyD.ID)
          );
          setData(final_data);
        }
      }
    } catch (error) {
      console.error('Error fetching recommended data:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        await recommendData();
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchData();
  }, [allData, query.get("q"), searchHistory]);
  

  const handleSearchscreenClick = (e) => {
    e.stopPropagation();
    if (isSearch) {
      if (e.target.classList.contains("button-81")) {
      } else if (e.target.classList.contains("search-history-items")) {
      } else if (e.target.classList.contains("search-history")) {
      } else if (e.target.classList.contains("delete-history-item")) {
      } else {
        setIsSearch(false);
      }
    }
  };

  const handleClick = (e) => {
    e.stopPropagation();

    const sanitizedInput = searchQuery.trim().toLowerCase();

    if (sanitizedInput.length > 0 && !searchHistory.includes(sanitizedInput)) {
      const updatedHistory = [sanitizedInput, ...searchHistory.slice(0, 9)];
      localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
      setSearchHistory(updatedHistory);
      setJoinedHistory(searchHistory.join(" "));
    }

    setIsSearch(false);
    setParamQuery(searchQuery);
    setSearchQuery("");
    navigate(`/get_started/search?q=${paramQuery}`);
  };

  const handleFocus = (e) => {
    e.stopPropagation();
    setIsSearch(true);
  };

  const handleBtnClick = (buttonValue) => {
    setParamQuery(buttonValue);
    setIsSearch(false);
    const updatedHistory = [buttonValue, ...searchHistory.slice(0, 9)];
      localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
      setSearchHistory(updatedHistory);
      setJoinedHistory(searchHistory.join(" "));
  };

  useEffect(() => {
    if (paramQuery !== "") {
      navigate(`/get_started/search?q=${paramQuery}`);
      setIsSearch(false);
    }
  }, [paramQuery]);

  const deleteHistoryItem = (e, itemToDelete) => {
    e.stopPropagation();
    const updatedHistory = searchHistory.filter(
      (item) => item !== itemToDelete
    );
    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
    setSearchHistory(updatedHistory);
  };

  const handleHistoryClick = (value) => {
    setIsLoading(true);
    setParamQuery(value);
    setIsSearch(false);
  };


  return (
    <div className="search-explore-wrapper">
      <NavbarEg />
      <div
        className="explore_search"
        onClick={(e) => handleSearchscreenClick(e)}
      >
        <div className="input_search">
          <input
            type="search"
            placeholder="Search Here..."
            style={{ fontSize: "1.4rem", padding: "5px" }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onClick={(e) => handleFocus(e)}
          />
          <button
            onClick={(e) => handleClick(e)}
            style={{
              outline: "none",
              border: "none",
            }}
          >
            <img src={searchpng} className="search_icon" alt="" />
          </button>
        </div>

        <div className="explore_search_bottom">
          {!isSearch ? (
            <div className="sort-display">
              {isLoading ? (
                <div className="loading-img">
                  {<Lottie animationData={loading1} />}
                </div>
              ) : (
                <div className="search-display">
                  {
                    data.map((d, index) => <SearchCard key={index} data={d} />)
                  }</div>
              )}
            </div>
          ) : (
            <div className="search-screen">
              <div className="search-screen-sub">
                <div className="search-history">
                  {searchHistory.map((his) => (
                    <p
                      key={his}
                      className="search-history-items"
                      onClick={() => handleHistoryClick(his)}
                    >
                      {his}{" "}
                      <span
                        className="delete-history-item"
                        onClick={(e) => deleteHistoryItem(e, his)}
                      >
                        X
                      </span>
                    </p>
                  ))}
                </div>
              </div>

              <div className="search-domains">
                <button
                  className="button-81"
                  role="button"
                  onClick={() => handleBtnClick("Data Science")}
                >
                  Data Science
                </button>
                <button
                  className="button-81"
                  role="button"
                  onClick={() => handleBtnClick(" Software Engineering")}
                >
                  Software Engineering
                </button>
                <button
                  className="button-81"
                  role="button"
                  onClick={() => handleBtnClick("Data Science")}
                >
                  Data Structure
                </button>
                <button
                  className="button-81"
                  role="button"
                  onClick={() => handleBtnClick("Machine Learning")}
                >
                  Machine Learning
                </button>
                <button
                  className="button-81"
                  role="button"
                  onClick={() => handleBtnClick("Finance")}
                >
                  Finance
                </button>
                <button
                  className="button-81"
                  role="button"
                  onClick={() => handleBtnClick("Artificial Intelligence")}
                >
                  Artificial Intelligence
                </button>
                <button
                  className="button-81"
                  role="button"
                  onClick={() => handleBtnClick("Web Development")}
                >
                  Web Development
                </button>
                <button
                  className="button-81"
                  role="button"
                  onClick={() => handleBtnClick("Marketing")}
                >
                  Marketing
                </button>
                <button
                  className="button-81"
                  role="button"
                  onClick={() => handleBtnClick("Business")}
                >
                  Business
                </button>
                <button
                  className="button-81"
                  role="button"
                  onClick={() => handleBtnClick("Cloud Computing")}
                >
                  Cloud Computing
                </button>
                <button
                  className="button-81"
                  role="button"
                  onClick={() => handleBtnClick("DevOps")}
                >
                  DevOps
                </button>
                <button
                  className="button-81"
                  role="button"
                  onClick={() => handleBtnClick("Soft Skills")}
                >
                  Soft Skills
                </button>
                <button
                  className="button-81"
                  role="button"
                  onClick={() => handleBtnClick("Presentation")}
                >
                  Presentation
                </button>
              </div>
            </div>
          )}
        </div>
        <div style={{ position: "fixed", bottom: "0px" }}>
          <Downnav />
        </div>
      </div>
    </div>
  );
};

export default Search_Explore;
