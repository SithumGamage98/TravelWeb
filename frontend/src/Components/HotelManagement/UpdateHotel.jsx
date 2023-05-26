import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdateHotel = () => {
  const [hotel, setHotel] = useState({
    name: '',
    type: '',
    city: '',
    address: '',
    distance: '',
    title: '',
    description: '',
    rooms: '',
    cheapestprice: '',
    featured: '',
    rating: ''
  });

  const [errors, setErrors] = useState({});

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8060/hotels/hotel/view/${id}`)
      .then((res) => {
        setHotel({
          name: res.data.name,
          type: res.data.type,
          city: res.data.city,
          address: res.data.address,
          distance: res.data.distance,
          title: res.data.title,
          description: res.data.description,
          rooms: res.data.rooms,
          cheapestprice: res.data.cheapestprice,
          featured: res.data.featured,
          rating: res.data.rating
        });
      })
      .catch((err) => {
        console.log('Unsuccessfully');
      });
  }, [id]);

  const validateForm = () => {
    let formIsValid = true;
    const newErrors = {};

    if (!hotel.name) {
      formIsValid = false;
      newErrors.name = 'Hotel name is required';
    }

    if (!hotel.type) {
      formIsValid = false;
      newErrors.type = 'Hotel type is required';
    }

    if (!hotel.city) {
      formIsValid = false;
      newErrors.city = 'City is required';
    }

    if (!hotel.address) {
      formIsValid = false;
      newErrors.address = 'Address/Location is required';
    }

    if (!hotel.distance) {
      formIsValid = false;
      newErrors.distance = 'Distance is required';
    }

    if (!hotel.title) {
      formIsValid = false;
      newErrors.title = 'Title is required';
    }

    if (!hotel.description) {
      formIsValid = false;
      newErrors.description = 'Description is required';
    }

    if (!hotel.rooms) {
      formIsValid = false;
      newErrors.rooms = 'Available Room Count is required';
    }

    if (!hotel.cheapestprice) {
      formIsValid = false;
      newErrors.cheapestprice = 'Cheapest Price is required';
    }

    if (!hotel.rating) {
      formIsValid = false;
      newErrors.rating = 'Rating is required';
    }

    setErrors(newErrors);
    return formIsValid;
  };

  const onChange = (e) => {
    setHotel({ ...hotel, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const data = {
      name: hotel.name,
      type: hotel.type,
      city: hotel.city,
      address: hotel.address,
      distance: hotel.distance,
      title: hotel.title,
      description: hotel.description,
      rooms: hotel.rooms,
      cheapestprice: hotel.cheapestprice,
      featured: hotel.featured,
      rating: hotel.rating
    };

    axios
      .put(`http://localhost:8060/hotels/hotel/update/${id}`, data)
      .then((res) => {
        navigate(`/hotels`);
        alert('Updated successfully....');
      })
      .catch((err) => {
        console.log('Error in UpdateBookInfo!');
      });
  };

  return (
    <div className="container mt-5" style={{ width: '800px', margin: '0 auto', marginBottom: '100px' }}>
      <div>
        <h1 style={{textAlign:"center"}}>Update hotel</h1>
        <form onSubmit={onSubmit}>
          <div className="form-group" style={{ margin: '30px' }}>
            <label>Hotel Name</label>
            <br />
            <input
              type="text"
              name="name"
              id="name"
              className="form-control"
              value={hotel.name}
              onChange={onChange}
              required
            />
            {errors.name && <span className="text-danger">{errors.name}</span>}
          </div>
          <div className="form-group" style={{margin: '30px'}}>
            <label>Hotel Type</label>
            <br />
            <div>
              <input
                style={{ marginRight: '10px' }}
                type="radio"
                name="type"
                id="cabins"
                value="Cabins"
                checked={hotel.type === 'Cabins'}
                onChange={onChange}
                required
                className="form-check-input"
              />
              <label htmlFor="cabins" className="form-check-label" style={{ marginRight: '10px' }}>
                Cabins
              </label>

              <input
                style={{ marginRight: '10px' }}
                type="radio"
                name="type"
                id="resorts"
                value="Resorts"
                checked={hotel.type === 'Resorts'}
                onChange={onChange}
                required
                className="form-check-input"
              />
              <label htmlFor="resorts" className="form-check-label" style={{ marginRight: '10px' }}>
                Resorts
              </label>

              <input
                style={{ marginRight: '10px' }}
                type="radio"
                name="type"
                id="villas"
                value="Villas"
                checked={hotel.type === 'Villas'}
                onChange={onChange}
                required
              />
              <label htmlFor="villas" style={{ marginRight: '10px' }}>
                Villas
              </label>

              <input
                style={{ marginRight: '10px' }}
                type="radio"
                name="type"
                id="apartments"
                value="Apartments"
                checked={hotel.type === 'Apartments'}
                onChange={onChange}
                required
              />
              <label htmlFor="apartments" style={{ marginRight: '10px' }}>
                Apartments
              </label>
            </div>
            {errors.type && <span className="text-danger">{errors.type}</span>}
          </div>

          <div className="form-group" style={{ margin: '30px' }}>
            <label>City</label>
            <br />
            <input
              type="text"
              name="city"
              placeholder="city"
              id="city"
              className="form-control"
              value={hotel.city}
              onChange={onChange}
              required
            />
            {errors.city && <span className="text-danger">{errors.city}</span>}
          </div>

          <div className="form-group" style={{ margin: '30px' }}>
            <label>Address/Location</label>
            <br />
            <textarea
              type="text"
              name="address"
              placeholder="address"
              id="address"
              className="form-control"
              value={hotel.address}
              onChange={onChange}
              required
            />
            {errors.address && <span className="text-danger">{errors.address}</span>}
          </div>

          <div className="form-group" style={{ margin: '30px' }}>
            <label>Distance</label>
            <input
              type="number"
              name="distance"
              id="distance"
              className="form-control"
              value={hotel.distance}
              onChange={onChange}
              required
            />
            {errors.distance && <span className="text-danger">{errors.distance}</span>}
          </div>
          <div className="form-group" style={{ margin: '30px' }}>
            <label>Title</label>
            <br />
            <input
              type="text"
              name="title"
              id="title"
              className="form-control"
              value={hotel.title}
              onChange={onChange}
              required
            />
            {errors.title && <span className="text-danger">{errors.title}</span>}
          </div>
          <div className="form-group" style={{ margin: '30px' }}>
            <label>Description</label>
            <br />
            <input
              type="text"
              name="description"
              id="description"
              className="form-control"
              value={hotel.description}
              onChange={onChange}
              required
            />
            {errors.description && <span className="text-danger">{errors.description}</span>}
          </div>

          <div className="form-group" style={{ margin: '30px' }}>
            <label>Available Room Count</label>
            <br />
            <input
              type="number"
              name="rooms"
              id="rooms"
              className="form-control"
              value={hotel.rooms}
              onChange={onChange}
              required
            />
            {errors.rooms && <span className="text-danger">{errors.rooms}</span>}
          </div>
          <div className="form-group" style={{ margin: '30px' }}>
            <label>Price</label>
            <br />
            <input
              type="number"
              name="cheapestprice"
              id="cheapestprice"
              className="form-control"
              value={hotel.cheapestprice}
              onChange={onChange}
              required
            />
            {errors.cheapestprice && <span className="text-danger">{errors.cheapestprice}</span>}
          </div>

          <div className="mb-3">
            <div className="form-check" style={{ margin: '30px' }}>
              <label htmlFor="featured" className="form-check-label">
                Featured
                <input
                  type="checkbox"
                  name="featured"
                  id="featured"
                  checked={hotel.featured}
                  onChange={onChange}
                  className="form-check-input"
                />
              </label>
            </div>
          </div>

          <div className="form-group" style={{ margin: '30px' }}>
            <label>Ratings</label>
            <input
              type="number"
              name="rating"
              min={0}
              max={5}
              placeholder="Rating"
              id="rating"
              className="form-control"
              value={hotel.rating}
              onChange={onChange}
              required
            />
            {errors.rating && <span className="text-danger">{errors.rating}</span>}
          </div>

          <div style={{textAlign:"center"}}>
          <a href="/hotels" className="btn btn-secondary" style={{ margin: "10px" }}>
            Back
          </a>
            <button type="submit" className="btn btn-primary" style={{ margin: '20px', width: '100px' }}>
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateHotel;
