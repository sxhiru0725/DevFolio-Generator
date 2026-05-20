import { useLocation, useNavigate } from "react-router-dom";
import { createPortfolio } from "../api/portfolioApi";

function PreviewPortfolio() {
  const location = useLocation();
  const navigate = useNavigate();

  const portfolio = location.state?.portfolioData;

  const handlePublish = async () => {
    try {
      await createPortfolio(portfolio);
      navigate(`/portfolio/${portfolio.username}`);
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Something went wrong while publishing the portfolio."
      );
    }
  };

  if (!portfolio) {
    return (
      <div className="page-container">
        <div className="empty-state">
          <h1>No preview data found</h1>
          <p>Please create a portfolio first before previewing.</p>
          <button className="primary-btn" onClick={() => navigate("/create")}>
            Go to Create Portfolio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="public-portfolio">
      <div className="preview-banner">
        <div>
          <p className="eyebrow">Preview Mode</p>
          <h2>Review before publishing</h2>
          <p>This is how your public portfolio will look.</p>
        </div>

        <div className="preview-actions">
          <button className="secondary-btn" onClick={() => navigate("/create")}>
            Back to Edit
          </button>

          <button className="primary-btn" onClick={handlePublish}>
            Publish Portfolio
          </button>
        </div>
      </div>

      <PortfolioContent portfolio={portfolio} />
    </div>
  );
}

function PortfolioContent({ portfolio }) {
  return (
    <>
      <header className="portfolio-header">
        {portfolio.profileImage && (
          <img
            src={portfolio.profileImage}
            alt={portfolio.fullName}
            className="profile-image"
          />
        )}

        <p className="portfolio-badge">Available for opportunities</p>
        <h1>{portfolio.fullName}</h1>
        <h2>{portfolio.title}</h2>
        <p>{portfolio.bio}</p>

        <div className="portfolio-actions">
          {portfolio.resumeUrl && (
            <a
              href={portfolio.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="primary-btn"
            >
              View Resume
            </a>
          )}
        </div>
      </header>

      <section className="portfolio-section">
        <h2>About Me</h2>
        <p>{portfolio.bio}</p>
      </section>

      <section className="portfolio-section">
        <h2>Skills</h2>

        <div className="skills-list">
          {portfolio.skills?.length > 0 ? (
            portfolio.skills.map((skill, index) => <span key={index}>{skill}</span>)
          ) : (
            <p>No skills added yet.</p>
          )}
        </div>
      </section>

      <section className="portfolio-section">
        <h2>Projects</h2>

        <div className="project-grid">
          {portfolio.projects?.length > 0 ? (
            portfolio.projects.map((project, index) => (
              <div className="project-card" key={index}>
                <h3>{project.name}</h3>
                <p>{project.description}</p>

                <div className="skills-list">
                  {project.techStack?.map((tech, techIndex) => (
                    <span key={techIndex}>{tech}</span>
                  ))}
                </div>

                <div className="project-links">
                  {project.githubLink && (
                    <a href={project.githubLink} target="_blank" rel="noreferrer">
                      GitHub
                    </a>
                  )}

                  {project.liveDemo && (
                    <a href={project.liveDemo} target="_blank" rel="noreferrer">
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p>No projects added yet.</p>
          )}
        </div>
      </section>

      <section className="portfolio-section">
        <h2>Experience</h2>

        {portfolio.experience?.length > 0 ? (
          portfolio.experience.map((item, index) => (
            <div className="experience-card" key={index}>
              <h3>{item.role}</h3>
              <p>
                <strong>{item.company}</strong> | {item.duration}
              </p>
              <p>{item.description}</p>
            </div>
          ))
        ) : (
          <p>No experience added yet.</p>
        )}
      </section>

      <section className="portfolio-section contact-section">
        <h2>Contact</h2>

        {portfolio.contact?.email && <p>Email: {portfolio.contact.email}</p>}

        <div className="project-links">
          {portfolio.contact?.linkedin && (
            <a href={portfolio.contact.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          )}

          {portfolio.contact?.github && (
            <a href={portfolio.contact.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
          )}

          {portfolio.contact?.website && (
            <a href={portfolio.contact.website} target="_blank" rel="noreferrer">
              Website
            </a>
          )}
        </div>
      </section>
    </>
  );
}

export default PreviewPortfolio;
