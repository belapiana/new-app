import React, { useState, useEffect } from "react";
import "./Gallery.css";

function Gallery() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTours = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("https://course-api.com/react-tours-project");
      if (!response.ok) throw new Error("Failed to fetch tours.");
      const data = await response.json();
      setTours(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const removeTour = (id) => {
    setTours(tours.filter((tour) => tour.id !== id));
  };

  useEffect(() => {
    fetchTours();
  }, []);

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">Error: {error}</p>;

  return (
    <section className="gallery">
      {tours.length === 0 ? (
        <p>No tours available. <button onClick={fetchTours}>Reload Tours</button></p>
      ) : (
        tours.map((tour) => (
          <div className="tour-card" key={tour.id}>
            <img src={tour.image} alt={tour.name} className="tour-image" />
            <div className="tour-info">
              <h2>{tour.name}</h2>
              <p className="tour-price">${tour.price}</p>
              <p className="tour-description">
                {tour.description.length > 100
                  ? `${tour.description.substring(0, 100)}...`
                  : tour.description}
                <button
                  onClick={(e) => {
                    e.target.textContent =
                      e.target.textContent === "Read More"
                        ? "Show Less"
                        : "Read More";
                    e.target.previousSibling.textContent =
                      e.target.textContent === "Show Less"
                        ? tour.description
                        : `${tour.description.substring(0, 100)}...`;
                  }}
                >
                  Read More
                </button>
              </p>
              <button className="not-interested" onClick={() => removeTour(tour.id)}>
                Not Interested
              </button>
            </div>
          </div>
        ))
      )}
    </section>
  );
}

export default Gallery;
