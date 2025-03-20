import React,{useEffect, useRef, useState} from 'react'
import './TitleCards.css'
import { Link } from 'react-router-dom'

const TitleCards = ({title,category}) => {

  const [apiData, setApiData] = useState([])
  const cardsRef = useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYTBjNTE0YWExM2FlNzFhMWRjZTIzMWUwNzEwMTY1NiIsIm5iZiI6MTczOTczODE1Ni4xOTM5OTk4LCJzdWIiOiI2N2IyNGMyY2E0MGQwNGJjOTM5ZjllMGEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.fahHsofrwR8OVQ0s8Qj9LcX3VjnRCpvG53fmjETNDio'
    }
  };
  
  
  const handleWheel = (event)=>{
    event.preventDefault();
    cardsRef.current.scrollLeft +=event.deltaY;
  }

  useEffect(()=>{

    fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
    .then(res => res.json())
    .then(res => setApiData(res.results))
    .catch(err => console.error(err));

    cardsRef.current.addEventListener('wheel',handleWheel)
  },[])

  return (
    <div className='title-cards'>
      <h2>{title?title:"Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card,index)=>{
          return <Link to={`/player/${card.id}`} className="card" key={index}> 
            <img src={`https://image.tmdb.org/t/p/w780`+card.backdrop_path} alt="" />
            <p>{card.original_title}</p>
          </Link>
        })}
      </div>
      
    </div>
  )
}

export default TitleCards
