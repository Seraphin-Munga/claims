import { SetClaimantAction, SET_CLAIMANT } from "../actions/ClaimantActions";
import { IClaimant } from "../types/Claimant";

const initialState: IClaimant = {
  name_of_claimant: "",
  surname_of_claimant: "",
  id_type: "none",
  id_of_claimant: "",
  passport: "",
  date_of_birth: "",
  gender: "",
  birth_country: "",
  residence_country: "",
  contact_number: "",
  address: "",
};

export const ClaimantReducer = (
  state = [],
  action: SetClaimantAction
): any => {
  
  switch (action.type) {

    case SET_CLAIMANT:
      return action.payload
    // Handle other action types
    default:
      return state;
  }
};
