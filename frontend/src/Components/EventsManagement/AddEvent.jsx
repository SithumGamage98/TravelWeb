import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";

function AddEvent() {
  const [eventname, setEventName] = useState("");
  const [category, setCategory] = useState("");
  const [month, setMonth] = useState("");
  const [place, setPlace] = useState("");
  const [description, setDescription] = useState("");
  const [photos, setPhotos] = useState([]);
  const [rating, setRating] = useState(0);
  const [errors, setErrors] = useState({}); // State to store validation errors

  const navigate = useNavigate();

  const handleEventImageChange = (e) => {
    setPhotos(e.target.files);
  };

  const addEvent = async (e) => {
    e.preventDefault();

    // Perform form validation before submitting
    if (validateForm()) {
      try {
        const formData = new FormData();
        formData.append("eventname", eventname);
        formData.append("category", category);
        formData.append("month", month);
        formData.append("place", place);
        formData.append("description", description);
        formData.append("rating", rating);
        for (let i = 0; i < photos.length; i++) {
          formData.append("photos", photos[i]);
        }

        const result = await axios.post(
          "http://localhost:8060/events/add/new",
          formData
        );

        if (result?.status === 201) {
          alert("Event added successfully");
          resetForm();
          navigate("/events");
          window.location.reload();
        }
      } catch (err) {
        console.error(err?.response?.data?.errorMessage);
        alert(err?.response?.data?.errorMessage);
      }
    }
  };

  const resetForm = () => {
    setEventName("");
    setCategory("");
    setMonth("");
    setPlace("");
    setDescription("");
    setPhotos([]);
    setRating(0);
  };

  const validateForm = () => {
    const errors = {};

    if (!eventname.trim()) {
      errors.eventname = "Event Name is required";
    }

    if (!category) {
      errors.category = "Event Category is required";
    }

    if (!month.trim()) {
      errors.month = "Month is required";
    }

    if (!place.trim()) {
      errors.place = "Place/Location is required";
    }

    if (!description.trim()) {
      errors.description = "Description is required";
    }

    if (rating < 0 || rating > 5) {
      errors.rating = "Rating must be between 0 and 5";
    }

    if (photos.length === 0) {
      errors.photos = "Please upload at least one photo";
    }

    setErrors(errors);

    return Object.keys(errors).length === 0; // Return true if there are no errors
  };

  return (
    <div className="container mt-5" style={{ margin: "100px" }}>
      <h1 className="text-center mb-4">Add Event</h1>
      <Form onSubmit={addEvent}>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Event Name"
            required
            value={eventname}
            onChange={(e) => setEventName(e.target.value)}
            isInvalid={!!errors.eventname}
          />
          <Form.Control.Feedback type="invalid">
            {errors.eventname}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Event Category</Form.Label>
          <div>
            <Form.Check
              inline
              type="radio"
              name="category"
              value="Religious"
              checked={category === "Religious"}
              onChange={(e) => setCategory(e.target.value)}
              isInvalid={!!errors.category}
              label="Religious"
            />
            <Form.Check
              inline
              type="radio"
              name="category"
              value="Non-Religious"
              checked={category === "Non-Religious"}
              onChange={(e) => setCategory(e.target.value)}
              isInvalid={!!errors.category}
              label="Non-Religious"
            />
            <Form.Control.Feedback type="invalid">
              {errors.category}
            </Form.Control.Feedback>
          </div>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Month"
            required
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            isInvalid={!!errors.month}
          />
          <Form.Control.Feedback type="invalid">
            {errors.month}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Place/Location"
            required
            value={place}
            onChange={(e) => setPlace(e.target.value)}
            isInvalid={!!errors.place}
          />
          <Form.Control.Feedback type="invalid">
            {errors.place}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Description"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            isInvalid={!!errors.description}
          />
          <Form.Control.Feedback type="invalid">
            {errors.description}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <InputGroup>
            <Form.Control
              type="number"
              placeholder="Ratings (0 - 5)"
              required
              min={0}
              max={5}
              step={0.1}
              value={rating}
              onChange={(e) => setRating(parseFloat(e.target.value))}
              isInvalid={!!errors.rating}
            />
            <InputGroup.Text>/ 5</InputGroup.Text>
            <Form.Control.Feedback type="invalid">
              {errors.rating}
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Upload Event Images</Form.Label>
          <Form.Control
            type="file"
            name="photos"
            accept="image/jpeg, image/jpg, image/png"
            required
            multiple
            onChange={(e) => handleEventImageChange(e)}
            isInvalid={!!errors.photos}
          />
          <Form.Control.Feedback type="invalid">
            {errors.photos}
          </Form.Control.Feedback>
        </Form.Group>

        <div className="text-center">
          <Button variant="primary" type="submit">
            Save Event
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default AddEvent;
