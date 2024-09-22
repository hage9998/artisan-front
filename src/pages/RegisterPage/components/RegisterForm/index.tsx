import React, { useState } from "react";
import registerService from "../../service/registerService";

const REGISTER_FORM_STYLES = {
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
    marginBottom: "10px",
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
  submit: "Sign up",
  name: "name",
  goToLogin: "Sign in",
};

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await registerService.signUp(email, password, name);

      window.location.href = "/login";
    } catch (error) {
      alert("E-mail not available");
    }
  };

  return (
    <form style={REGISTER_FORM_STYLES.form} onSubmit={handleRegister}>
      <div style={REGISTER_FORM_STYLES.formGroup}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder={FORM_LABELS.name}
          style={REGISTER_FORM_STYLES.input}
          onFocus={(e) =>
            (e.target.style.borderColor =
              REGISTER_FORM_STYLES.inputFocus.borderColor)
          }
          onBlur={(e) => (e.target.style.borderColor = "#ccc")}
        />
      </div>
      <div style={REGISTER_FORM_STYLES.formGroup}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder={FORM_LABELS.email}
          style={REGISTER_FORM_STYLES.input}
          onFocus={(e) =>
            (e.target.style.borderColor =
              REGISTER_FORM_STYLES.inputFocus.borderColor)
          }
          onBlur={(e) => (e.target.style.borderColor = "#ccc")}
        />
      </div>
      <div style={REGISTER_FORM_STYLES.formGroup}>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder={FORM_LABELS.password}
          style={REGISTER_FORM_STYLES.input}
          onFocus={(e) =>
            (e.target.style.borderColor =
              REGISTER_FORM_STYLES.inputFocus.borderColor)
          }
          onBlur={(e) => (e.target.style.borderColor = "#ccc")}
        />
      </div>
      <button
        type="submit"
        style={REGISTER_FORM_STYLES.button}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor =
            REGISTER_FORM_STYLES.buttonHover.backgroundColor)
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = "#007bff")
        }
      >
        {FORM_LABELS.submit}
      </button>
      <button
        type="button"
        style={REGISTER_FORM_STYLES.button}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor =
            REGISTER_FORM_STYLES.buttonHover.backgroundColor)
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = "#007bff")
        }
        onClick={() => (window.location.href = "/login")}
      >
        {FORM_LABELS.goToLogin}
      </button>
    </form>
  );
};

export default RegisterForm;
