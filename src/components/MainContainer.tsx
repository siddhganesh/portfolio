import { lazy, PropsWithChildren, Suspense, useEffect, useState, useRef } from "react";
import About from "./About";
import Career from "./Career";
import Contact from "./Contact";
import Cursor from "./Cursor";
import Landing from "./Landing";
import Navbar from "./Navbar";
import SocialIcons from "./SocialIcons";
import WhatIDo from "./WhatIDo";
import Work from "./Work";
import setSplitText from "./utils/splitText";

const TechStack = lazy(() => import("./TechStack"));

const MainContainer = ({ children }: PropsWithChildren) => {
  const [isDesktopView, setIsDesktopView] = useState<boolean>(
    window.innerWidth > 1024
  );
  const resizeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Run once on mount
    setSplitText();

    // Scroll progress bar
    const progressEl = document.getElementById("scroll-progress");
    const updateProgress = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      if (progressEl) progressEl.style.width = `${pct}%`;
    };
    window.addEventListener("scroll", updateProgress, { passive: true });

    // Debounced resize handler — prevents setSplitText hammering
    const resizeHandler = () => {
      if (resizeTimer.current) clearTimeout(resizeTimer.current);
      resizeTimer.current = setTimeout(() => {
        const desktop = window.innerWidth > 1024;
        setIsDesktopView(desktop);
        setSplitText();
      }, 200);
    };
    window.addEventListener("resize", resizeHandler);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", resizeHandler);
      if (resizeTimer.current) clearTimeout(resizeTimer.current);
    };
  }, []);

  return (
    <div className="container-main">
      {/* Global scroll progress indicator */}
      <div id="scroll-progress" />

      <Cursor />
      <Navbar />
      <SocialIcons />
      {isDesktopView && children}
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <div className="container-main">
            <Landing>{!isDesktopView && children}</Landing>
            <About />
            <WhatIDo />
            <Career />
            <Work />
            {isDesktopView && (
              <Suspense fallback={<div style={{ height: "100vh" }} />}>
                <TechStack />
              </Suspense>
            )}
            <Contact />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContainer;
