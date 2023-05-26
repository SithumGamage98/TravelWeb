import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Rating from "../Rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const ViewBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [likes, setLikes] = useState(0); // New state variable for likes

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`http://localhost:8060/bloggers/blogs/view/${id}`);
        setBlog(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBlog();
  }, [id]);

  const handleLike = () => {
    setLikes(likes + 1);
  };

  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
    <div
      style={{
        textAlign: "center",
        margin: "0 auto",
        height: "800px",
        marginTop:"100px"
      }}
    >
      <div
        className="info-container card"
        style={{
          float: "left",
          width: "40%",
          margin: "10px",
          maxHeight: "1000px",
        }}
      >
        {Array.isArray(blog.photos) &&
          blog.photos.map((photo, index) => (
            <img
              key={index}
              src={
                typeof photo !== "undefined"
                  ? require(`../BlogsManagement/Photos/${photo}`)
                  : "Error"
              }
              style={{
                margin: "10px",
                padding: "10px",
                objectFit: "cover",
              }}
              alt={`Photo ${index}`}
            />
          ))}
      </div>
      <div
        style={{
          float: "left",
          width: "50%",
          margin: "10px",
        }}
      >
        <div
          style={{
            backgroundColor: "#fff",
            borderRadius: "5px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            padding: "20px",
          }}
        >
          <h1
            style={{
              fontSize: "24px",
              margin: "0",
              marginBottom: "10px",
            }}
          >
            {blog.blogtitle}
          </h1>
          <Rating value={blog.rating} readOnly />
          <p style={{ fontSize: "16px", margin: "0", marginBottom: "10px" }}>
            Blogger Name: {blog.bloggername}
          </p>
          <p style={{ fontSize: "16px", margin: "0", marginBottom: "10px" }}>
            Blog Date: {blog.date}
          </p>
          <p style={{ fontSize: "16px", margin: "0", marginBottom: "5px" }}>
            Description:
          </p>
          <p style={{ fontSize: "16px", margin: "0", marginBottom: "10px" }}>
            {blog.blogdescription}
          </p>
          <button
            className="share-btn"
            style={{
              backgroundColor: "blue",
              color: "white",
              borderRadius: "5px",
              padding: "10px",
              border: "none",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Share Instantly
          </button>
          <button
            className="comment-btn"
            style={{
              backgroundColor: "blue",
              color: "white",
              borderRadius: "5px",
              padding: "10px",
              border: "none",
              fontSize: "16px",
              cursor: "pointer",
              marginLeft: "10px",
            }}
          >
            Add a comment
          </button>
          <div style={{ marginTop: "20px" }}>
            
              <FontAwesomeIcon  onClick={handleLike} icon={faHeart} style={{ marginRight: "5px", color:"red", fontSize:"24px" }} />
              {likes}

          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewBlog;
