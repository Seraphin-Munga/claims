import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { IBankDetail } from "../../redux/types/bankDetail";
import { setBankDetail } from "../../redux/actions/bankDetailActions";
import instance from "../../axios/axios-instance";
interface ClearProps {
  isInput: boolean | false;
}
const BankDetail: React.FC<ClearProps> = (ClearProps) => {
  const dispatch = useDispatch();
  const [accountHolder, setAccountHolder] = useState("");
  const [accountIDType, setAccountIDType] = useState("");
  const [accountIDNumber, setAccountIDNumber] = useState("");
  const [accountPassport, setAccountPassport] = useState("");
  const [accountDateOfBirth, setAccountDateOfBirth] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [claimStatus, setClaimStatus] = useState(false);
  const [notes, setNotes] = useState("");
  const [selectedBank, setSelectedBank] = useState("");
  const [banks, setBanks] = useState([]);

  const handleAccountHolderChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setAccountHolder(event.target.value);
  };

  const handleAccountIDTypeChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setAccountIDType(event.target.value);
  };

  const handleAccountIDNumberChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setAccountIDNumber(event.target.value);
  };

  const handleAccountPassportChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setAccountPassport(event.target.value);
  };

  const handleAccountDateOfBirthChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setAccountDateOfBirth(event.target.value);
  };

  const handleAccountNumberChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setAccountNumber(event.target.value);
  };

  const handleClaimStatusChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setClaimStatus(true);
  };

  const handleBankChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSelectedBank(event.target.value);
    // You can perform any other actions or state updates based on the selected value here
  };

  const handleNotesChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setNotes(event.target.value);
  };

  useEffect(() => {
    if (ClearProps.isInput) {
      setAccountHolder("");
      setAccountIDType("");
      setAccountIDNumber("");
      setAccountPassport("");
      setAccountDateOfBirth("");
      setAccountNumber("");
      setClaimStatus(false);
      setNotes("");
    }
  }, [ClearProps.isInput]);

  useEffect(() => {
    const model: IBankDetail = {
      BankName: selectedBank,
      AccountType: accountIDType,
      AccountHolder: accountHolder,
      AccountHolderIDType: accountPassport,
      AccountNumber: accountNumber,
      ClaimStatus: claimStatus,
      Notes: notes,
    };

    dispatch(setBankDetail(model));
  }, [
    accountHolder,
    accountIDType,
    accountIDNumber,
    accountPassport,
    accountNumber,
    claimStatus,
    notes,
  ]);

  const getBanks = async () => {
    try {
      const response = await instance.get(`bank-names/?format=json`);
      setBanks(response.data);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getBanks();
  }, []);

  return (
    <>
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="floatingbank">Bank Name</label>
            <select
              className="form-select"
              style={{ width: "100%" }}
              id="floatingbank"
              name="bank_name"
              aria-label="Bank Name"
              onChange={handleBankChange}
              value={selectedBank} // Set the selected value of the dropdown
            >
              <option value="" selected>
                ---------
              </option>
              {banks.map((bank: any) => (
                <option key={bank.id} value={bank.id}>
                  {bank.bank}
                </option>
              ))}
              {/* Add your new option below */}
              {/* <option value="Your New Bank">Your New Bank</option> */}
            </select>
          </div>
        </div>

        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="floatingiaccounttype">Account Type</label>
            <select
              className="form-select"
              style={{ width: "100%" }}
              id="floatingiaccounttype"
              name="account_type"
              value={accountIDType}
              onChange={handleAccountIDTypeChange}
              aria-label="Account Type"
            >
              <option value="" selected>
                ---------
              </option>
              <option value="Savings">Savings</option>
              <option value="Cheque">Cheque</option>
              <option value="Transmission">Transmission</option>
            </select>
          </div>
        </div>

        <div className="col-md-4 flex">
          <div className="form-group">
            <label htmlFor="floatingaccountname">Account Holder</label>
            <input
              type="text"
              required
              className="form-control"
              id="floatingaccountname"
              name="account_holder"
              value={accountHolder}
              placeholder="Account Holder"
              onChange={handleAccountHolderChange}
            />
            <div style={{ color: "red" }}></div>
          </div>
        </div>

        {/* <div className="col-md-4" id="accountID">
          <div className="form-group">
            <label htmlFor="accountidtype">Account Holder ID Type</label>
            <select
              className="form-select"
              id="accountidtype"
              value={accountIDType}
              onChange={handleAccountIDTypeChange}
              aria-label=""
            >
              <option value="none">--------</option>
              <option value="1">RSA ID</option>
              <option value="2">Non RSA Member</option>
            </select>
          </div>
        </div> */}

        {accountIDType === "1" && (
          <div
            className="col-md-4"
            id="rsa-account-id-type"
            style={{ display: "none" }}
          >
            <div className="form-group">
              <label htmlFor="floatingID">Account Holder ID Number</label>
              <input
                type="text"
                value={accountIDNumber}
                className="form-control"
                id="floatingID"
                name="account_hidnumber"
                placeholder="Account Holder ID Number"
                onChange={handleAccountIDNumberChange}
              />
            </div>
          </div>
        )}

        {accountIDType === "2" && (
          <div
            className="col-md-4"
            id="passport-account-id-type"
            style={{ display: "none" }}
          >
            <div className="form-group">
              <label htmlFor="floatingpass">Account Holder Passport</label>
              <input
                type="text"
                value={accountPassport}
                className="form-control"
                id="floatingpass"
                name="account_hidpassport"
                placeholder="Account Holder Passport"
                onChange={handleAccountPassportChange}
              />
            </div>
          </div>
        )}

        {accountIDType === "2" && (
          <div
            className="col-md-4"
            id="passport-account-date-id-type"
            style={{ display: "none" }}
          >
            <div className="form-group">
              <label htmlFor="floatingdateob">
                Account Holder Date of Birth
              </label>
              <input
                type="date"
                value={accountDateOfBirth}
                className="form-control"
                id="floatingdateob"
                name="account_hdate_of_birth"
                placeholder="Account Holder Date of Birth"
                onChange={handleAccountDateOfBirthChange}
              />
            </div>
          </div>
        )}

        <div className="col-md-4 flex">
          <div className="form-group">
            <label htmlFor="floatingaccno">Account Number</label>
            <input
              type="text"
              required
              className="form-control"
              id="floatingaccno"
              name="account_number"
              value={accountNumber}
              placeholder="Account Number"
              onChange={handleAccountNumberChange}
            />
            <div style={{ color: "red" }}></div>
          </div>
        </div>

        {/* <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="floatingstatus">Claim Status</label>
            <select
              className="form-select"
              style={{ width: "100%" }}
              id="floatingstatus"
              name="claim_status"
              aria-label="Claim Status"
              onChange={handleClaimStatusChange}
            >
              <option value="" selected>
                ---------
              </option>
            </select>
          </div>
        </div> */}

        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="floatingnotees">Notes</label>
            <textarea
              className="form-control"
              id="floatingnotees"
              name="notes"
              value={notes}
              placeholder="Notes"
              onChange={handleNotesChange}
            ></textarea>
            <div style={{ color: "red" }}></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BankDetail;
