export default function WatchedMoviesList({ watched,RemoveMovie  }) {
    return (
      <ul className="list">
        {watched.map((movie) => (
          <li key={movie.imdbID} > 
            <img src={movie.poster} alt={`${movie.title} poster`} /> 
            <h3>{movie.Title}</h3>
            <div>
              <p>
                <span>⭐️</span>
                <span>{movie.imdbRating}</span>
              </p>
              <p>
                <span>🌟</span>
                <span>{movie.UserRating}</span>
              </p>
              <p>
                <span>⏳</span>
                <span>{movie.runtime} </span>
              </p>
              <button className="btn-delete" onClick={()=>RemoveMovie(movie.imdbID) } >Remove</button>
            </div>
          </li>
        ))}
      </ul>
    );
  }
  