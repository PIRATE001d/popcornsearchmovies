import React, { useEffect, useState } from "react"; 
import NavBar from "./NavBar";
import MovieList from "./MovieList";
import WatchedMoviesSummary from "./WatchedMoviesSummary";
import WatchedMoviesList from "./WatchedMoviesList";
import Box from "./Box";

import { Error, Loading } from "./Error";
import { MovieInfo } from "./MovieInfo";




export const KEY ="220385e4"

export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);



  useEffect(() => { 
    const fetchMovies = async () => {
      setIsLoading(true); 
      try {
        const response = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();

        if (data.Search) {
          setMovies(data.Search);
        } else {
          setMovies([]); 
        }
      } catch (error) {
        console.error("Fetch error:", error);
        setError(error.message);
      } finally {
        setIsLoading(false); 
      }
    };

    fetchMovies();
  }, [query]);

  function handleGetMovieInfo(selectedMovie) {
    setSelectedMovie(selectedMovie);
  }

  function handleAddMovieToWatched(movie) {
    setWatched([...watched, movie]);
  }

  function handleRemoveMovieFromWatched(movie) {
    setWatched((watched)=> watched.filter((movie) => movie.imdbID!== movie.imdbID))
  }

  return (
    <>
      <NavBar query={query} setQuery={setQuery} moviesCount={movies.length} /> 
      <main className="main">
        <Box title="Movies" defaultOpen>
          {isLoading && <Loading />}
          {error && <Error />}
          {!isLoading && !error && <MovieList movies={movies} onMovieSelect={handleGetMovieInfo} />}
        </Box>
        <Box  defaultOpen>
  {selectedMovie ? (
    <MovieInfo imdbID={selectedMovie} setSelectedMovie={setSelectedMovie} handleAddMovieToWatched={handleAddMovieToWatched } watched={watched} />
  ) : (
    <>
      <WatchedMoviesSummary
        watched={watched}
    
      />
      <WatchedMoviesList RemoveMovie={handleRemoveMovieFromWatched} watched={watched} />
    </>
  )}
</Box>
      </main>
    </>
  );
}

