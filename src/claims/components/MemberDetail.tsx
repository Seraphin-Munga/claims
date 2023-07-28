import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { setMememberkDetail } from "../../redux/actions/MemberDetailAction";
import { MemberDetail } from "../../redux/types/MemberDetail";
import { AutoComplete, SelectProps } from "antd";
import PrincipalMember from "../../principalMember/Create";
import ClaimantCreate from "../../claimant/Create";
import { fetchPrincipalMembers } from "../../redux/actions/PrincipalMemberAction";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { fetchClaimants } from "../../redux/actions/ClaimantActions";
import { DefaultOptionType } from "antd/es/select";
import instance from "../../axios/axios-instance";
interface ClearProps {
  isInput: boolean | false;
}

type AppDispatch = ThunkDispatch<any, unknown, AnyAction>;

const MememberDetail: React.FC<ClearProps> = (ClearProps) => {
  // const dispatch = useDispatch();
  const dispatch = useDispatch<AppDispatch>();
  const data = useSelector((state: any) => state?.prinicpalMember);
  const claimantData = useSelector((state: any) => state?.claimant);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenClaimant, setIsModalClimant] = useState(false);
  const [deceasedType, setDeceasedType] = useState("");
  const [productType, setProductType] = useState("");
  const [claimant, setClaimant] = useState("");
  const [principalMember, setPrincipalMember] = useState("");
  const [informantRelation, setInformantRelation] = useState("");
  const [informantName, setInformantName] = useState("");
  const [productTypes, setProductTypes] = useState([]);

  const [value, setValue] = useState("");
  const [options, setOptions] = useState<SelectProps<object>["options"]>([]);
  const [valueClaimant, setValueClaimant] = useState("");
  const [optionsClaimant, setOptionsClaimant] = useState<
    SelectProps<object>["options"]
  >([]);

  const onChange = (data: string) => {
    setValue(data);
  };

  const onChangeClaimant = (data: string) => {
    setValueClaimant(data);
  };
  useEffect(() => {
    if (ClearProps.isInput) {
      setDeceasedType("");
      setProductType("");
      setClaimant("");
      setPrincipalMember("");
      setInformantRelation("");
      setInformantName("");
      setValueClaimant("");
      setValue("");
    }

    // setIClearInputs(false);
  }, [ClearProps.isInput]);

  const getPanelValue = (searchTerm: string): any => {
    const results = options?.filter((x) => x.value == searchTerm);

    if (results?.length == 0) {
      setIsModalOpen(false);
      return [
        {
          value: "",
          label: (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span>
                <a onClick={OpenModal} rel="noopener noreferrer">
                  No Results
                </a>
              </span>
            </div>
          ),
        },
      ];
    } else {
      return results;
    }
  };

  const getPanelValueClaim = (searchTerm: string): any => {
    const results = optionsClaimant?.filter((x) => x.value == searchTerm);

    if (results?.length == 0) {
      setIsModalClimant(false);
      return [
        {
          value: "",
          label: (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span>
                <a onClick={OpenModalClaimant} rel="noopener noreferrer">
                  No Results
                </a>
              </span>
            </div>
          ),
        },
      ];
    } else {
      return results;
    }
  };

  const OpenModal = () => {
    setIsModalOpen(true);
  };
  const OpenModalClaimant = () => {
    setIsModalClimant(true);
  };

  useEffect(() => {
    // fetchPrincipalMembers();
    dispatch(fetchClaimants());
    dispatch(fetchPrincipalMembers());
  }, [isModalOpen]);

  useEffect(() => {
    const claims:
      | React.SetStateAction<DefaultOptionType[] | undefined>
      | { value: string; label: string }[] = [];

    const claimants = claimantData;

    claimants?.forEach(
      (element: { surname_of_claimant: any; id_of_claimant: any }) => {
        const model = {
          value: `${element?.surname_of_claimant}(${element?.id_of_claimant})`,
          label: `${element?.surname_of_claimant}(${element?.id_of_claimant})`,
        };

        claims.push(model);
      }
    );

    setOptionsClaimant(claims);
  }, [claimantData]);

  const getProducts = async () => {
    try {
      const response = await instance.get(`product-types/?format=json`);
      setProductTypes(response.data);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    const prinicepals = [];
    const principaleData = data?.data;

    for (let index = 0; index < principaleData?.length; index++) {
      const model = {
        value: `${principaleData[index]?.full_names}(${principaleData[index]?.id_number})`,
        label: `${principaleData[index]?.full_names}(${principaleData[index]?.id_number})`,
      };

      prinicepals.push(model);
    }

    setOptions(prinicepals);
  }, [data]);

  useEffect(() => {
    const principalID = data?.data?.filter(
      (x: { id_number: string }) => x.id_number === value.replace(/\D/g, "")
    )[0]?.id;

    const claimantID = claimantData?.filter(
      (x: { id_number: string }) =>
        x.id_number === valueClaimant.replace(/\D/g, "")
    )[0]?.id;

    const model: MemberDetail = {
      deceasedMemberType: deceasedType,
      productTypes: productType,
      claimant: parseInt(claimantID),
      principalMember: parseInt(principalID),
      informantName: informantRelation,
    };

    dispatch(setMememberkDetail(model));
  }, [
    deceasedType,
    productType,
    claimant,
    principalMember,
    informantRelation,
    value,
    valueClaimant,
  ]);

  return (
    <div className="row">
      <div
        className="col-md-6 flex"
        id="frontdeceased_informant"
        style={{
          display: deceasedType !== "" ? "block" : "none",
        }}
      >
        <div className="form-group">
          <label htmlFor="informant_name">Principal Member</label>

          <AutoComplete
            value={value}
            options={options}
            style={{ width: "100%" }}
            onSearch={(text) => setOptions(getPanelValue(text))}
            onChange={onChange}
            placeholder="Principal Member"
          />
        </div>
      </div>

      <div className="col-md-4 flex" id="frontdeceased_informant">
        <div className="form-group">
          <label htmlFor="informant_name">Select Deceased Member Type</label>
          <select
            className="form-control"
            id="relation_to_deceased"
            placeholder="---------"
            aria-label="Informant Relation To Deceased"
            value={deceasedType}
            onChange={(e) => setDeceasedType(e.target.value)}
          >
            <option value="">---------</option>
            <option value="Child">Child</option>
            <option value="Spouse">Spouse</option>
            <option value="Principal Member">Principal Member</option>
            <option value="Extended Member">Extended Member'</option>
          </select>
        </div>
      </div>
      <div className="col-md-6">
        <div className="form-group">
          <label htmlFor="product_type">Product Types</label>
          <select
            className="form-control"
            id="product_type"
            placeholder="---------"
            aria-label="Product Types"
            value={productType}
            onChange={(e) => setProductType(e.target.value)}
          >
            <option value="">---------</option>
            {productTypes.map((product: any) => (
              <option key={product.id} value={product.name}>
                {product.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div
        className="col-md-4"
        id="claimant_principa_deceased"
        style={{
          display: deceasedType == "Principal Member" ? "block" : "none",
        }}
      >
        <div className="form-group">
          <label htmlFor="claimant">Claimant</label>

          <AutoComplete
            value={valueClaimant}
            options={optionsClaimant}
            style={{ width: "100%" }}
            onSearch={(text) => setOptionsClaimant(getPanelValueClaim(text))}
            onChange={onChangeClaimant}
            placeholder="Claimant"
          />

          {/* <select
            className="form-control"
            id="claimant"
            placeholder="---------"
            aria-label="Claimant"
            value={claimant}
            onChange={(e) => setClaimant(e.target.value)}
          >
            <option value="">---------</option>
            <option value="claimant1">Claimant 1</option>
            <option value="claimant2">Claimant 2</option>
          </select> */}
        </div>
      </div>
      {/* 
      <div
        className="col-md-4"
        id="principal"
        style={{ display: deceasedType === "type1" ? "block" : "none" }}
      >
        <div className="form-group">
          <label htmlFor="principal_member">Principal Member</label>
          <select
            className="form-control"
            id="principal_member"
            placeholder="---------"
            aria-label="Principal Member"
            value={principalMember}
            onChange={(e) => setPrincipalMember(e.target.value)}
          >
            <option value="">---------</option>
            <option value="member1">Member 1</option>
            <option value="member2">Member 2</option>
          </select>
        </div>
      </div> */}

      <div className="col-md-4 flex" id="frontdeceased_informant">
        <div className="form-group">
          <label htmlFor="informant_name">Informant Name</label>
          <input
            type="text"
            className="form-control"
            value={informantName}
            onChange={(e) => setInformantName(e.target.value)}
            id="informant_name"
            required
            placeholder="Informant Name"
          />
        </div>
      </div>

      <div className="col-md-6">
        <div className="form-group">
          <label htmlFor="relation_to_deceased">
            Informant Relation To Deceased
          </label>
          <select
            className="form-control"
            id="relation_to_deceased"
            placeholder="---------"
            aria-label="Informant Relation To Deceased"
            value={informantRelation}
            onChange={(e) => setInformantRelation(e.target.value)}
          >
            <option value="">---------</option>
            <option value="Grandfather">Grandfather</option>
            <option value="Grandmother">Grandmother</option>
            <option value="Father">Father</option>
            <option value="Mother">Mother</option>
            <option value="Brother">Brother</option>
            <option value="Sister">Sister</option>
            <option value="Son">Son</option>
            <option value="Daughter">Daughter</option>
            <option value="In-Laws">In-Laws</option>
            <option value="Other">Other</option>
            <option value="Spouse">Spouse</option>
          </select>
        </div>
      </div>

      <PrincipalMember isModalOpen={isModalOpen} />
      <ClaimantCreate isModalOpen={isModalOpenClaimant} />
    </div>
  );
};
const connector = connect(null, { fetchPrincipalMembers });
export default connector(MememberDetail);
