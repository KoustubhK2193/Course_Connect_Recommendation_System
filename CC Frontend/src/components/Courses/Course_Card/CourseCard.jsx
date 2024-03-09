import React,{useState} from 'react';
import './MarvellousMacawArticle.css';
import { Link,useNavigate } from 'react-router-dom';
import compare from './compare.png'
import { useCompareContext } from '../../../custom_hooks/CompareContext';

const CourseCard = ({data}) => {

    const [desc, setDesc] = useState(data.description.slice(0, 80));
  const [readMore, setReadMore] = useState("Read More...");

  const handleReadMore = () => {
    if (desc === data.description.slice(0, 80)) {
      setDesc(data.description);
      setReadMore("Read Less...");
    } else {
      setDesc(data.description.slice(0, 80));
      setReadMore("Read More...");
    }
  };

  const { setCompareData } = useCompareContext();
  

  const handleCompare = () => {
    // addToCompare(data.ID);
    setCompareData((prev) => [...prev, data.ID].slice(-2))
    // console.log("cliked")
  };

  
  return (
    <div className="card-ontainer">
      <div className="square">
        <Link to={`./${data.ID}`}>
            <img
            src={data.images}
            alt="Course Cover"
            className="mask"
            />
        </Link>
        <div className="h1">
        <Link to={`./${data.ID}`} className='link-title'>
            {data.title}
        </Link>
        </div>
        <p onClick={handleReadMore} className='courseCard-desc'>
        {desc} <span onClick={handleReadMore}> {readMore} </span>
        </p>
        <div className='coursecard-btns'>
            <Link to={`${data.ID}`} className='button'>
                Read More
            </Link>
            <div className="compare-img-coursecard" onClick={handleCompare}>
              <img src={compare} alt="Compare"  />
            </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
