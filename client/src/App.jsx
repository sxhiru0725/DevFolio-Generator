import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CreatePortfolio from "./pages/CreatePortfolio";
import PublicPortfolio from "./pages/PublicPortfolio";
import EditPortfolio from "./pages/EditPortfolio";
import PreviewPortfolio from "./pages/PreviewPortfolio";
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreatePortfolio />} />
        <Route path="/preview" element={<PreviewPortfolio />} />
        <Route path="/portfolio/:username" element={<PublicPortfolio />} />
        <Route path="/edit/:username" element={<EditPortfolio />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
