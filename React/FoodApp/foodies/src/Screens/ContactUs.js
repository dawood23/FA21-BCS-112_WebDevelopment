import React from "react";
import Navbar from "../components/Navbar";
export default function ContactUs() {
  return (
    <>
      <Navbar />
      <div>
        <div className="outerContact" id="contact">
          <h1 className="ContactText">Contact Us</h1>
          <h2 className="ContactText">Share Your Experiences!!</h2>
          <div className="contact">
            <form action="/submit_form" method="post">
              <h2>Get in touch</h2>
              <p>Tell us about your Concerns!</p>
              <div className="formfields">
                <label className="ContactLabel" htmlFor="name">
                  Your Name:
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your name.."
                  className="fields"
                />
                <label className="ContactLabel" htmlFor="Email">
                  Your Email:
                </label>
                <input
                  type="email"
                  id="Email"
                  name="Email"
                  placeholder="Enter your Email.."
                  className="fields"
                />
                <label className="ContactLabel" htmlFor="message">
                  Your message:
                </label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Your message.."
                  className="fields"
                />
                <button className="contactbtn" id="subbtn">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
