import { Typewriter } from "react-simple-typewriter";

export default function Pkyoo() {
  return (
    <section className="pkyoo">
        <h1 className="pkyoo__title">
            <Typewriter
                words={["Paul Keunchan Yoo"]}
                typeSpeed={50}
                deleteSpeed={0}
                delaySpeed={400}
                cursor
            />
        </h1>
    </section>
  );
}