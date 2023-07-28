import React, { useEffect, useState } from "react";
import { PolicyAction, setPolicy } from "../../redux/actions/PolicyAction";
import { IPolicy } from "../../redux/types/Policy";
import { useDispatch } from "react-redux";
import instance from "../../axios/axios-instance";

interface ClearProps {
  isInput: boolean | false;
}
interface Insurer {
  id: number;
  name: string;
}

interface Scheme {
  id: number;
  name: string;
}
const Policy: React.FC<ClearProps> = (ClearProps) => {
  const dispatch = useDispatch();
  const [schemeName, setSchemeName] = useState("");
  const [insurerName, setInsurerName] = useState("");
  const [schemeEmail, setSchemeEmail] = useState("");
  const [policyNumber, setPolicyNumber] = useState("");
  const [claimAmount, setClaimAmount] = useState(0);
  const [grossPremium, setGrossPremium] = useState(0);
  const [inceptionDate, setInceptionDate] = useState("");
  const [dateClaimSubmission, setDateClaimSubmission] = useState("");
  const [insurers, setInsurers] = useState<Insurer[]>([]); // State to hold insurers data
  const [schemes, setSchemes] = useState<Scheme[]>([]); // State to hold schemes data
  const [emailError, setEmailError] = useState("");

  const handleSchemeNameChange = (event: {
    target: { value: React.SetStateAction<any> };
  }) => {
    setSchemeName(event.target.value);
  };
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleInsurerNameChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setInsurerName(event.target.value);
  };

  const handleSchemeEmailChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    const email = event.target.value;
    setSchemeEmail(email);
    setEmailError(validateEmail(email.toString()) ? "" : "Invalid email");
  };

  const handlePolicyNumberChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setPolicyNumber(event.target.value);
  };

  const handleClaimAmountChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setClaimAmount(parseInt(event.target.value.toString()));
  };

  const handleGrossPremiumChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setGrossPremium(parseInt(event.target.value.toString()));
  };

  const handleInceptionDateChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setInceptionDate(event.target.value);
  };

  const handleDateClaimSubmissionChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setDateClaimSubmission(event.target.value);
  };

  useEffect(() => {
    if (ClearProps.isInput) {
      setSchemeName("");
      setInsurerName("");
      setSchemeEmail("");
      setPolicyNumber("");
      setClaimAmount(0);
      setGrossPremium(0);
      setInceptionDate("");
      setDateClaimSubmission("");
    }
  }, [ClearProps.isInput]);

  const getInsurers = async () => {
    try {
      const response = await instance.get(`insurer/?format=json`);
      setInsurers(response.data);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const getScheme = async () => {
    try {
      const response = await instance.get(`underwriter/?format=json`);
      setSchemes(response.data);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getInsurers();
    getScheme();
  }, []);

  useEffect(() => {
    const model: IPolicy = {
      schemeName: parseInt(schemeName),
      insurerName: insurerName,
      schemeEmail: schemeEmail,
      policyNumber: policyNumber,
      claimAmount: claimAmount,
      grossPremium: grossPremium,
      inceptionDate: inceptionDate,
      dateClaimSubmission: dateClaimSubmission,
    };

    dispatch(setPolicy(model));
  }, [
    schemeName,
    insurerName,
    schemeEmail,
    policyNumber,
    claimAmount,
    grossPremium,
    inceptionDate,
    dateClaimSubmission,
  ]);

  return (
    <div className="row">
      <div className="col-md-6">
        <div className="form-group">
          <label htmlFor="scheme_name">Scheme Name</label>
          <select
            className="form-control"
            id="scheme_name"
            placeholder="---------"
            aria-label="Scheme Name"
            value={schemeName}
            onChange={handleSchemeNameChange}
          >
            <option value="">---------</option>
            {schemes.map((scheme) => (
              <option key={scheme.id} value={scheme.id}>
                {scheme.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* <div className="col-md-6">
        <div className="form-group">
          <label htmlFor="insurer_name">Insurer Name</label>
          <select
            className="form-control"
            id="insurer_name"
            placeholder="---------"
            aria-label="Insurer Name"
            value={insurerName}
            onChange={handleInsurerNameChange}
          >
            <option value="">---------</option>
            {insurers.map((insurer) => (
              <option key={insurer.id} value={insurer.id}>
                {insurer.name}
              </option>
            ))}
          </select>
        </div>
      </div> */}

      <div className="col-md-4 flex">
        <div className="form-group">
          <label htmlFor="scheme_email">Scheme email</label>
          <input
            type="text"
            className={`form-control ${emailError ? "is-invalid" : ""}`}
            id="scheme_email"
            required
            placeholder="Scheme email"
            value={schemeEmail}
            onChange={handleSchemeEmailChange}
          />
              {emailError && <div className="invalid-feedback">{emailError}</div>}
        </div>
      </div>

      <div className="col-md-4 flex">
        <div className="form-group">
          <label htmlFor="policy_number">Policy Number</label>
          <input
            type="text"
            className="form-control"
            id="policy_number"
            required
            placeholder="Policy Number"
            value={policyNumber}
            onChange={handlePolicyNumberChange}
          />
        </div>
      </div>

      <div className="col-md-4 flex">
        <div className="form-group">
          <label htmlFor="claim_amount">Claim amount</label>
          <input
            type="number"
            className="form-control"
            id="claim_amount"
            required
            placeholder="Claim amount"
            value={claimAmount}
            onChange={handleClaimAmountChange}
          />
        </div>
      </div>

      <div className="col-md-4 flex">
        <div className="form-group">
          <label htmlFor="gross_premium">Gross Premium</label>
          <input
            type="number"
            className="form-control"
            id="gross_premium"
            required
            placeholder="Gross Premium"
            value={grossPremium}
            onChange={handleGrossPremiumChange}
          />
        </div>
      </div>

      <div className="col-md-4 flex">
        <div className="form-group">
          <label htmlFor="inception_date">Inception Date</label>
          <input
            type="date"
            className="form-control"
            id="inception_date"
            required
            placeholder="Inception Date"
            value={inceptionDate}
            onChange={handleInceptionDateChange}
          />
        </div>
      </div>

      <div className="col-md-4 flex">
        <div className="form-group">
          <label htmlFor="date_claim_submission">Date Claim Submitted</label>
          <input
            type="date"
            className="form-control"
            id="date_claim_submission"
            required
            placeholder="Date Claim Submitted"
            value={dateClaimSubmission}
            onChange={handleDateClaimSubmissionChange}
          />
        </div>
      </div>
    </div>
  );
};
export default Policy;
