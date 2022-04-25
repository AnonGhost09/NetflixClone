import axios from "./axios";
import requests from "./Request";
import React, { useEffect, useState } from "react";
import "./Banner.css";
import { configureStore } from "@reduxjs/toolkit";

function Banner() {
  const [movie, setMovie] = useState([]);
  function truncate(string, n) {
    //untuk membuat tititik2 jika kebanyakan deskripsinya
    return string.length > n ? string.substr(0, n - 1) + "..." : string;
  }

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
    }

    fetchData().catch(err => {
      console.log("er");
    });
  }, []);

  let foto = false;

  if (movie?.backdrop_path?.length > 0) {
    //arti ?. artinya adalah optional jika tidak ada tidak usah dipakai
    foto = `url("https://image.tmdb.org/t/p/original${movie?.backdrop_path}")`;
  }

  return (
    <header
      className="banner"
      style={{
        backgroundImage: foto,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie?.name || movie?.title || movie?.original_name}
        </h1>
        <div className="banner__buttons">
          <button
            className="banner__button"
            onClick={() => console.log("play")}
          >
            Play
          </button>
          <button className="banner__button">My List</button>
        </div>
        <div className="banner_description">
          <h1>{truncate(`${movie?.overview}`, 100)}</h1>
        </div>
      </div>
      <div className="banner--fadeBottom"></div>
    </header>
  );
}

export default Banner;
