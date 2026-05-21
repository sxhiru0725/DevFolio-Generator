import { useNavigate, useLocation } from "react-router-dom";
import PortfolioForm from "../components/PortfolioForm";

function CreatePortfolio() {
  const navigate = useNavigate();
  const location = useLocation();

  const initialData = location.state?.portfolioData;

  const handlePreview = (formData) => {
    navigate("/preview", {
      state: {
        portfolioData: formData
      }
    });
  };

  return (
    <div className="page-container">
      <div className="page-heading-card">
        <p className="eyebrow">Create Portfolio</p>
        <h1>Build your developer portfolio</h1>
        <p className="page-subtitle">
          Fill the form manually or import a CV. You can preview and edit before
          publishing.
        </p>
      </div>

      <PortfolioForm
        initialData={initialData}
        onSubmit={handlePreview}
        buttonText="Preview Portfolio"
      />
    </div>
  );
}

export default CreatePortfolio;
