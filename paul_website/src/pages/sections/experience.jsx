import { useEffect, useRef, useState } from "react";
import { viewsIcon, heartIcon } from "../../assets";
import { experienceData } from "../../data/experienceData";
import { Typewriter } from "react-simple-typewriter";

const LIKE_STORAGE_KEY = "exp_likes_v1";

export default function Experience() {
  const items = experienceData;
  
  // LocalStorage에서 좋아요 목록 불러오기
  const [likes, setLikes] = useState(() => {
    try {
      const raw = localStorage.getItem(LIKE_STORAGE_KEY);
      return raw ? new Set(JSON.parse(raw)) : new Set();
    } catch {
      return new Set();
    }
  });

  // 전역 방문자 수(후연동 자리)
  // TODO: fetch('/api/visits/whoami').then(r=>r.json()).then(({ total }) => setTotal(total))
  const [totalVisits /*, setTotal*/] = useState(null);

  const trackRef = useRef(null);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const touchDeltaX = useRef(0);

  const clamp = (n) => Math.max(0, Math.min(n, items.length - 1));
  const next = () => setIndex((i) => clamp(i + 1));
  const prev = () => setIndex((i) => clamp(i - 1));
  const goTo = (i) => setIndex(clamp(i));

  // 키보드 좌우 방향키로 카드 넘김
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

  // 터치 스와이프 (가로 방향만 인식)
  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    touchDeltaX.current = 0;
  };

  const onTouchMove = (e) => {
    const dx = e.touches[0].clientX - touchStartX.current;
    const dy = e.touches[0].clientY - touchStartY.current;
    if (Math.abs(dy) > Math.abs(dx)) return; // 세로 스크롤이면 무시
    touchDeltaX.current = dx;
  };

  const onTouchEnd = () => {
    const threshold = 48;
    if (touchDeltaX.current > threshold) prev();
    else if (touchDeltaX.current < -threshold) next();

    touchStartX.current = 0;
    touchStartY.current = 0;
    touchDeltaX.current = 0;
  };

  const [index, setIndex] = useState(0);
  const [delayedIndex, setDelayedIndex] = useState(index);

  // ▶ 카드 전환 후 로고가 자연스럽게 바뀌도록 딜레이 설정
  useEffect(() => {
    const timer = setTimeout(() => {
      setDelayedIndex(index);
    }, 400); // 카드 전환 트랜지션과 일치하는 시간 (ms 단위)

    return () => clearTimeout(timer);
  }, [index]);

  // 좋아요 toggle
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

  const openWebsite = (url) => {
    if (!url) return;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  // 검색 기능
  const [query, setQuery] = useState("");
  const [searchProgress, setSearchProgress] = useState({});

  const findAllMatchIndices = (q) => {
    const needle = q.trim().toLowerCase();
    if (!needle) return [];
    const indices = [];
    items.forEach((job, i) => {
      const bag = [
        job.company,
        job.title,
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
        <div className="grid grid-4">
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
          <div
            className="exp__viewport"
            ref={trackRef}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div
              className="exp__track"
              style={{ transform: `translateX(-${index * 100}%)` }}
              role="group"
              aria-roledescription="carousel"
              aria-label="Experience cards"
            >
              {items.map((job, i) => (
                <article
                  className="exp__slide"
                  key={job.id}
                  aria-hidden={index !== i}
                >
                  <header className="exp__slideHeader">
                    <div className="exp__heading">
                      <div className="exp__badge">
                        <div className="exp__role">{job.title}</div>
                        <div className="exp__company">[ {job.company} ]</div>
                      </div>
                      <div className="exp__meta">
                        <span>{job.period}</span>
                        <span className="exp__dot">•</span>
                        <span>{job.location}</span>
                      </div>
                    </div>
                  </header>

                  <ul className="exp__bullets">
                    {job.bullets.map((b, idx) => (
                      <li key={idx}>{b}</li>
                    ))}
                  </ul>

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
                          {job.tech.map((t, idx) => (
                            <li key={idx} className="exp__chip">
                              {t}
                            </li>
                          ))}
                        </ul>
                      )}
                    </footer>
                  )}
                  <div className="exp__sideBrand mobile">
                    {items[delayedIndex]?.logo && (
                      <>
                        <img
                          src={items[delayedIndex].logo}
                          alt=""
                          className="exp__sideBrandImg"
                          onClick={() => openWebsite(items[delayedIndex].website)}
                          style={{ cursor: "pointer" }}
                        />
                        <div className="exp__visitText">Click to visit website</div>
                      </>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>

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
        <div className="grid grid-5"></div>
        <div className="grid grid-6">
          <div className="exp__sideBrand tablet desktop">
            {items[index]?.logo && (
              <img src={items[index].logo} alt="" className="exp__sideBrandImg" />
            )}
          </div>
        </div>
        <div className="grid grid-7"></div>
        <div className="grid grid-8"></div>
        <div className="grid grid-9"></div>
      </div>
    </section>
  );
}