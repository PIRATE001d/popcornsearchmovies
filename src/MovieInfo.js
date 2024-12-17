import React, { useState, useEffect } from "react";
import { KEY } from "./App";
import { Error, Loading } from "./Error";
import { RatingStars } from "./RatingStars";
import { motion } from "framer-motion";

export function MovieInfo({ imdbID, setSelectedMovie, handleAddMovieToWatched, watched }) {
  const [movieInfo, setMovieInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [UserRating, setUserRating] = useState("");

  const IsWatched = watched.map((movie) => movie.imdbID).includes(imdbID);
  const WatchedMovieRating = watched.find((movie) => movie.imdbID === imdbID)?.UserRating;

  const {
    Title: title,
    Year: year,
    Plot: plot,
    Poster: poster,
    imdbRating,
    imdbVotes,
    Runtime: runtime,
    Genre: genre,
    Director: director,
    Actors: actors,
    Awards: awards,
    Language: language,
    Type: type,
  } = movieInfo;

  useEffect(() => {
    const fetchMovieInfo = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&i=${imdbID}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setMovieInfo(data);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieInfo();
  }, [imdbID]);

  useEffect(() => {
    if (!title) return;

    document.title = `${type} - ${title}`;
    return () => {
      document.title = "PopCorn Finder";
    };
  }, [title, type]);

  function handleAddMovie() {
    const newWatchedMovie = {
      imdbID: imdbID,
      Title: title,
      Year: year,
      poster: poster,
      imdbRating: imdbRating,
      runtime: runtime,
      UserRating,
    };

    handleAddMovieToWatched(newWatchedMovie);
    setSelectedMovie(null);
  }

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setSelectedMovie(null);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [setSelectedMovie]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <MovieDetails
          WatchedMovieRating={WatchedMovieRating}
          IsWatched={IsWatched}
          handleAddMovie={handleAddMovie}
          poster={poster}
          title={title}
          year={year}
          genre={genre}
          runtime={runtime}
          imdbRating={imdbRating}
          imdbVotes={imdbVotes}
          language={language}
          director={director}
          actors={actors}
          awards={awards}
          plot={plot}
          setSelectedMovie={setSelectedMovie}
          setUserRating={setUserRating}
          UserRating={UserRating}
        />
      )}
    </>
  );
}

function MovieDetails({
  IsWatched,
  WatchedMovieRating,
  setUserRating,
  poster,
  title,
  year,
  genre,
  runtime,
  imdbRating,
  imdbVotes,
  language,
  director,
  actors,
  awards,
  plot,
  setSelectedMovie,
  handleAddMovie,
  UserRating,
}) {
  return (
    <motion.div
      className="movie-info-container"
      initial={{ opacity: 0, scale: 0.9, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 50 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <button className="btn-back" onClick={() => setSelectedMovie(null)}>
        &larr;
      </button>

      <div className="movie-details">
        {poster && <img src={poster} alt={title} className="movie-poster" />}
        <h2>
          {title} ({year})
        </h2>
        <p>
          <strong>Genre:</strong> {genre}
        </p>
        <p>
          <strong>Runtime:</strong> {runtime}
        </p>
        <p>
          <strong>IMDb Rating:</strong> ⭐{imdbRating}
        </p>
        <p>
          <strong>Votes:</strong> {imdbVotes}
        </p>
        <p>
          <strong>Language:</strong> {language}
        </p>
        <p>
          <strong>Director:</strong> {director}
        </p>
        <p>
          <strong>Actors:</strong> {actors}
        </p>
        <p>
          <strong>Awards:</strong> {awards}
        </p>
        <p>
          <strong>Plot:</strong> {plot}
        </p>
        <div className="rating">
          {IsWatched ? (
            <p className="watched">You have already rated this movie ⭐{WatchedMovieRating}</p>
          ) : (
            <>
              <RatingStars MaxRating={10} setUserRating={setUserRating} />
              {UserRating > 0 && (
                <button className="btn-add" onClick={handleAddMovie}>
                  Add to Watchlist
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}
