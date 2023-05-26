import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ViewAllEvents() {
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [eventsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get("http://localhost:8060/events/event");
      setEvents(response.data);
    }
    fetchData();
  }, []);

  const handleDelete = async (event) => {
    try {
      const response = await axios.delete(
        `http://localhost:8060/events/event/delete/${event._id}`
      );
      if (response.status === 201) {
        alert("Deleted successfully....");
        window.location.reload();
      }
    } catch (error) {
      alert(error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  // Filter events based on search term
  const filteredEvents = events.filter((event) =>
    event.eventname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get current events based on pagination
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredEvents.slice(
    indexOfFirstEvent,
    indexOfLastEvent
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div style={{ height: "800px" }}>
      <h1 style={{ textAlign: "center", margin:"10px" }}>Manage Event Data</h1>
      <Link
          to="/addevent"
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
          Add New Event
        </Link>
      <div style={{ textAlign: "center", marginBottom: "10px" }}>
        <input
          type="text"
          placeholder="Search by event name"
          value={searchTerm}
          onChange={handleSearch}
          style={{ padding: "5px", margin:"0 auto", border: "1px solid #ccc" }}
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
            <th style={{ padding: "10px" }}>Event Name</th>
            <th style={{ padding: "10px" }}>Description</th>
            <th style={{ padding: "10px" }}>Category</th>
            <th style={{ padding: "10px" }}>Place</th>
            <th style={{ padding: "10px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentEvents.map((event) => (
            <tr key={event._id} style={{ borderBottom: "1px solid #ccc" }}>
              <td style={{ padding: "10px" }}>{event.eventname}</td>
              <td style={{ padding: "10px" }}>{event.description}</td>
              <td style={{ padding: "10px" }}>{event.category}</td>
              <td style={{ padding: "10px" }}>{event.place}</td>
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
                    to={`/viewevent/${event._id}`}
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
                    to={`/updateevent/${event._id}`}
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
                    onClick={() => handleDelete(event)}
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
            { length: Math.ceil(filteredEvents.length / eventsPerPage) },
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

export default ViewAllEvents;
