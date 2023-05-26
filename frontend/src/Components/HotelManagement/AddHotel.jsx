import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';

function AddHotel() {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [distance, setDistance] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [rooms, setRooms] = useState("");
  const [cheapestprice, setCheapestPrice] = useState("");
  const [featured, setFeatured] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [rating, setRating] = useState(0);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleEventImageChange = (e) => {
    setPhotos(e.target.files);
  };

  const validateForm = () => {
    if (
      !name ||
      !type ||
      !city ||
      !address ||
      !distance ||
      !title ||
      !description ||
      !rooms ||
      !cheapestprice ||
      rating < 0 ||
      rating > 5 ||
      photos.length === 0
    ) {
      setError("Please fill in all the required fields.");
      return false;
    }
    setError("");
    return true;
  };

  const addBlog = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("type", type);
      formData.append("city", city);
      formData.append("address", address);
      formData.append("distance", distance);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("rooms", rooms);
      formData.append("cheapestprice", cheapestprice);
      formData.append("featured", featured);
      formData.append("rating", rating);
      for (let i = 0; i < photos.length; i++) {
        formData.append("photos", photos[i]);
      }

      const result = await axios.post(
        "http://localhost:8060/hotels/add/new",
        formData
      );

      if (result?.status === 201) {
        alert("Hotel added successfully");
        navigate("/hotels");
        window.location.reload();
      }
    } catch (err) {
      console.error(err?.response?.data?.errorMessage);
      alert(err?.response?.data?.errorMessage);
    }
  };

  return (
    <div className="container mt-5" style={{ width: "800px", margin: "0 auto", marginBottom:"100px" }}>
      <h1 className="text-center mb-4">Add Hotel</h1>
      <form onSubmit={addBlog}>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="mb-3">
          <label htmlFor="name">Hotel Name</label>
          <input
            type="text"
            id="name"
            placeholder="Hotel Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label>Hotel Type</label>
          <div className="d-flex">
            <div className="form-check me-3">
              <input
                type="radio"
                id="cabins"
                name="hotelType"
                value="Cabins"
                required
                checked={type === "Cabins"}
                onChange={(e) => setType(e.target.value)}
                className="form-check-input"
              />
              <label htmlFor="cabins" className="form-check-label">Cabins</label>
            </div>
            <div className="form-check me-3">
              <input
                type="radio"
                id="resorts"
                name="hotelType"
                value="Resorts"
                required
                checked={type === "Resorts"}
                onChange={(e) => setType(e.target.value)}
                className="form-check-input"
              />
              <label htmlFor="resorts" className="form-check-label">Resorts</label>
            </div>
            <div className="form-check me-3">
              <input
                type="radio"
                id="villas"
                name="hotelType"
                value="Villas"
                required
                checked={type === "Villas"}
                onChange={(e) => setType(e.target.value)}
                className="form-check-input"
              />
              <label htmlFor="villas" className="form-check-label">Villas</label>
            </div>
            <div className="form-check me-3">
              <input
                type="radio"
                id="apartments"
                name="hotelType"
                value="Apartments"
                required
                checked={type === "Apartments"}
                onChange={(e) => setType(e.target.value)}
                className="form-check-input"
              />
              <label htmlFor="apartments" className="form-check-label">Apartments</label>
            </div>
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            placeholder="City"
            required
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="address">Address/Location</label>
          <input
            type="text"
            id="address"
            placeholder="Address/Location"
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="distance">Distance</label>
          <input
            type="text"
            id="distance"
            placeholder="Distance"
            required
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            placeholder="Title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            placeholder="Description"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-control"
            rows={3}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="rooms">Available Room Count</label>
          <input
            type="text"
            id="rooms"
            placeholder="Available Room Count"
            required
            value={rooms}
            onChange={(e) => setRooms(e.target.value)}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="cheapestprice">Cheapest Price</label>
          <input
            type="number"
            id="cheapestprice"
            placeholder="Cheapest Price"
            required
            value={cheapestprice}
            onChange={(e) => setCheapestPrice(e.target.value)}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label>Featured</label>
          <div className="form-check">
            <input
              type="checkbox"
              id="featured"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              className="form-check-input"
            />
            <label htmlFor="featured" className="form-check-label">Display as Featured</label>
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="rating">Rating</label>
          <input
            type="number"
            id="rating"
            placeholder="Rating"
            required
            value={rating}
            min={0}
            max={5}
            onChange={(e) => setRating(parseInt(e.target.value))}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="photos">Photos</label>
          <Form.Control type="file" id="photos" onChange={handleEventImageChange} multiple />
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-primary">Add Hotel</button>
        </div>
      </form>
    </div>
  );
}

export default AddHotel;
