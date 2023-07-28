import { Input, Table, Checkbox, Button } from "antd";
import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import PaymentForm from "./PaymentForm";
import axios from "axios";
import instance from "../../axios/axios-instance";

type DataType = {
  // Define your data fields here
  key: string;
  headerAssessor: string;
  deceasedName: string;
  surname: string;
  idPassport: string;
  principalName: string;
  policyNumber: string;
  claimNumber: string;
  coverAmount: string;
  reviewStatus: string;
  timeLastModified: string;
  updatedBy: string;
  claimPaymentOption: string;
  heldPaymentOption: string;
  selected?: boolean; // Add a field to track selection
};

const AwaitingPaymentsTable: React.FC<any> = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [dataSource, setDataSource] = useState<{ results: DataType[] }>({
    results: [],
  });

  const handleCheckboxChange = (record: DataType) => {
    const updatedDataSource = dataSource.results.map((data) => {
      if (data.key === record.key) {
        return { ...data, selected: !data.selected };
      }
      return data;
    });
    setDataSource({ results: updatedDataSource });
  };

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleExport = () => {
    const csvData = dataSource.results
      .filter((data) => data.selected)
      .map((data) => ({
        // Map the selected data fields to CSV format
        "Header Assessor": data.headerAssessor,
        "Deceased Name": data.deceasedName,
        "ID/Passport": data.idPassport,
        "Principal Name (ID/Passport)": data.principalName,
        "Policy Number": data.policyNumber,
        "Claim Number": data.claimNumber,
        "Cover Amount(R)": data.coverAmount,
        "Review Status": data.reviewStatus,
        "Time Last Modified": data.timeLastModified,
        "Updated By": data.updatedBy,
        "Claim Payment Option": data.claimPaymentOption,
        "Held Payment Option": data.heldPaymentOption,
      }));

    return csvData;
  };

  const columns = [
    {
      title: "",
      dataIndex: "checkbox",
      key: "checkbox",
      render: (_: any, record: DataType) => (
        <Checkbox
          checked={record.selected}
          onChange={() => handleCheckboxChange(record)}
        />
      ),
      width: 50,
    },
    {
      title: "Header Assessor",
      dataIndex: "headerAssessor",
      key: "headerAssessor",
    },
    {
      title: "Deceased Name",
      dataIndex: "deceasedName",
      key: "deceasedName",
    },
    {
      title: "ID/Passport",
      dataIndex: "idPassport",
      key: "idPassport",
    },
    {
      title: "Principal Name (ID/Passport)",
      dataIndex: "principalName",
      key: "principalName",
    },
    {
      title: "Policy Number",
      dataIndex: "policyNumber",
      key: "policyNumber",
    },
    {
      title: "Claim Number",
      dataIndex: "claimNumber",
      key: "claimNumber",
    },
    {
      title: "Cover Amount(R)",
      dataIndex: "coverAmount",
      key: "coverAmount",
    },
    {
      title: "Review Status",
      dataIndex: "reviewStatus",
      key: "reviewStatus",
    },
    {
      title: "Time Last Modified",
      dataIndex: "timeLastModified",
      key: "timeLastModified",
    },
    {
      title: "Updated By",
      dataIndex: "updatedBy",
      key: "updatedBy",
    },
    {
      title: "Claim Payment Option",
      dataIndex: "claimPaymentOption",
      key: "claimPaymentOption",
    },
    {
      title: "Held Payment Option",
      dataIndex: "heldPaymentOption",
      key: "heldPaymentOption",
    },
  ];

  useEffect(() => {
    instance
      .get("awaiting/?format=json")
      .then((response) => {
        setDataSource(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data from the API:", error);
      });
  }, []);

  return (
    <div className="col-md-12">
      <div className="row">
        <div className="card">
          <div className="card-header">
            <h4 className="card-title">Awaiting Payments</h4>
          </div>
          <div className="search-container">
            <Input.Search
              placeholder="Search by name"
              className="search-input"
              value={searchTerm}
              onChange={onSearch}
              style={{ width: 200 }}
            />
          </div>
          <div className="card-body">
            <Table<DataType>
              columns={columns}
              dataSource={dataSource.results}
              scroll={{ x: 1300 }}
              rowKey={(record) => record.key}
            />
          </div>
          {dataSource.results.some((data) => data.selected) && (
            <div className="export-container">
              <CSVLink data={handleExport()} filename="selected_data.csv">
                <Button type="primary">Export Selected Data</Button>
              </CSVLink>
            </div>
          )}
        </div>
      </div>
      {/* <PaymentForm isModalOpen={isModalOpen}/> */}
    </div>
  );
};

export default AwaitingPaymentsTable;
