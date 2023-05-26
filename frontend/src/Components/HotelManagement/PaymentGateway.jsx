import React, { useState } from "react";

const PaymentGateway = () => {
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvv, setCVV] = useState("");

  const handlePayment = () => {
    // Perform the payment processing logic here

    // Simulate successful payment after a delay
    setTimeout(() => {
      setPaymentStatus("success");
    }, 2000);
  };

  const handleCardNumberChange = (event) => {
    setCardNumber(event.target.value);
  };

  const handleExpirationDateChange = (event) => {
    setExpirationDate(event.target.value);
  };

  const handleCVVChange = (event) => {
    setCVV(event.target.value);
  };

  return (
    <div style={{ textAlign: "center", margin: "100px", marginBottom: "200px" }}>
      <h1 style={{ color: "#333", marginBottom: "20px" }}>Payment Gateway</h1>
      {paymentStatus === "success" ? (
        <div>
          <h2 style={{ color: "green", marginBottom: "10px" }}>Payment Successful!</h2>
          <p style={{ color: "#666" }}>Thank you for your payment.</p>
        </div>
      ) : (
        <div>
          <p style={{ color: "#666", marginBottom: "20px" }}>Please enter your payment details:</p>
          <div style={{ marginBottom: "10px" }}>
       
              <input type="text" value={cardNumber} onChange={handleCardNumberChange} style={{ marginLeft: "10px" }} placeholder="Card Number" required />

          </div>
          <div style={{ marginBottom: "10px" }}>
         
              <input type="text" value={expirationDate} onChange={handleExpirationDateChange} style={{ marginLeft: "10px" }} placeholder="Expiration Date" required />

          </div>
          <div style={{ marginBottom: "20px" }}>
         
              <input type="text" value={cvv} onChange={handleCVVChange} style={{ marginLeft: "10px" }} placeholder="CVV" required />
  
          </div>
          <button
            onClick={handlePayment}
            style={{
              backgroundColor: "#4CAF50",
              border: "none",
              color: "white",
              padding: "10px 20px",
              borderRadius: "5px",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Pay Now
          </button>
        </div>
      )}
    </div>
  );
};

export default PaymentGateway;
