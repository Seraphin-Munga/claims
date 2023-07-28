import React, { useEffect, useState } from "react";
import Dasboard from "../../layouts/Dashboard";
import { useNavigate } from "react-router-dom";
import { ColumnsType } from "antd/es/table";
import Table from "antd/es/table";
import { Input, Space } from "antd";
import ClaimReviewModal from "./ClaimReviewModal";
import PaymentForm from "../../AwaitingPayments/components/PaymentForm";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { getClaims } from "../../redux/actions/ClaimsActions";
import * as XLSX from "xlsx";
import instance from "../../axios/axios-instance";

// interface DataType {
//   key: React.Key;
//   name: string;
//   age: number;
//   address: string;
// }

// const headers = [
//   { label: "Name", key: "name" },
//   { label: "Age", key: "age" },
//   { label: "Email", key: "email" },
// ];
interface Scheme {
  text: string;
  value: string;
}

let dataSource: any;
let ClaimURLAPI =
  "https://oyster-app-ejs5j.ondigitalocean.app/review/?format=json";
type AppDispatch = ThunkDispatch<any, unknown, AnyAction>;

const { Search } = Input;

const ReviewClaimsTable: React.FC<any> = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const dataClaims = useSelector((state: any) => state?.claims);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isModalOpenPayment, setIsModalOpenPayment] = useState<boolean>(false);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [tableHeaders, setTableHeaders] = useState<any[]>([]);
  const [searhTerm, setSearhTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 10; // Number of items per page
  const startIdx = (currentPage - 1) * pageSize;
  const endIdx = startIdx + pageSize;
  const isNextDisabled = !dataClaims?.next; // Check if "next" link is null
  const isPrevDisabled = !dataClaims?.previous; // Check if "previous" link is null
  const [schemes, setSchemes] = useState<Scheme[]>([]); // State to hold schemes data

  const columns: ColumnsType<any> = [
    {
      title: "Assessor",
      width: 100,
      dataIndex: "informant_name",
      key: "name",
      fixed: "left",
      filters: [
        {
          text: "Joe",
          value: "Joe",
        },
        {
          text: "John",
          value: "John",
        },
      ],
      onFilter: (value: string | number | boolean, record) => {
        if (typeof value === "boolean") {
          return record.informant_name.indexOf(value.toString()) === 0;
        }
        return record.informant_name.indexOf(value.toString()) === 0;
      },
    },
    {
      title: "Claim Number",
      width: 100,
      dataIndex: "policy_number",
      key: "age",
      fixed: "left",
      sorter: true,
    },
    {
      title: "Deceased Name & Surname",
      dataIndex: "deceased_name",
      key: "5",
      fixed: "left",
    },
    {
      title: "Payment Status",
      dataIndex: "payment_status",
      key: "9",
      fixed: "left",
      filters: [
        {
          text: "Joe",
          value: "Joe",
        },
        {
          text: "John",
          value: "John",
        },
      ],
      onFilter: (value: string | number | boolean, record) => {
        if (typeof value === "boolean") {
          return record.informant_name.indexOf(value.toString()) === 0;
        }
        return record.informant_name.indexOf(value.toString()) === 0;
      },
    },
    { title: "Policy No", dataIndex: "policy_number", key: "1" },
    {
      title: "Scheme Name",
      dataIndex: ["scheme_name", "name"],
      key: "2",
      fixed: "right",
      filters: schemes,
      onFilter: (value: string | number | boolean, record) => {
        const filtered = dataClaims?.results.filter((item: any) => {
          if (typeof value === "boolean") {
            return item.scheme_name?.name.indexOf(value.toString()) === 0;
          }
          return item.scheme_name?.name.indexOf(value.toString()) === 0;
        });

        dataSource = filtered;
        console.log(filtered);

        if (typeof value === "boolean") {
          return record.scheme_name?.name.indexOf(value.toString()) === 0;
        }
        return record.scheme_name?.name.indexOf(value.toString()) === 0;
      },
      onFilterDropdownVisibleChange: (visible: boolean) => {
        if (!visible) {
          setFilteredData(dataSource);
          console.log(dataSource.length);
        }
      },
    },
    { title: "Cover Amount (R)", dataIndex: "claim_amount", key: "3" },
    {
      title: "Principal Member",
      dataIndex: ["principal_member", "surname"],
      key: "4",
    },

    {
      title: "Date of Event",
      dataIndex: "inception_date",
      key: "6",
      filters: [
        {
          text: "Joe",
          value: "Joe",
        },
        {
          text: "John",
          value: "John",
        },
      ],
      onFilter: (value: string | number | boolean, record) => {
        if (typeof value === "boolean") {
          return record.informant_name.indexOf(value.toString()) === 0;
        }
        return record.informant_name.indexOf(value.toString()) === 0;
      },
    },
    {
      title: "Assessor status",
      dataIndex: "claim_status",
      key: "7",
      filters: [
        {
          text: "Joe",
          value: "Joe",
        },
        {
          text: "John",
          value: "John",
        },
      ],
      onFilter: (value: string | number | boolean, record) => {
        if (typeof value === "boolean") {
          return record.informant_name.indexOf(value.toString()) === 0;
        }
        return record.informant_name.indexOf(value.toString()) === 0;
      },
    },
    {
      title: "Reviewer Status",
      dataIndex: "review_status",
      key: "8",
      filters: [
        {
          text: "Joe",
          value: "Joe",
        },
        {
          text: "John",
          value: "John",
        },
      ],
      onFilter: (value: string | number | boolean, record) => {
        if (typeof value === "boolean") {
          return record.informant_name.indexOf(value.toString()) === 0;
        }
        return record.informant_name.indexOf(value.toString()) === 0;
      },
    },

    {
      title: "Closure Status",
      dataIndex: "claim_closure",
      key: "10",
      filters: [
        {
          text: "Joe",
          value: "Joe",
        },
        {
          text: "John",
          value: "John",
        },
      ],
      onFilter: (value: string | number | boolean, record) => {
        if (typeof value === "boolean") {
          return record.informant_name.indexOf(value.toString()) === 0;
        }
        return record.informant_name.indexOf(value.toString()) === 0;
      },
    },
    // { title: "Date Last Modified", dataIndex: "address", key: "11" },
    // { title: "Updated By", dataIndex: "address", key: "12" },
    { title: "Created At", dataIndex: "created", key: "13" },

    {
      title: "Action",
      key: "action",
      width: 150,
      fixed: "left",
      render: (text, record) => (
        <Space size="middle">
          {!record.isPaid && (
            <button className="btn btn-warning" onClick={() => handEdit()}>
              Edit
            </button>
          )}

          {record.claim_status?.name  === "Ready For Review" && (
            <button className="btn btn-warning" onClick={() => handleEdit()}>
              Review
            </button>
          )}

          {record.isPaid&& (
            <button
              className="btn btn-warning"
              onClick={() => handleApprovePayment()}
            >
              Payment
            </button>
          )}
        </Space>
      ),
    },
  ];

  const getScheme = async () => {
    try {
      const response = await instance.get(`underwriter/?format=json`);
      const array:
        | ((prevState: Scheme[]) => Scheme[])
        | { text: any; value: any }[] = [];

      response.data.forEach((element: { name: any }) => {
        const model = {
          text: element.name,
          value: element.name,
        };

        array.push(model);
      });

      setSchemes(array);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    dispatch(getClaims(ClaimURLAPI));
    getScheme();
  }, []);

  const handleEdit = () => {
    setIsModalOpen(true);
  };

  const handleApprovePayment = () => {
    setIsModalOpenPayment(true);
  };

  const handEdit = () => {
    navigate("/claim/add-new");
  };

  useEffect(() => {
    let header = [];
    let headers = columns.map((column) => ({
      label: column.title,
      key: column.key,
    }));
    header.push(headers);

    setTableHeaders(header);
  }, []);

  const handleClick = () => {
    navigate("/claim/add-new");
  };

  const handleClickReview = () => {
    navigate("/claims/review/paymnent");
  };

  const onSearch = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    const searchValue = event.target.value.toString().toLowerCase();
    const filtered = dataClaims?.results.filter((item: any) => {
      return Object.values(item).some((fieldValue) =>
        String(fieldValue).toLowerCase().includes(searchValue)
      );
    });

    setFilteredData(filtered); // Update the filteredData state with the filtered results
    setCurrentPage(1); // Reset the currentPage state to 1
    setSearhTerm(event.target.value);
  };

  // const dataSource =
  //   filteredData.length > 0 ? filteredData : dataClaims?.results;

  dataSource =
    filteredData.length > 0
      ? filteredData.slice(startIdx, endIdx)
      : dataClaims?.results?.slice(startIdx, endIdx);

  const handleNext = () => {
    dispatch(getClaims(dataClaims?.next));
  };

  const handlePrev = () => {
    dispatch(getClaims(dataClaims?.previous));
  };

  const handleExportToExcel = () => {
    // Define the headers to include in the Excel file
    const headers = [
      "date_claim_submission",
      "date_of_birth",
      "deceased_address",
      "deceased_cause_of_death",
      "deceased_date_of_death",
      "deceased_member",
      "deceased_name",
      "deceased_surname",
      "doctor_practice_number",
      "dr_Pathologist_nurse_name",
      "funeral_parlour",
      "gender",
      "gross_premium",
      "inception_date",
      "informant_name",
      "marital_status",
      "name_of_hospital",
    ];

    // Filter the dataSource to include only the required properties
    const filteredDataSource = dataSource.map(
      (record: { [x: string]: any }) => {
        let filteredRecord: any = {}; // Initialize filteredRecord for each record
        for (const header of headers) {
          filteredRecord[header] = record[header];
        }
        return filteredRecord;
      }
    );

    // Convert filteredDataSource to XLSX format
    const worksheet = XLSX.utils.json_to_sheet(filteredDataSource);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Claims");

    // Generate the XLSX file
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    // Convert the buffer to Blob
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    // Create a downloadable link for the Blob
    const url = URL.createObjectURL(blob);

    // Create a link element and set its attributes
    const a = document.createElement("a");
    a.href = url;
    a.download = "claims.xlsx"; // Set the desired file name

    // Append the link to the document body and click it to trigger the download
    document.body.appendChild(a);
    a.click();

    // Clean up by revoking the object URL
    URL.revokeObjectURL(url);
  };


  return (
    <>
      <div className="col-md-12">
        <div className="row">
          <div className="col-md-1 ">
            <button
              onClick={handleClick}
              type="submit"
              className="btn btn-primary btn-round"
            >
              Add New
            </button>
          </div>

          <div className="col-md-4 ">
            <button
              onClick={handleClickReview}
              type="submit"
              className="btn btn-warning"
            >
              Awaiting Payments
            </button>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h4 className="card-title">Review</h4>
          </div>
          <div className="search-container">
            <Search
              placeholder="Search by name"
              className="search-input"
              value={searhTerm}
              onChange={onSearch}
              style={{ width: 200 }}
            />

            <div style={{ float: "right", margin: "22px" }}>
              <button
                type="button"
                className="btn btn-primary btn-round export-btn"
                onClick={handleExportToExcel} // Attach the XLSX export function to the onClick event
              >
                Export to Excel / CSV
              </button>
            </div>
          </div>
          <div className="card-body">
            <Table<any>
              columns={columns}
              dataSource={dataSource}
              scroll={{ x: 1300 }}
            />

            <div style={{ textAlign: "center" }}>
              {/* <button onClick={handlePrev}>prev</button> */}
              <LeftOutlined
                disabled={isPrevDisabled}
                style={{
                  fontSize: "30px",
                  cursor: isPrevDisabled ? "not-allowed" : "pointer",
                }}
                onClick={handlePrev}
              />

              <RightOutlined
                style={{
                  fontSize: "30px",
                  cursor: isNextDisabled ? "not-allowed" : "pointer",
                }}
                onClick={handleNext}
                disabled={isNextDisabled}
              />
            </div>
          </div>
        </div>
      </div>
      <ClaimReviewModal isModalOpen={isModalOpen} />
      <PaymentForm isModalOpen={isModalOpenPayment} />
    </>
  );
};

export default ReviewClaimsTable;
