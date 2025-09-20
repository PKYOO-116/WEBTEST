// src/components/experience.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  logoExcello,
  logoFPM,
  logoSYPM,
  viewsIcon,
  heartIcon,
} from "../../assets";

const experienceData = [
  {
    id: "excello-analyst",
    company: "EXCELLO",
    logo: logoExcello,
    title: "Data Analyst",
    period: "2022.02 – 2023.02",
    location: "Seoul, KR",
    website: "https://excello.example.com",
    bullets: [
      "자동화된 대시보드 업데이트 파이프라인 구축(ETL 주기 24h→2h)",
      "고열·고압 설비 에너지 효율 분석으로 연간 비용 8% 절감",
      "C-suite 의사결정 지원 리포트 주 1회 발행",
    ],
    kpis: [
      { label: "Cost ↓", value: "8%" },
      { label: "ETL 주기", value: "2h" },
      { label: "Alerts/월", value: "120+" },
    ],
    tech: ["Python", "SQL", "Airflow", "Tableau", "GCP"],
  },
  {
    id: "usc-ml",
    company: "USC Projects",
    logo: logoFPM,
    title: "ML Engineer (Project)",
    period: "2023.09 – 2024.05",
    location: "Los Angeles, CA",
    website: "https://usc.example.com",
    bullets: [
      "Spark RDD + XGBoost로 대규모 추천 실험 파이프라인",
      "영화 리뷰 LSTM/CNN 감성분석, AUC 0.92 달성",
    ],
    kpis: [
      { label: "AUC", value: "0.92" },
      { label: "Throughput", value: "2.1x" },
    ],
    tech: ["Spark", "XGBoost", "TensorFlow", "Keras", "Flask"],
  },
  {
    id: "usc-da",
    company: "USC Facilities",
    logo: logoSYPM,
    title: "Data Analyst (Student)",
    period: "2021.09 – 2022.05",
    location: "Los Angeles, CA",
    website: "https://facilities.usc.edu/",
    bullets: [
      "시설 데이터 정제/표준화 및 비용 구조 분석",
      "월간 임원 보고서 자동화로 리드타임 40% 단축",
    ],
    kpis: [
      { label: "Lead time ↓", value: "40%" },
      { label: "표준지표", value: "36" },
    ],
    tech: ["Pandas", "SQL", "Tableau"],
  },
  // 필요 시 더 추가…
];

const LIKE_STORAGE_KEY = "exp_likes_v1";

export default function Experience() {
  const items = useMemo(() => experienceData, []);
  const [index, setIndex] = useState(0);

  // 좋아요(로컬 저장)
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
  const touchDeltaX = useRef(0);

  const clamp = (n) => Math.max(0, Math.min(n, items.length - 1));
  const goTo = (i) => setIndex(clamp(i));
  const next = () => setIndex((i) => clamp(i + 1));
  const prev = () => setIndex((i) => clamp(i - 1));

  // 키보드 ←/→
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // 터치 스와이프
  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
  };
  const onTouchMove = (e) => {
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
  };
  const onTouchEnd = () => {
    const threshold = 48;
    if (touchDeltaX.current > threshold) prev();
    else if (touchDeltaX.current < -threshold) next();
    touchStartX.current = 0;
    touchDeltaX.current = 0;
  };

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

  // ===== 검색(순환) =====
  const [query, setQuery] = useState("");
  const [searchProgress, setSearchProgress] = useState({}); // { [lowerQuery]: lastIndex }

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
    const nextIdx = matches.find((idx) => idx > last) ?? matches[0]; // 순환
    setIndex(nextIdx);
    setSearchProgress((prev) => ({ ...prev, [q]: nextIdx }));
  };

  return (
    <section id="experience" className="experience whoSec" aria-label="Experience section">
      {/* 타이틀(섹션 내부, Viewport 바깥 좌상단) */}
      <h1 className="exp__title">Experience</h1>

      {/* 오른쪽 로고 — 섹션 기준 absolute (fixed 아님) */}
      <div className="exp__sideBrand" aria-hidden="true">
        {items[index]?.logo && (
          <img src={items[index].logo} alt="" className="exp__sideBrandImg" />
        )}
      </div>

      <div className="exp__column">
        {/* 뷰포트 '바깥' 우상단 검색 */}
        <div className="exp__searchRow">
          <form className="exp__search" onSubmit={onSearch} role="search">
            <input
              type="search"
              placeholder="Search experiences..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search experiences"
            />
            <button type="submit">Go</button>
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
                      <span className="exp__company">{job.company}</span>
                      <span className="exp__dot">•</span>
                      <span className="exp__role">{job.title}</span>
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
              </article>
            ))}
          </div>
        </div>

        {/* Viewport 아래 바: Dots(중앙) + Website/Views/Like(우측) */}
        <div className="exp__viewportBar">
          {/* 전역 nav 보더 간섭 회피: <div role="tablist"> */}
          <div className="exp__dots" role="tablist" aria-label="Select experience card">
            {items.map((_, i) => (
              <button
                key={i}
                role="tab"
                className={`exp__dotBtn ${index === i ? "is-active" : ""}`}
                aria-selected={index === i}
                onClick={() => goTo(i)}
                title={`Go to ${i + 1}`}
              />
            ))}
          </div>

          <div className="exp__actions">
            <button
              className="exp__websiteBtn"
              onClick={() => openWebsite(items[index]?.website)}
              type="button"
              title="Open company website"
            >
              Website
            </button>

            <div className="exp__views" title="views">
              <img src={viewsIcon} alt="views" />
              <span className="exp__viewsCount">{totalVisits ?? "—"}</span>
              {/* TODO: 전역 방문자 수 API 연동 */}
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
    </section>
  );
}