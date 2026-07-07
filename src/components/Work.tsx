import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    name: "Proton Stock Market Analyzer",
    category: "Data Analysis",
    tools: "Python, Pandas, Matplotlib, NumPy",
    link: "",
  },
  {
    name: "Skizox Coffee Shop",
    category: "Web Application",
    tools: "Python, Django, HTML, CSS, JavaScript",
    link: "",
  },
  {
    name: "Skizox Hotel Management",
    category: "Management System",
    tools: "Python, Django, SQL, HTML, CSS",
    link: "",
  },
  {
    name: 'AI Assistant "Maya"',
    category: "Artificial Intelligence",
    tools: "Python, NLP, API Integration",
    link: "",
  },
];

// One Piece project — link will be added later
const onePieceProject = {
  name: "One Piece",
  category: "Anime Fan Project",
  tools: "React, TypeScript, GSAP, CSS",
  description: "A tribute to the greatest pirate adventure ever told. 🏴‍☠️",
  link: "", // 👈 Add your project link here later
};

const Work = () => {
  useEffect(() => {
    let translateX: number = 0;

    function setTranslateX() {
      const box = document.getElementsByClassName("work-box");
      const workContainer = document.querySelector(".work-container");
      if (!workContainer || box.length === 0) return;

      const rectLeft = workContainer.getBoundingClientRect().left;
      const rect = box[0].getBoundingClientRect();
      const parentWidth = box[0].parentElement!.getBoundingClientRect().width;
      let padding: number =
        parseInt(window.getComputedStyle(box[0]).padding) / 2;
      translateX =
        rect.width * box.length - (rectLeft + parentWidth) + padding;
    }

    setTranslateX();
    let timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".work-section",
        start: "top top",
        end: `+=${translateX}`,
        scrub: true,
        pin: true,
        id: "work",
      },
    });

    timeline.to(".work-flex", {
      x: -translateX,
      ease: "none",
    });

    return () => {
      timeline.kill();
      ScrollTrigger.getById("work")?.kill();
    };
  }, []);

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          {/* Regular Projects */}
          {projects.map((project, index) => (
            <div className="work-box" key={index}>
              <div className="work-info">
                <div className="work-title">
                  <h3>0{index + 1}</h3>
                  <div>
                    <h4>{project.name}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <h4>Tools and features</h4>
                <p>{project.tools}</p>
              </div>
              <WorkImage image="/images/placeholder.webp" alt={project.name} />
            </div>
          ))}

          {/* One Piece Special Card */}
          <div className="work-box one-piece-box">
            <div className="one-piece-badge">🏴‍☠️ Coming Soon</div>
            <div className="work-info">
              <div className="work-title">
                <h3 className="one-piece-num">0{projects.length + 1}</h3>
                <div>
                  <h4 className="one-piece-title">{onePieceProject.name}</h4>
                  <p>{onePieceProject.category}</p>
                </div>
              </div>
              <h4>Tools and features</h4>
              <p>{onePieceProject.tools}</p>
              <p className="one-piece-desc">{onePieceProject.description}</p>
            </div>
            <div className="work-image one-piece-image-wrap">
              <div className="work-image-in">
                <img
                  src="/images/luffy.jpg"
                  alt="One Piece - Luffy"
                  className="one-piece-img"
                />
                {onePieceProject.link ? (
                  <a href={onePieceProject.link} target="_blank" rel="noreferrer">
                    <div className="work-link">↗</div>
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;
