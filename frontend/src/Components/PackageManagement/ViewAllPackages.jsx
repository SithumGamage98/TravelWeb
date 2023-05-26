import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ViewAllPackages() {
  const [packages, setPackages] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [packagesPerPage] = useState(5);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get("http://localhost:8060/packages/package");
      setPackages(response.data);
    }
    fetchData();
  }, []);

  async function handleDelete(pack) {
    try {
      await axios.delete(
        `http://localhost:8060/packages/package/delete/${pack._id}`
      );
      alert("Deleted successfully....");
      setPackages(packages.filter((p) => p._id !== pack._id));
    } catch (error) {
      alert(error);
    }
  }

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Get current packages based on pagination
  const indexOfLastPackage = currentPage * packagesPerPage;
  const indexOfFirstPackage = indexOfLastPackage - packagesPerPage;
  const currentPackages = packages.slice(
    indexOfFirstPackage,
    indexOfLastPackage
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const filteredPackages = currentPackages.filter((pack) =>
    pack.packagename.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ height: "800px" }}>
      <h1 style={{ textAlign: "center" }}>Manage Package Data</h1>
      <Link
        to="/addpackage"
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
        Add New Package
      </Link>
      <div style={{ textAlign: "center", marginBottom: "10px" }}>
      <input
        type="text"
        placeholder="Search by package name"
        value={searchQuery}
        onChange={handleSearch}
        style={{
          margin: "10px auto",
          padding: "5px",
          borderRadius: "5px",
          border: "1px solid #ccc"
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
            <th style={{ padding: "10px" }}>Package Name</th>
            <th style={{ padding: "10px" }}>Price</th>
            <th style={{ padding: "10px" }}>Package ID</th>
            <th style={{ padding: "10px" }}>Destination</th>
            <th style={{ padding: "10px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredPackages.map((pack) => (
            <tr key={pack._id} style={{ borderBottom: "1px solid #ccc" }}>
              <td style={{ padding: "10px" }}>{pack.packagename}</td>
              <td style={{ padding: "10px" }}>{pack.totalprice}</td>
              <td style={{ padding: "10px" }}>{pack.packageid}</td>
              <td style={{ padding: "10px" }}>{pack.packagedestination}</td>
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
                    to={`/viewpackage/${pack._id}`}
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
                    to={`/updatepackage/${pack._id}`}
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
                    onClick={() => handleDelete(pack)}
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
        <ul
          style={{ listStyle: "none", padding: 0, display: "inline-block" }}
        >
          {Array.from(
            { length: Math.ceil(packages.length / packagesPerPage) },
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

export default ViewAllPackages;
