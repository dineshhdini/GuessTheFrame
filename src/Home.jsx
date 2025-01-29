import React, { useEffect, useState } from 'react';
import styles from './css/Home.module.css'






const Home = () => {


  // json data storing object
  const [movieData, setMovieData] = useState(null);

  // fetches the movies data from the text file afr loading the wap page
  useEffect(() => {
    fetch('./data.json')
      .then((response) => response.json())
      .then((data) => setMovieData(data));
  }, [])






  // img path variable
  const [framePath, setFramePath] = useState('./frames/1.png');
  // movie name text
  const [movieText, setMovieText] = useState();









  // on submitting the movie name
  const submitMovie = () => {


    const number = Math.floor(Math.random() * (2 - 0 + 1));

    console.log("Next Movie id : "+number)
    console.log(movieData)
    setFramePath(`./frames/${number+1}.png`)


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
            <input placeholder='enter movie title here' id={styles.movieText} type='text' value={movieText} onChange={(e) => { setMovieText(e.target.value) }} />
            <button id={styles.submit} onClick={submitMovie}>submit</button>
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
