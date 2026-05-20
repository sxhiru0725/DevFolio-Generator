import axios from "axios";

const API_URL = "http://localhost:5000/api/portfolio";

const getAuthHeader = () => {
  const user = JSON.parse(localStorage.getItem("devfolioUser") || "null");

  if (!user?.token) {
    return {};
  }

  return {
    Authorization: `Bearer ${user.token}`
  };
};

export const createPortfolio = async (portfolioData) => {
  const response = await axios.post(API_URL, portfolioData, {
    headers: getAuthHeader()
  });

  return response.data;
};

export const getPortfolio = async (username) => {
  const response = await axios.get(`${API_URL}/${username}`);
  return response.data;
};

export const updatePortfolio = async (username, portfolioData) => {
  const response = await axios.put(`${API_URL}/${username}`, portfolioData, {
    headers: getAuthHeader()
  });

  return response.data;
};

export const deletePortfolio = async (username) => {
  const response = await axios.delete(`${API_URL}/${username}`, {
    headers: getAuthHeader()
  });

  return response.data;
};

export const getMyPortfolios = async () => {
  const response = await axios.get(`${API_URL}/me/list`, {
    headers: getAuthHeader()
  });

  return response.data;
};
