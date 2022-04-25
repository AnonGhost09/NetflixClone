import axios from "./axios";
import React, { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import "./Row.css";

function Row({ title, fetchURL, isLargeRow = false }) {
  const [movies, setMovies] = useState([]);
  const [audio] = useState(
    new Audio("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3")
  );
  const [playing, setPlaying] = useState(false);

  const base_url = "https://image.tmdb.org/t/p/original";

  useEffect(() => {
    const proms = audio.play();
    if (proms !== undefined) {
      proms
        .then(_ => {
          playing ? audio.play() : audio.pause();
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [playing, audio]);

  useEffect(() => {
    audio.addEventListener("ended", () => setPlaying(false));
    return () => {
      audio.removeEventListener("ended", () => setPlaying(false));
    };
  }, [audio]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchURL);
      setMovies(request.data.results);
    }

    fetchData();
  }, [fetchURL]);

  const hover = () => {
    setPlaying(!playing);
  };

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters" onMouseEnter={hover} onMouseLeave={hover}>
        {movies.map(
          movie =>
            ((isLargeRow && movie.poster_path) || //berguna agar tidak meload yang tidak ada fotonya
              (!isLargeRow && movie.backdrop_path)) && (
              <LazyLoadImage
                className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                key={movie.id}
                src={`${base_url}${
                  isLargeRow ? movie?.poster_path : movie?.backdrop_path
                }`}
                placeholderSrc={process.env.PUBLIC_URL + "/loading.gif"} //jika ingin mengakses public harus proccess.env.PUBLIC_URL
                alt={movie.name}
              />
            )
        )}
      </div>
    </div>
  );
}

export default Row;
