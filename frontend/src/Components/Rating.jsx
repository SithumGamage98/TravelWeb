import React from "react";

function Rating({ value, count }) {
  const stars = [];

  for (let i = 0; i < 5; i++) {
    if (i < value) {
      stars.push(<span key={i} className="star filled">&#9733;</span>);
    } else {
      stars.push(<span key={i} className="star">&#9734;</span>);
    }
  }

  return (
    <div className="rating">
      {stars}
    </div>
  );
}

export default Rating;
