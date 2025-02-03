import React, { useEffect, useState } from 'react';
import styles from './css/Home.module.css'






const Home = () => {


  // vaariables

  // json data storing object
  const [movieData, setMovieData] = useState(null);
  // matching movie names object
  const [matchigMovies, setMatchingMovies] = useState({});
  // current frame movie name
  const [currMovie, setCurrMovie] = useState("avatar");
  // img path variable
  const [framePath, setFramePath] = useState('./frames/1.png');
  // movie name text
  const [movieText, setMovieText] = useState("");
  // current streak object
  const [streak, setStreak] = useState(0);
  // highest streak objcet
  const [highestStreak, setHighestStreak] = useState(0);
  // win rater% object
  const [winRate, setWinRate] = useState(1);
  // borserColor
  const [borderColor, setBorderColor] = useState("none");







  // fetches the movies data from the text file afr loading the wap page
  useEffect(() => {
    fetch('./data.json')
      .then((response) => response.json())
      .then((data) => setMovieData(data));
  }, [])











  // on submitting the movie name
  const submitMovie = (e) => {
    e.preventDefault();
    if (movieText) {
      console.log("suibmitted movie : " + movieText)
    }
    if (currMovie == movieText) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      winRate=winRate
      setBorderColor("4px solid rgb(93, 185, 81)")
      console.log("high : ", highestStreak)
      console.log("strewak : ", streak)
      if (highestStreak < newStreak) {
        if (highestStreak > newStreak) {
          setHighestStreak(highestStreak)
          console.log("first")
        } else {
          setHighestStreak(newStreak)
          console.log("second")
        }
      }
      //       setTimeout(()=>{
      // nextMovie();
      //       },500);
      //       nextMovie();

    } else {
      setStreak(0)
      setBorderColor("4px solid red")
    }
  }





  // generating next movie object
  const nextMovie = (e) => {
    e.preventDefault();
    const number = Math.floor(Math.random() * (13 - 0 + 1));
    const generatedMovie = movieData.find(movie => movie.id === Number(number + 1)).name;
    if (generatedMovie) {
      setCurrMovie(generatedMovie)
      setFramePath(`./frames/${number + 1}.png`)
      setMovieText('')
      setBorderColor("none")
      console.log("Next Movie id : " + Number(number + 1))
      if (currMovie) {
        console.log(currMovie)
      }

    } else {
      console.error("Movie not found for id:", number + 1);
    }


  }







  // find the matching movies names from the user input
  const findMatchMovie = (e) => {
    const text = e.target.value;
    setMovieText(text)
    if (text.trim() == "") {
      setMatchingMovies([]);
    } else {
      setMatchingMovies(
        movieData.filter(
          (movie) => movie.name.toLowerCase().includes(text.toLowerCase())
        )
      )
      // console.log(matchigMovies)
    };
  }









  return (
    <>






      <div id={styles.navbar}>
        <p id={styles.h1}>GuessTheFrame.com</p>
      </div>





      <div id={styles.container1}>




        <div id={styles.mainBox}>
          <img style={{ border: borderColor }} id={styles.frame} src={framePath} />
          <div id={styles.typeBox}>
            <form onSubmit={submitMovie}>
              <input placeholder='enter movie title here' id={styles.movieText} type='text' value={movieText} onChange={findMatchMovie} required />
              {matchigMovies.length > 0 && (
                <ul id={styles.movieList}>
                  {matchigMovies.map((movie) => (

                    <li key={movie.id} id={styles.movies} onClick={() => { setMovieText(movie.name); setMatchingMovies([]); }}>
                      {movie.name}
                    </li>
                  ))}
                </ul>
              )}
              <input type='submit' id={styles.submit} value="submit" />
            </form>
          </div>
          <button id={styles.next} onClick={nextMovie}>Next</button>
        </div>




        <div id={styles.statisticsTable}>
          <p id={styles.tableHead}>Statistics</p>
          <table>
            <thead>
              <tr>
                <td>
                  <p id={styles.text1}>Current Streak</p>
                </td>
                <td>
                  <p id={styles.text1}>Win Rate</p>
                </td>
              </tr>
            </thead>
            <thead>
              <tr>
                <td>
                  <p id={styles.text2}>{streak}</p>
                </td>
                <td>
                  <p id={styles.text2}>{winRate}%</p>
                </td>
              </tr>
            </thead>
            <thead>
              <tr>
                <td>
                  <p id={styles.text1}>Highest streak</p>
                </td>
                <td>
                  <p id={styles.text1}>Average Attempts</p>
                </td>
              </tr>
            </thead>
            <thead>
              <tr>
                <td>
                  <p id={styles.text2}>{highestStreak}</p>
                </td>
                <td>
                  <p id={styles.text2}>0</p>
                </td>
              </tr>
            </thead>
          </table>
        </div>
      </div>
    </>
  );
};




export default Home;
