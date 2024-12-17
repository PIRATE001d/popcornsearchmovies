import React, { useState } from "react"; 
import NavBar from "./NavBar";
import MovieList from "./MovieList";
import WatchedMoviesSummary from "./WatchedMoviesSummary";
import WatchedMoviesList from "./WatchedMoviesList";
import Box from "./Box";
import Notification from "./Notification";
import { Error, Loading } from "./Error";
import { MovieInfo } from "./MovieInfo";
import useFetch  from "./CustomHooks/UsefetchMovies";
import useLocalStorage from "./CustomHooks/useLocalStorage";




export const KEY = "220385e4";

export default function App() {
  const [query, setQuery] = useState("");

  
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [notification, setNotification] = useState(null);


 const { isLoading, error, movies } = useFetch(query) ;
 const [watched, setWatched] = useLocalStorage ("watched", []);




 

  function handleGetMovieInfo(selectedMovie) {
    setSelectedMovie(selectedMovie);
  }

  function handleAddMovieToWatched(movie) {
    setWatched([...watched, movie]);
    setNotification(`${movie.Title} added to watched`);

  }

  function handleRemoveMovieFromWatched(id) {

    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
    
      setNotification('🚫You removed it from watched list');
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
        {notification && (
          <Notification message={notification} onClose={() => setNotification(null)} />
        )}
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

