import { Link } from "react-router-dom";

function Home() {
  return (
    <main className="home-page">
      <section className="hero">
        <div className="hero-badge">MERN Portfolio Builder</div>

        <h1>Create a professional developer portfolio in minutes.</h1>

        <p>
          Build, preview, publish, and share a modern portfolio website using a
          simple form. Perfect for developers, students, and interns.
        </p>

        <div className="hero-actions">
          <Link to="/create" className="primary-btn">
            Create Portfolio
          </Link>

          <a href="#features" className="secondary-btn">
            View Features
          </a>
        </div>
      </section>

      <section className="feature-section" id="features">
        <div className="feature-card">
          <h3>Dynamic Forms</h3>
          <p>Add skills, projects, experience, links, and profile details.</p>
        </div>

        <div className="feature-card">
          <h3>Preview Before Publish</h3>
          <p>Review your portfolio layout before saving it to MongoDB.</p>
        </div>

        <div className="feature-card">
          <h3>Shareable URL</h3>
          <p>Each portfolio gets a unique public page using its username.</p>
        </div>
      </section>
    </main>
  );
}

export default Home;
