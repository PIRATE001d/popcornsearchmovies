export default function NavBar({ query, setQuery, moviesCount }) {
    return (
      <nav className="nav-bar">

        <Logo />
        <Search query={query} setQuery={setQuery} moviesCount={moviesCount}  />
       
      </nav>
    );
  }
  
  function Logo () {
    return (  
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
    )

  
  }
  function Search ( { query, setQuery, moviesCount }) {
    return ( <>
     <input
          className="search"
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <p className="num-results">
          Found <strong>{moviesCount}</strong> results
        </p>
    
    </>
    )
    }
      