import { Typewriter } from "react-simple-typewriter";

export default function EducationSection() {
  return (
    <section className="projects whoSec" id="projects">
      <h1 className="proj__title">
        <Typewriter
          words={["Projects"]}
          typeSpeed={50}
          deleteSpeed={0}
          delaySpeed={400}
          cursor
        />
        </h1>
    </section>
        )
}