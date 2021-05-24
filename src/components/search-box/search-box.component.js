import React from "react";
import "./search-box.styles.css";
let today = new Date();
let dd = today.getDate();

let mm = today.getMonth() + 1;
let yyyy = today.getFullYear();
if (dd < 10) {
  dd = "0" + dd;
}

if (mm < 10) {
  mm = "0" + mm;
}
today = yyyy + "-" + mm + "-" + dd;

export const SearchBox = ({
  placeholder,
  handleChange,
  handleSubmit,
  handleRouteClick,
  values,
}) => (
  <nav className="navbar navbar-dark bg-dark navbar-expand-lg fixed-top">
    <div className="container-fluid">
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item ml-3 h1 mt-2">
            <a className="nav-link active" aria-current="page" href="">
              NEWS APP
            </a>
          </li>
          <li className="nav-item ml-3 h3 mt-3">
            <a
              className="nav-link active"
              aria-current="page"
              href=""
              name="covid-19 India news"
              onClick={handleRouteClick}
            >
              Covid-19
            </a>
          </li>
          <li className="nav-item h3 mt-3 ml-3  mt-3">
            <a
              className="nav-link active"
              aria-current="page"
              href=""
              name="Business India news"
              onClick={handleRouteClick}
            >
              Business
            </a>
          </li>
          <li className="nav-item h3 mt-3  mt-3">
            <a
              className="nav-link active"
              aria-current="page"
              href=""
              name="Trending India news"
              onClick={handleRouteClick}
            >
              Trending
            </a>
          </li>
          <li className="nav-item h3 mt-3  mt-3">
            <a
              className="nav-link active"
              aria-current="page"
              href=""
              name="Technology India news"
              onClick={handleRouteClick}
            >
              Technology
            </a>
          </li>
          <li className="nav-item h3 mt-3  mt-3">
            <a
              className="nav-link active"
              aria-current="page"
              href=""
              name="Sports India news"
              onClick={handleRouteClick}
            >
              Sports
            </a>
          </li>
        </ul>
        <div className="form-group mr-3 mt-3 ml-auto">
          <input
            name="date"
            className="form-control form-control-lg"
            type="date"
            placeholder="Enter Date"
            onChange={handleChange}
            min="2020-04-11"
            max={today}
            value={values.date}
          />
        </div>

        <div className="form-group mr-3 mt-3">
          <input
            name="searchField"
            type="text"
            className="form-control form-control-lg"
            placeholder="Search"
            onChange={handleChange}
            value={values.searchField}
          />
        </div>
        <button className="btn btn-success btn-lg" onClick={handleSubmit}>
          Search
        </button>
      </div>
    </div>
  </nav>
);
