import React, { Component, useState, useEffect } from "react";
import { getAddress } from "../../services/serviceGMapsGeocode";
import "./HomePage.css";
function HomePage(props) {
  const options = [
    { name: "Live", value: "all" },
    { name: "Health", value: "clinics" },
    { name: "Eat", value: "hawkerCentre" },
    { name: "Shop", value: "supermarket" }
  ];
  const [location, setLocation] = useState("18 Cross Street");

  const handleLocationInput = event => {
    setLocation(event.target.value);
  };

  const handleClick = option => {
    getAddress(location).then(data => {
      const long = data.location.lng;
      const lat = data.location.lat;
      console.log(long, lat, option.value);
      props.history.push(`/explore/${long}/${lat}/${option.value}`);
    });
  };

  return (
    <div data-testid="home-page">
      <div className="bg d-flex justify-content-center">
        <div
          className="input-group justify-content-center align-items-center transparent-input"
          style={{ color: "white", width: "800px" }}
        >
          <input
            type="text"
            className="form-control "
            placeholder="Where to ??"
            aria-label=""
            aria-describedby="basic-addon2"
            style={{ maxWidth: "50%", opacity: "20%" }}
            onChange={handleLocationInput}
            value={location}
          />
          <div className="input-group-append">
            {options.map((option, index) => (
              <button
                key={index}
                className="btn btn-outline-light"
                type="button"
                onClick={() => handleClick(option)}
              >
                {option.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
/*
return (
  <div data-testid="home-page">
    <div className="bg d-flex justify-content-center">
      <div
        className="input-group justify-content-center align-items-center transparent-input"
        style={{ color: "white", width: "800px" }}
      >
        <input
          type="text"
          className="form-control "
          placeholder="Where to ??"
          aria-label=""
          aria-describedby="basic-addon2"
          style={{ maxWidth: "50%", opacity: "90%" }}
        />
        <div className="input-group-append">
          <button className="btn btn-outline-secondary" type="button">
            Button
          </button>
          <button className="btn btn-outline-secondary" type="button">
            Button
          </button>
        </div>
      </div>
    </div>
  </div>
);
*/
