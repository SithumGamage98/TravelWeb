import React from 'react';
import img1 from './Images/event.jpg';
import img2 from './Images/travel.jpg';
import img3 from './Images/package.jpg';
import img4 from './Images/hotel.jpeg';
import img5 from './Images/image2.jpg';

const BloggerDashboard = () => {
  const events = [
    { id: 1, title: 'Events', image: img1 },
    // Add more events here
  ];

  const blogs = [
    { id: 1, title: 'Blogs', image: img2 },
    // Add more blogs here
  ];

  const packages = [
    { id: 1, title: 'Packages', image: img3 },
    // Add more packages here
  ];

  const hotels = [
    { id: 1, title: 'Hotels', image: img4 },
    // Add more hotels here
  ];

  const renderCards = (data) => {
    return data.map((item) => (
      <div key={item.id} className="card">
        <img src={item.image} alt={item.title} />
        <h3>{item.title}</h3>
      </div>
    ));
  };

  return (
    <div style={{marginBottom:"1000px"}}>
    <div className="blogger-dashboard">
      <img src={img5} style={{width:"100%", height:"600px"}} alt="imgage"></img>
      <div><h1 style={{margin:"10px", textAlign:"center"}}>Travel Lanka Dashboard</h1></div>
      <div>
      <div style={{ float: 'left', width: '50%' }}>
        <a href="/clientevents" style={{textDecoration:"none"}}><div style={{width:"50%", height:"50%", textAlign:"center", margin:"100px", marginLeft:"200px", color:"black"}} className="card-container">{renderCards(events)}</div></a>

        <a href="/clientblogs" style={{textDecoration:"none"}}><div style={{width:"50%", height:"50%", textAlign:"center", margin:"100px", marginLeft:"200px", color:"black"}} className="card-container">{renderCards(blogs)}</div></a>
      </div>

      <div style={{ float: 'left', width: '50%' }}>
        <a href="/clientpackages" style={{textDecoration:"none"}}><div style={{width:"50%", height:"50%", textAlign:"center", margin:"100px", marginRight:"200px", color:"black"}} className="card-container">{renderCards(packages)}</div></a>

        <a href="/clienthotels" style={{textDecoration:"none"}}><div style={{width:"50%", height:"50%", textAlign:"center", margin:"100px", marginRight:"200px", color:"black"}} className="card-container">{renderCards(hotels)}</div></a>
      </div>
      </div>
    </div>
    </div>
  );
};

export default BloggerDashboard;
