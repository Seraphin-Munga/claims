import React, { useEffect, useState } from "react";
import { Button, Modal } from "antd";
import instance from "../../axios/axios-instance";

interface modelProps {
  isModalOpen: boolean | false;
}

const ClaimReviewModal: React.FC<modelProps> = (modelProps) => {
  const [isModalOpen, setIsModalOpen] = useState(modelProps.isModalOpen);
  const [inputValues, setInputValues] = useState({
    revievStatus: "",
    dataConfirmation: "",
    premiumCheck: "",
  });

  const handleOk = async () => {
    setIsModalOpen(false);
    const model: any = {
      revievStatus: inputValues.revievStatus,
      dataConfirmation: inputValues.dataConfirmation,
      premiumCheck: inputValues.premiumCheck,
    };
    try {
      const response = await instance.post(``, model);
      console.log(response.data);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setInputValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  useEffect(() => {
    setIsModalOpen(modelProps.isModalOpen);
  }, [modelProps.isModalOpen]);

  return (
    <>
      <Modal visible={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <div>
          <div className="card-body">
            <h5 className="card-title">Ready To Review</h5>
            <p></p>

            <form className="row g-3" id="member-form">
              <input
                type="hidden"
                name="csrfmiddlewaretoken"
                value="zUtjrTyQPVKQwNW9nO3vHAAy1e4zoaxfFgiWjP1d7j3leI1RzcqRtwNhCNJlJfop"
              />

              <div className="col-md-4">
                <div className="form-group">
                  <label>Review Satus</label>
                  <select
                    className="form-control"
                    id="floatingGender"
                    name="gender"
                    value={inputValues.revievStatus}
                    onChange={handleInputChange}
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
              </div>

              <div className="col-md-4">
                <div className="form-group">
                  <label>Data Confirmation</label>
                  <select
                    name="birth_country"
                    className="form-control"
                    id="id_birth_country"
                    value={inputValues.dataConfirmation}
                    onChange={handleInputChange}
                  >
                    <option value="" disabled>
                      ---------
                    </option>
                  </select>
                </div>
              </div>

              <div className="col-md-4">
                <div className="form-group">
                  <label>Premium Check</label>
                  <select
                    className="form-control"
                    id="floatingRisk"
                    name="risk_status"
                    value={inputValues.premiumCheck}
                    onChange={handleInputChange}
                  >
                    <option value="" disabled>
                      ---------
                    </option>
                  </select>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ClaimReviewModal;
