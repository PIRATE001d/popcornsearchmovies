export default function WatchedMoviesSummary({ watched}) {

    
 return (
      <div className="summary">
        <h2>Movies you watched</h2>
        <div>
          <p>
            <span>#️⃣</span>
            <span>{watched.length} movies</span>
          </p>
          
        </div>
      </div>
    );
  }
  