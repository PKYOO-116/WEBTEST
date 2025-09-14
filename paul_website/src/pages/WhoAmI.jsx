import Pkyoo from "./sections/pkyoo";
import Education from "./sections/education";
import Experience from "./sections/experience";
import Community from "./sections/community";
import Skills from "./sections/skills";

export default function WhoAmI() {
  return (
    <main className="whoSec">
      <Pkyoo />
      <Education />
      <Experience />
      <Community />
      <Skills />
    </main>
  );
}