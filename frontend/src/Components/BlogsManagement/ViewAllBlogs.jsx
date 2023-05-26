import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ViewAllBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [blogsPerPage] = useState(5);

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

  // Get current blogs based on pagination
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  async function handleDelete(element) {
    try {
      await axios.delete(
        `http://localhost:8060/bloggers/blogs/delete/${element._id}`
      ).then((res) => {
        if (res.status === 201) {
          alert("Deleted successfully....");
          window.location.reload();
        }
      });
    } catch (error) {
      alert(error);
    }
  }

  return (
    <div style={{ height: "700px" }}>
      <h1 style={{ textAlign: "center" }}>Manage Blog Data</h1>
      <Link
        to="/addblog"
        style={{
          backgroundColor: "#2E8B57",
          color: "white",
          padding: "10px",
          borderRadius: "5px",
          textDecoration: "none",
          marginBottom: "10px",
          display: "block",
          width: "fit-content",
          marginLeft: "auto",
          marginRight: "100px",
        }}
      >
        Add New Blog
      </Link>
      <div style={{ textAlign: "center", margin: "20px" }}>
        <input
          type="text"
          placeholder="Search blogs"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "5px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            margin:"0 auto"
          }}
        />
      </div>
      <table
        style={{
          borderCollapse: "collapse",
          width: "80%",
          margin: "0 auto",
        }}
      >
        <thead>
          <tr>
            <th style={{ padding: "10px" }}>Blog Name</th>
            <th style={{ padding: "10px" }}>Description</th>
            <th style={{ padding: "10px" }}>Blogger Name</th>
            <th style={{ padding: "10px" }}>Date</th>
            <th style={{ padding: "10px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentBlogs.map((blog) => (
            <tr key={blog._id} style={{ borderBottom: "1px solid #ccc" }}>
              <td style={{ padding: "10px" }}>{blog.blogtitle}</td>
              <td style={{ padding: "10px" }}>{blog.blogdescription}</td>
              <td style={{ padding: "10px" }}>{blog.bloggername}</td>
              <td style={{ padding: "10px" }}>{blog.date}</td>
              <td style={{ padding: "10px" }}>
                <div>
                  <Link
                    style={{
                      backgroundColor: "#2E8B57",
                      color: "white",
                      padding: "5px",
                      border: "none",
                      borderRadius: "5px",
                      textDecoration: "none",
                      margin: "10px",
                    }}
                    to={`/viewblog/${blog._id}`}
                    className="btn btn-secondary mr-2"
                  >
                    View
                  </Link>
                  <Link
                    style={{
                      backgroundColor: "#2E8B57",
                      color: "white",
                      padding: "5px",
                      border: "none",
                      borderRadius: "5px",
                      textDecoration: "none",
                      margin: "10px",
                    }}
                    to={`/updatead/${blog._id}`}
                    className="btn btn-secondary mr-2"
                  >
                    Update
                  </Link>
                  <button
                    style={{
                      backgroundColor: "#FF6347",
                      color: "white",
                      padding: "5px",
                      marginRight: "10px",
                      border: "none",
                      borderRadius: "5px",
                      margin: "10px",
                    }}
                    onClick={() => handleDelete(blog)}
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
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <ul style={{ listStyle: "none", padding: 0, display: "inline-block" }}>
          {Array.from(
            { length: Math.ceil(filteredBlogs.length / blogsPerPage) },
            (_, i) => (
              <li
                key={i}
                style={{
                  display: "inline",
                  margin: "5px",
                  cursor: "pointer",
                }}
              >
                <button
                  onClick={() => paginate(i + 1)}
                  style={{
                    padding: "5px 10px",
                    borderRadius: "5px",
                    backgroundColor:
                      currentPage === i + 1 ? "#2E8B57" : "transparent",
                    color: currentPage === i + 1 ? "white" : "black",
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

export default ViewAllBlogs;
