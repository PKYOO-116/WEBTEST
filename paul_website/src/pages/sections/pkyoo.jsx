import { Typewriter } from "react-simple-typewriter";

export default function Pkyoo() {
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
                words={["Paul Keunchan Yoo"]}
                typeSpeed={50}
                deleteSpeed={0}
                delaySpeed={400}
                cursor
              />
          </h1>
        </div>
        <div className="grid grid-6"></div>
        <div className="grid grid-7"></div>
        <div className="grid grid-8"></div>
        <div className="grid grid-9"></div>
      </div>
    </section>
  );
}