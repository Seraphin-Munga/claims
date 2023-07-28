import {
  SET_BANK_DETAIL,
  SetBankDetailAction,
} from "../actions/bankDetailActions";
import { IBankDetail } from "../types/bankDetail";

const initialState: IBankDetail = {
  BankName: "",
  AccountType: "",
  AccountHolder: "",
  AccountHolderIDType: "",
  AccountNumber: "",
  ClaimStatus: false,
  Notes: "",
};

export const bankDetailReducer = (
  state = initialState,
  action: SetBankDetailAction
): IBankDetail => {
  switch (action.type) {
    case SET_BANK_DETAIL:
      return { ...state, ...action.payload };
    // Handle other action types
    default:
      return state;
  }
};
