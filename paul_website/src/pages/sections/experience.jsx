import { useEffect, useRef, useState } from "react";
import { viewsIcon, heartIcon, arrowLeft, arrowRight } from "../../assets";
import { experienceData } from "../../data/experienceData";
import { Typewriter } from "react-simple-typewriter";

const LIKE_STORAGE_KEY = "exp_likes_v1";

export default function Experience() {
  const items = experienceData;

  // ▶ 상태 정의 (상단에 먼저 위치)
  const [index, setIndex] = useState(0);
  const [query, setQuery] = useState("");
  const [searchProgress, setSearchProgress] = useState({});
  const [likes, setLikes] = useState(() => {
    try {
      const raw = localStorage.getItem(LIKE_STORAGE_KEY);
      return raw ? new Set(JSON.parse(raw)) : new Set();
    } catch {
      return new Set();
    }
  });
  const [totalVisits /*, setTotal*/] = useState(null);

  // ▶ ref 정의
  const slideRefs = useRef([]);
  const trackRef = useRef(null);

  // ▶ 카드 넘김 관련 유틸
  const clamp = (n) => Math.max(0, Math.min(n, items.length - 1));
  const next = () => setIndex((i) => clamp(i + 1));
  const prev = () => setIndex((i) => clamp(i - 1));
  const goTo = (i) => setIndex(clamp(i));

  const scrollToTopOfSlideContent = () => {
    const slide = slideRefs.current[index];
    console.log("slide:", slide);

    if (!slide) return;

    const content = slide.querySelector(".exp__slideContent");
    console.log("content:", content);

    if (content) {
      console.log("Before scrollTop:", content.scrollTop);
      content.scrollTo({ top: 0, behavior: "smooth" });
      console.log("After scrollTop:", content.scrollTop);
    }
  };
  
  // 카드 내외 상하 스크롤링 전환 빠르게
  useEffect(() => {
      // 카드 전환 시 실행
      const timer = setTimeout(() => {
        scrollToTopOfSlideContent();
      }, 0); // 또는 100~300ms로 조정 가능

      return () => clearTimeout(timer);
    }, [index]);

    useEffect(() => {
    const slide = slideRefs.current[index];
    if (!slide) return;

    const content = slide.querySelector(".exp__slideContent");
    if (!content) return;

    const onWheel = (e) => {
      const { scrollTop, scrollHeight, clientHeight } = content;

      const isAtTop = scrollTop === 0;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight;

      if (
        (e.deltaY < 0 && isAtTop) ||
        (e.deltaY > 0 && isAtBottom)
      ) {
        // 외부로 스크롤을 전달 (부모로)
        return;
      }

      // 내부에서만 처리
      e.stopPropagation();
    };

    content.addEventListener("wheel", onWheel, { passive: false });

    return () => content.removeEventListener("wheel", onWheel);
  }, [index]);

  // ▶ 키보드 좌우 방향키로 카드 넘김
  useEffect(() => {
    const onKey = (e) => {
      const tag = (e.target?.tagName || "").toLowerCase();
      if (tag === "input" || tag === "textarea" || e.target?.isContentEditable) return;

      if (e.key === "ArrowRight") {
        e.preventDefault();
        next();
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      }
    };
    window.addEventListener("keydown", onKey, { passive: false });
    return () => window.removeEventListener("keydown", onKey);
  }, [items.length]);

  // 카드 좌우 스크롤
  useEffect(() => {
    const slide = slideRefs.current[index];
    if (!slide) return;

    const content = slide.querySelector(".exp__slideContent");
    if (!content) return;

    const onWheel = (e) => {
      const { deltaX, deltaY } = e;

      // 1. 좌우 스크롤 감지
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX > 10) next();     // 오른쪽으로 스크롤 → 다음 카드
        else if (deltaX < -10) prev(); // 왼쪽으로 스크롤 → 이전 카드
        e.preventDefault(); // 브라우저 기본 동작 방지
      }

      // 2. 위아래 스크롤 시 외부 전파 방지
      const { scrollTop, scrollHeight, clientHeight } = content;
      const atTop = scrollTop === 0;
      const atBottom = scrollTop + clientHeight >= scrollHeight;

      if (
        (deltaY < 0 && atTop) ||
        (deltaY > 0 && atBottom)
      ) {
        // 외부로 넘김
        return;
      }

      e.stopPropagation();
    };

    content.addEventListener("wheel", onWheel, { passive: false });

    return () => content.removeEventListener("wheel", onWheel);
  }, [index]);

  // ▶ 검색 기능
  const findAllMatchIndices = (q) => {
    const needle = q.trim().toLowerCase();
    if (!needle) return [];
    const indices = [];
    items.forEach((job, i) => {
      const bag = [
        job.title,
        job.company,
        job.location,
        ...(job.bullets || []),
        ...(job.tech || []),
      ]
        .join("\n")
        .toLowerCase();
      if (bag.includes(needle)) indices.push(i);
    });
    return indices;
  };

  const onSearch = (e) => {
    e.preventDefault();
    const q = query.trim().toLowerCase();
    if (!q) return;
    const matches = findAllMatchIndices(q);
    if (matches.length === 0) return;
    const last = searchProgress[q] ?? -1;
    const nextIdx = matches.find((idx) => idx > last) ?? matches[0];
    setIndex(nextIdx);
    setSearchProgress((prev) => ({ ...prev, [q]: nextIdx }));
  };

  // ▶ 좋아요 toggle
  const toggleLike = (jobId) => {
    setLikes((prev) => {
      const nextSet = new Set(prev);
      if (nextSet.has(jobId)) nextSet.delete(jobId);
      else nextSet.add(jobId);
      try {
        localStorage.setItem(LIKE_STORAGE_KEY, JSON.stringify([...nextSet]));
      } catch {}
      return nextSet;
    });
  };

  // ▶ 외부 링크 열기
  const openWebsite = (url) => {
    if (!url) return;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="experience" className="experience whoSec">
      <div className="container">
        <div className="grid grid-1">
          <h1 className="exp__title">
            <Typewriter
              words={["Experience"]}
              typeSpeed={50}
              deleteSpeed={0}
              delaySpeed={400}
              cursor
            />
          </h1>
        </div>
        <div className="grid grid-2"></div>
        <div className="grid grid-3"></div>
        <div className="grid grid-4"></div>
        <div className="grid grid-5">
          <div className="exp__searchRow">
            <form className="exp__search" onSubmit={onSearch} role="search">
              <input
                type="search"
                placeholder="Search Keywords"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Search experiences"
              />
              <button type="submit">Search</button>
            </form>
          </div>

          {/* Viewport (카드 1장씩) */}
          <div className="exp__viewport"
            ref={trackRef}
          >
            <div
              className="exp__track"
              style={{ transform: `translateX(-${index * 100}%)` }}
              role="group"
              aria-roledescription="carousel"
              aria-label="Experience cards"
            >
              {items.map((job, i) => (
                <article className="exp__slide"
                 ref={(el) => (slideRefs.current[i] = el)}>
                  <div className="exp__slideContent">
                    <header className="exp__slideHeader">
                      <div className="exp__heading">
                        <div className="exp__badge">
                          <div className="exp__role">{job.title}</div>
                          <div className="exp__company">[ {job.company} ]</div>
                        </div>
                        <div className="exp__meta">
                          <div className="mobile tablet">
                            <div>{job.period}</div>
                            <div>{job.location}</div>
                          </div>
                          <div className="desktop">
                            <span>{job.period}</span>
                            <span className="exp__dot">•</span>
                            <span>{job.location}</span>
                          </div>
                        </div>
                      </div>
                    </header>
                    
                    {(job.kpis?.length || job.tech?.length) && (
                      <footer className="exp__footer">
                        {job.kpis?.length > 0 && (
                          <div className="exp__kpis">
                            {job.kpis.map((k, idx) => (
                              <div className="exp__kpi" key={idx}>
                                <span className="exp__kpiLabel">{k.label}</span>
                                <span className="exp__kpiValue">{k.value}</span>
                              </div>
                            ))}
                          </div>
                        )}
                        {job.tech?.length > 0 && (
                          <ul className="exp__tech">
                            {job.tech.map((t, idx) =>
                            <li key={idx} className="exp__chip">
                              {t}
                            </li>)}
                          </ul>
                        )}
                      </footer>
                    )}

                    <ul className="exp__bullets">
                      {job.bullets.map((b, idx) => (
                        <li key={idx}>{b}</li>
                      ))}
                    </ul>

                    <div className="exp__sideBrand mobile tablet">
                      {job.logo && (
                        <>
                          <img
                            src={job.logo}
                            alt=""
                            className="exp__sideBrandImg"
                            onClick={() => openWebsite(job.website)}
                            style={{ cursor: "pointer" }}
                          />
                          <div className="exp__visitText mobile tablet">⬆︎ Click to visit website</div>
                        </>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
          
          <button
            className="exp__arrowBtn exp__arrowBtn--left"
            onClick={prev}
            aria-label="Previous slide"
          >
            <img src={arrowLeft} alt="Previous" />
          </button>
          <button
            className="exp__arrowBtn exp__arrowBtn--right"
            onClick={next}
            aria-label="Next slide"
          >
            <img src={arrowRight} alt="Next" />
          </button>

          {/* Viewport 아래 바: Dots(중앙) + Website/Views/Like(우측) */}
          <div className="exp__viewportBar">
            <div className="exp__dots" role="tablist" aria-label="Select experience card">
              {items.map((_, i) => (
                <button
                  key={i}
                  role="tab"
                  className={`exp__dotBtn ${index === i ? "is-active" : ""}`}
                  aria-selected={index === i}
                  onClick={() => goTo(i)}
                />
              ))}
            </div>

            <div className="exp__actions">
              <div className="exp__views" title="views">
                <img src={viewsIcon} alt="views" />
                <span className="exp__viewsCount">{totalVisits ?? "417"}</span>
              </div>

              <button
                className={`exp__heartBtn ${likes.has(items[index]?.id) ? "is-liked" : ""}`}
                aria-pressed={likes.has(items[index]?.id)}
                onClick={() => toggleLike(items[index]?.id)}
                title="Like"
                type="button"
              >
                <img src={heartIcon} alt="like" />
              </button>
            </div>
          </div>
        </div>
        <div className="grid grid-6">
          <div className="exp__sideBrand desktop">
            {items[index]?.logo && (
              <img src={items[index].logo} alt="" className="exp__sideBrandImg" />
            )}
            <div className="exp__visitText desktop">⬆︎ Click to visit website</div>
          </div>
        </div>
        <div className="grid grid-7"></div>
        <div className="grid grid-8"></div>
        <div className="grid grid-9"></div>
      </div>
    </section>
  );
}