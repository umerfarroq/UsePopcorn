import { useState , useEffect } from "react"

const KEY="a7797bd4";

export function useMovies(query,callback){
    
    const [movies,setMovies]=useState([]);
    // const [WatchedMovie,setWatchedMovie]=useState([])
    const [isLoading,setIsloading]=useState(false);
    const [error,setError]=useState("")
    const [error2,setError2]=useState("");
    

 useEffect(function(){
    callback?.();
    const controller=new AbortController();
    async function fetchMovies(){
      try{setIsloading(true)
      const Response= await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,{signal:controller.signal})
      if(!Response) throw new Error("somthing went wrong")
      const data= await Response.json();
    if(data.Response==="False") throw new Error("movie not found")
     
      // console.log(data);
      setMovies(data.Search)
      if(query !== data.Search){
        setError2('Movie not found')
      }
      else{
        setError2('')
      }
  
  
       setIsloading(false)} catch(err){
        console.log(err)
       }
    }
  
  
    if(query.length < 4){
      setMovies([])
      setIsloading(true);
      setError('')
    }
  
    fetchMovies();
  
  
  
    return function(){
      controller.abort(); 
    }
  
   },[query])
   return {
    movies,isLoading,error,error2
   }
}