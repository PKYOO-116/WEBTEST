import { useEffect, useRef } from "react";

export default function useSectionPager(containerRef, sectionSelector = ".whoSec", {
  duration = 700,   // 스크롤 애니메이션 체감 시간(ms)
  threshold = 40,   // 휠/스와이프 민감도
} = {}) {
  const lockRef = useRef(false);
  const touchStartY = useRef(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const sections = Array.from(el.querySelectorAll(sectionSelector));
    const getIndex = () => {
      const top = el.scrollTop;
      let closest = 0, min = Infinity;
      sections.forEach((s, i) => {
        const d = Math.abs(s.offsetTop - top);
        if (d < min) { min = d; closest = i; }
      });
      return closest;
    };

    const scrollToIndex = (i) => {
      const clamped = Math.max(0, Math.min(i, sections.length - 1));
      const targetTop = sections[clamped].offsetTop;
      lockRef.current = true;
      el.scrollTo({ top: targetTop, behavior: "smooth" });
      // 잠금 해제(대략 애니메이션 시간만큼)
      setTimeout(() => { lockRef.current = false; }, duration);
    };

    const onWheel = (e) => {
      if (lockRef.current) { e.preventDefault(); return; }
      const dy = e.deltaY;
      if (Math.abs(dy) < threshold) return;
      e.preventDefault();
      const cur = getIndex();
      scrollToIndex(cur + (dy > 0 ? 1 : -1));
    };

    const onTouchStart = (e) => { touchStartY.current = e.touches[0].clientY; };
    const onTouchMove  = (e) => {
      if (lockRef.current) { e.preventDefault(); return; }
      const dy = touchStartY.current - e.touches[0].clientY;
      if (Math.abs(dy) < threshold) return;
      e.preventDefault();
      const cur = getIndex();
      scrollToIndex(cur + (dy > 0 ? 1 : -1));
    };

    const onKey = (e) => {
      if (lockRef.current) return;
      if (["ArrowDown","PageDown"," "].includes(e.key)) {
        e.preventDefault(); scrollToIndex(getIndex()+1);
      } else if (["ArrowUp","PageUp"].includes(e.key)) {
        e.preventDefault(); scrollToIndex(getIndex()-1);
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    el.addEventListener("keydown", onKey);

    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("keydown", onKey);
    };
  }, [containerRef, sectionSelector, duration, threshold]);
}