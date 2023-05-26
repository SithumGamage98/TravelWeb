import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Rating from "../Rating";
import Button from 'react-bootstrap/Button';

function ClientViewAllEvents() {
  const [event, setBlogs] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get("http://localhost:8060/events/event");
      setBlogs(response.data);
    }
    fetchData();
  }, []);

  return (
    <div style={{ margin:"0 auto", height:"1000px" }}>
      <h1 style={{ textAlign: "center" }}>All Events</h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {event.map((blog) => (
          <Link
            style={{ textDecoration: "none", color: "black" }}
            to={`/viewevent/${blog._id}`}
            key={blog._id}
          >
            <div
              style={{
                width: "300px",
                margin: "10px",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                backgroundColor: "#F9F9F9",
                boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
                textAlign:"center"
              }}
            >
              <div style={{ display: "flex", justifyContent: "center" }}>
                <img
                  src={
                    typeof blog.photos[0] !== "undefined"
                      ? require(`../EventsManagement/EventImages/${blog.photos[0]}`)
                      : "Error"
                  }
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                    borderRadius: "5px",
                  }}
                  alt={`Photo 0`}
                />
              </div>
              <h3 style={{ color: "#2E8B57", marginBottom: "0.5rem" }}>
                {blog.eventname}
              </h3>
              <h3 style={{ color: "#888" }}>{blog.place}</h3>
              <Rating value={blog.rating} readOnly />
              <Button
              variant="primary"
                style={{
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  padding: "8px 16px",
                  marginTop: "10px",
                  cursor: "pointer",
                }}
              >
                More Info
              </Button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ClientViewAllEvents;
