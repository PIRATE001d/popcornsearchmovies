import { useState } from "react";
import NavBar from "./NavBar";
import MovieList from "./MovieList";
import WatchedMoviesSummary from "./WatchedMoviesSummary";
import WatchedMoviesList from "./WatchedMoviesList";
import Box from "./Box";

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster: "https://m.media-amazon.com/images/I/51EG732BV3L._AC_SY445_.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster: "https://m.media-amazon.com/images/I/71c05lTE03L._AC_SY679_.jpg",
  },
  {
    imdbID: "tt4154796",
    Title: "Avengers: Endgame",
    Year: "2019",
    Poster: "https://m.media-amazon.com/images/I/81ExhpBEbHL._AC_SY679_.jpg",
  },
  {
    imdbID: "tt0111161",
    Title: "The Shawshank Redemption",
    Year: "1994",
    Poster: "https://m.media-amazon.com/images/I/51NiGlapXlL._AC_.jpg",
  },
  {
    imdbID: "tt0468569",
    Title: "The Dark Knight",
    Year: "2008",
    Poster: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQkUywIUXDjHSQJIaNHYVs08osgBpF5Ot-xmB_omyEZeeRP9Xug",
  },
  {
    imdbID: "tt0110413",
    Title: "Léon: The Professional",
    Year: "1994",
    Poster: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcREMk53JJK7tX9ZUA_8WRlcMc6yI9CJeeLMOdxQaBCJd5RCInHZ",
  },
  
  
  {
    imdbID: "tt0241527",
    Title: "Harry Potter and the Sorcerer's Stone",
    Year: "2001",
    Poster: "https://m.media-amazon.com/images/I/81iqZ2HHD-L._AC_SY679_.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState(tempWatchedData);

  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
    <>
      <NavBar query={query} setQuery={setQuery} moviesCount={movies.length} /> 
      <main className="main">
        <Box title="Movies" defaultOpen>
          <MovieList movies={movies} />
        </Box>
        <Box title="Movies You Watched" defaultOpen>
          <WatchedMoviesSummary
            watched={watched}
            avgImdbRating={avgImdbRating}
            avgUserRating={avgUserRating}
            avgRuntime={avgRuntime}
          />
          <WatchedMoviesList watched={watched} />
        </Box>
      </main>
    </>
  );
}
