
import { useState } from 'react';
import './index.css';
const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];


 export default function App() {
  const [movies,setMovies]=useState(tempMovieData);
  return (
    <div className="App">
     <Navbar>
     <UsePopcorn/>
      <Search movies={movies}/>
      <Result movies={movies}/>
     </Navbar>
     <Main/>
    </div>
  );
}

///NAVBAR SECTION
function Navbar({children}){
  return (
    <div className='navbar'>
     {children}
    </div>
  )
}

function UsePopcorn(){
  return(
    <div className='popcorn'>
      <h2> 🍿UsePopcorn</h2>

    </div>
  )

  
}

function Search({movies}){
  return (
    <div className='search'>
      <input type='text' placeholder='Search movies...'></input>
    </div>
  )

  
}

function Result({movies}){
  return(
    <div className='result'>
      <h2> Found {movies.length} Results

      </h2>
    </div>
  )
}

////NAVBAR SECTION END


function Main(){
  return(
    <div className='main-container'>
    <div className='main'>
      <LeftSec>
      <div className='left-list'>
        <ul>
          {tempMovieData.map(movie => <LeftList movie={movie.Title} image={movie.Poster} year={movie.Year}/>)}
        </ul>
      </div>
      </LeftSec>
      <RightSec/>

    </div>
    </div>
  )

}


function LeftSec({children}){
  return(
    <div className='leftsec'>
      {children}
      
    </div>

  )
}

function LeftList({movie, image,year}){
  return (
   
    <li>
       <div className='list-container'>
        <div className='list-left'>
          <img src={image} alt={movie}></img>
        </div>
        <div className='list-right'>
          <p className='movie-name'>{movie}</p>
          <p className='movie-year-para'>
            <span>🗓</span>
            <span className='movie-span-year'>{year}</span>
          </p>
        </div>
        </div>
    </li>
    
  )
}

function RightSec({imdbID}){
const [WatchedMovie,setWatchedMovie]=useState(tempWatchedData)
  function handleClick(id){
    
    console.log(id);
   const UpdatedMovies =WatchedMovie.filter((movie)=> movie.imdbID !== id)

    setWatchedMovie(UpdatedMovies);
  }
  return (
    <div className='rightsec'>
    <div className='right-top-sec'>
      <p className='movies-watched'>MOVIES YOU HAVE WATCHED</p>
      <div className='right-top-movie'>
        <p>
          <span>🎥 02</span>
          <span>movies</span>
          </p>
          <p>
          <span>⭐</span>
          <span>5.80</span>
          </p>
          <p>
       
       
          </p>
          <p>
          <span>⌛</span>
          <span>144 min</span>
          </p>
          
          
      </div>

    </div>
    <div>
      <ul className='right-sec-list'>
      {WatchedMovie.map((watched) => <RightList movie={watched.Title} userrating={watched.userRating} imbdrating={watched.imdbRating} watchtime={watched.runtime} poster={watched.Poster} id={watched.imdbID} onBtnClick={handleClick}/>)}
      </ul>
      </div>
    </div>
  )

}

function RightList({movie,userRating,imbdrating,watchtime,poster,id,onBtnClick}){

 
 return(
  <li>
     <div className='list-container'>
        <div className='list-left'>
          <img src={poster} alt={movie}></img>
        </div>
        <div className='list-right'>
          <p className='movie-name'>{movie}</p>
          <p className='movie-year-para-right'>
          
          <span> ⭐ 5.80</span>
          
          <span> 🌟8.50</span>
          
          <span> ⌛{watchtime}</span>
          <Button onClick={() => onBtnClick(id)}>X</Button>
          </p>
        </div>
        </div>
  </li>
 )
}
 

function Button({children,onClick}){
  return(
    <button className ='btn' onClick={onClick}>{children} </button>
  )

}  