import React from "react";
import "./AboutUs.css";

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <header className="about-header">
        <h1>About Digital Memory Lane</h1>
        <p>Relive and cherish your most memorable moments with friends, family, and loved ones!</p>
      </header>

      <section className="about-content">
        <h2>Our Mission</h2>
        <p>
          Digital Memory Lane is dedicated to helping you store and relive your most precious memories.
          Whether it's a vacation, a family gathering, or a special day with friends, our platform offers a safe,
          user-friendly space to capture and organize those moments in time.
        </p>
        <h2>Our Team</h2>
        <p>
          We are a passionate team of developers, designers, and storytellers who believe that memories are the
          foundation of our lives. Our mission is to build a platform that brings those memories to life in a
          meaningful way.
        </p>
      </section>

      <footer className="about-footer">
        <p>Thanks for being a part of the Digital Memory Lane journey!</p>
      </footer>
    </div>
  );
};

export default AboutUs;
