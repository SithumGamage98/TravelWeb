import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdatePackage = () => {
  const [pack, setPack] = useState({
    packagename: '',
    packagedestination: '',
    packageid: '',
    distance: '',
    accomodation: '',
    locationtype: '',
    numofdays: '',
    numofpassengers: '',
    totalprice: '',
    days: '',
    details: '',
    instructions: '',
    rating:'',
    featured:''
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8060/packages/package/view/${id}`)
      .then((res) => {
        setPack({
          packagename: res.data.packagename,
          packagedestination: res.data.packagedestination,
          packageid: res.data.packageid,
          distance: res.data.distance,
          accomodation: res.data.accomodation,
          locationtype: res.data.locationtype,
          numofdays: res.data.numofdays,
          numofpassengers: res.data.numofpassengers,
          totalprice: res.data.totalprice,
          days: res.data.days,
          details: res.data.details,
          instructions: res.data.instructions,
          rating: res.data.rating,
          featured: res.data.featured
        });
      })
      .catch((err) => {
        console.log('Unsuccessfully');
      });
  }, [id]);

  const onChange = (e) => {
    setPack({ ...pack, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const data = {
      packagename: pack.packagename,
      packagedestination: pack.packagedestination,
      packageid: pack.packageid,
      distance: pack.distance,
      accomodation: pack.accomodation,
      locationtype: pack.locationtype,
      numofdays: pack.numofdays,
      numofpassengers: pack.numofpassengers,
      totalprice: pack.totalprice,
      days: pack.days,
      details: pack.details,
      instructions: pack.instructions,
      rating: pack.rating,
      featured: pack.featured
    };

    axios
      .put(`http://localhost:8060/packages/package/update/${id}`, data)
      .then((res) => {
        alert("Updated successfully....");
        navigate(`/packages`);
      })
      .catch((err) => {
        console.log('Error in UpdateBookInfo!');
      });
  };

  return (
    <div className="container mt-5" style={{ width: "800px", margin:"0 auto", marginBottom:"100px" }}>
      <div>
        <h1>Update Tour and Sight Seeing Packages</h1>
        <form onSubmit={onSubmit}>
          <div className="form-group" style={{ margin: "30px" }}>
            <label>Package Title</label>
            <br />
            <input
              type="text"
              name="packagename"
              placeholder="packagetitle"
              id="packagetitle"
              className="form-control"
              value={pack.packagename}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group" style={{ margin: "30px" }}>
            <label>Package ID</label>
            <br />
            <input
              type="text"
              name="packageid"
              placeholder="Package Id"
              id="packageid"
              className="form-control"
              value={pack.packageid}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group" style={{ margin: "30px" }}>
            <label>Location Type</label>
            <br />
            <div>
              <input
                style={{ margin: "10px" }}
                type="radio"
                name="locationtype"
                value="Vilage Side"
                checked={pack.locationtype === "Vilage Side"}
                onChange={onChange}
                required
              />
              <label htmlFor="villageSide" style={{ margin: "10px" }}>Village Side</label>

              <input
                style={{ margin: "10px" }}
                type="radio"
                name="locationtype"
                value="Beach Vibe"
                checked={pack.locationtype === "Beach Vibe"}
                onChange={onChange}
                required
              />
              <label htmlFor="beachVibe" style={{ margin: "10px" }}>Beach Vibe</label>

              <input
                style={{ margin: "10px" }}
                type="radio"
                name="locationtype"
                value="Hill Country"
                checked={pack.locationtype === "Hill Country"}
                onChange={onChange}
                required
              />
              <label htmlFor="hillCountry" style={{ margin: "10px" }}>Hill Country</label>

              <input
                style={{ margin: "10px" }}
                type="radio"
                name="locationtype"
                value="City Stay"
                checked={pack.locationtype === "City Stay"}
                onChange={onChange}
                required
              />
              <label htmlFor="cityStay" style={{ margin: "10px" }}>City Stay</label>
            </div>
          </div>
          <div className="form-group" style={{ margin: "30px" }}>
            <label>Tour Destination</label>
            <br />
            <input
              type="text"
              name="packagedestination"
              placeholder="Tour Destination"
              id="packagedestination"
              className="form-control"
              value={pack.packagedestination}
              onChange={onChange}
              required
            />
          </div>

          <div className="form-group" style={{ margin: "30px" }}>
            <label>Distance for Tour Destination From Colombo</label>
            <br />
            <input
              type="text"
              name="distance"
              placeholder="Distance for Tour Destination From Colombo"
              id="distance"
              className="form-control"
              value={pack.distance}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group" style={{ margin: "30px" }}>
            <label>Place Of Accommodation</label>
            <br />
            <input
              type="text"
              name="accomodation"
              placeholder="Place Of Accommodation"
              id="accomodation"
              className="form-control"
              value={pack.accomodation}
              onChange={onChange}
              required
            />
          </div>

          <div className="form-group" style={{ margin: "30px" }}>
            <label>Maximum Number of Days</label>
            <br />
            <textarea
              name="days"
              placeholder="Maximum Number of Days"
              id="days"
              className="form-control"
              value={pack.days}
              onChange={onChange}
              required
            />
          </div>

          <div className="form-group" style={{ margin: "30px" }}>
            <label>Maximum Number of Visitors Allowed per Package</label>
            <br />
            <input
              type="text"
              name="numofpassengers"
              placeholder="Maximum Number of Visitors Allowed per Package"
              id="numofpassengers"
              className="form-control"
              value={pack.numofpassengers}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group" style={{ margin: "30px" }}>
            <label>Number of Days for the Stay</label>
            <br />
            <textarea
              name="numofdays"
              placeholder="Number of Days for the Stay"
              id="numofdays"
              className="form-control"
              value={pack.numofdays}
              onChange={onChange}
              required
            />
          </div>

          <div className="form-group" style={{ margin: "30px" }}>
            <label>Total Charges for the Package</label>
            <br />
            <textarea
              name="totalprice"
              placeholder="Total Charges for the Package"
              id="totalprice"
              className="form-control"
              value={pack.totalprice}
              onChange={onChange}
              required
            />
          </div>

          <div className="form-group" style={{ margin: "30px" }}>
            <label>Details on Special Activities and Experience around Destinations</label>
            <br />
            <textarea
              name="details"
              placeholder="Details on Special Activities and Experience around Destinations"
              id="details"
              className="form-control"
              value={pack.details}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group" style={{ margin: "30px" }}>
            <label>Special Instructions for Safety During the Visit</label>
            <br />
            <textarea
              name="instructions"
              placeholder="Special Instructions for Safety During the Visit"
              id="instructions"
              className="form-control"
              value={pack.instructions}
              onChange={onChange}
              required
            />
          </div>


          <div className="form-group" style={{ margin: "30px" }}>
            <label>Ratings</label>
            <input
              type='number'
              name='rating'
              min={0}
              max={5}
              placeholder='Rating'
              id='rating'
              className="form-control"
              value={pack.rating}
              onChange={onChange}
              required
            />
          </div>
          <div className="mb-3">
            <div className="form-check">
              <label htmlFor="featured" className="form-check-label">
                Featured
                <input
                  type="checkbox"
                  name="featured"
                  id="featured"
                  checked={pack.featured}
                  onChange={(e) => setPack({ ...pack, featured: e.target.checked })}
                  className="form-check-input"
                />
              </label>
            </div>
          </div>
          <div style={{ margin: "0 auto", textAlign: "center" }}>
          <a href="/packages" className="btn btn-secondary" style={{ margin: "10px" }}>
            Back
          </a>
            <button
              type="submit"
              className="btn btn-primary"
              style={{ margin: "20px", width: "100px" }}
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePackage;
