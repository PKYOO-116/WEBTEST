import { useEffect } from "react";

export default function ScrollBySpace() {
  useEffect(() => {
    const handleSpaceScroll = (e) => {
      if (e.code === "Space") {
        e.preventDefault();
        window.scrollBy({
          top: window.innerHeight,
          behavior: "smooth",
        });
      }
    };

    window.addEventListener("keydown", handleSpaceScroll);
    return () => window.removeEventListener("keydown", handleSpaceScroll);
  }, []);

  return null;
}