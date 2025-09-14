import React, { useState, useEffect } from "react";
import LoadingReveal from "../components/LoadingReveal";
import HomeSection from "./sections/homeSection";

export default function Home() {
  const [loading, setLoading] = useState(true);

  // ⬇️ 로딩 애니메이션 타이밍(원하면 숫자만 바꿔서 조절)
  const barDuration = 1.3;
  const barFade = 0.1;
  const gap = 0.05;
  const panelDuration = 1.7;
  const totalDuration = (barDuration + barFade + gap + panelDuration) * 1000;

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), totalDuration);
    return () => clearTimeout(t);
  }, [totalDuration]);

  return (
    <>
      {loading && (
        <LoadingReveal
          barDuration={barDuration}
          barFade={barFade}
          gap={gap}
          panelDuration={panelDuration}
          onDone={() => setLoading(false)}
        />
      )}

      {/* 스냅 컨테이너 (Home은 섹션 1개) */}
      <main className="homePage">
        <HomeSection />
      </main>
    </>
  );
}

// import React, { useState, useEffect } from "react";
// import LoadingReveal from "../components/LoadingReveal";
// import {profileImg, icLinkedIn, icGitHub, icEmail, icLocation} from "../assets";

// export default function Home() {
//   const [loading, setLoading] = useState(true);

//   const barDuration= 1.3;
//   const barFade= 0.1;
//   const gap= 0.05;
//   const panelDuration= 1.7;
//   const totalDuration = (barDuration + barFade + gap +panelDuration) * 1000;

//   useEffect(() => {
//     // duration 맞춰서 로딩 끝나면 숨김
//     const t = setTimeout(() => setLoading(false), totalDuration);
//     return () => clearTimeout(t);
//   }, [totalDuration]);

//   return (
//     <>
//       {loading &&
//         <LoadingReveal
//           barDuration={barDuration}
//           barFade={barFade}
//           gap={gap}
//           panelDuration={panelDuration}
//           onDone={() => setLoading(false)}
//         />}

//       <section id="home" className="home">
//         <div className="container">
//           <div className="home__grid">
//             <div className="home__left">
//               <img src={profileImg} alt="Paul K. Yoo" className="home__photo" />
//             </div>
//             <div className="home__right">
//               <h1 className="home__title">Paul K. Yoo</h1>
//               <p className="home__subtitle">Tech + Business</p>
//               <p className="home__tagline">Inter-disciplinary professional</p>
//               <ul className="home__roles">
//                 <li>Data Scientist</li>
//                 <li>Data Analyst</li>
//                 <li>Tech Project Manager</li>
//               </ul>
//             </div>
//           </div>


//           <div className="home__contacts">
//             <ul>
//               <li>
//                 <img src={icLocation} alt="Location" />
//                 Los Angeles, CA
//               </li>
//               <li>
//                 <img src={icLinkedIn} alt="LinkedIn" />
//                 <a href="https://www.linkedin.com/in/pkyoo" target="_blank" rel="noreferrer">
//                   LinkedIn
//                 </a>
//               </li>
//               <li>
//                 <img src={icGitHub} alt="GitHub" />
//                 <a href="https://github.com/PKYOO-116" target="_blank" rel="noreferrer">
//                   GitHub
//                 </a>
//               </li>
//               <li>
//                 <img src={icEmail} alt="Email" />
//                <a href="mailto:pkyoo116@gmail.com">pkyoo116@gmail.com</a>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }