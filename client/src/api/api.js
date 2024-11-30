import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const createCertificate = async (certificateData) => {
  return await axios.post(
    `${BASE_URL}/api/certificates/create/`,
    certificateData
  );
};

export const getCertificates = async () => {
  return await axios.get(`${BASE_URL}/api/certificates/get/`);
};
