import React, { useEffect, useState } from 'react';
import styles from './css/Home.module.css'

const Home = () => {

  // json data storing object
  const [movieData, setMovieData]=useState(null);

  // fetching the json data fiel
  useEffect(()=>{
    fetch('./data.json')
    .then((response)=>response.json())
    .then((data)=>setMovieData(data))

  })


  // img path variable
  const [framePath, setFramePath] = useState('./frames/inception.png');
  // movie name text
  const [movieText, setMovieText] = useState('Interstellar');



  const nextMovie = () => {
    const number = Math.floor(Math.random() * (100 - 0 + 1));    alert(number);
  }


  // on submitting the movie name
  const submit = () => {
    alert("movie name submited")
    console.log(movieData)
  }






  return (
    <div id={styles.mainBox}>
      <p id={styles.h1}>GuessTheFrame.com</p>
      <img id={styles.frame} src={framePath} />
      <div id={styles.typeBox}>
        <input id={styles.movieText} type='text' value={movieText} onChange={(e) => { setMovieText(e.target.value) }} />
        <button id={styles.submit} onClick={submit}>submit</button>
      </div>
      <button id={styles.next} onClick={nextMovie}>Next</button>

    </div>
  );
};




export default Home;
