import React, { Component } from "react";
import "./HomePage.css";
export default class HomePage extends Component {
  render() {
    return (
      <div data-testid="home-page">
        <div className="bg d-flex justify-content-center">
          <div
            className="input-group justify-content-center align-items-center"
            style={{ color: "white" }}
          >
            <input
              type="text"
              className="form-control"
              placeholder="Recipient's username"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              style={{ width: "50px" }}
            />
          </div>
        </div>
      </div>
    );
  }
}
