import { Link } from "react-router-dom";

function Home() {
  return (
    <main className="home-page">
      <section className="hero">
        <div className="hero-badge">MERN Portfolio Builder</div>

        <h1>Create a professional developer portfolio in minutes.</h1>

        <p>
          Build, preview, publish, edit, and share a modern developer portfolio.
          Users can manually fill the form or import details from a CV PDF.
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
          <h3>Manual or CV Import</h3>
          <p>Add details manually or upload a CV PDF to auto fill the form.</p>
        </div>

        <div className="feature-card">
          <h3>Preview Before Publish</h3>
          <p>Review the portfolio before saving it to MongoDB.</p>
        </div>

        <div className="feature-card">
          <h3>Bonus Features</h3>
          <p>Resume upload, theme toggle, project ordering, auth, and analytics.</p>
        </div>
      </section>
    </main>
  );
}

export default Home;
