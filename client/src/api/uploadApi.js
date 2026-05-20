import axios from "axios";

const API_URL = "http://localhost:5000/api/upload";

export const uploadResumeFile = async (file) => {
  const formData = new FormData();
  formData.append("resume", file);

  const response = await axios.post(`${API_URL}/resume`, formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });

  return response.data;
};
