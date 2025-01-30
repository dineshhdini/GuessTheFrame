import React, { useEffect, useState } from 'react';
import styles from './css/Home.module.css'






const Home = () => {


  // json data storing object
  const [movieData, setMovieData] = useState(null);
  // matching movie names object
  const [matchigMovies, setMatchingMovies]=useState({});

  // fetches the movies data from the text file afr loading the wap page
  useEffect(() => {
    
    fetch('./data.json')
      .then((response) => response.json())
      .then((data) => setMovieData(data));
  }, [])






  // img path variable
  const [framePath, setFramePath] = useState('./frames/1.png');
  // movie name text
  const [movieText, setMovieText] = useState("");








  // on submitting the movie name
  const submitMovie = (e) => {
    e.preventDefault();

    const number = Math.floor(Math.random() * (11 - 0 + 1));

    console.log("Next Movie id : " + number)
    console.log(movieData)
    setFramePath(`./frames/${number + 1}.png`)
    setMovieText('')

  }








const findMatchMovie = (e) => {
  const text = e.target.value;
  setMovieText(text)
  if(text.trim()==""){
    setMatchingMovies([]);
  }else{
    setMatchingMovies(
      movieData.filter(
        (movie)=>movie.name.toLowerCase().includes(text.toLowerCase())
      )
    )
    console.log(matchigMovies)
  };
  // console.log("called");
  // const movies = movieData[0].name;
  // console.log(movies)
  // movieData.map((movie)=>{console.log(movie.name)})
}









  return (
    <>






      <div id={styles.navbar}>
        <p id={styles.h1}>GuessTheFrame.com</p>
      </div>





      <div id={styles.container1}>




        <div id={styles.mainBox}>
          <img id={styles.frame} src={framePath} />
          <div id={styles.typeBox}>
            <form onSubmit={submitMovie}>
              <input placeholder='enter movie title here' id={styles.movieText} type='text' value={movieText} onChange={findMatchMovie} required />
              {matchigMovies.length > 0 && (
                <ul id={styles.movieList}>
                  {matchigMovies.map((movie)=>(
                    
                    <li key={movie.id} id={styles.movies} onClick={()=>{setMovieText(movie.name);setMatchingMovies([]);}}>
                      {movie.name}
                    </li>
                  ))}
                </ul>
              )}
              <input type='submit' id={styles.submit}  value="submit" />
            </form>
          </div>
          <button id={styles.next} onClick={submitMovie}>Next</button>
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
                  <p id={styles.text2}>0</p>
                </td>
                <td>
                  <p id={styles.text2}>- %</p>
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
                  <p id={styles.text2}>0</p>
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
