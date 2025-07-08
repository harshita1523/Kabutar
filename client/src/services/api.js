import axios from "axios";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

export const sendEmail = async (formData) => {
  await axios.post(`${baseUrl}/api/send-email`, formData);
};
