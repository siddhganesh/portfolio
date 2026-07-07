import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Higher Secondary (12th)</h4>
                <h5>Science Stream</h5>
              </div>
              <h3>2022</h3>
            </div>
            <p>
              Completed higher secondary education with a focus on science, building a strong analytical foundation that sparked my interest in technology and programming.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Bachelor of Computer Applications</h4>
                <h5>BCA — Completed</h5>
              </div>
              <h3>2022–26</h3>
            </div>
            <p>
              Completed BCA with a deep focus on Python backend development, web technologies, and data structures. Built multiple real-world projects including a stock market analyzer, a hotel management system, and an AI assistant.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Masters in Data Analysis</h4>
                <h5>Upcoming Goal</h5>
              </div>
              <h3>NEXT</h3>
            </div>
            <p>
              Planning to pursue a Master's degree with a specialization in Data Analysis — combining my Python skills with advanced data science, machine learning, and business intelligence tools.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
