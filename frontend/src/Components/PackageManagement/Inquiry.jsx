import React, { useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';

const Inquiry = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform the submission logic here
    // You can send the form data to your backend or handle it as per your requirements

    // Reset the form fields
    setName("");
    setEmail("");
    setMessage("");

    // Show an alert message
    alert("Form submitted successfully!");
    navigate(`/blogs`);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <div style={{ textAlign: "center", margin: "100px" }}>
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
        <div>

            <input style={{width:"1000px", margin:"10px"}} type="text" value={name} onChange={handleNameChange} placeholder="Name" required />

        </div>
        <div>
   
            <input style={{width:"1000px", margin:"10px"}} type="email" value={email} onChange={handleEmailChange} placeholder="Email" required />

        </div>
        <div>
          
            <textarea style={{width:"1000px", margin:"10px"}} value={message} onChange={handleMessageChange} placeholder="Message" required />

        </div>
        <button
          type="submit"
          style={{
            backgroundColor: "#4CAF50",
            border: "none",
            color: "white",
            padding: "10px 20px",
            borderRadius: "5px",
            fontSize: "16px",
            cursor: "pointer",
            marginTop: "10px",
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Inquiry;
