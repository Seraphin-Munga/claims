import React, { ChangeEvent, FormEvent, useState } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { ConnectedProps, connect } from "react-redux";


import { ILogin } from "../../core/login";
import { login } from "../../redux/actions/auth.actions";
import Authentication from "../authentication";


type LoginFormProps = ConnectedProps<typeof connector>;

const Login: React.FC<LoginFormProps> = ({ login }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setEmail(value);
    validateEmail(value);
    validateForm();
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPassword(value);
    validateForm();
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);
    setIsEmailValid(isValid);
    setErrorMessage(isValid ? "" : "Invalid email format");
  };

  const validateForm = () => {
    setIsFormValid(
      email.trim() !== "" && password.trim() !== "" && isEmailValid
    );
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsModalOpen(true)
     
    // if (email.trim() === "" || password.trim() === "") {
    //   setErrorMessage("Please fill in all fields");
    //   return;
    // }
    // if (isFormValid) {
    //   const model: ILogin = {
    //     password: email,
    //     email: password,
    //   };
    //   login(model);
    //   navigate("/claim/add-new");
    // }
  };

  return (
    <>
      <section className="vh-100 gradient-custom">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div
                className="card bg-dark text-white"
                style={{ borderRadius: "1rem" }}
              >
                <div className="card-body p-5 text-center">
                  <div className="mb-md-5 mt-md-4 pb-5">
                    <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                    <p className="text-white-50 mb-5">
                      Please enter your login and password!
                    </p>
                    <form onSubmit={handleSubmit}>
                      <div className="form-outline form-white mb-4">
                        <input
                          type="email"
                          id="typeEmailX"
                          placeholder="Email"
                          className={`form-control form-control-lg ${
                            isEmailValid ? "" : "is-invalid"
                          }`}
                          value={email}
                          onChange={handleEmailChange}
                        />
                        {!isEmailValid && (
                          <div className="invalid-feedback">{errorMessage}</div>
                        )}
                      </div>
                      <div className="form-outline form-white mb-4">
                        <input
                          type="password"
                          id="typePasswordX"
                          placeholder="Password"
                          className="form-control form-control-lg"
                          value={password}
                          onChange={handlePasswordChange}
                        />
                      </div>
                      <p className="small mb-5 pb-lg-2">
                        <Link className="text-white-50" to={"/forgot-password"}>
                          Forgot password?
                        </Link>
                      </p>
                      {errorMessage && (
                        <div className="invalid-feedback">{errorMessage}</div>
                      )}
                      <button
                        className="btn btn-outline-light btn-lg px-5"
                        type="submit"
                        disabled={!isFormValid}
                      >
                        Login
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Authentication  isModalOpen={isModalOpen} />
      </section>
    </>
  );
};

const connector = connect(null, { login });

export default connector(Login);
