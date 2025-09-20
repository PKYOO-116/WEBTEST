import { useRef } from "react";
import Pkyoo from "./sections/pkyoo";
import Education from "./sections/education";
import Experience from "./sections/experience";
import Projects from "./sections/projects";
import Community from "./sections/community";
import Skills from "./sections/skills";

export default function WhoAmI(){
  const pageRef = useRef(null);
  // useSectionPager(pageRef, ".whoSec", { duration: 700, threshold: 40 });

  return (
    <main className="whoPage" ref={pageRef} tabIndex={0}>
      <section className="whoSec pkyoo"><Pkyoo /></section>
      <section className="whoSec education"><Education /></section>
      <section className="whoSec experience"><Experience /></section>
      <section className="whoSec projects"><Projects /></section>
      <section className="whoSec community"><Community /></section>
      <section className="whoSec skills"><Skills /></section>
    </main>
  );
}