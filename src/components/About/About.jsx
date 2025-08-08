import React from "react";
import "./About.css";
import avatar from "../../images/avatar.png";

function About() {
  return (
    <div className="about">
      <div className="about__image-container">
        <img className="about__image" src={avatar} alt="Author: Olivia" />
      </div>
      <div className="about__container">
        <h3 className="about__header">About the Author</h3>
        <div className="about__text">
          <p>
            Olivia is a software engineer passionate about creating clean,
            responsive, and accessible web applications. She graduated from the
            TripleTen (formerly Practicum) program in June 2021, where
            she built and deployed full-stack projects using HTML, CSS,
            JavaScript, React, and Node.js with Express and MongoDB.
          </p>
          <p>During her training, Olivia:</p>
          <ul>
            <li>
              <strong>Designed and developed</strong> fully responsive
              applications with optimized performance and cross-browser
              compatibility.
            </li>
            <li>
              <strong>Integrated APIs</strong> to deliver dynamic, real-time
              content and improve user engagement.
            </li>
            <li>
              <strong>Led</strong> all technical phases of development—from
              ideation and architecture to deployment and maintenance.
            </li>
          </ul>
          With a proven ability to learn quickly and adapt to new technologies,
          Olivia is ready to bring her technical skills, creative
          problem-solving, and collaborative mindset to a forward-thinking
          development team.
        </div>
      </div>
    </div>
  );
}

export default About;
