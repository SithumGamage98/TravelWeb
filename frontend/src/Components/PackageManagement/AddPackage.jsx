import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import { FormControl } from 'react-bootstrap';

function AddPackage() {
  const [packagename, setPackageName] = useState("");
  const [packagedestination, setPackageDestination] = useState("");
  const [packageid, setPackageID] = useState("");
  const [distance, setDistance] = useState("");
  const [accomodation, setAccomodation] = useState("");
  const [locationtype, setLocationType] = useState("");
  const [numofdays, setNumOfDays] = useState("");
  const [numofpassengers, setNumOfPassengers] = useState("");
  const [totalprice, setTotalPrice] = useState("");
  const [days, setDays] = useState("");
  const [details, setDetails] = useState("");
  const [instructions, setInstruction] = useState("");
  const [photos, setPhotos] = useState([]);
  const [rating, setRating] = useState(0);
  const [featured, setFeatured] = useState(false);

  const navigate = useNavigate();

  const handleEventImageChange = ({ target: { files } }) => {
    setPhotos(Array.from(files));
  };

  const addPackages = async (e) => {
    e.preventDefault();

    // Validation
    if (!packagename || !packagedestination || !packageid || !distance || !accomodation || !locationtype || !numofdays || !numofpassengers || !totalprice || !days || !details || !instructions) {
      alert("Please fill in all the required fields.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("packagename", packagename);
      formData.append("packagedestination", packagedestination);
      formData.append("packageid", packageid);
      formData.append("distance", distance);
      formData.append("accomodation", accomodation);
      formData.append("locationtype", locationtype);
      formData.append("numofdays", numofdays);
      formData.append("numofpassengers", numofpassengers);
      formData.append("totalprice", totalprice);
      formData.append("days", days);
      formData.append("details", details);
      formData.append("instructions", instructions);
      formData.append("rating", rating);
      formData.append("featured", featured);

      for (let i = 0; i < photos.length; i++) {
        formData.append("photos", photos[i]);
      }

      const result = await axios.post(
        "http://localhost:8060/packages/add/new",
        formData
      );

      if (result?.status === 201) {
        alert("Packages added successfully");
        resetForm();
        navigate("/packages");
        window.location.reload();
      }
    } catch (err) {
      console.error(err?.response?.data?.errorMessage);
      alert(err?.response?.data?.errorMessage);
    }
  };

  const resetForm = () => {
    setPackageName("");
    setPackageDestination("");
    setPackageID("");
    setDistance("");
    setAccomodation("");
    setLocationType("");
    setNumOfDays("");
    setNumOfPassengers("");
    setTotalPrice("");
    setDays("");
    setDetails("");
    setInstruction("");
    setPhotos([]);
    setRating(0);
    setFeatured(false);
  };

  return (
    <div className="container mt-5" style={{ width: "800px", margin:"0 auto", marginBottom:"100px" }}>
      <h1 className="text-center mb-4">Add a Tour and Sight Seeing Package</h1>
      <Form onSubmit={addPackages}>
        <div className="mb-3">
          <Form.Label>Packages Title</Form.Label>
          <FormControl
            type="text"
            placeholder="Packages Title"
            required
            value={packagename}
            onChange={(e) => setPackageName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <Form.Label>Package ID</Form.Label>
          <FormControl
            type="text"
            placeholder="Package ID"
            required
            value={packageid}
            onChange={(e) => setPackageID(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <Form.Label>Location Type</Form.Label>
          <div>
            <label style={{margin:"10px"}}>
              <input
                style={{margin:"10px"}}
                className="form-check-label"
                type="radio"
                name="locationtype"
                value="Village Side"
                checked={locationtype === "Village Side"}
                onChange={(e) => setLocationType(e.target.value)}
              />
              Village Side
            </label>

            <label style={{margin:"10px"}}>
              <input
                style={{margin:"10px"}}
                type="radio"
                name="locationtype"
                value="Beach Vibe"
                checked={locationtype === "Beach Vibe"}
                onChange={(e) => setLocationType(e.target.value)}
              />
              Beach Vibe
            </label>
            <label style={{margin:"10px"}}>
              <input
                style={{margin:"10px"}}
                type="radio"
                name="locationtype"
                value="Hill Country"
                checked={locationtype === "Hill Country"}
                onChange={(e) => setLocationType(e.target.value)}
              />
              Hill Country
            </label>
            <label style={{margin:"10px"}}>
              <input
                style={{margin:"10px"}}
                type="radio"
                name="locationtype"
                value="City Stay"
                checked={locationtype === "City Stay"}
                onChange={(e) => setLocationType(e.target.value)}
              />
              City Stay
            </label>
          </div>
        </div>

        <div className="mb-3">
          <Form.Label>Tour Destination</Form.Label>
          <FormControl
            type="text"
            placeholder="Tour Destination"
            required
            value={packagedestination}
            onChange={(e) => setPackageDestination(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <Form.Label>Distance for Tour Destination from Colombo</Form.Label>
          <FormControl
            type="text"
            placeholder="Distance for Tour Destination from Colombo"
            required
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <Form.Label>Place of Accommodation</Form.Label>
          <FormControl
            type="text"
            placeholder="Place of Accommodation"
            required
            value={accomodation}
            onChange={(e) => setAccomodation(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <Form.Label>Maximum No of Days</Form.Label>
          <FormControl
            type="text"
            placeholder="Maximum No of Days"
            required
            value={numofdays}
            onChange={(e) => setNumOfDays(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <Form.Label>Maximum No of Visitors Allowed Per Package</Form.Label>
          <FormControl
            type="text"
            placeholder="Maximum No of Visitors Allowed Per Package"
            required
            value={numofpassengers}
            onChange={(e) => setNumOfPassengers(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <Form.Label>No of Days for the Stay</Form.Label>
          <FormControl
            type="text"
            placeholder="No of Days for the Stay"
            required
            value={days}
            onChange={(e) => setDays(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <Form.Label>Total Charges for the Package</Form.Label>
          <FormControl
            type="text"
            placeholder="Total Charges for the Package"
            required
            value={totalprice}
            onChange={(e) => setTotalPrice(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <Form.Label>
            Detail on Special Activities and Experience around the Destination
          </Form.Label>
          <FormControl
            as="textarea"
            rows={4}
            placeholder="Detail on Special Activities and Experience around the Destination"
            required
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <Form.Label>Special Instructions for Safety during the Visit</Form.Label>
          <FormControl
            as="textarea"
            rows={4}
            placeholder="Special Instructions for Safety during the Visit"
            required
            value={instructions}
            onChange={(e) => setInstruction(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <Form.Label>Ratings (0 - 5)</Form.Label>
          <input
            type="number"
            placeholder="Ratings (0 - 5)"
            required
            min={0}
            max={5}
            step={0.1}
            value={rating}
            onChange={(e) => setRating(parseFloat(e.target.value))}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <div className="form-check">
          <label htmlFor="featured" className="form-check-label">Featured
            <input
              type="checkbox"
              id="featured"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              className="form-check-input"
            /></label>
          </div>
        </div>
        <div className="mb-3">
          <Form.Label>Photos</Form.Label>
          <FormControl
            type="file"
            name="photos"
            accept="image/jpeg, image/jpg, image/png"
            required
            multiple
            onChange={handleEventImageChange}
          />
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-primary">
            Save Tour and Sight Seeing Package
          </button>
        </div>
      </Form>
    </div>
  );
}

export default AddPackage;
