import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import {
  createClaimant,
  fetchClaimants,
} from "../redux/actions/ClaimantActions";
interface modelProps {
  isModalOpen: boolean | false;
}
type AppDispatch = ThunkDispatch<any, unknown, AnyAction>;
const ClaimantCreate: React.FC<modelProps> = (modelProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isModalOpen, setIsModalOpen] = useState(modelProps.isModalOpen);
  const [claimant, setClaimant] = useState({
    name_of_claimant: "",
    surname_of_claimant: "",
    id_type: "none",
    id_of_claimant: "",
    passport: "",
    date_of_birth: "",
    gender: "",
    birth_country: "",
    residence_country: "",
    contact_number: "",
    address: "",
  });

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    setClaimant({
      ...claimant,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // Perform form submission or other actions
    console.log(claimant);
  };

  const handleIdTypeChange = (e: { target: { value: any } }) => {
    const selectedIdType = e.target.value;
    setClaimant({
      ...claimant,
      id_type: selectedIdType,
    });
  };

  const handleOk = () => {
    const model = {
      name_of_claimant: claimant.name_of_claimant,
      surname_of_claimant: claimant.surname_of_claimant,
      id_type: "none",
      id_of_claimant: claimant.id_of_claimant,
      passport: claimant.passport,
      date_of_birth: claimant.date_of_birth,
      gender: claimant.gender,
      birth_country: claimant.birth_country,
      residence_country: claimant.residence_country,
      contact_number: claimant.contact_number,
      address: claimant.address,
    };

    dispatch(createClaimant(model));
    dispatch(fetchClaimants());

    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    setIsModalOpen(modelProps.isModalOpen);
  }, [modelProps.isModalOpen]);

  const showIdTypeFields = () => {
    const { id_type } = claimant;
    if (id_type === "1") {
      return (
        <div className="col-md-4" id="rsa-id-type">
          <div className="form-group">
            <input
              type="text"
              value={claimant.id_of_claimant}
              onChange={handleInputChange}
              className="form-control"
              id="floatingID"
              name="id_of_claimant"
              placeholder="ID Number"
            />
            <label htmlFor="floatingID">ID Number</label>
          </div>
        </div>
      );
    } else if (id_type === "2") {
      return (
        <div className="col-md-4" id="passport-id-type">
          <div className="form-group">
            <input
              type="text"
              value={claimant.passport}
              onChange={handleInputChange}
              required
              className="form-control"
              id="floatingpass"
              name="passport"
              placeholder="Passport"
            />
            <label htmlFor="floatingpass">Passport</label>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <Modal visible={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      <div>
        <div className="card-body">
          <h5 className="card-title" style={{ color: "#01AAAB" }}>
            Add a new claimant
          </h5>

          <p></p>

          <form className="row g-3" onSubmit={handleSubmit} noValidate>
            <div className="col-md-4">
              <label htmlFor="floatingfullnames">Full Name(s)</label>
              <div className="form-group">
                <input
                  type="text"
                  value={claimant.name_of_claimant}
                  onChange={handleInputChange}
                  required
                  className="form-control"
                  id="floatingfullnames"
                  name="name_of_claimant"
                  placeholder="Full Name(s)"
                />

                <div style={{ color: "red" }}></div>
              </div>
            </div>

            <div className="col-md-4">
              <label htmlFor="floatingPassword">Surname</label>
              <div className="form-group">
                <input
                  type="text"
                  value={claimant.surname_of_claimant}
                  onChange={handleInputChange}
                  required
                  className="form-control"
                  id="floatingPassword"
                  name="surname_of_claimant"
                  placeholder="Surname"
                />

                <div style={{ color: "red" }}></div>
              </div>
            </div>

            <div className="col-md-4">
              <label htmlFor="floatingidtype" style={{ color: "#01AAAB" }}>
                Identification Type
              </label>
              <div className="form-group">
                <select
                  className="form-select"
                  id="floatingidtype"
                  onChange={handleIdTypeChange}
                  value={claimant.id_type}
                  aria-label=""
                >
                  <option value="none">--------</option>
                  <option value="1">RSA ID</option>
                  <option value="2">Passport</option>
                </select>
              </div>
            </div>

            {showIdTypeFields()}

            <div className="col-md-4">
              <label htmlFor="floatingdateob">Date of birth</label>
              <div className="form-group">
                <input
                  type="date"
                  value={claimant.date_of_birth}
                  onChange={handleInputChange}
                  required
                  className="form-control"
                  id="floatingdateob"
                  name="date_of_birth"
                  placeholder="Date of birth"
                />
              </div>
            </div>

            <div className="col-md-4">
              <label htmlFor="floatingGender" style={{ color: "#01AAAB" }}>
                Gender
              </label>
              <div className="form-group">
                <select
                  className="form-select"
                  id="floatingGender"
                  name="gender"
                  value={claimant.gender}
                  onChange={handleInputChange}
                  aria-label="Gender"
                >
                  <option value="">---------</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>

            <div className="col-md-4 flex">
              <div>
                <label htmlFor="floatingsource">Country of Birth</label>
                <select
                  name="birth_country"
                  className="form-control"
                  id="id_birth_country"
                  value={claimant.birth_country}
                  onChange={handleInputChange}
                >
                  <option value="">---------</option>
                  <option value="AF">Afghanistan</option>
                  <option value="AX">Åland Islands</option>
                  <option value="AL">Albania</option>
                  <option value="DZ">Algeria</option>
                </select>
                <div style={{ color: "red" }}></div>
              </div>
            </div>

            <div className="col-md-4 flex">
              <div>
                <label htmlFor="floatingsource">Country of Residence</label>
                <select
                  name="residence_country"
                  className="form-control"
                  id="id_residence_country"
                  value={claimant.residence_country}
                  onChange={handleInputChange}
                >
                  <option value="">---------</option>
                  <option value="AF">Afghanistan</option>
                  <option value="AX">Åland Islands</option>
                  <option value="AL">Albania</option>
                  <option value="DZ">Algeria</option>
                  <option value="AS">American Samoa</option>
                </select>
                <div style={{ color: "red" }}></div>
              </div>
            </div>

            <div className="col-md-4">
              <label htmlFor="floatingcontact">Phone Number</label>
              <div className="form-group">
                <input
                  type="text"
                  value={claimant.contact_number}
                  onChange={handleInputChange}
                  required
                  className="form-control"
                  id="floatingcontact"
                  name="contact_number"
                  placeholder="Phone Number"
                />

                <div style={{ color: "red" }}></div>
              </div>
            </div>

            <div className="col-6">
              <label htmlFor="floatingaddress">Home Address</label>
              <div className="form-group">
                <input
                  type="text"
                  value={claimant.address}
                  onChange={handleInputChange}
                  required
                  className="form-control"
                  id="floatingaddress"
                  name="address"
                  placeholder="Home Address"
                />

                <div style={{ color: "red" }}></div>
              </div>
            </div>

            {/* <div className="col-12">
              <button
                className="btn"
                style={{
                  backgroundColor: "#01AAAD",
                  color: "white",
                }}
                type="submit"
              >
                Save
              </button>
            </div> */}
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default ClaimantCreate;
