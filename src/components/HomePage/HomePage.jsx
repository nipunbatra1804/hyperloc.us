import React, { Component } from "react";
import "./HomePage.css";
export default class HomePage extends Component {
  geolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition);
    }
  };
  showPosition = position => {
    console.log(
      "Latitude: " +
        position.coords.latitude +
        "<br>Longitude: " +
        position.coords.longitude
    );
  };

  render() {
    this.geolocation();
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
  }
}
