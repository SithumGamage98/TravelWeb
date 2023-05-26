import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Rating from "../Rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const ViewEvent = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`http://localhost:8060/events/event/view/${id}`);
        setEvent(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEvent();
  }, [id]);

  const handleLike = () => {
    setLikes(likes + 1);
  };

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ textAlign: "center", height: "800px", margin:"0 auto" }}>
      <div className="info-container card" style={{ float: "left", width: "40%", margin: "10px", maxHeight: "1000px" }}>
        {Array.isArray(event.photos) &&
          event.photos.map((photo, index) => (
            <img
              key={index}
              src={typeof photo !== "undefined" ? require(`../EventsManagement/EventImages/${photo}`) : "Error"}
              style={{
                margin: "10px",
                padding: "10px",
                borderRadius: "5px",
                boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
              }}
              alt={`Photo ${index}`}
            />
          ))}
      </div>
      <div className="info-container card" style={{ float: "left", width: "50%", margin: "10px" }}>
        <p style={{ fontSize: "24px", fontWeight: "bold"}}>{event.eventname}</p>
        <Rating value={event.rating} readOnly />
        <p style={{ marginTop: "10px" }}>Event Type: {event.category}</p>
        <p style={{ marginTop: "20px" }}>Description:</p>
        <p>{event.description}</p>
        <div style={{ marginTop: "20px" }}>
            
              <FontAwesomeIcon  onClick={handleLike} icon={faHeart} style={{ marginRight: "5px", color:"red", fontSize:"24px" }} />
              {likes}
          </div>
        <p style={{ marginTop: "20px" }}>Event Venue: {event.place}</p>
        <p>
  Season: <p style={{ marginTop: "20px", fontWeight: "bold", color: "#2E8B57" }}>{event.month}</p>
</p>
      </div>
    </div>
  );
};

export default ViewEvent;
