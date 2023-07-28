import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { IEventDetail } from "../../redux/types/EventDetail";
import { setEventDetail } from "../../redux/actions/EventDetailAction";
interface ClearProps {
  isInput: boolean | false;
}
const EventDetail: React.FC<ClearProps> = (ClearProps) => {
  const dispatch = useDispatch();
  const [sourceOfFunds, setSourceOfFunds] = useState("");
  const [taxReference, setTaxReference] = useState("");
  const [natureOfIncome, setNatureOfIncome] = useState("");
  const [placeOfDeath, setPlaceOfDeath] = useState("");
  const [nameOfHospital, setNameOfHospital] = useState("");
  const [drNursePathologist, setDrNursePathologist] = useState("");
  const [
    drNursePathologistPracticeNumber,
    setDrNursePathologistPracticeNumber,
  ] = useState("");
  const [funeralParlour, setFuneralParlour] = useState("");
  const [chiefsName, setChiefsName] = useState("");
  const [chiefsPhoneNumber, setChiefsPhoneNumber] = useState("");
  const [dha1663, setDHA1663] = useState("");
  const [dha1680, setDHA1680] = useState("");
  const [deathCertificateIssuedByUser, setDeathCertificateIssuedByUser] =
    useState("");
  const [haThatIssuedDeathCertificate, setHAThatIssuedDeathCertificate] =
    useState("");

  const handleSourceOfFundsChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSourceOfFunds(event.target.value);
  };

  const handleTaxReferenceChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setTaxReference(event.target.value);
  };

  const handleNatureOfIncomeChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setNatureOfIncome(event.target.value);
  };

  const handlePlaceOfDeathChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setPlaceOfDeath(event.target.value);
  };

  const handleNameOfHospitalChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setNameOfHospital(event.target.value);
  };

  const handleDrNursePathologistChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setDrNursePathologist(event.target.value);
  };

  const handleDrNursePathologistPracticeNumberChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setDrNursePathologistPracticeNumber(event.target.value);
  };

  const handleFuneralParlourChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setFuneralParlour(event.target.value);
  };

  const handleChiefsNameChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setChiefsName(event.target.value);
  };

  const handleChiefsPhoneNumberChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setChiefsPhoneNumber(event.target.value);
  };

  const handleDHA1663Change = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setDHA1663(event.target.value);
  };

  const handleDHA1680Change = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setDHA1680(event.target.value);
  };

  const handleDeathCertificateIssuedByUserChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setDeathCertificateIssuedByUser(event.target.value);
  };

  const handleHAThatIssuedDeathCertificateChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setHAThatIssuedDeathCertificate(event.target.value);
  };

  useEffect(() => {
    if (ClearProps.isInput) {
      setSourceOfFunds("");
      setTaxReference("");
      setNatureOfIncome("");
      setPlaceOfDeath("");
      setNameOfHospital("");
      setDrNursePathologist("");
    }
  }, [ClearProps.isInput]);

  useEffect(() => {
    const model: IEventDetail = {
      sourceOfFunds: sourceOfFunds,
      taxReference: taxReference,
      natureOfIncome: natureOfIncome,
      placeOfDeath: placeOfDeath,
      nameOfHospital: nameOfHospital,
      drNursePathologist: drNursePathologist,
      drNursePathologistPracticeNumber: drNursePathologistPracticeNumber,
      funeralParlour: funeralParlour,
      chiefsName: chiefsName,
      chiefsPhoneNumber: chiefsPhoneNumber,
      dha1663: dha1663,
      dha1680: dha1680,
      deathCertificateIssuedByUser: deathCertificateIssuedByUser,
      haThatIssuedDeathCertificate: haThatIssuedDeathCertificate,
    };

    dispatch(setEventDetail(model));
  }, [
    sourceOfFunds,
    taxReference,
    haThatIssuedDeathCertificate,
    natureOfIncome,
    dha1680,
    deathCertificateIssuedByUser,
    nameOfHospital,
    drNursePathologist,
    drNursePathologistPracticeNumber,
    funeralParlour,
    chiefsName,
    chiefsPhoneNumber,
    dha1663,
  ]);

  return (
    <div className="row">
      <div className="col-md-4 flex">
        <div className="form-group">
          <label htmlFor="floatingsource">Source of Funds(opt)</label>
          <input
            type="text"
            required
            className="form-control"
            id="floatingsource"
            name="source_of_funds"
            placeholder="Source of Funds(opt)"
            value={sourceOfFunds}
            onChange={handleSourceOfFundsChange}
          />
          <div style={{ color: "red" }}></div>
        </div>
      </div>

      <div className="col-md-4 flex">
        <div className="form-group">
          <label htmlFor="floatingtaxref">Tax Reference(opt)</label>
          <input
            type="text"
            required
            className="form-control"
            id="floatingtaxref"
            name="tax_ref"
            placeholder="Tax Reference(opt)"
            value={taxReference}
            onChange={handleTaxReferenceChange}
          />
          <div style={{ color: "red" }}></div>
        </div>
      </div>

      <div className="col-md-4 flex">
        <div className="form-group">
          <label htmlFor="floatingnaturef">Nature of Income(opt)</label>
          <input
            type="text"
            required
            className="form-control"
            id="floatingnaturef"
            name="nature_of_income"
            placeholder="Nature of Income(opt)"
            value={natureOfIncome}
            onChange={handleNatureOfIncomeChange}
          />
          <div style={{ color: "red" }}></div>
        </div>
      </div>

      <div className="col-md-4 flex">
        <div className="form-group">
          <label htmlFor="floatingplacedeath">Place of Death</label>
          <input
            type="text"
            required
            className="form-control"
            id="floatingplacedeath"
            name="place_of_death"
            placeholder="Place of Death"
            value={placeOfDeath}
            onChange={handlePlaceOfDeathChange}
          />
          <div style={{ color: "red" }}></div>
        </div>
      </div>

      <div className="col-md-4 flex">
        <div className="form-group">
          <label htmlFor="floatinghospital">Name of Hospital</label>
          <input
            type="text"
            required
            className="form-control"
            id="floatinghospital"
            name="name_of_hospital"
            placeholder="Name of Hospital"
            value={nameOfHospital}
            onChange={handleNameOfHospitalChange}
          />
          <div style={{ color: "red" }}></div>
        </div>
      </div>

      <div className="col-md-4 flex">
        <div className="form-group">
          <label htmlFor="floatingdrname">Name of Dr/Nurse/Pathologist</label>
          <input
            type="text"
            required
            className="form-control"
            id="floatingdrname"
            name="dr_Pathologist_nurse_name"
            placeholder="Name of Dr/Nurse/Pathologist"
            value={drNursePathologist}
            onChange={handleDrNursePathologistChange}
          />
          <div style={{ color: "red" }}></div>
        </div>
      </div>

      <div className="col-md-4 flex">
        <div className="form-group">
          <label htmlFor="floatingdrnumber">
            Dr/Nurse/Pathologist Practice Number
          </label>
          <input
            type="text"
            required
            className="form-control"
            id="floatingdrnumber"
            name="doctor_practice_umber"
            placeholder="Dr/Nurse/Pathologist Practice Number"
            value={drNursePathologistPracticeNumber}
            onChange={handleDrNursePathologistPracticeNumberChange}
          />
          <div style={{ color: "red" }}></div>
        </div>
      </div>

      <div className="col-md-4 flex">
        <div className="form-group">
          <label htmlFor="floatingparlour">Funeral Parlour</label>
          <input
            type="text"
            required
            className="form-control"
            id="floatingparlour"
            name="funeral_parlour"
            placeholder="Funeral Parlour"
            value={funeralParlour}
            onChange={handleFuneralParlourChange}
          />
          <div style={{ color: "red" }}></div>
        </div>
      </div>

      <div className="col-md-4 flex">
        <div className="form-group">
          <label htmlFor="floatingcohiefs">Chief's Name</label>
          <input
            type="text"
            required
            className="form-control"
            id="floatingcohiefs"
            name="chiefs_name"
            placeholder="Chief's Name"
            value={chiefsName}
            onChange={handleChiefsNameChange}
          />
          <div style={{ color: "red" }}></div>
        </div>
      </div>

      <div className="col-md-4 flex">
        <div className="form-group">
          <label htmlFor="floatingchiefsnumber">Chief's Phone Number</label>
          <input
            type="text"
            required
            className="form-control"
            id="floatingchiefsnumber"
            name="chiefs_phone_number"
            placeholder="Chief's Phone Number"
            value={chiefsPhoneNumber}
            onChange={handleChiefsPhoneNumberChange}
          />
          <div style={{ color: "red" }}></div>
        </div>
      </div>

      <div className="col-md-4 flex">
        <div className="form-group">
          <label htmlFor="floatingdha">DHA1663</label>
          <input
            type="text"
            required
            className="form-control"
            id="floatingdha"
            name="DHA1663"
            placeholder="DHA1663"
            value={dha1663}
            onChange={handleDHA1663Change}
          />
          <div style={{ color: "red" }}></div>
        </div>
      </div>

      <div className="col-md-4 flex">
        <div className="form-group">
          <label htmlFor="floatingdha16">DHA1680</label>
          <input
            type="text"
            required
            className="form-control"
            id="floatingdha16"
            name="DHA1680"
            placeholder="DHA1680"
            value={dha1680}
            onChange={handleDHA1680Change}
          />
          <div style={{ color: "red" }}></div>
        </div>
      </div>

      <div className="col-md-4 flex">
        <div className="form-group">
          <label htmlFor="floatingdeathcert">
            Death Certificate Issued By User
          </label>
          <input
            type="text"
            required
            className="form-control"
            id="floatingdeathcert"
            name="Death_Certificate_issued_by_User"
            placeholder="Death Certificate Issued By User"
            value={deathCertificateIssuedByUser}
            onChange={handleDeathCertificateIssuedByUserChange}
          />
          <div style={{ color: "red" }}></div>
        </div>
      </div>

      <div className="col-md-4 flex">
        <div className="form-group">
          <label htmlFor="floatingchadc">
            HA That Issued Death Certificate
          </label>
          <input
            type="text"
            required
            className="form-control"
            id="floatingchadc"
            name="HA_that_Issued_DC"
            placeholder="HA That Issued Death Certificate"
            value={haThatIssuedDeathCertificate}
            onChange={handleHAThatIssuedDeathCertificateChange}
          />
          <div style={{ color: "red" }}></div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
