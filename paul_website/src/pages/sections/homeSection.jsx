import React from "react";
import { profileImg, icLocation, icLinkedIn, icGitHub, icEmail } from "../../assets";

export default function HomeSection() {
  return (
    <section className="homeSec">
      <div className="container">
        <div className="home__grid">
          <div className="home__left">
            <img src={profileImg} alt="Paul K. Yoo" className="home__photo" />
          </div>

          <div className="home__right">
            <h1 className="home__title">Paul K. Yoo</h1>
            <p className="home__subtitle">Tech + Business</p>
            <p className="home__tagline">Inter-disciplinary professional</p>
            <ul className="home__roles">
              <li>Data Scientist</li>
              <li>Data Analyst</li>
              <li>Tech Project Manager</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 우하단 고정 연락처 */}
      <div className="home__contacts">
        <ul>
          <li>
            <img src={icLocation} alt="Location" />
            <span>Los Angeles, CA</span>
          </li>
          <li>
            <img src={icLinkedIn} alt="LinkedIn" />
            <a href="https://www.linkedin.com/in/pkyoo" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </li>
          <li>
            <img src={icGitHub} alt="GitHub" />
            <a href="https://github.com/PKYOO-116" target="_blank" rel="noreferrer">
              GitHub
            </a>
          </li>
          <li>
            <img src={icEmail} alt="Email" />
            <a href="mailto:pkyoo116@gmail.com">pkyoo116@gmail.com</a>
          </li>
        </ul>
      </div>
    </section>
  );
}