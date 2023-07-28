import {
  SET_DECEASED_DATA,
  SetDeceasedDataAction,
} from "../actions/DeceasedDetailsAction";
import { IDeceasedDetails } from "../types/DeceasedDetails";


const initialState: IDeceasedDetails = {
  deceasedSurname: "",
  deceasedName: "",
  maritalStatus: "",
  deceasedDateOfDeath: "",
  deceasedIdType: "",
  deceasedIdNumber: "",
  deceasedPassportNumber: "",
  deceasedDlNumber: "",
  deceasedGender: "",
  deceasedRace: "",
  deceasedNationality: "",
  deceasedDateOfBirth: "",
  deceasedAgeAtDeath: "",
  deceasedOccupation: "",
  deceasedResidentialAddress: "",
  deceasedPostalAddress: "",
};

type Action = SetDeceasedDataAction;

const DeceasedDetailsReducer = (
  state = initialState,
  action: Action
): IDeceasedDetails => {
  switch (action.type) {
    case SET_DECEASED_DATA:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default DeceasedDetailsReducer;
