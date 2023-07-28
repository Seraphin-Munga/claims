import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  claimCapture,
  clearClaims,
  removeClaim,
} from "../../redux/actions/ClaimsActions";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";

type AppDispatch = ThunkDispatch<any, unknown, AnyAction>;

const TableClaims: React.FC<any> = () => {
  const data = useSelector((state: any) => state?.claims?.claims);
  const dispatch = useDispatch<AppDispatch>();
  const handleDelete = (claimId: any) => {
    dispatch(removeClaim(claimId));
  };

  const handSave = () => {
    // Initialize an empty array to store the new objects
    const newArray: {
      principal_member: any;
      claimant: any;
      scheme_name: string;
      insurer_name: string;
      deceased_member: string;
      policy_number: any;
      claim_amount: any;
      gross_premium: any;
      amount_paid: string;
      inception_date: any;
      scheme_email: string;
      informant_name: string;
      deceased_surname: any;
      deceased_name: any;
      deceased_id_number: any;
      deceased_date_of_death: any;
      passport: string;
      date_of_birth: string;
      gender: string;
      still_born_date: any;
      deceased_cause_of_death: string;
      deceased_address: string;
      residence_country: string;
      birth_country: string;
      nationality: string;
      marital_status: string;
      source_of_funds: any;
      // Initialize an empty array to store the new objects
      tax_ref: any;
      nature_of_income: any;
      place_of_death: any;
      name_of_hospital: // Loop through the product_type array and match the properties
      any;
      dr_Pathologist_nurse_name: any;
      doctor_practice_umber: any;
      funeral_parlour: any;
      chiefs_name: any;
      chiefs_phone_number: any;
      DHA1663: any;
      DHA1680: any;
      Death_Certificate_issued_by_User: any;
      HA_that_Issued_DC: any;
      premium_check: any;
      data_confirmation: any;
      review_status: any;
      payment_date: any;
      account_holder: any;
      account_hidnumber: any;
      account_hidpassport: any;
      account_hdate_of_birth: any;
      account_hgender: any;
      bank_name: any;
      account_type: any;
      account_number: any;
      claim_status: any;
      notes: any;
      is_reviewed: boolean;
      is_paid: boolean;
      is_uploaded: boolean;
      is_held: boolean;
      payment_status: any;
      date_claim_submission: string;
      claim_closure: string;
      bank_statement: any;
      pop_reference: string;
      modified: string;
      created: string;
      documentation: any;
      product_type: never[];
    }[] = [];

    // Loop through the product_type array and match the properties
    data.forEach((item: any) => {
      const newObj = {
        principal_member: item.memeber.principalMember,
        claimant: item.memeber.claimant,
        scheme_name: item.policy.schemeName,
        insurer_name: item.policy.insurerName,
        deceased_member: item.memeber.deceasedMemberType,
        policy_number: item.policy.policyNumber,
        claim_amount: item.policy.claimAmount,
        gross_premium: item.policy.grossPremium,
        amount_paid: item.policy.claimAmount,
        inception_date: item.policy.inceptionDate,
        scheme_email: item.policy.schemeEmail,
        informant_name: item.memeber.informantName,
        deceased_surname: item.deceased.deceasedSurname,
        deceased_name: item.deceased.deceasedName,
        deceased_id_number: item.deceased.deceasedIdNumber,
        deceased_date_of_death: item.deceased.deceasedDateOfDeath,
        passport: item.deceased.deceasedPassportNumber,
        date_of_birth: item.deceased.deceasedDateOfBirth,
        gender: item.deceased.deceasedGender,
        still_born_date: null,
        deceased_cause_of_death: "",
        deceased_address: item.deceased.deceasedPostalAddress,
        residence_country: "",
        birth_country: "",
        nationality: item.deceased.deceasedNationality,
        marital_status: item.deceased.maritalStatus,
        source_of_funds: item.event.sourceOfFunds,
        tax_ref: item.event.taxReference,
        nature_of_income: item.event.natureOfIncome,
        place_of_death: item.event.placeOfDeath,
        name_of_hospital: item.event.nameOfHospital,
        dr_Pathologist_nurse_name: item.event.drNursePathologist,
        doctor_practice_umber: item.event.drNursePathologistPracticeNumber,
        funeral_parlour: item.event.funeralParlour,
        chiefs_name: item.event.chiefsName,
        chiefs_phone_number: item.event.chiefsPhoneNumber,
        DHA1663: item.event.dha1663,
        DHA1680: item.event.dha1680,
        Death_Certificate_issued_by_User:
        item.event.deathCertificateIssuedByUser,
        HA_that_Issued_DC: item.event.haThatIssuedDeathCertificate,
        premium_check: item.banks.premium_check,
        data_confirmation: item.banks.data_confirmation,
        review_status: item.banks.review_status,
        payment_date: item.banks.payment_date,
        account_holder: item.banks.AccountHolder,
        account_hidnumber: item.banks.AccountHolderIDType,
        account_hidpassport: item.banks.account_hidpassport,
        account_hdate_of_birth:"2023-01-01",
        account_hgender: item.banks.account_hgender,
        bank_name: item.banks.BankName,
        account_type: item.banks.AccountType,
        account_number: item.banks.AccountNumber,
        claim_status: item.banks.ClaimStatus,
        notes: item.banks.Notes,
        is_reviewed: false,
        is_paid: false,
        is_uploaded: false,
        is_held: false,
        payment_status: null,
        date_claim_submission: item.policy.dateClaimSubmission,
        claim_closure: "",
        bank_statement: null,
        pop_reference: "",
        modified: "",
        created: "",
        documentation: null,

        product_type: [],
      };

      newArray.push(newObj);
    });

    dispatch(claimCapture(newArray));

    dispatch(clearClaims());
  };

  // const hasSelected = selectedRowKeys.length > 0;

  return (
    <>
      <div className="card card-user">
        <div className="card-header">
          <h5 className="card-title">Claims</h5>
        </div>
        <div className="card-body">
          <div>
            <div style={{ marginBottom: 16 }}>
              {/* <button
                type="button"
                className="btn btn-primary"
                onClick={start}
                disabled={!hasSelected}
                style={{ marginRight: 8 }}
              >
                Remove
              </button> */}
              {/* <span style={{ marginLeft: 8 }}>
                {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
              </span> */}
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th>Informant Name</th>
                  <th>Scheme Name</th>
                  <th>Insurer Name</th>
                  <th>Deceased Surname</th>
                  <th>Deceased Name(s)</th>
                  <th>Bank Name</th>
                  <th>Account Type</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((item: any, index: any) => (
                  <tr key={index}>
                    <td>{item?.memeber?.informantName}</td>
                    <td>{item?.policy?.schemeName}</td>
                    <td>{item?.policy?.insurerName}</td>
                    <td>{item?.deceased?.deceasedSurname}</td>
                    <td>{item?.deceased?.deceasedName}</td>
                    <td>{item?.banks?.AccountHolde}</td>
                    <td>{item?.banks?.AccountType}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => handleDelete(item.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <button
              type="button"
              className="btn btn-primary btn-round"
              onClick={() => handSave()}
            >
              Claim Capture
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TableClaims;
