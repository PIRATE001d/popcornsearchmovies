import { useSpring, animated } from '@react-spring/web';

export default function MovieList({ movies, onMovieSelect }) {
  const fadeIn = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 600 },
  });

  return (
    <animated.ul className="list list-movies" style={fadeIn}>
      {movies.map((movie) => (
        <li
          key={movie.imdbID}
          className="movie-item"
          onClick={() => onMovieSelect(movie.imdbID)}
        >
          <img
            src={movie.Poster}
            alt={`${movie.Title} poster`}
            className="movie-poster"
          />
          <div className="movie-details">
            <h3 className="movie-title">{movie.Title}</h3>
            <div className="movie-meta">
              <p>
                <span>🗓</span>
                <span>{movie.Year}</span>
              </p>
            </div>
          </div>
        </li>
      ))}
    </animated.ul>
  );
}
