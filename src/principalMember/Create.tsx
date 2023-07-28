import React, { useEffect, useState } from "react";
import { Button, Modal } from "antd";
import { useDispatch } from "react-redux";
import { IPrincipalMemember } from "../redux/types/principalMember";
import {
  createPrincipalMember,
  fetchPrincipalMembers,
  setMember,
} from "../redux/actions/PrincipalMemberAction";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

interface modelProps {
  isModalOpen: boolean | false;
}
type AppDispatch = ThunkDispatch<any, unknown, AnyAction>;

const PrincipalMember: React.FC<modelProps> = (modelProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [idNumberError, setIdNumberError] = useState(""); // State to hold ID number validation error

  const [isModalOpen, setIsModalOpen] = useState(modelProps.isModalOpen);
  const [inputValues, setInputValues] = useState({
    full_names: "",
    surname: "",
    country: "none",
    id_number: "",
    passport: "",
    date_of_birth: "",
    gender: "",
    residence_country: "",
    birth_country: "",
    risk_status: "",
    termination_date: "",
    contact_number: "",
    address: "",
  });

  const handleOk = () => {
    setIsModalOpen(false);
    const model: IPrincipalMemember = {
      full_names: inputValues.full_names,
      surname: inputValues.surname,
      country: "none",
      residence_country: inputValues.residence_country,
      id_number: inputValues.id_number,
      passport: inputValues.passport,
      date_of_birth: inputValues.date_of_birth,
      gender: inputValues.gender,

      birth_country: inputValues.birth_country,
      risk_status: inputValues.risk_status,
      termination_date: inputValues.termination_date,
      contact_number: inputValues.contact_number,
      address: inputValues.address,
    };

    dispatch(createPrincipalMember(model));
    dispatch(fetchPrincipalMembers());

    // dispatch(setMember(model));

    setInputValues({
      full_names: "",
      surname: "",
      country: "none",
      id_number: "",
      passport: "",
      date_of_birth: "",
      gender: "",
      residence_country: "",
      birth_country: "",
      risk_status: "",
      termination_date: "",
      contact_number: "",
      address: "",
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;

    // Validate ID number input to accept only numbers and 13 characters
    if (name === "id_number") {
      const onlyNumbers = value.replace(/[^\d]/g, ""); // Remove non-numeric characters
      const limitedValue = onlyNumbers.substr(0, 13); // Limit to 13 characters

      // Check if the ID number is exactly 13 characters
      if (limitedValue.length !== 13) {
        setIdNumberError("ID number must be exactly 13 characters.");
      } else {
        setIdNumberError(""); // Clear the error message if the ID number is valid
      }

      setInputValues((prevValues) => ({
        ...prevValues,
        [name]: limitedValue,
      }));
    } else {
      setInputValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    }
  };

  useEffect(() => {
    setIsModalOpen(modelProps.isModalOpen);
  }, [modelProps.isModalOpen]);

  return (
    <>
      <Modal visible={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Add a new principal member</h5>
            <p></p>

            <form className="row g-3" id="member-form">
              <input
                type="hidden"
                name="csrfmiddlewaretoken"
                value="zUtjrTyQPVKQwNW9nO3vHAAy1e4zoaxfFgiWjP1d7j3leI1RzcqRtwNhCNJlJfop"
              />

              <div className="col-md-4">
                <div className="form-group">
                  <label>Full Name(s)</label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    id="floatingfullnames"
                    name="full_names"
                    value={inputValues.full_names}
                    placeholder="Full Name(s)"
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="col-md-4">
                <div className="form-group">
                  <label>Surname</label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    id="floatingPassword"
                    name="surname"
                    value={inputValues.surname}
                    placeholder="Surname"
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="col-md-4">
                <div className="form-group">
                  <label>Country</label>
                  <select
                    className="form-control"
                    name="country"
                    id="country"
                    value={inputValues.country}
                    onChange={handleInputChange}
                  >
                    <option value="none">--------</option>
                    <option value="1">RSA ID</option>
                    <option value="2">Passport</option>
                  </select>
                </div>
              </div>

              <div
                className={`col-md-4 ${idNumberError ? "has-error" : ""}`}
                id="rsa-id-type"
                style={{
                  display: inputValues.country === "1" ? "block" : "none",
                }}
              >
                <div className="form-group">
                  <label>ID Number</label>
                  <input
                    type="number"
                    value={inputValues.id_number}
                    max={13}
                    required
                    className="form-control"
                    id="floatingID"
                    name="id_number"
                    placeholder="ID Number"
                    onChange={handleInputChange}
                  />
                  {idNumberError && (
                    <span style={{color:"red"}} className="help-block">{idNumberError}</span>
                  )}
                </div>
              </div>

              <div
                className="col-md-4"
                id="passport-id-type"
                style={{
                  display: inputValues.country === "2" ? "block" : "none",
                }}
              >
                <div className="form-group">
                  <label>Passport</label>
                  <input
                    type="text"
                    value={inputValues.passport}
                    required
                    className="form-control"
                    id="floatingpass"
                    name="passport"
                    placeholder="Passport"
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="col-md-4">
                <div className="form-group">
                  <label>Date of Birth</label>
                  <input
                    type="date"
                    value={inputValues.date_of_birth}
                    required
                    className="form-control"
                    id="floatingdateob"
                    name="date_of_birth"
                    placeholder="Date of Birth"
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="col-md-4">
                <div className="form-group">
                  <label>Gender</label>
                  <select
                    className="form-control"
                    id="floatingGender"
                    name="gender"
                    value={inputValues.gender}
                    onChange={handleInputChange}
                  >
                    <option value="" disabled>
                      ---------
                    </option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
              </div>

              <div className="col-md-4">
                <div className="form-group">
                  <label>Country of Birth</label>
                  <select
                    name="birth_country"
                    className="form-control"
                    id="id_birth_country"
                    value={inputValues.birth_country}
                    onChange={handleInputChange}
                  >
                    <option value="" disabled>
                      ---------
                    </option>
                    <option value="AF">Afghanistan</option>
                    <option value="AX">Åland Islands</option>
                    <option value="AL">Albania</option>
                    <option value="DZ">Algeria</option>
                    <option value="AS">American Samoa</option>
                    <option value="AD">Andorra</option>
                    <option value="AO">Angola</option>
                    <option value="AI">Anguilla</option>
                    <option value="AQ">Antarctica</option>
                  </select>
                </div>
              </div>

              <div className="col-md-4">
                <div className="form-group">
                  <label>Residence Country</label>
                  <select
                    name="residence_country"
                    className="form-control"
                    id="residence_country"
                    value={inputValues.residence_country}
                    onChange={handleInputChange}
                  >
                    <option value="" disabled>
                      ---------
                    </option>
                    <option value="AF">Afghanistan</option>
                    <option value="AX">Åland Islands</option>
                    <option value="AL">Albania</option>
                    <option value="DZ">Algeria</option>
                    <option value="AS">American Samoa</option>
                    <option value="AD">Andorra</option>
                    <option value="AO">Angola</option>
                    <option value="AI">Anguilla</option>
                    <option value="AQ">Antarctica</option>
                  </select>
                </div>
              </div>

              <div className="col-md-4">
                <div className="form-group">
                  <label>Risk Status</label>
                  <select
                    className="form-control"
                    id="floatingRisk"
                    name="risk_status"
                    value={inputValues.risk_status}
                    onChange={handleInputChange}
                  >
                    <option value="" disabled>
                      ---------
                    </option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div
                className="col-md-4"
                id="termination-id-type"
                style={{
                  display:
                    inputValues.risk_status === "Inactive" ? "block" : "none",
                }}
              >
                <div className="form-group">
                  <label>Termination Date</label>
                  <input
                    type="date"
                    required
                    className="form-control"
                    id="floatingtermdate"
                    name="termination_date"
                    value={inputValues.termination_date}
                    placeholder="Termination Date"
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="col-md-4">
                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    type="text"
                    className="form-control"
                    id="floatingcontact"
                    name="contact_number"
                    value={inputValues.contact_number}
                    placeholder="Phone Number"
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="col-6">
                <div className="form-group">
                  <label>Home Address</label>
                  <input
                    type="text"
                    className="form-control"
                    id="floatingaddress"
                    value={inputValues.address}
                    name="address"
                    placeholder="Home Address"
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default PrincipalMember;
