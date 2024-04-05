
import { useEffect, useState } from 'react';
import './index.css';
import './StarRating.js';
import StarRating from './StarRating.js';
import { useMovies } from './useMovies.js';
// const tempMovieData = [
//   {
//     imdbID: "tt1375666",
//     Title: "Inception",
//     Year: "2010",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
//   },
//   {
//     imdbID: "tt0133093",
//     Title: "The Matrix",
//     Year: "1999",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
//   },
//   {
//     imdbID: "tt6751668",
//     Title: "Parasite",
//     Year: "2019",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
//   },
// ];

// const tempWatchedData = [
//   {
//     imdbID: "tt1375666",
//     Title: "Inception",
//     Year: "2010",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
//     runtime: 148,
//     imdbRating: 8.8,
//     userRating: 10,
//   },
//   { 
//     imdbID: "tt0088763",
//     Title: "Back to the Future",
//     Year: "1985",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
//     runtime: 116,
//     imdbRating: 8.5,
//     userRating: 9,
//   },
// ];

const KEY="a7797bd4";
 export default function App() {
  const [query,setQuery]=useState("");
  // const [movies,setMovies]=useState([]);
  // const [WatchedMovie,setWatchedMovie]=useState([])
  // const [isLoading,setIsloading]=useState(false);
  // const [error,setError]=useState("")
  // const [error2,setError2]=useState("");
  const [selectdID,setSelectedId]=useState();


  const {movies,isLoading,error,error2} =useMovies(query,handleCloseMovie)

  const [WatchedMovie,setWatchedMovie]=useState(function(){
    const storedValue=localStorage.getItem('watched');
    return JSON.parse(storedValue);
  })



  function handleSelectMovie(id){
 
    setSelectedId((selectdID) => (id=== selectdID ? null : id))

  }

  function handleCloseMovie(){
    setSelectedId(null);
    // console.log('closed');

  }
  function handleAddList(movie) {
    // console.log(movie)
    setWatchedMovie(watched => [...watched,movie ])

    // localStorage.setItem('watchedMovie', JSON.stringify([...WatchedMovie,movie]))

  }



  useEffect(
    function(){
    localStorage.setItem('watched', JSON.stringify(WatchedMovie))

  },[WatchedMovie])
    
  





//  useEffect(function(){
//   const controller=new AbortController();
//   async function fetchMovies(){
//     try{setIsloading(true)
//     const Response= await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,{signal:controller.signal})
//     if(!Response) throw new Error("somthing went wrong")
//     const data= await Response.json();
//   if(data.Response==="False") throw new Error("movie not found")
   
//     // console.log(data);
//     setMovies(data.Search)
//     if(query !== data.Search){
//       setError2('Movie not found')
//     }
//     else{
//       setError2('')
//     }


//      setIsloading(false)} catch(err){
//       console.log(err)
//      }
//   }


//   if(query.length < 4){
//     setMovies([])
//     setIsloading(true);
//     setError('')
//   }

//   fetchMovies();



//   return function(){
//     controller.abort(); 
//   }

//  },[query])

  return (
    <div className="App">
     <Navbar>
     
     <UsePopcorn/>
      <Search query={query} setQuery={setQuery}/>
      <Result movies={movies}/>
      {/* { error && <ErrorMessage message={error}/>}  */}
     </Navbar>
     
     <Main movies={movies} watchedMovies={WatchedMovie} setWatchedMovie={setWatchedMovie} isLoading={isLoading} message={error} Error2={error2} selectdID={selectdID} onSelctMove={handleSelectMovie} onCloseMovie={handleCloseMovie} onaddWatched={handleAddList}/>
     

    </div>
  );
}

