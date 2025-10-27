import React, { useEffect, useRef } from "react";

export default function Waves() {
  const vantaRef = useRef(null);
  const vantaEffect = useRef(null);

  useEffect(() => {
    let mounted = true;

    (async () => {
      // import three and vanta correctly
      const THREE = await import("three");


      // 1. VANTA BIRDS
      const BIRDS = (await import("vanta/dist/vanta.birds.min")).default;
      if (mounted && !vantaEffect.current) {
        vantaEffect.current = BIRDS({
          el: vantaRef.current,
          THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          backgroundColor: 0x0b1220,
          color1: 0xff0000,
          color2: 0x00ff00,
          colorMode: 'lerp', // 'lerp' or 'lerpGradient'
          birdSize: 1.0,
          wingSpan: 20.0,
          speedLimit: 5.0,
          separation: 20.0,
          alignment: 20.0,
          cohesion: 20.0,
          quantity: 4.0
        });
      }



    })();



    return () => {

      mounted = false;
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
        vantaEffect.current = null;
      }
    };
  }, []);
  useEffect(() => {
    if (vantaEffect.current) {
      const isMobile = window.innerWidth <= 768; // mobile breakpoint
      vantaEffect.current.setOptions({
        color: 0xff00ff,
        points: isMobile ? 20 : 12, // 12 for desktop, 20 for mobile
      });
    }
  }, []);

  return (
    <div
      ref={vantaRef}
      style={{
        width: "100vw",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        overflow: "hidden",
        zIndex:-1,
      }}
    >
    </div>
  );
}

