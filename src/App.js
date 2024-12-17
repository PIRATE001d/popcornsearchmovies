import React, { useEffect, useState , useRef } from "react"; 
import NavBar from "./NavBar";
import MovieList from "./MovieList";
import WatchedMoviesSummary from "./WatchedMoviesSummary";
import WatchedMoviesList from "./WatchedMoviesList";
import Box from "./Box";
import Notification from "./Notification";
import { Error, Loading } from "./Error";
import { MovieInfo } from "./MovieInfo";




export const KEY ="220385e4"

export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState(()=>{
    const SavedMovies = localStorage.getItem("watched");
    return SavedMovies ? JSON.parse(SavedMovies) : [];
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [notification, setNotification] = useState(null);




  useEffect(() => {
    const controller = new AbortController();
  
    const fetchMovies = async () => {
      setIsLoading(true); 
      
  
      try {
        const response = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`, {
          signal: controller.signal,
        });
  
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
  
        const data = await response.json();
  
        setMovies(data.Search || [] ); // Default to an empty array if no results
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Fetch aborted");

        } else {
          console.error("Fetch error:", error);
          setError(error.message); 
        }
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchMovies();
  
    return () => {
      controller.abort(); // Cleanup: Abort ongoing fetch request
    };
  }, [query]);

  useEffect(()=>{
    localStorage.setItem("watched",JSON.stringify(watched));

  },[watched])

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

