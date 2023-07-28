import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setFormData } from "../../redux/actions/DeceasedDetailsAction";
import { IDeceasedDetails } from "../../redux/types/DeceasedDetails";

interface ClearProps {
  isInput: boolean | false;
}

const DeceasedDetails: React.FC<ClearProps> = (ClearProps) => {
  const dispatch = useDispatch();
  const [deceasedSurname, setDeceasedSurname] = useState("");
  const [deceasedName, setDeceasedName] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [dateOfDeath, setDateOfDeath] = useState("");
  const [idType, setIdType] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [passportNumber, setPassportNumber] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [deceasedGender, setDeceasedGender] = useState("");
  const [deceasedRace, setDeceasedRace] = useState("");
  const [deceasedNationality, setDeceasedNationality] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [ageAtDeath, setAgeAtDeath] = useState("");
  const [deceasedOccupation, setDeceasedOccupation] = useState("");
  const [residentialAddress, setResidentialAddress] = useState("");
  const [postalAddress, setPostalAddress] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleDeceasedSurnameChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setDeceasedSurname(event.target.value);
  };

  const handleDeceasedNameChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setDeceasedName(event.target.value);
  };

  const handleMaritalStatusChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setMaritalStatus(event.target.value);
  };

  const handleDateOfDeathChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setDateOfDeath(event.target.value);
  };

  const handleIdTypeChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setIdType(event.target.value);
  };

  const handleIdNumberChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    const value = event.target.value;
    setIdNumber(event.target.value);

    if (value.length !== 13) {
      setErrorMessage("ID Number must be exactly 13 characters.");
    } else {
      setErrorMessage("");
    }
  };

  const handlePassportNumberChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setPassportNumber(event.target.value);
  };

  const handleLicenseNumberChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setLicenseNumber(event.target.value);
  };

  const handleDeceasedGenderChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setDeceasedGender(event.target.value);
  };

  const handleDeceasedRaceChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setDeceasedRace(event.target.value);
  };

  const handleDeceasedNationalityChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setDeceasedNationality(event.target.value);
  };

  const handleDateOfBirthChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setDateOfBirth(event.target.value);
  };

  const handleAgeAtDeathChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setAgeAtDeath(event.target.value);
  };

  const handleDeceasedOccupationChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setDeceasedOccupation(event.target.value);
  };

  const handleResidentialAddressChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setResidentialAddress(event.target.value);
  };

  const handlePostalAddressChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setPostalAddress(event.target.value);
  };

  useEffect(() => {
    if (ClearProps.isInput) {
      setDeceasedSurname("");
      setDeceasedName("");
      setMaritalStatus("");
      setDateOfDeath("");
      setIdType("");
      setIdNumber("");
      setPassportNumber("");
      setLicenseNumber("");
      setDeceasedGender("");
      setDeceasedRace("");
      setDeceasedNationality("");
      setDateOfBirth("");
      setAgeAtDeath("");
      setDeceasedOccupation("");
      setResidentialAddress("");
      setPostalAddress("");
    }
  }, [ClearProps.isInput]);

  useEffect(() => {
    const model: IDeceasedDetails = {
      deceasedSurname: deceasedSurname,
      deceasedName: deceasedName,
      maritalStatus: maritalStatus,
      deceasedDateOfDeath: dateOfDeath,
      deceasedIdType: idType,
      deceasedIdNumber: idNumber,
      deceasedPassportNumber: passportNumber,
      deceasedDlNumber: "",
      deceasedGender: deceasedGender,
      deceasedRace: deceasedRace,
      deceasedNationality: deceasedNationality,
      deceasedDateOfBirth: dateOfBirth,
      deceasedAgeAtDeath: ageAtDeath,
      deceasedOccupation: deceasedOccupation,
      deceasedResidentialAddress: residentialAddress,
      deceasedPostalAddress: postalAddress,
    };

    dispatch(setFormData(model));
  }, [
    deceasedSurname,
    deceasedName,
    maritalStatus,
    postalAddress,
    residentialAddress,
    deceasedOccupation,
    ageAtDeath,
    dateOfBirth,
    dateOfDeath,
    idType,
    idNumber,
    passportNumber,
    licenseNumber,
    deceasedGender,
    deceasedRace,
    deceasedNationality,
  ]);

  return (
    <>
      <div className="row">
        <div className="col-md-4 flex" id="frontdeceased_surname">
          <div className="form-group">
            <label htmlFor="deceased_surname">Deceased Surname</label>
            <input
              type="text"
              className="form-control"
              id="deceased_surname"
              required
              placeholder="Deceased Surname"
              value={deceasedSurname}
              onChange={handleDeceasedSurnameChange}
            />
          </div>
        </div>

        <div className="col-md-4 flex" id="frontdeceased_name">
          <div className="form-group">
            <label htmlFor="deceased_name">Deceased Name(s)</label>
            <input
              type="text"
              className="form-control"
              id="deceased_name"
              required
              placeholder="Deceased Name(s)"
              value={deceasedName}
              onChange={handleDeceasedNameChange}
            />
          </div>
        </div>

        <div className="col-md-4">
          <div className="form-group">
            <label htmlFor="marital_status">Marital Status</label>
            <select
              className="form-control"
              id="marital_status"
              value={maritalStatus}
              onChange={handleMaritalStatusChange}
            >
              <option value="">---------</option>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
              <option value="Divorced">Divorced</option>
              <option value="Widowed">Widowed</option>
            </select>
          </div>
        </div>

        <div className="col-md-4 flex">
          <div className="form-group">
            <label htmlFor="deceased_date_of_death">Date of Death</label>
            <input
              type="date"
              className="form-control"
              id="deceased_date_of_death"
              required
              placeholder="Date of Death"
              value={dateOfDeath}
              onChange={handleDateOfDeathChange}
            />
          </div>
        </div>

        <div className="col-md-4" id="frontdeceased_ID">
          <div className="form-group">
            <label htmlFor="deceased_id_type">Identification Type</label>
            <select
              className="form-control"
              id="deceased_id_type"
              value={idType}
              onChange={handleIdTypeChange}
            >
              <option value="">---------</option>
              <option value="idNumber">ID Number</option>
              <option value="passportNumber">Passport Number</option>
              <option value="licenseNumber">Driver's License Number</option>
            </select>
          </div>
        </div>

        {idType === "idNumber" && (
          <div className="col-md-4 flex" id="frontdeceased_ID_number">
            <div className="form-group">
              <label htmlFor="deceased_id_number">ID Number</label>
              <input
                type="number"
                className="form-control"
                id="deceased_id_number"
                placeholder="ID Number"
                value={idNumber}
                onChange={handleIdNumberChange}
              />
              {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            </div>
          </div>
        )}

        {idType === "passportNumber" && (
          <div className="col-md-4 flex" id="frontdeceased_passport">
            <div className="form-group">
              <label htmlFor="deceased_passport_number">Passport Number</label>
              <input
                type="text"
                className="form-control"
                id="deceased_passport_number"
                placeholder="Passport Number"
                value={passportNumber}
                onChange={handlePassportNumberChange}
              />
            </div>
          </div>
        )}

        {idType === "licenseNumber" && (
          <div className="col-md-4 flex" id="frontdeceased_dl">
            <div className="form-group">
              <label htmlFor="deceased_dl_number">
                Driver's License Number
              </label>
              <input
                type="text"
                className="form-control"
                id="deceased_dl_number"
                placeholder="Driver's License Number"
                value={licenseNumber}
                onChange={handleLicenseNumberChange}
              />
            </div>
          </div>
        )}

        <div className="col-md-4">
          <div className="form-group">
            <label htmlFor="deceased_gender">Deceased Gender</label>
            <select
              className="form-control"
              id="deceased_gender"
              value={deceasedGender}
              onChange={handleDeceasedGenderChange}
            >
              <option value="">---------</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
        </div>

        {/* <div className="col-md-4">
          <div className="form-group">
            <label htmlFor="deceased_race">Review Status</label>
            <select
              className="form-control"
              id="deceased_race"
              value={deceasedRace}
              onChange={handleDeceasedRaceChange}
            >
              <option value="">---------</option>
              <option value="Previously Paid">Previously Paid</option>
              <option value="Repudiated | Policy Lapsed">
                Repudiated | Policy Lapsed
              </option>
              <option value="Repudiated | Member Not Covered">
                Repudiated | Member Not Covered
              </option>
              <option value="Repudiated | Waiting Period">
                Repudiated | Waiting Period
              </option>
              <option value="Repudiated | Incorrect Information">
                Repudiated | Incorrect Information
              </option>
              <option value="Repudiated | No Beneficiary">
                Repudiated | No Beneficiary
              </option>
              <option value="Approved | Ready For Payment">
                Approved | Ready For Payment
              </option>
            </select>
          </div>
        </div> */}

        <div className="col-md-4">
          <div className="form-group">
            <label htmlFor="deceased_nationality">Deceased Nationality</label>
            <select
              className="form-control"
              id="deceased_nationality"
              value={deceasedNationality}
              onChange={handleDeceasedNationalityChange}
            >
              <option value="">---------</option>
              <option value="nationality1">Nationality 1</option>
              <option value="nationality2">Nationality 2</option>
              <option value="nationality3">Nationality 3</option>
            </select>
          </div>
        </div>

        <div className="col-md-4 flex">
          <div className="form-group">
            <label htmlFor="deceased_date_of_birth">
              Deceased Date of Birth
            </label>
            <input
              type="date"
              className="form-control"
              id="deceased_date_of_birth"
              required
              placeholder="Deceased Date of Birth"
              value={dateOfBirth}
              onChange={handleDateOfBirthChange}
            />
          </div>
        </div>

        <div className="col-md-4 flex">
          <div className="form-group">
            <label htmlFor="deceased_age_at_death">Deceased Age at Death</label>
            <input
              type="number"
              className="form-control"
              id="deceased_age_at_death"
              required
              placeholder="Deceased Age at Death"
              value={ageAtDeath}
              onChange={handleAgeAtDeathChange}
            />
          </div>
        </div>

        <div className="col-md-4">
          <div className="form-group">
            <label htmlFor="deceased_occupation">Deceased Occupation</label>
            <select
              className="form-control"
              id="deceased_occupation"
              value={deceasedOccupation}
              onChange={handleDeceasedOccupationChange}
            >
              <option value="">---------</option>
              <option value="occupation1">Occupation 1</option>
              <option value="occupation2">Occupation 2</option>
              <option value="occupation3">Occupation 3</option>
            </select>
          </div>
        </div>

        <div className="col-md-4 flex">
          <div className="form-group">
            <label htmlFor="deceased_residential_address">
              Deceased Residential Address
            </label>
            <input
              type="text"
              className="form-control"
              id="deceased_residential_address"
              required
              placeholder="Deceased Residential Address"
              value={residentialAddress}
              onChange={handleResidentialAddressChange}
            />
          </div>
        </div>

        <div className="col-md-4 flex">
          <div className="form-group">
            <label htmlFor="deceased_postal_address">
              Deceased Postal Address
            </label>
            <input
              type="text"
              className="form-control"
              id="deceased_postal_address"
              required
              placeholder="Deceased Postal Address"
              value={postalAddress}
              onChange={handlePostalAddressChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default DeceasedDetails;
