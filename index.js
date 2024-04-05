import React from 'react';
import ReactDOM from 'react-dom/client';
// import { useState } from 'react';
import './index.css';
import App from './App';

import StarRating from './StarRating';

// function Test(){
//   const [movieRating,setMovieRating]=useState(0);

//   return(
//     <div>
//   <StarRating color='blue' maxRating={10} onSetRating={setMovieRating}/> 
//   <p>This movies was rated {movieRating} stars</p>
//   </div>
//   )
// }
 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App /> 
    
    
  </React.StrictMode>
);


 {/* <StarRating maxRating={ 5} message={['Terriable','Bad','Okay','Good','Amazing']}/>
    <StarRating size={48} color='red' className="test" defaultRating={3} />
    <Test/> */}

    {/* <StarRating maxRating={5}/>
    <StarRating  maxRating={5} message={['Bad','Good','nice','excellent','awosome'] }/> */}