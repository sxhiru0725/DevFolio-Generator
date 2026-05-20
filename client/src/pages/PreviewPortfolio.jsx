import { useLocation, useNavigate } from "react-router-dom";
import { createPortfolio } from "../api/portfolioApi";
import PortfolioDisplay from "../components/PortfolioDisplay";

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

      <PortfolioDisplay portfolio={portfolio} />
    </div>
  );
}

export default PreviewPortfolio;
