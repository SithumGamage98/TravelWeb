import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ViewAllHotels() {
  const [hotels, setHotels] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [hotelsPerPage] = useState(5);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get('http://localhost:8060/hotels/hotel');
      setHotels(response.data);
    }
    fetchData();
  }, []);

  async function handleDelete(hotel) {
    try {
      await axios.delete(
        `http://localhost:8060/hotels/hotel/delete/${hotel._id}`
      );
      alert('Deleted successfully....');
      setHotels(hotels.filter((h) => h._id !== hotel._id));
    } catch (error) {
      alert(error);
    }
  }

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  // Get current hotels based on pagination
  const indexOfLastHotel = currentPage * hotelsPerPage;
  const indexOfFirstHotel = indexOfLastHotel - hotelsPerPage;
  const currentHotels = hotels.slice(indexOfFirstHotel, indexOfLastHotel);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const filteredHotels = currentHotels.filter((hotel) =>
    hotel.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ height: '800px' }}>
      <h1 style={{ textAlign: 'center' }}>Manage Hotel And Restaurant Data</h1>
      <Link
        to="/addhotel"
        style={{
          backgroundColor: '#2E8B57',
          color: 'white',
          padding: '10px',
          borderRadius: '5px',
          textDecoration: 'none',
          marginBottom: '10px',
          display: 'block',
          width: 'fit-content',
          marginLeft: 'auto',
          marginRight: '100px',
        }}
      >
        Add New Hotel
      </Link>
      <div style={{ textAlign: 'center', margin: '20px' }}>
        <input
          type="text"
          placeholder="Search by hotel name"
          value={search}
          onChange={handleSearch}
          style={{ padding: '5px', margin: '0 auto', border: '1px solid #ccc' }}
        />
      </div>
      <table
        style={{ borderCollapse: 'collapse', width: '90%', margin: '0 auto' }}
      >
        <thead>
          <tr>
            <th style={{ padding: '10px' }}>Hotel Name</th>
            <th style={{ padding: '10px' }}>Description</th>
            <th style={{ padding: '10px' }}>Type</th>
            <th style={{ padding: '10px' }}>City</th>
            <th style={{ padding: '10px' }}>Price</th>
            <th style={{ padding: '10px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredHotels.map((hotel) => (
            <tr key={hotel._id} style={{ borderBottom: '1px solid #ccc' }}>
              <td style={{ padding: '10px' }}>{hotel.name}</td>
              <td style={{ padding: '10px' }}>{hotel.description}</td>
              <td style={{ padding: '10px' }}>{hotel.type}</td>
              <td style={{ padding: '10px' }}>{hotel.city}</td>
              <td style={{ padding: '10px' }}>{hotel.cheapestprice}</td>
              <td style={{ padding: '10px' }}>
                <div>
                  <Link
                    style={{
                      backgroundColor: '#2E8B57',
                      color: 'white',
                      padding: '5px',
                      border: 'none',
                      borderRadius: '5px',
                      textDecoration: 'none',
                      margin: '10px',
                    }}
                    to={`/viewhotel/${hotel._id}`}
                    className="btn btn-secondary mr-2"
                  >
                    View
                  </Link>
                  <Link
                    style={{
                      backgroundColor: '#2E8B57',
                      color: 'white',
                      padding: '5px',
                      border: 'none',
                      borderRadius: '5px',
                      textDecoration: 'none',
                      margin: '10px',
                    }}
                    to={`/updatehotel/${hotel._id}`}
                    className="btn btn-secondary mr-2"
                  >
                    Update
                  </Link>
                  <button
                    style={{
                      backgroundColor: '#FF6347',
                      color: 'white',
                      padding: '5px',
                      marginRight: '10px',
                      border: 'none',
                      borderRadius: '5px',
                      margin: '10px',
                    }}
                    onClick={() => handleDelete(hotel)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <ul style={{ listStyle: 'none', padding: 0, display: 'inline-block' }}>
          {Array.from(
            { length: Math.ceil(hotels.length / hotelsPerPage) },
            (_, i) => (
              <li
                key={i}
                style={{ display: 'inline', margin: '5px', cursor: 'pointer' }}
              >
                <button
                  onClick={() => paginate(i + 1)}
                  style={{
                    padding: '5px 10px',
                    borderRadius: '5px',
                    backgroundColor:
                      currentPage === i + 1 ? '#2E8B57' : 'transparent',
                    color: currentPage === i + 1 ? 'white' : 'black',
                  }}
                >
                  {i + 1}
                </button>
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  );
}

export default ViewAllHotels;
