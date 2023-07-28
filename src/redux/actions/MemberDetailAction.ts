import { MemberDetail } from "../types/MemberDetail";

;


// Action Types
export const SET_MEMBER_DETAIL = "SET_MEMBER_DETAIL";

// Action Creators
export interface MemberDetailAction {
  type: typeof SET_MEMBER_DETAIL;
  payload: MemberDetail;
}

export const setMememberkDetail = (memberDetail: MemberDetail): MemberDetailAction => ({
  type: SET_MEMBER_DETAIL,
  payload: memberDetail,
});
