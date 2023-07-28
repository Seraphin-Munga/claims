import React, { useState, ChangeEvent } from "react";

const DocumentUpload = () => {
  // State variables to hold the selected files
  const [principalMemberFile, setPrincipalMemberFile] = useState<File | null>(
    null
  );
  const [claimantFile, setClaimantFile] = useState<File | null>(null);
  const [deceasedFile, setDeceasedFile] = useState<File | null>(null);

  // Event handlers to update the state variables when files are selected
  const handlePrincipalMemberFileChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      setPrincipalMemberFile(event.target.files[0]);
    }
  };

  const handleClaimantFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setClaimantFile(event.target.files[0]);
    }
  };

  const handleDeceasedFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setDeceasedFile(event.target.files[0]);
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        {/* Custom Styled Validation */}
        <form
          className="row g-3"
          encType="multipart/form-data"
          method="POST"
          action="/head/required-documents/"
          noValidate
        >
          {/* ...other form elements... */}

          <div className="col-md-12">
            <label htmlFor="inputNumber" className="col-sm-12 col-form-label">
              Upload ID of Principal Member
            </label>
            <input
              className="form-control"
              name="identity_for_the_principal_member"
              type="file"
              id="formFilePrincipal"
              onChange={handlePrincipalMemberFileChange} // Add onchange event handler
            />
          </div>

          <div className="col-md-12">
            <label htmlFor="inputNumber" className="col-sm-12 col-form-label">
              Upload ID of Claimant
            </label>
            <input
              className="form-control"
              name="identity_for_the_claimant"
              type="file"
              id="formFileClaimant"
              onChange={handleClaimantFileChange} // Add onchange event handler
            />
          </div>

          <div className="col-md-12">
            <label htmlFor="inputNumber" className="col-sm-12 col-form-label">
              Upload ID of the Deceased
            </label>
            <input
              className="form-control"
              name="identity_for_the_deceased"
              type="file"
              id="formFileDeceased"
              onChange={handleDeceasedFileChange} // Add onchange event handler
            />
          </div>

          {/* ...rest of the form... */}
        </form>
        {/* End Custom Styled Validation */}
      </div>
    </div>
  );
};

export default DocumentUpload;
