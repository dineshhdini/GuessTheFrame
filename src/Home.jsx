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
  // win rate calculation objects
  const [totalTrue, setTotalTrue] = useState(0);
  const [totalTry, setTotalTry] = useState(0);
  const [winRate, setWinRate] = useState(0);
  // borserColor
  const [borderColor, setBorderColor] = useState("none");
  // attempts varable object
  const [attempts, setAttempts] = useState(0);
  // result msg
  const [result, setResult] = useState("");
  const [resultColor, setResultColor] = useState("rgb(93, 185, 81)");







  // fetches the movies data from the text file afr loading the wap page
  useEffect(() => {
    console.log("loaded");
    fetch('./data.json')
      .then((response) => response.json())
      .then((data) => setMovieData(data));
  }, [])











  // on submitting the movie name
  const submitMovie = (e) => {
    e.preventDefault();
    const newTotalTry = totalTry + 1;
    setTotalTry(newTotalTry);
    if (attempts < 4) {
      setAttempts(attempts + 1);
    }
    if (attempts == 4) {
      return 0;
    }
    if (currMovie == movieText) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      setResult("You're right!")
      setResultColor("rgb(93, 185, 81)")
      setBorderColor("4px solid rgb(93, 185, 81)")
      if (highestStreak < newStreak) {
        if (highestStreak > newStreak) {
          setHighestStreak(highestStreak)
        } else {
          setHighestStreak(newStreak)
        }
      }
      const newTotalTrue = totalTrue + 1;
      setTotalTrue(totalTrue + 1);
      const newWinRate = (newTotalTrue / newTotalTry) * 100;
      setWinRate(newWinRate);
    } else {
      setStreak(0)
      setResult("You're wrong!")
      setResultColor("red")
      setBorderColor("4px solid red")
      const newWinRate = (totalTrue / newTotalTry) * 100;
      setWinRate(newWinRate);
    }
    // console.log("true : ", totalTrue);
    // console.log("try : ", totalTry);
  }





  // generating next movie object
  const nextMovie = (e) => {
    e.preventDefault();
    if (attempts != 4) {
      return 0;
    }
    const number = Math.floor(Math.random() * (13 - 0 + 1));
    const generatedMovie = movieData.find(movie => movie.id === Number(number + 1)).name;
    if (generatedMovie) {
      setCurrMovie(generatedMovie)
      setFramePath(`./frames/${number + 1}.png`)
      setMovieText('')
      setAttempts(0)
      setBorderColor("none")
      // console.log("Next Movie id : " + Number(number + 1))
      if (currMovie) {
        // console.log(currMovie)
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
        <ion-icon id={styles.menu} name="menu"></ion-icon>
        <p id={styles.h1}>GuessTheFrame</p>
        <ion-icon id={styles.menu} name="person-outline"></ion-icon>
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
              <div style={{ display: "flex", flexDirection: "row" }}>
                <p id={styles.attempts}>{attempts}/4 Attempts</p>
                <p id={styles.result} style={{ color: resultColor }}>{result}</p>
              </div>
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
                  <p id={styles.text2}>{(winRate != 0.0) ? winRate.toFixed(2) : "0"}%</p>
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
