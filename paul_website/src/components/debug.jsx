export default function VerticalGuides() {
  const vw = window.innerWidth;
  const positions = [vw * 0.333, vw * 0.5, vw * 0.666];

  const guides = positions.map((pos, index) => (
    <div
      key={`guide-${index}`}
      style={{
        position: "fixed",
        top: 0,
        left: `${pos}px`,
        width: "1px",
        height: "100vh",
        backgroundColor: "rgb(255, 29, 29)", // 완전한 빨강
        zIndex: 9999,
        pointerEvents: "none",
      }}
    />
  ));

  // + 가운데 가로선도 추가
  guides.push(
    <div
      key="horizontal-center"
      style={{
        position: "fixed",
        top: "50%",
        left: 0,
        width: "100vw",
        height: "1px",
        backgroundColor: "rgb(255, 29, 29)",
        zIndex: 9999,
        pointerEvents: "none",
      }}
    />
  );

  return <>{guides}</>;
}