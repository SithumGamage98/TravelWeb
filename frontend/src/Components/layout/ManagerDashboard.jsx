import React, { useEffect, useState } from 'react';
import axios from 'axios';
import img1 from './Images/managerdashboard.jpg';

const ManagerDashboard = () => {
  const [allEventsCount, setAllEventsCount] = useState(0);
  const [allBlogsCount, setAllBlogsCount] = useState(0);
  const [allPackagesCount, setAllPackagesCount] = useState(0);
  const [allHotelsCount, setAllHotelsCount] = useState(0);

  async function getData() {
    try {
      const resultAllEventsCount = await axios.get('http://localhost:8060/events/event/count');
      setAllEventsCount(resultAllEventsCount.data.total);

      const resultAllBlogsCount = await axios.get('http://localhost:8060/bloggers/blog/count');
      setAllBlogsCount(resultAllBlogsCount.data.total);

      const resultAllPackagesCount = await axios.get('http://localhost:8060/packages/pack/count');
      setAllPackagesCount(resultAllPackagesCount.data.total);

      const resultAllHotelsCount = await axios.get('http://localhost:8060/hotels/hotel/count');
      setAllHotelsCount(resultAllHotelsCount.data.total);
    } catch (err) {
      console.error(err);
    }
  }

  /* Calling the getData function when the component is mounted. */
  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div style={{ textAlign: 'center' }}>
        <img src={img1} alt="Vesak" style={{ maxWidth: '100%', height: '100%' }} />
      </div>
      <h1 style={{margin:"10px", textAlign:"center"}}>Manager Dashboard</h1>
      <div className="card-container" style={{ display: 'flex', justifyContent: 'center' }}>
  <div style={{ margin: '10px' }}>
    <a href="/hotels" style={{ textDecoration: 'none' }}>
      <div
        className="card"
        style={{
          height: '200px',
          width: '400px',
          backgroundColor: '#2E8B57',
          borderRadius: '10px',
          padding: '20px',
          transition: 'background-color 0.3s ease',
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = '#3CB371';
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = '#2E8B57';
        }}
      >
        <h2 style={{ textAlign: 'center', color: 'white' }}>Hotel Management</h2>
      </div>
    </a>
    <a href="/packages" style={{ textDecoration: 'none' }}>
      <div
        className="card"
        style={{
          height: '200px',
          width: '400px',
          backgroundColor: '#2E8B57',
          borderRadius: '10px',
          padding: '20px',
          marginTop: '20px',
          transition: 'background-color 0.3s ease',
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = '#3CB371';
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = '#2E8B57';
        }}
      >
        <h2 style={{ textAlign: 'center', color: 'white', margin: '10px' }}>Package Management</h2>
      </div>
    </a>
  </div>
  <div style={{ margin: '10px' }}>
    <a href="/blogs" style={{ textDecoration: 'none' }}>
      <div
        className="card"
        style={{
          height: '200px',
          width: '400px',
          backgroundColor: '#2E8B57',
          borderRadius: '10px',
          padding: '20px',
          transition: 'background-color 0.3s ease',
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = '#3CB371';
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = '#2E8B57';
        }}
      >
        <h2 style={{ textAlign: 'center', color: 'white' }}>Blogs Management</h2>
      </div>
    </a>
    <a href="/events" style={{ textDecoration: 'none' }}>
      <div
        className="card"
        style={{
          height: '200px',
          width: '400px',
          backgroundColor: '#2E8B57',
          borderRadius: '10px',
          padding: '20px',
          marginTop: '20px',
          transition: 'background-color 0.3s ease',
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = '#3CB371';
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = '#2E8B57';
        }}
      >
        <h2 style={{ textAlign: 'center', color: 'white' }}>Event Management</h2>
      </div>
    </a>
  </div>
</div>


      <div className="card-container" style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ margin: '10px' }}>
          <div className="card" style={{ backgroundColor: '#6600CC', borderRadius: '10px', padding: '20px' }}>
            <h2 style={{ textAlign: 'center', color: '#FFFFFF' }}>Total Hotels: {allHotelsCount}</h2>
          </div>
          <div className="card" style={{ backgroundColor: '#6600CC', borderRadius: '10px', padding: '20px', marginTop: '20px' }}>
            <h2 style={{ textAlign: 'center', color: '#FFFFFF' }}>Total Packages: {allPackagesCount}</h2>
          </div>
        </div>
        <div style={{ margin: '10px' }}>
          <div className="card" style={{ backgroundColor: '#6600CC', borderRadius: '10px', padding: '20px' }}>
            <h2 style={{ textAlign: 'center', color: '#FFFFFF' }}>Total Blogs: {allBlogsCount}</h2>
          </div>
          <div className="card" style={{ backgroundColor: '#6600CC', borderRadius: '10px', padding: '20px', marginTop: '20px' }}>
            <h2 style={{ textAlign: 'center', color: '#FFFFFF' }}>Total Events: {allEventsCount}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;
