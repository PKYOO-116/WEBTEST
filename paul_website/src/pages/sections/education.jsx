import { Typewriter } from "react-simple-typewriter";
import { logoUSC, logoMSU } from "../../assets";

export default function EducationSection() {
  return (
    <section className="education whoSec" id="education">
      <h1 className="edu__title">
        <Typewriter
          words={["Education"]}
          typeSpeed={50}
          deleteSpeed={0}
          delaySpeed={400}
          cursor
        />
        </h1>

      {/* 화면을 100%로 덮는 컨테이너(풀블리드) */}
      <div className="edu__container">
        {/* 실제 내용 폭을 조절하는 스테이지(가변 max-width) */}
        <div className="edu__stage">

          {/* USC */}
          <article className="edu__item">
            <div className="edu__school">
              University of Southern California | Los Angeles, CA
              <div className="edu__time">August 2023 – May 2025</div>
            </div>
            <div className="edu__body">
              <img src={logoUSC} alt="USC" className="edu__logo" />
              <div>
                <div className="edu__degree">Master of Science</div>
                <div className="edu__major">Applied Data Science</div>
              </div>
            </div>
          </article>

          {/* MSU */}
          <article className="edu__item">
            <div className="edu__school">
              Mississippi State University | Starkville, MS
              <div className="edu__time">January 2014 – May 2016</div>
            </div>
            <div className="edu__body">
              <img src={logoMSU} alt="MSU" className="edu__logo" />
              <div>
                <div className="edu__degree">Bachelor of Business Administration</div>
                <div className="edu__major">B.A. Finance Concentration</div>
                <div className="edu__minor">Minor in Economics</div>
              </div>
            </div>
          </article>

        </div>
      </div>
    </section>
  );
}