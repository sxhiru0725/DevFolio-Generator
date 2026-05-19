import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getPortfolio } from "../api/portfolioApi";

function PublicPortfolio() {
    const { username } = useParams();

    const [portfolio, setPortfolio] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const loadPortfolio = async () => {
            try {
                const response = await getPortfolio(username);

                // Works for both response formats:
                // 1. { success: true, data: portfolio }
                // 2. portfolio object directly
                if (response.data) {
                    setPortfolio(response.data);
                } else {
                    setPortfolio(response);
                }
            } catch (error) {
                setErrorMessage(
                    error.response?.data?.message || "Portfolio could not be loaded."
                );
            } finally {
                setLoading(false);
            }
        };

        loadPortfolio();
    }, [username]);

    if (loading) {
        return <p className="center-message">Loading portfolio...</p>;
    }

    if (errorMessage) {
        return <p className="center-message error-text">{errorMessage}</p>;
    }

    if (!portfolio) {
        return <p className="center-message error-text">No portfolio found.</p>;
    }

    return (
        <div className="public-portfolio">
            <header className="portfolio-header">
                {portfolio.profileImage && (
                    <img
                        src={portfolio.profileImage}
                        alt={portfolio.fullName}
                        className="profile-image"
                    />
                )}

                <h1>{portfolio.fullName}</h1>
                <h2>{portfolio.title}</h2>
                <p>{portfolio.bio}</p>

                <div className="portfolio-actions">
                    <Link to={`/edit/${portfolio.username}`} className="secondary-btn">
                        Edit Portfolio
                    </Link>
                </div>
            </header>

            <section className="portfolio-section">
                <h2>About Me</h2>
                <p>{portfolio.bio}</p>
            </section>

            <section className="portfolio-section">
                <h2>Skills</h2>

                <div className="skills-list">
                    {portfolio.skills && portfolio.skills.length > 0 ? (
                        portfolio.skills.map((skill, index) => (
                            <span key={index}>{skill}</span>
                        ))
                    ) : (
                        <p>No skills added yet.</p>
                    )}
                </div>
            </section>

            <section className="portfolio-section">
                <h2>Projects</h2>

                <div className="project-grid">
                    {portfolio.projects && portfolio.projects.length > 0 ? (
                        portfolio.projects.map((project, index) => (
                            <div className="project-card" key={index}>
                                <h3>{project.name}</h3>
                                <p>{project.description}</p>

                                <div className="skills-list">
                                    {project.techStack &&
                                        project.techStack.map((tech, techIndex) => (
                                            <span key={techIndex}>{tech}</span>
                                        ))}
                                </div>

                                <div className="project-links">
                                    {project.githubLink && (
                                        <a
                                            href={project.githubLink}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            GitHub
                                        </a>
                                    )}

                                    {project.liveDemo && (
                                        <a
                                            href={project.liveDemo}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
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

                {portfolio.experience && portfolio.experience.length > 0 ? (
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
                        <a
                            href={portfolio.contact.linkedin}
                            target="_blank"
                            rel="noreferrer"
                        >
                            LinkedIn
                        </a>
                    )}

                    {portfolio.contact?.github && (
                        <a
                            href={portfolio.contact.github}
                            target="_blank"
                            rel="noreferrer"
                        >
                            GitHub
                        </a>
                    )}

                    {portfolio.contact?.website && (
                        <a
                            href={portfolio.contact.website}
                            target="_blank"
                            rel="noreferrer"
                        >
                            Website
                        </a>
                    )}
                </div>
            </section>
        </div>
    );
}

export default PublicPortfolio;