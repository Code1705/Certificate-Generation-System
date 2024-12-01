import React, { useEffect, useState } from "react";
import { getCertificates } from "../api/api";
import "../styles/list.css";

const CertificateList = () => {
  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const response = await getCertificates();
        // console.log(response.data);
        setCertificates(response.data);
      } catch (err) {
        console.error("Error fetching certificates:", err);
      }
    };

    fetchCertificates();
  }, []);

  return (
    <div className="certificate-list">
      <h2>Generated Certificates</h2>
      <ul>
        {certificates?.toReversed().map((cert, index) => (
          <li key={index}>
            <p>
              <strong>Name:</strong> {cert.name}
            </p>
            <p>
              <strong>Email:</strong> {cert.email}
            </p>
            <p>
              <strong>Generated On:</strong>{" "}
              {new Date(cert.issueDate).toDateString()}
            </p>
            <a href={cert.fileLink} target="_blank">
              View Certificate
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CertificateList;
