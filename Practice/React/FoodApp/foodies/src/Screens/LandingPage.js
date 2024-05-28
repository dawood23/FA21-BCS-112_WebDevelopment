import React from "react";
import Navbar from "../components/Navbar.js";
import Footer from "../components/Footer.js";
import Carousel from "../components/Carousel.js";
import Card from "../components/Card.js";
export default function LandingPage() {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        <Carousel />
      </div>
      <div>
        <Card />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
