import { KEY } from "../App";
import { useState , useEffect } from "react";




export default function UsefetchMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false); 
   const [error, setError] = useState(null);
   

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



  return { movies, isLoading, error };
  }