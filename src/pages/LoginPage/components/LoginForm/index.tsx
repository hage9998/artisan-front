import React, { useState } from "react";
import authService from "../../service/authService";

const LOGIN_FORM_STYLES = {
  form: {
    display: "flex",
    flexDirection: "column",
  },
  formGroup: {
    marginBottom: "15px",
  },
  label: {
    marginBottom: "5px",
    marginRight: "5px",
    fontWeight: "bold",
  },
  input: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    transition: "border-color 0.2s",
  },
  inputFocus: {
    borderColor: "#007bff",
    outline: "none",
  },
  button: {
    padding: "10px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "background-color 0.2s",
  },
  buttonHover: {
    backgroundColor: "#0056b3",
  },
} as const;

const FORM_LABELS = {
  email: "E-mail",
  password: "password",
  submit: "Sign in",
};

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const data = await authService.loginIn(email, password);
      sessionStorage.setItem("authToken", data.accessToken);
      sessionStorage.setItem("userId", data.userId);

      window.location.href = "/";
    } catch (error) {
      alert("Email or password incorrect");
    }
  };

  return (
    <form style={LOGIN_FORM_STYLES.form} onSubmit={handleLogin}>
      <div style={LOGIN_FORM_STYLES.formGroup}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder={FORM_LABELS.email}
          style={LOGIN_FORM_STYLES.input}
          onFocus={(e) =>
            (e.target.style.borderColor =
              LOGIN_FORM_STYLES.inputFocus.borderColor)
          }
          onBlur={(e) => (e.target.style.borderColor = "#ccc")}
        />
      </div>
      <div style={LOGIN_FORM_STYLES.formGroup}>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder={FORM_LABELS.password}
          style={LOGIN_FORM_STYLES.input}
          onFocus={(e) =>
            (e.target.style.borderColor =
              LOGIN_FORM_STYLES.inputFocus.borderColor)
          }
          onBlur={(e) => (e.target.style.borderColor = "#ccc")}
        />
      </div>
      <button
        type="submit"
        style={LOGIN_FORM_STYLES.button}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor =
            LOGIN_FORM_STYLES.buttonHover.backgroundColor)
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = "#007bff")
        }
      >
        {FORM_LABELS.submit}
      </button>
    </form>
  );
};

export default LoginForm;