function ErrorMessage({message}){
  return(
  <div className='error'>
  <p className='errorMessage'>
    <span>⛔</span>{message}
  </p>
  </div>
  )
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

function Search({query,setQuery}){
  return (
    <div className='search'>
      <input type='text' placeholder='Search movies...' value={query} onChange={(e) => setQuery(e.target.value)}></input>
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


function Main({movies ,watchedMovies,setWatchedMovie,isLoading,selectdID,onSelctMove,onCloseMovie,onaddWatched}){
  return(
    <div className='main-container'>
    <div className='main'>
      
     { isLoading ? <Loader/>: <LeftSec onSelctMove={onSelctMove}>
      <div className='left-list'>
        <ul>
          {movies.map(movie => <LeftList movie={movie.Title} image={movie.Poster} year={movie.Year} onSelctMove={onSelctMove} id={movie.imdbID}/>)}
        </ul>
      </div>
      </LeftSec>}
      
      {selectdID? <MovieDetails selectdID={selectdID} onSelctMove={onSelctMove} onCloseMovie={onCloseMovie} watchedMovies={watchedMovies} setWatchedMovie={setWatchedMovie} onaddWatched={onaddWatched}/>:<RightSec watchedMovies={watchedMovies} setWatchedMovie={setWatchedMovie} movie={movies} runtime={watchedMovies.Runtime}/>}

    </div>
    </div>
  )

}
function Loader()
{
  return (
    <div className='leftsec'>
      <h1 className='loading'>Loading...</h1>
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
function MovieDetails({selectdID,onSelctMove,onCloseMovie,setWatchedMovie,watchedMovies,onaddWatched}){


  
  const [movie,setMovie]=useState({}); 
  const [isLoading,setIsloading]=useState(false);
  const [userRating,setUserRating]=useState('')

  const isWatched= watchedMovies.map(movie => movie.imdbID).includes(selectdID)
  // console.log(isWatched);
  const watchedUserRating=watchedMovies.find((movie) => movie.imdbID===selectdID)?.userRating;


  const{
    Title:title,
    Year:year,
    Poster:poster,
    Runtime:runtime,
    imdbRating,
    Plot:plot,
    Released:realeased,
    Actors:actors,
    Director:director,
    Genre:genre,
  }=movie
  //  console.log(title,year);

   function handleAdd(){
    const newWatchedMovie={
      imdbID:selectdID,
      title,
      year,
      poster,
      imdbRating:Number(imdbRating),
      runtime:Number(runtime.split(' ').at(0)),
      userRating,

    }
    // console.log(newWatchedMovie);

    onaddWatched(newWatchedMovie)
    onCloseMovie();

   }

   useEffect(function(){

    function callback (e){
      if(e.code==='Escape'){
        onCloseMovie();
     

      }
    
    }
    document.addEventListener('keydown',callback)
    return function(){
      document.removeEventListener('keydown',callback);
    }
  },[onCloseMovie]);

  useEffect(function(){

    setIsloading(true);
    async function getMovieDetails(){
      const Response= await fetch(`http://www.omdbapi.com/?apikey=${KEY}&i=${selectdID}`);
      const data= await Response.json();
      // console.log(data);
      setMovie(data);
      setIsloading(false);

    }
    getMovieDetails();
  },[selectdID ])


  useEffect(function(){
    if(!title) return ; 
    document.title=`Movie | ${title}`;
    // console.log(title)




    return function(){
      document.title="usePopcorn";
      // console.log(`Clean up effect for movie ${title}`)
    }
    
  },[title])



  return (
   
  
    <div className='watch-List-Container'>
      
      {isLoading ? <Loader/>:
         <>
    <header className='watch-List-Header'>
    <div className='watch-List-Image'>
    <button className='close-list-btn' onClick={onCloseMovie}>&larr;</button>
    <img src={poster} alt={title} className='img-watch-list'/>
    
    </div>
    <div className='watch-list-text'>
      <h1 className='watch-list-title'>{title}</h1>
      <div className='movie-detail'>      
      <p>{realeased} &bull;<span>{runtime}</span></p>
      <p>{genre}</p>
      <p>⭐{imdbRating}IMDB rating</p>
      </div>



    </div>
   
    </header>
    
    <div className='watch-list-bottom'>
    
     {!isWatched ? (<div className='star-list-container '>
      
        <div className='star'>
          
      <StarRating maxRating={10} size={25} onSetRating={setUserRating}/>
    </div>
        <div className='star-btn'>
          { userRating > 0 && (<button onClick={handleAdd}>+ Add to list</button>)}
        </div>
        
      </div>) : (<p className='star-list-container rated-movie'>you rated this movie 🌟{watchedUserRating}</p>)}
      
      
      
      <div className='bottom-movie-details'>
          <div className='movie-plot'>{plot}</div>
          <div className='movie-actor'>{actors}</div>
          <div className='movie-director'>{director}</div>
        </div>
        
    </div>
 
  
    </>
}

    </div>
  

    
  )

}

function LeftList({movie, image,year,watchedMovies,setWatchedMovie,onSelctMove,id}){

  return (
   
    <li onClick={()=> onSelctMove(id)}>
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

function RightSec({imdbID,watchedMovies,setWatchedMovie,onSelctMove,selectdID}){

const[totalTime,setTotalTime]=useState()
console.log(watchedMovies);
  function handleClick(id){
    
    // console.log(id);
   const UpdatedMovies =watchedMovies.filter((movie)=> movie.imdbID !== id)

    setWatchedMovie(UpdatedMovies);
    
  }
  let rating;

  rating=watchedMovies.map((movie) => movie.userRating )
  // console.log(rating)
  
  const totalRating=rating.reduce((acc,curr) => acc+curr , 0)

  useEffect(() => {
    const runtime = watchedMovies.map((movie) => movie.runtime);
    const totalRuntime = runtime.reduce((acc, curr) => acc + curr, 0);
    setTotalTime(totalRuntime);
  }, [watchedMovies]);
  // let runtime=watchedMovies.map((movie) => movie.runtime)

  // const totalRuntime=runtime.reduce((acc,curr) => acc+curr , 0);
  // // console.log(totalRuntime);
  // setTotalTime(totalRuntime)



  
  
  
  let averageRating = (totalRating / rating.length).toFixed(1) || '0' ;
  if(rating.length===0){
    averageRating=0;
  }

Number(averageRating)
  console.log(averageRating);
  



  return (
    <div className='rightsec'>
    <div className='right-top-sec'>
      <p className='movies-watched'>MOVIES YOU HAVE WATCHED</p>
      <div className='right-top-movie'>
        <p>
          <span>🎥 {watchedMovies.length} </span>
          <span>movies</span>
          </p>
          <p>
          <span>⭐</span>
          <span>{averageRating}</span>
          </p>
          <p>
       
       
          </p>
          <p>
          <span>⌛</span>
          <span>{totalTime } min</span>
          </p>
          
          
      </div>

    </div>
    <div>
      <ul className='right-sec-list'>
      {watchedMovies.map((watched) => <RightList title={watched.title} userRating={watched.userRating} imbdrating={watched.imdbRating} watchtime={watched.runtime} poster={watched.poster} id={watched.imdbID} onBtnClick={handleClick}/>)}
      </ul>
      </div>
    </div>
  )

}



function RightList({movie,userRating,imbdrating,watchtime,poster,id,onBtnClick,onSelctMove,onaddclick,title}){

 
 return(
  <li>
     <div className='list-container'>
        <div className='list-left'>
          <img src={poster} alt={title}></img>
        </div>
        <div className='list-right'>
          <p className='movie-name'>{title}</p>
          <p className='movie-year-para-right'>
          
          <span>🌟{imbdrating}</span>
          
          <span> ⭐{userRating}</span>
          
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
