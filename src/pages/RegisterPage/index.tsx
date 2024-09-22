import React from "react";
import RegisterForm from "./components/RegisterForm";

const REGISTER_PAGE_STYLES = {
  container: {
    maxWidth: "400px",
    minWidth: "300px",
    margin: "auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#f9f9f9",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
  },
} as const;

const RegisterPage = () => {
  return (
    <div style={REGISTER_PAGE_STYLES.container}>
      <h2 style={REGISTER_PAGE_STYLES.heading}>Sign Up</h2>
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
