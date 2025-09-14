import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

export default function LoadingReveal({
  barDuration = 1.0,
  barFade = 0.3,
  gap = 0.15,
  panelDuration = 1.2,
  onDone,
}) {
  const ease = [0.22, 1, 0.36, 1];
  const bar = useAnimation();
  const left = useAnimation();
  const right = useAnimation();

  useEffect(() => {
    let mounted = true;

    (async () => {
      // 1) 흰 선 올라오기
      await bar.start({
        scaleY: [0, 1],
        opacity: 1,
        transition: { duration: barDuration, ease }
      });

      // 2) 선 페이드아웃
      await bar.start({
        opacity: [1, 0],
        transition: { duration: barFade, ease }
      });

      // 3) 약간의 간격 후, 좌/우 패널이 중앙에서 바깥으로 쓸림
      await new Promise((res) => setTimeout(res, gap * 1000));
      await Promise.all([
        left.start({ x: "-100%", transition: { duration: panelDuration, ease } }),
        right.start({ x: "100%",  transition: { duration: panelDuration, ease } }),
      ]);

      if (mounted) onDone?.();
    })();

    return () => { mounted = false; };
  }, [barDuration, barFade, gap, panelDuration, onDone, bar, left, right]);

  return (
    <div className="loader">
      {/* 흰 진행선: 아래 중앙에서 위로 성장 */}
      <motion.div
        className="loader__bar"
        initial={{ scaleY: 0, opacity: 1 }}
        animate={bar}
      />
      {/* 좌/우 패널: 시작 시 중앙을 덮고 있다가 바깥으로 */}
      <motion.div
        className="loader__panelHalf loader__panelLeft"
        initial={{ x: 0 }}
        animate={left}
      />
      <motion.div
        className="loader__panelHalf loader__panelRight"
        initial={{ x: 0 }}
        animate={right}
      />
    </div>
  );
}