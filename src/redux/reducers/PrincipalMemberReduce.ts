import { PrincipalMemberAction, SET_ERROR, SET_MEMBER } from "../actions/PrincipalMemberAction";
import { IPrincipalMemember } from "../types/principalMember";

const initialState: IPrincipalMemember = {
  full_names: "",
  surname: "",
  country: "none",
  id_number: "",
  passport: "",
  date_of_birth: "",
  gender: "",
  birth_country: "",
  risk_status: "",
  termination_date: "",
  contact_number: "",
  address: "",
};

type Action = PrincipalMemberAction | any ;

const PrincipalMemberReduce = (
  state = initialState,
  action: Action
): IPrincipalMemember => {
  switch (action.type) {
    case SET_MEMBER:
      return {
        ...state,
        ...action.payload,
      };
    case SET_ERROR:
        return {
          ...state,
          ...action.payload,
        };
    default:
      return state;
  }
};

export default PrincipalMemberReduce;
