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
            <h1>Create Your Portfolio</h1>
            <p className="page-subtitle">
                Fill out the form below. You can preview your portfolio before publishing it.
            </p>

            <PortfolioForm onSubmit={handlePreview} buttonText="Preview Portfolio" />
        </div>
    );
}

export default CreatePortfolio;