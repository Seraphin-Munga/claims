import { Modal, Input, Button } from "antd";
import React, { ChangeEvent, useEffect, useState } from "react";

interface modelProps {
    isModalOpen: boolean | false;
  }

const Authentication: React.FC<modelProps> = (modelProps) => {
  const [isModalOpen, setIsModalOpen] = useState(modelProps.isModalOpen);
  const [otp, setOtp] = useState("");
  const [isValidOtp, setIsValidOtp] = useState(false);



  const handleOk = () => {
    // Your logic for handling 'OK' button click, e.g., verifying the OTP.
    // You can use the 'otp' state variable to access the entered OTP.
    // For simplicity, let's just log the OTP for now.
    console.log("Entered OTP:", otp);

    // You can implement your actual OTP validation logic here.

    // Assuming you have a valid OTP, you can close the modal.
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    // Reset the state and close the modal on 'Cancel' button click.
    setOtp("");
    setIsValidOtp(false);
    setIsModalOpen(false);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const enteredOtp = event.target.value;
    setOtp(enteredOtp);
    // Check if the entered OTP has exactly 6 characters to determine its validity.
    setIsValidOtp(enteredOtp.length === 6);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };


  useEffect(() =>{
    setIsModalOpen(modelProps.isModalOpen)
  },[modelProps.isModalOpen])

  return (
    <>
      <Button onClick={openModal}>Open OTP Modal</Button>
      <Modal visible={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>Enter your OTP:</p>
        <Input
          type="text"
          value={otp}
          className="form-control form-control-lg"
          onChange={handleInputChange}
          maxLength={6}
          placeholder="Enter OTP"
        />
        {!isValidOtp && (
          <p style={{ color: "red" }}>OTP should be 6 characters long.</p>
        )}
      </Modal>
    </>
  );
};

export default Authentication;
