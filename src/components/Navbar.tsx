import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollTrigger);

// Lightweight stub that replaces the paid ScrollSmoother plugin.
export const smoother = {
  paused: (_v: boolean) => {},
  scrollTop: (_v: number) => {},
  scrollTo: (target: string, _smooth: boolean, _align: string) => {
    const el = document.querySelector(target);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  },
  refresh: (_immediate?: boolean) => ScrollTrigger.refresh(),
};

const Navbar = () => {
  useEffect(() => {
    // Glassmorphism on scroll
    const header = document.querySelector(".header") as HTMLElement | null;
    const onScroll = () => {
      if (!header) return;
      if (window.scrollY > 60) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // Native smooth-scroll for nav links
    const links = document.querySelectorAll(".header ul a");
    links.forEach((elem) => {
      const element = elem as HTMLAnchorElement;
      element.addEventListener("click", (e) => {
        const href = element.getAttribute("data-href");
        if (href) {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) target.scrollIntoView({ behavior: "smooth" });
        }
      });
    });

    window.addEventListener("resize", () => ScrollTrigger.refresh());

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      <div className="header">
        <a href="#" className="navbar-title" data-cursor="disable">
          SM
        </a>
        <a
          href="mailto:siddhganesh09@gmail.com"
          className="navbar-connect"
          data-cursor="disable"
        >
          siddhganesh09@gmail.com
        </a>
        <ul>
          <li>
            <a data-href="#about" href="#about">
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work">
              <HoverLinks text="WORK" />
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact">
              <HoverLinks text="CONTACT" />
            </a>
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
