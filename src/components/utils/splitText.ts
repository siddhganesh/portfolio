import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ---------------------------------------------------------------------------
// Vanilla SplitText replacement: splits an element's text into individual
// <span> characters and returns them so GSAP can animate each one.
// ---------------------------------------------------------------------------
function splitIntoChars(el: HTMLElement): HTMLElement[] {
  const text = el.innerText;
  el.innerHTML = "";
  return text.split("").map((ch) => {
    const span = document.createElement("span");
    span.style.display = "inline-block";
    span.textContent = ch === " " ? "\u00a0" : ch; // preserve spaces
    el.appendChild(span);
    return span;
  });
}

function splitIntoWords(el: HTMLElement): HTMLElement[] {
  const words = el.innerText.split(/\s+/);
  el.innerHTML = "";
  return words.map((word, i) => {
    const span = document.createElement("span");
    span.style.display = "inline-block";
    span.textContent = word;
    el.appendChild(span);
    if (i < words.length - 1) el.appendChild(document.createTextNode(" "));
    return span;
  });
}

// ---------------------------------------------------------------------------

export default function setSplitText() {
  ScrollTrigger.config({ ignoreMobileResize: true });
  if (window.innerWidth < 900) return;

  const paras: NodeListOf<HTMLElement> = document.querySelectorAll(".para");
  const titles: NodeListOf<HTMLElement> = document.querySelectorAll(".title");

  const TriggerStart = window.innerWidth <= 1024 ? "top 60%" : "20% 60%";
  const ToggleAction = "play pause resume reverse";

  paras.forEach((para) => {
    para.classList.add("visible");
    const words = splitIntoWords(para);
    gsap.fromTo(
      words,
      { autoAlpha: 0, y: 80 },
      {
        autoAlpha: 1,
        scrollTrigger: {
          trigger: para.parentElement?.parentElement,
          toggleActions: ToggleAction,
          start: TriggerStart,
        },
        duration: 1,
        ease: "power3.out",
        y: 0,
        stagger: 0.02,
      }
    );
  });

  titles.forEach((title) => {
    const chars = splitIntoChars(title);
    gsap.fromTo(
      chars,
      { autoAlpha: 0, y: 80, rotate: 10 },
      {
        autoAlpha: 1,
        scrollTrigger: {
          trigger: title.parentElement?.parentElement,
          toggleActions: ToggleAction,
          start: TriggerStart,
        },
        duration: 0.8,
        ease: "power2.inOut",
        y: 0,
        rotate: 0,
        stagger: 0.03,
      }
    );
  });

  ScrollTrigger.addEventListener("refresh", () => setSplitText());
}
