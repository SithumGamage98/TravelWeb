import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Rating from '../Rating';
import Button from 'react-bootstrap/Button';
import Header from '../layout/Hotel_header';

function ClientViewAllHotels() {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get('https://travelweb-wu6a.onrender.com/hotels/hotel');
      setHotels(response.data);
    }
    fetchData();
  }, []);

  return (
    <div style={{ margin: '0 auto', height: '1000px' }}>
      <Header />
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        {hotels.map((hotel) => (
          <Link
            key={hotel._id}
            to={`/viewhotel/${hotel._id}`}
            style={{ textDecoration: 'none', color: 'black' }}
          >
            <div
              style={{
                width: '300px',
                margin: '10px',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '5px',
                backgroundColor: '#F2F2F2',
                textAlign: 'center', // Light gray background for card view
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  textAlign: 'center',
                }}
              >
                <img
                  src={
                    typeof hotel.photos[0] !== 'undefined'
                      ? require(`../HotelManagement/HotelImages/${hotel.photos[0]}`)
                      : 'Error'
                  }
                  alt="image"
                  style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                />
              </div>
              <p>{hotel.name}</p>
              <Rating value={hotel.rating} readOnly />
              <p style={{ color: '#2E8B57' }}>{hotel.cheapestprice}</p>{' '}
              {/* Green color for price */}
              <p>{hotel.address}</p>
              <Button
                variant="primary"
                style={{
                  color: 'white',
                  borderRadius: '10px',
                }}
              >
                Check Availability
              </Button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ClientViewAllHotels;
