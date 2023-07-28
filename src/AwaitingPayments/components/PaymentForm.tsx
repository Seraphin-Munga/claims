import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import instance from "../../axios/axios-instance";

interface modelProps {
  isModalOpen: boolean | false;
}
const PaymentForm: React.FC<modelProps> = (modelProps) => {
  const [isModalOpen, setIsModalOpen] = useState(modelProps.isModalOpen);
  const [paymentData, setPaymentData] = useState({
    amountPaid: "",
    paymentDate: "",
    proofOfPayment: null,
    paymentReference: "",
    closureStatus: "",
  });

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setPaymentData({ ...paymentData, [name]: value });
  };

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    setPaymentData({ ...paymentData, proofOfPayment: file });
  };

  const handleOk = async () => {
    const model = {
      amountPaid: paymentData.amountPaid,
      paymentDate: paymentData.paymentDate,
      proofOfPayment: paymentData.proofOfPayment,
      paymentReference: paymentData.paymentReference,
      closureStatus: paymentData.closureStatus,
    };

    try {
      const response = await instance.post(``, model);
      console.log(response.data);
    } catch (error: any) {
      console.log(error.message);
    }

    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    setIsModalOpen(modelProps.isModalOpen);
  }, [modelProps.isModalOpen]);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // Here you can handle the form submission logic
    console.log(paymentData);
  };

  return (
    <Modal visible={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Amount Paid</label>
          <input
            type="text"
            name="amountPaid"
            className="form-control"
            value={paymentData.amountPaid}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Payment Date</label>
          <input
            type="date"
            name="paymentDate"
            className="form-control"
            value={paymentData.paymentDate}
            onChange={handleChange}
          />
        </div>

        {/* <div className="form-group">
          <label>Proof of Payment</label>
          <input
            type="file"
            name="proofOfPayment"
            className="form-control-file"
            onChange={handleFileChange}
          />
        </div> */}

        <div className="col-md-12">
          <label htmlFor="inputNumber" className="col-sm-12 col-form-label">
            Proof of Payment
          </label>
          <input
            onChange={handleFileChange}
            className="form-control"
            name="identity_for_the_claimant"
            type="file"
            id="formFile"
          />
        </div>

        <div className="form-group">
          <label>Payment Reference</label>
          <input
            type="text"
            name="paymentReference"
            className="form-control"
            value={paymentData.paymentReference}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Closure Status</label>
          <input
            type="text"
            name="closureStatus"
            className="form-control"
            value={paymentData.closureStatus}
            onChange={handleChange}
          />
        </div>
      </form>
    </Modal>
  );
};

export default PaymentForm;
