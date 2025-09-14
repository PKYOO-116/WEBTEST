import { logoUSC, logoMSU } from "../../assets";

export default function EducationSection() {
  return (
    <section className="whoSec education" id="education">
      <div className="container edu__wrap">
        <h2 className="edu__title">Education</h2>

        {/* USC */}
        <article className="edu__item">
          <div className="edu__info">
            <div className="edu__meta">
              University of Southern California · Los Angeles, CA
            </div>
            <div className="edu__time">August 2023 – May 2025</div>
          </div>
          <div className="edu__row">
            <img src={logoUSC} alt="USC" className="edu__logo logo-box" />
            <div className="edu__body">
              <div className="edu__degree">Master of Science</div>
              <div className="edu__major">Applied Data Science</div>
            </div>
          </div>
        </article>

        {/* MSU */}
        <article className="edu__item">
          <div className="edu__info">
            <div className="edu__meta">
              Mississippi State University · Starkville, MS
            </div>
            <div className="edu__time">January 2014 – May 2016</div>
          </div>
          <div className="edu__row">
            <img src={logoMSU} alt="MSU" className="edu__logo logo-box" />
            <div className="edu__body">
              <div className="edu__degree">
                Bachelor of Business Administration
              </div>
              <div className="edu__major">
                Business Administration concentration in Finance
              </div>
              <div className="edu__note">Minor in Economics</div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}