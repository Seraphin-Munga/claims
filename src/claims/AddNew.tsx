import Dasboard from "../layouts/Dashboard";
import React, { useEffect, useState } from "react";
import { Form, Input, Select, Button, Tabs, Modal } from "antd";
import MememberDetail from "./components/MemberDetail";
import Policy from "./components/Policy";
import DeceasedDetails from "./components/DeceasedDetails";
import BankDetail from "./components/BankDetail";
import EventDetail from "./components/EventDetail";
import TableClaims from "./components/TableClaims";
import { useDispatch, useSelector } from "react-redux";
import { addClaim, clearClaims } from "../redux/actions/ClaimsActions";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import DocumentUpload from "./components/DocumentUpload";
import instance from "../axios/axios-instance";

const { TabPane } = Tabs;

const { Option } = Select; // Extract Option from Select

const AddNew = () => {
  const dispatch = useDispatch();
  const [currentTab, setCurrentTab] = useState("1"); // Track the current active tab
  const data = useSelector((state: any) => state);
  const [isClearInputsMember, setIClearInputsMember] = useState(false);
  const [isClearPolicy, setIClearInputsPolicy] = useState(false);
  const [isClearDeceasedDetails, setIClearInputsDeceasedDetails] =
    useState(false);
  const [isClearEventDetail, setIClearInputsEventDetail] = useState(false);
  const [isClearBankDetail, setIClearBankDetail] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false); // State for controlling modal visibility
  const [selectedClaimStatus, setSelectedClaimStatus] = useState(""); // State to store the selected claim status
  const [claimStatuses, setClaimStatuses] = useState([]);

  const isFormValid = (data: any) => {
    return (
      data.memeber &&
      data.policy &&
      data.deceased &&
      data.event &&
      data.banks &&
      Object.values(data.memeber).every((value) => value !== "") &&
      Object.values(data.policy).every((value) => value !== "") &&
      Object.values(data.deceased).every((value) => value !== "") &&
      Object.values(data.event).every((value) => value !== "") &&
      Object.values(data.banks).every((value) => value !== "")
    );
  };

  const onFinish = (values: any) => {
    const model = {
      id: Date.now(),
      banks: data.banks,
      deceased: data.deceased,
      event: data.event,
      memeber: data.memeber,
      policy: data.policy,
    };

    console.log("formModel", model);

    if (!isFormValid(model)) {
      const updatedBanks = { ...model.banks, ClaimStatus: 3 };
      const updatedData = { ...model, banks: updatedBanks };
      dispatch(addClaim(updatedData));
    } else {
      setIsModalVisible(true);
    }

    setCurrentTab("1");
    setIClearInputsMember(true);
    setIClearBankDetail(true);
    setIClearInputsEventDetail(true);
    setIClearInputsDeceasedDetails(true);
    setIClearInputsPolicy(true);
  };

  const handleNext = () => {
    setIClearInputsMember(false);
    setIClearBankDetail(false);
    setIClearInputsEventDetail(false);
    setIClearInputsDeceasedDetails(false);
    setIClearInputsPolicy(false);

    // Increment the current tab value to move to the next tab
    const nextTab = String(Number(currentTab) + 1);
    setCurrentTab(nextTab);
  };

  const handleOk = () => {
    const model = {
      id: Date.now(),
      banks: data.banks,
      deceased: data.deceased,
      event: data.event,
      memeber: data.memeber,
      policy: data.policy,
    };

    const updatedBanks = { ...model.banks, ClaimStatus: selectedClaimStatus };
    const updatedData = { ...model, banks: updatedBanks };
    dispatch(addClaim(model));
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleBack = () => {
    // Decrement the current tab value to move to the previous tab
    const previousTab = String(Number(currentTab) - 1);
    setCurrentTab(previousTab);
  };

  const getStatusClaims = async () => {
    try {
      const response = await instance.get(`claim-status/?format=json`);
      setClaimStatuses(response.data);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getStatusClaims();
  }, []);

  return (
    <Dasboard>
      <div style={{ marginBottom: "20px" }}>
        <Link to="/claims">
          <ArrowLeftOutlined style={{ fontSize: "20px" }} />
          <span>Claims</span>
        </Link>
      </div>
      <div className="card card-user">
        <div className="card-header">
          <h5 className="card-title">Claim</h5>
        </div>
        <div className="card-body">
          <Form
            className="row g-3"
            id="headclaim-form"
            encType="multipart/form-data"
            method="POST"
            action="/head/claims/add"
            noValidate
            onFinish={onFinish}
          >
            <Tabs
              activeKey={currentTab}
              className="col-12"
              tabBarGutter={32}
              tabBarStyle={{ pointerEvents: "none" }}
            >
              <TabPane tab="Member Details" key="1">
                <MememberDetail isInput={isClearInputsMember} />
              </TabPane>
              <TabPane tab="Policy" key="2">
                <Policy isInput={isClearPolicy} />
              </TabPane>
              <TabPane tab="Deceased Details" key="3">
                <DeceasedDetails isInput={isClearDeceasedDetails} />
              </TabPane>
              <TabPane tab=" Required Documents" key="4">
                <DocumentUpload />
              </TabPane>
              <TabPane tab="Event Details" key="5">
                <EventDetail isInput={isClearEventDetail} />
              </TabPane>
              <TabPane tab="Bank Details" key="6">
                <BankDetail isInput={isClearBankDetail} />
              </TabPane>
            </Tabs>

            <div className="col-12">
              {currentTab !== "1" && (
                <Button type="default" onClick={handleBack}>
                  Back
                </Button>
              )}
              {currentTab !== "6" && (
                <Button
                  type="primary"
                  onClick={handleNext}
                  style={{ marginLeft: "8px" }}
                >
                  Next
                </Button>
              )}
              {currentTab === "6" && (
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ marginLeft: "8px" }}
                >
                  Add to the table
                </Button>
              )}
            </div>
          </Form>
        </div>
      </div>

      <TableClaims />

      <Modal
        title="Select Claim Status"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Select
          style={{ width: "100%" }}
          placeholder="Select Claim Status"
          onChange={(value) => setSelectedClaimStatus(value)} // Update selected claim status in state
          value={selectedClaimStatus} // Set the default value of the Select component
        >
          {claimStatuses.map((claimStatus: any) => (
            <Option key={claimStatus.id} value={claimStatus.id}>
              {claimStatus.name}
            </Option>
          ))}
        </Select>
      </Modal>
    </Dasboard>
  );
};

export default AddNew;
