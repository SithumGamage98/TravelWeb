import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Rating from "../Rating";
import Button from 'react-bootstrap/Button';

function ClientViewAllPackages() {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get("http://localhost:8060/packages/package");
      setPackages(response.data);
    }
    fetchData();
  }, []);

  return (
    <div style={{ margin:"0 auto", height:"1000px" }}>
      <h1 style={{ textAlign: "center" }}>All packages</h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {packages.map((pack) => (
          <Link
            key={pack._id}
            to={`/viewpackage/${pack._id}`}
            style={{ textDecoration: "none", color: "black" }}
          >
            <div
              style={{
                width: "300px",
                margin: "10px",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                backgroundColor: "#F2F2F2",
                textAlign:"center" // Light gray background for card view
              }}
            >
              <div style={{ display: "flex", justifyContent: "center" }}>
                <img
                  src={
                    typeof pack.photos !== "undefined" && pack.photos[0]
                      ? require(`../PackageManagement/PackageImages/${pack.photos[0]}`)
                      : "Error"
                  }
                  style={{ width: "100%", height: "200px", objectFit: "cover" }}
                  alt={`Photo 0`}
                />
              </div>
              <p>{pack.packagename}</p>
              <Rating value={pack.rating} readOnly />
              <p style={{ color: "#2E8B57" }}>{pack.totalprice}</p> {/* Green color for price */}
              <p>{pack.address}</p>
              <Button
              variant="primary"
                style={{
                  color: "white",
                  borderRadius: "10px",
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

export default ClientViewAllPackages;
