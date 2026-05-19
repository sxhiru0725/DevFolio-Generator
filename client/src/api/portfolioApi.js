import axios from "axios";

const API_URL = "http://localhost:5000/api/portfolio";

export const createPortfolio = async (portfolioData) => {
    const response = await axios.post(API_URL, portfolioData);
    return response.data;
};

export const getPortfolio = async (username) => {
    const response = await axios.get(`${API_URL}/${username}`);
    return response.data;
};

export const updatePortfolio = async (username, portfolioData) => {
    const response = await axios.put(`${API_URL}/${username}`, portfolioData);
    return response.data;
};

export const deletePortfolio = async (username) => {
    const response = await axios.delete(`${API_URL}/${username}`);
    return response.data;
};