import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Rating from "../Rating";

function ClientViewAllBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get("http://localhost:8060/bloggers/blogs");
      setBlogs(response.data);
    }
    fetchData();
  }, []);

  const filteredBlogs = blogs.filter((blog) => {
    const blogTitle = blog.blogtitle.toLowerCase();
    const searchQuery = search.toLowerCase();
    return blogTitle.includes(searchQuery);
  });

  return (
    <div style={{margin:"0 auto", height:"1000px"}}>
      <h1 style={{ textAlign: "center" }}>All blogs</h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {filteredBlogs.map((blog) => (
          <Link
            key={blog._id}
            to={`/viewblog/${blog._id}`}
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
                    typeof blog.photos[0] !== "undefined"
                      ? require(`../BlogsManagement/Photos/${blog.photos[0]}`)
                      : "Error"
                  }
                  style={{ width: "100%", height: "200px", objectFit: "cover" }}
                  alt={`Photo 0`}
                />
              </div>
              <p>{blog.blogtitle}</p>
              <Rating value={blog.rating} readOnly />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ClientViewAllBlogs;
