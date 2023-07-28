import {
  MemberDetailAction,
  SET_MEMBER_DETAIL,
} from "../actions/MemberDetailAction";
import { MemberDetail } from "../types/MemberDetail";

const initialState: MemberDetail = {
  deceasedMemberType: "",
  productTypes: "",
  claimant: 0,
  principalMember: 0,
  informantName: "",
};

type Action = MemberDetailAction;

const MemberDetailReducer = (
  state = initialState,
  action: Action
): MemberDetail => {
  switch (action.type) {
    case SET_MEMBER_DETAIL:
      return {
        ...state,
        ...action.payload,
      };
      
    default:
      return state;
  }
};

export default MemberDetailReducer;
