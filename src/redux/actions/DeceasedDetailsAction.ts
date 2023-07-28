import { IDeceasedDetails } from "../types/DeceasedDetails";


export const SET_DECEASED_DATA = "SET__DATA";

export interface SetDeceasedDataAction {
  type: typeof SET_DECEASED_DATA;
  payload: IDeceasedDetails;
}

export const setFormData = (formData: IDeceasedDetails): SetDeceasedDataAction => {
  return {
    type: SET_DECEASED_DATA,
    payload: formData,
  };
};
