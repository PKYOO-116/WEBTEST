import { useState } from "react";
import { Typewriter } from "react-simple-typewriter";
import { flagUS, flagKR } from "../../assets";

export default function Pkyoo() {
  const [doneTyping, setDoneTyping] = useState(false);
  const [, setTypedLength] = useState(0);
  const Name = "Paul Keunchan Yoo";

  return (
    <section className="pkyoo">
      <div className="container">
        <div className="grid grid-1"></div>
        <div className="grid grid-2"></div>
        <div className="grid grid-3"></div>
        <div className="grid grid-4"></div>
        <div className="grid grid-5">
          <h1 className="pkyoo__title">
            <Typewriter
              words={[Name]}
              typeSpeed={50}
              deleteSpeed={0}
              delaySpeed={400}
              cursor
              onType={(char) => {
                setTypedLength((current) => {
                  const count = current +1;
                  console.log("count:", count);
                  if (count === Name.length) {
                    setDoneTyping(true);
                  }
                  return count;
                });
              }}
            />
          </h1>
        </div>
        <div className="grid grid-6"></div>
        <div className="grid grid-7"></div>
        <div className="grid grid-8">
          {doneTyping && (
            <div className="pkyoo__flags">
              <div className="pkyoo__flagBox">
                <div className="pkyoo__flagLabel">U.S.</div>
                <img src={flagUS} alt="USflag" className="pkyoo__flag" />
              </div>
              <div className="pkyoo__flagBox">
                <img src={flagKR} alt="KRflag" className="pkyoo__flag" />
                <div className="pkyoo__flagLabel">R.O.K.</div>
              </div>
            </div>
          )}
        </div>
        <div className="grid grid-9"></div>
      </div>
    </section>
  );
}