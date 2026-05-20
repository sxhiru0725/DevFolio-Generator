import { useNavigate } from "react-router-dom";
import PortfolioForm from "../components/PortfolioForm";

function CreatePortfolio() {
  const navigate = useNavigate();

  const handlePreview = (formData) => {
    navigate("/preview", {
      state: {
        portfolioData: formData,
      },
    });
  };

  return (
    <div className="page-container">
      <div className="page-heading-card">
        <p className="eyebrow">Create Portfolio</p>
        <h1>Build your developer portfolio</h1>
        <p className="page-subtitle">
          Complete the form below, preview your portfolio, then publish it with a
          unique public URL.
        </p>
      </div>

      <PortfolioForm onSubmit={handlePreview} buttonText="Preview Portfolio" />
    </div>
  );
}

export default CreatePortfolio;
