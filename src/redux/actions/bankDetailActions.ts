import { IBankDetail } from "../types/bankDetail";


// Action Types
export const SET_BANK_DETAIL = "SET_BANK_DETAIL";

// Action Creators
export interface SetBankDetailAction {
  type: typeof SET_BANK_DETAIL;
  payload: IBankDetail;
}

export const setBankDetail = (bankDetail: IBankDetail): SetBankDetailAction => ({
  type: SET_BANK_DETAIL,
  payload: bankDetail,
});
