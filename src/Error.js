import React from "react";

export function Loading() {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <div className="loading-text">Please wait...</div>
    </div>
  );
}
export function Error() {
  return (
    <div className="error">
      <div className="error-container">
        Oops! Something went wrong. Please try again later.
      </div>
    </div>
  );
}
