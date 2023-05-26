import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Rating from '../Rating';
import Button from 'react-bootstrap/esm/Button';
import Footer_3 from '../layout/Footer_hotels';

const ViewHotel = () => {
  const { id } = useParams();
  const [hotel, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(
          `https://travelweb-wu6a.onrender.com/hotels/hotel/view/${id}`
        );
        setBlog(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBlog();
  }, [id]);

  if (!hotel) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ textAlign: 'center', height: '500px', marginTop: '10px' }}>
      <br></br>
      <br></br>
      <div
        className="info-container card"
        style={{
          float: 'left',
          width: '40%',
          margin: '10px',
          maxHeight: '1000px',
        }}
      >
        {Array.isArray(hotel.photos) &&
          hotel.photos.map((photo, index) => (
            <img
              key={index}
              src={
                typeof photo !== 'undefined'
                  ? require(`../HotelManagement/HotelImages/${photo}`)
                  : 'Error'
              }
              style={{ margin: '10px', padding: '10px', objectFit: 'cover' }}
              alt={`Photo ${index}`}
            />
          ))}
      </div>
      <div style={{ float: 'left', width: '50%', margin: '10px' }}>
        <div
          className="info-container card"
          style={{ float: 'left', width: '60%', margin: '10px' }}
        >
          <h1 style={{ fontSize: '24px', margin: '0', marginBottom: '10px' }}>
            <b>{hotel.name}</b>
          </h1>
          <Rating value={hotel.rating} readOnly />
          <p style={{ fontSize: '18px', margin: '0', marginBottom: '10px' }}>
            Price: {hotel.cheapestprice} LKR
          </p>
          <p
            style={{
              fontSize: '16px',
              fontWeight: 'bold',
              margin: '0',
              marginBottom: '5px',
            }}
          >
            Description:
          </p>
          <p style={{ fontSize: '16px', margin: '0', marginBottom: '10px' }}>
            {hotel.description}
          </p>
          <p
            style={{
              fontSize: '16px',
              fontWeight: 'bold',
              margin: '0',
              marginBottom: '5px',
            }}
          >
            Address:
          </p>
          <p style={{ fontSize: '16px', margin: '0', marginBottom: '10px' }}>
            {hotel.address}
          </p>
        </div>
        <div
          className="info-container card"
          style={{ float: 'left', width: '30%', margin: '10px' }}
        >
          <p style={{ fontSize: '16px', margin: '0', marginBottom: '10px' }}>
            Price: LKR{hotel.cheapestprice}
          </p>
          <p style={{ fontSize: '16px', margin: '0', marginBottom: '10px' }}>
            Status:{' '}
            <p
              style={{
                backgroundColor: 'green',
                width: '100px',
                color: 'white',
                borderRadius: '10px',
                margin: '0 auto',
              }}
            >
              {hotel.featured ? 'Available' : 'Unavailable'}
            </p>
          </p>
          <p style={{ fontSize: '16px', margin: '0', marginBottom: '10px' }}>
            Available Room Count: {hotel.rooms}
          </p>{' '}
          <a href="/paymentgateway">
            <Button
              variant="secondary"
              style={{
                color: 'white',
                borderRadius: '10px',
                padding: '10px',
                border: 'none',
                fontSize: '16px',
                cursor: 'pointer',
              }}
            >
              Book Now
            </Button>{' '}
          </a>
        </div>{' '}
      </div>{' '}
      <Footer_3 />
    </div>
  );
};

export default ViewHotel;
