import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateEvent = () => {
  const [event, setEvent] = useState({
    eventname: "",
    category: "",
    month: "",
    place: "",
    description: "",
    rating: "",
  });
  const [errors, setErrors] = useState({}); // State to store validation errors

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8060/events/event/view/${id}`)
      .then((res) => {
        setEvent({
          eventname: res.data.eventname,
          category: res.data.category,
          month: res.data.month,
          place: res.data.place,
          description: res.data.description,
          rating: res.data.rating,
        });
      })
      .catch((err) => {
        console.log("Unsuccessfully");
      });
  }, [id]);

  const onChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    // Perform form validation before submitting
    if (validateForm()) {
      const data = {
        eventname: event.eventname,
        category: event.category,
        month: event.month,
        place: event.place,
        description: event.description,
        rating: event.rating,
      };

      axios
        .put(`http://localhost:8060/events/event/update/${id}`, data)
        .then((res) => {
          navigate(`/events`);
          alert("Updated successfully....");
        })
        .catch((err) => {
          console.log("Error in UpdateBookInfo!");
        });
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!event.eventname.trim()) {
      errors.eventname = "Event Name is required";
    }

    if (!event.category) {
      errors.category = "Event Category is required";
    }

    if (!event.month.trim()) {
      errors.month = "City is required";
    }

    if (!event.place.trim()) {
      errors.place = "Address/Location is required";
    }

    if (!event.description.trim()) {
      errors.description = "Title is required";
    }

    if (event.rating < 0 || event.rating > 5) {
      errors.rating = "Rating must be between 0 and 5";
    }

    setErrors(errors);

    return Object.keys(errors).length === 0; // Return true if there are no errors
  };

  return (
    <div className="container mt-5 update-event" style={{ margin: "100px" }}>
      <h1 className="text-center">Update Event</h1>
      <form onSubmit={onSubmit}>
        <br />
        <div className="form-group">
          <label>Event Name</label>
          <input
            type="text"
            name="eventname"
            className={`form-control ${errors.eventname ? "is-invalid" : ""}`}
            value={event.eventname}
            onChange={onChange}
            required
          />
          {errors.eventname && (
            <div className="invalid-feedback">{errors.eventname}</div>
          )}
        </div>
        <br />
        <div className="form-group">
          <label>Event Category</label>
          <div className="radio-buttons">
            <label style={{ margin: "10px" }}>
              <input
                style={{ margin: "10px" }}
                type="radio"
                name="category"
                value="Religious"
                checked={event.category === "Religious"}
                onChange={onChange}
                required
              />
              Religious
            </label>

            <label style={{ margin: "10px" }}>
              <input
                style={{ margin: "10px" }}
                type="radio"
                name="category"
                value="Non-Religious"
                checked={event.category === "Non-Religious"}
                onChange={onChange}
                required
              />
              Non-Religious
            </label>
          </div>
          {errors.category && (
            <div className="invalid-feedback">{errors.category}</div>
          )}
        </div>
        <br />
        <div className="form-group">
          <label>City</label>
          <input
            type="text"
            name="month"
            className={`form-control ${errors.month ? "is-invalid" : ""}`}
            value={event.month}
            onChange={onChange}
            required
          />
          {errors.month && (
            <div className="invalid-feedback">{errors.month}</div>
          )}
        </div>
        <br />

        <div className="form-group">
          <label>Address/Location</label>
          <textarea
            type="text"
            name="place"
            className={`form-control ${errors.place ? "is-invalid" : ""}`}
            value={event.place}
            onChange={onChange}
            required
          />
          {errors.place && (
            <div className="invalid-feedback">{errors.place}</div>
          )}
        </div>
        <br />
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="description"
            className={`form-control ${errors.description ? "is-invalid" : ""}`}
            value={event.description}
            onChange={onChange}
            required
          />
          {errors.description && (
            <div className="invalid-feedback">{errors.description}</div>
          )}
        </div>
        <br />
        <div className="form-group">
          <label>Ratings</label>
          <input
            type="number"
            name="rating"
            min={0}
            max={5}
            className={`form-control ${errors.rating ? "is-invalid" : ""}`}
            value={event.rating}
            onChange={onChange}
            required
          />
          {errors.rating && (
            <div className="invalid-feedback">{errors.rating}</div>
          )}
        </div>
        <br />
        <div className="buttons" style={{ margin: "10px", textAlign:"center" }}>
          <a href="/events" className="btn btn-secondary" style={{ margin: "10px" }}>
            Back
          </a>
          <button type="submit" className="btn btn-primary" style={{ margin: "10px" }}>
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateEvent;
