import React from "react";
import { Link } from "react-router-dom";

export default function Carousel() {
  return (
    <div>
      <div
        id="carouselExampleIndicators"
        className="carousel slide"
        data-bs-ride="carousel"
        data-bs-interval="4000"
      >
        <div className="carousel-inner">
          <div className="carousel-item text-center vh-100 backgroundimg active slide-1">
            <div className="container h-100 d-flex align-items-center justify-content-center">
              <div className="col-lg-8">
                <h2 className="text-white">WELCOME TO FOODIES</h2>
                <h1 className="display-1 text-white fw-bold">
                  Where Every Bite Tells a Delicious Story
                </h1>
                <Link to="#" className="btn btn-brand buttonDesign">
                  Order Now
                </Link>
              </div>
            </div>
          </div>
          <div className="carousel-item text-center vh-100 backgroundimg slide-2">
            <div className="container h-100 d-flex align-items-center justify-content-center">
              <div className="col-lg-8">
                <h1 className="display-1 text-white font fw-bold">
                  Indulge in Culinary Adventures at Foodies: Where Every Dish is
                  a Masterpiece!
                </h1>
                <Link to="#" className="btn btn-brand buttonDesign">
                  Order Now
                </Link>
              </div>
            </div>
          </div>
          <div className="carousel-item text-center vh-100 backgroundimg slide-3">
            <div className="container h-100 d-flex align-items-center justify-content-center">
              <div className="col-lg-8">
                <h1 className="display-1 text-white font fw-bold">
                  Experience a Symphony of Taste: Elevate Your Dining Journey at
                  Foodies - Where Passion Meets Palate!
                </h1>
                <Link to="#" className="btn btn-brand buttonDesign">
                  Order Now
                </Link>
              </div>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
      </div>
    </div>
  );
}
