import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyPortfolios, deletePortfolio } from "../api/portfolioApi";

function Dashboard() {
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        const response = await getMyPortfolios();
        // Since getMyPortfolios returns response.data (which is { success, data }),
        // response.data holds the actual portfolios array.
        setPortfolios(response.data || response);
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to load portfolios list."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolios();
  }, []);

  const handleDelete = async (username, fullName) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete the portfolio for "${fullName}" (${username})? This action is permanent and cannot be undone.`
    );

    if (!confirmDelete) return;

    try {
      await deletePortfolio(username);
      setPortfolios((prev) => prev.filter((p) => p.username !== username));
      alert("Portfolio deleted successfully.");
    } catch (err) {
      alert(
        err.response?.data?.message || "Failed to delete the portfolio."
      );
    }
  };

  if (loading) {
    return <p className="center-message">Loading your dashboard...</p>;
  }

  if (error) {
    return (
      <div className="page-container">
        <div className="empty-state">
          <p className="eyebrow" style={{ background: "var(--danger-bg)", color: "var(--danger)" }}>
            Error
          </p>
          <h1>Could not load dashboard</h1>
          <p>{error}</p>
          <button className="primary-btn" onClick={() => window.location.reload()} style={{ marginTop: "20px" }}>
            Retry Now
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-heading-card">
        <p className="eyebrow">Account Hub</p>
        <h1>Manage your portfolios</h1>
        <p className="page-subtitle">
          View, edit, and maintain all portfolio pages associated with your developer profile.
        </p>
      </div>

      {portfolios.length === 0 ? (
        <div className="empty-state" style={{ textAlign: "center" }}>
          <h1>No Portfolios Yet</h1>
          <p>You haven't generated a developer portfolio website under this account yet.</p>
          <button
            className="primary-btn"
            onClick={() => navigate("/create")}
            style={{ marginTop: "24px" }}
          >
            Create Your First Portfolio
          </button>
        </div>
      ) : (
        <div className="dashboard-grid">
          {portfolios.map((portfolio) => (
            <div key={portfolio._id} className="dashboard-card">
              <span className="dashboard-theme-badge">
                {portfolio.theme?.replace("-", " ") || "Default"}
              </span>

              <div className="dashboard-card-header">
                <h3>{portfolio.fullName}</h3>
                <p className="dashboard-card-subtitle">{portfolio.title}</p>
              </div>

              <div className="dashboard-card-details">
                <div className="dashboard-meta-item">
                  <strong>URL Path:</strong> /portfolio/{portfolio.username}
                </div>
                <div className="dashboard-meta-item">
                  <strong>Skills:</strong> {portfolio.skills?.length || 0} skills added
                </div>
                <div className="dashboard-meta-item">
                  <strong>Projects:</strong> {portfolio.projects?.length || 0} projects added
                </div>
                <div className="dashboard-meta-item">
                  <strong>Created:</strong> {new Date(portfolio.createdAt).toLocaleDateString()}
                </div>
              </div>

              <div className="dashboard-actions">
                <button
                  className="dashboard-btn dashboard-btn-primary"
                  onClick={() => navigate(`/portfolio/${portfolio.username}`)}
                >
                  View
                </button>
                <button
                  className="dashboard-btn dashboard-btn-secondary"
                  onClick={() => navigate(`/edit/${portfolio.username}`)}
                >
                  Edit
                </button>
                <button
                  className="dashboard-btn dashboard-btn-danger"
                  onClick={() => handleDelete(portfolio.username, portfolio.fullName)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
