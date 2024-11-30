import React, { useState } from "react";
import { createCertificate } from "../api/api";
import '../styles/form.css';

const CertificateForm = () => {
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [date, setDate] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await createCertificate({ name, course, date, email });
      alert("Certificate Generated Successfully!");
      setName("");
      setCourse("");
      setDate("");
      setEmail("");
    } catch (err) {
      alert("Error generating certificate. Please try again.");
    } finally {
      setLoading(false);
      window.location.reload();
    }
  };

  return (
    <form className="certificate-form" onSubmit={handleSubmit}>
      <h2>Generate Certificate</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Course"
        value={course}
        onChange={(e) => setCourse(e.target.value)}
        required
      />
      <input
        type="date"
        placeholder="Date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? "Generating..." : "Generate Certificate"}
      </button>
    </form>
  );
};

export default CertificateForm;
