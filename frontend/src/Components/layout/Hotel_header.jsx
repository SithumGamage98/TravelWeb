import React, { useState } from 'react';
//import './Gama_CSS.css'
import {
  MDBNavbar,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBContainer,
  MDBIcon,
  MDBCollapse,
  MDBBtn,
} from 'mdb-react-ui-kit';

export default function Header() {
  const [showBasic, setShowBasic] = useState(false);

  return (
    <header>
      <MDBNavbar expand="lg" light bgColor="white">
        <MDBContainer fluid>
          <MDBNavbarToggler
            onClick={() => setShowBasic(!showBasic)}
            aria-controls="navbarExample01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <MDBIcon fas icon="bars" />
          </MDBNavbarToggler>
          <MDBCollapse navbar show={showBasic}>
            <MDBNavbarNav right className="mb-2 mb-lg-0">
              <MDBNavbarItem active></MDBNavbarItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>

      <div
        className="p-5 text-center bg-image"
        style={{
          backgroundImage:
            "url('https://img.freepik.com/free-photo/beautiful-water-villas-tropical-maldives-island-sunset-time_1232-4499.jpg?size=626&ext=jpg&uid=R78647178&ga=GA1.1.1696645279.1662610631&semt=ais')",
          height: '400px',
        }}
      >
        <div className="mask" style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
          <div className="d-flex justify-content-center align-items-center h-100">
            <div className="text-white">
              <h1 className="mb-3">
                <b>Hotels and Restaurants</b>
              </h1>
              <h4 className="mb-3" class="caption_text">
                "
                <b>
                  <i>Travel Lanka</i>
                </b>
                "
              </h4>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
