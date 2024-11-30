import React from "react";
import CertificateForm from "./CertificateForm";
import CertificateList from "./CertificateList";

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <CertificateForm />
      <CertificateList />
    </div>
  );
};

export default AdminDashboard;
