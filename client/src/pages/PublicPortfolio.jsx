import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPortfolio } from "../api/portfolioApi";
import PortfolioDisplay from "../components/PortfolioDisplay";

function PublicPortfolio() {
  const { username } = useParams();

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
      <PortfolioDisplay portfolio={portfolio} showEdit={true} />
    </div>
  );
}

export default PublicPortfolio;
