import React, { useState } from "react";

export function RatingStars({ MaxRating  ,setUserRating}) {
  const [Rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0); // State to track the hover rating

  function HandleRating(Rating) {
    setRating(Rating);
    setUserRating(Rating);
  }

  const containerStyle = {
    display: "flex", // Ensures the stars are arranged in a row
    justifyContent: "center", // Centers the stars horizontally
    alignItems: "center", // Aligns the stars vertically
  };

  return (
    <div style={containerStyle}>
      {Array.from({ length: MaxRating }, (_, i) => (
        <Star
          key={i}
          onRate={() => HandleRating(i + 1)}
          full={ Rating >= i + 1 || hoverRating >= i + 1 }
          onMouseEnter={() => setHoverRating(i + 1)}
          onMouseLeave={() => setHoverRating(0)} 
        />
      ))}
      <p>{hoverRating || Rating || ""}</p> 
    </div>
  );
}
const StarStyle = {
  width: "40px",
  height: "40px",
  display: "block",
  cursor: "pointer",
};
function Star({ onRate, full, onMouseEnter, onMouseLeave }) {
  return (
    <span
      role="button"
      style={StarStyle}
      onClick={onRate}
      onMouseEnter={onMouseEnter} // Add mouse enter event
      onMouseLeave={onMouseLeave} // Add mouse leave event
    >
      {full ? (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#FFD700" stroke="#FFD700">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#FFD700">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      )}
    </span>
  );
}
