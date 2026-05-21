import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PortfolioForm from "../components/PortfolioForm";
import { getPortfolio, updatePortfolio } from "../api/portfolioApi";

function EditPortfolio() {
  const { username } = useParams();
  const navigate = useNavigate();

  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const loadPortfolio = async () => {
      try {
        const response = await getPortfolio(username);
        setPortfolio(response.data || response);
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

  const handleUpdate = async (formData) => {
    try {
      await updatePortfolio(username, formData);
      navigate(`/portfolio/${formData.username.toLowerCase().trim()}`);
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Something went wrong while updating the portfolio."
      );
    }
  };

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
    <div className="page-container">
      <div className="page-heading-card">
        <p className="eyebrow">Edit Portfolio</p>
        <h1>Update portfolio details</h1>
        <p className="page-subtitle">
          Make changes to your portfolio and save the latest version.
        </p>
      </div>

      <PortfolioForm
        initialData={portfolio}
        onSubmit={handleUpdate}
        buttonText="Save Changes"
      />
    </div>
  );
}

export default EditPortfolio;
