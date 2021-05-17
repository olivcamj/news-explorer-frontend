import React from 'react'
import './About.css';
import avatar from '../../images/avatar.png';

function About() {
  return (
    <div className="about">
      <div className="about__image-container">
        <img className="about__image" src={avatar} alt="Author: Olivia" />
      </div>
      <div className="about__container">
        <h3 className="about__header">About the author</h3>
        <div className="about__text">
          <p>
            Olivia is an aspiring web developer. She completed Practicum by
            Yandex program in May 2021. The program explored HTML, CSS, JS,
            React and NodeJS (paired with Express & Mongbd).
          </p>
          <p>
            Olivia has experience in completing projects from begining to end
            and believes it can help in her future web development career.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;