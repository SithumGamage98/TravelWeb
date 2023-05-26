import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Rating from "../Rating";
import Button from 'react-bootstrap/Button';

const ViewPackage = () => {
  const { id } = useParams();
  const [pack, setPackage] = useState(null);

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const response = await axios.get(`https://travelweb-wu6a.onrender.com/packages/package/view/${id}`);
        setPackage(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPackage();
  }, [id]);

  if (!pack) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{margin:"0 auto", height:"800px", marginTop:"100px"}}>
      <div className="photos-container card" style={{float:"left", width:"40%", margin:"10px"}}>
        {Array.isArray(pack.photos) &&
          pack.photos.map((photo, index) => (
            <img
              key={index}
              src={typeof photo !== "undefined" ? require(`../PackageManagement/PackageImages/${photo}`) : "Error"}
              className="package-photo"
              alt={`Photo ${index}`}
            />
          ))}
      </div>
      <div className="details-container" style={{float:"left", width:"50%"}}>
        <div className="price-container">
        </div>
        <div className="info-container card" style={{float:"left", width:"50%", textAlign:"center"}}>
        <p className="info" style={{fontWeight:"bold", fontSize:"25px"}}>{pack.packagename}</p>
        <Rating value={pack.rating} readOnly />
        <p className="info">Tour Package Price: {pack.totalprice}</p>
          <p className="info">Our Package Type: {pack.locationtype}</p>
          <p className="info">Destination: {pack.packagedestination}</p>
          <p className="info">Distance From Colombo: {pack.distance}</p>
          <p className="info">Accommodation: {pack.accomodation}</p>
          <p className="info">No Of Days: {pack.days}</p>
          <p className="info">Visitors Per Pack: {pack.noofpassengers}</p>
          <p className="info">Travel Activities: {pack.details}</p>
          <p className="info">Spectial Instructions: {pack.instructions}</p>
        </div>
        <div className="action-container card" style={{float:"left", width:"50%", textAlign:"center"}}>
          <p className="price">Package Price: Rs. {pack.totalprice}</p>
          <p className="status">Status:<p style={{backgroundColor:"green", width:"100px", color:"white", margin:"0 auto"}}>{pack.featured ? "Available" : "Unavailable"}</p></p>
          <a href="/inquiry"><Button variant="primary" style={{margin:"10px"}}>Contact Us for Inquiries</Button></a>
          <br/>
          <a href="/paymentgateway"><Button variant="primary" style={{margin:"10px"}}>Book the Tour Package</Button></a>
        </div>
      </div>
    </div>
  );
};

export default ViewPackage;
