import { ThunkAction } from "redux-thunk/es/types";
import instance from "../../axios/axios-instance";

type ThunkResult<R> = ThunkAction<R, any, unknown, any>;

// Action Types
export const SET_CLAIMANT = "SET_CLAIMANT";

// Action Creators
export interface SetClaimantAction {
  type: typeof SET_CLAIMANT;
  payload: any[];
}

export const setClaimant = (claimant: any[]): SetClaimantAction => ({
  type: SET_CLAIMANT,
  payload: claimant,
});

export const fetchClaimants = (): ThunkResult<void> => {
  return async (dispatch) => {
    try {
      const response = await instance.get(
        "https://oyster-app-ejs5j.ondigitalocean.app/claimant/?format=json"
      );
      // Assuming the API response contains an array of principal members
      const claimants: any = response.data;
      dispatch(setClaimant(claimants));

      // Optionally, you can add any success handling here, such as updating the UI or performing additional actions.
    } catch (error: any) {
      console.log(error);
      // Optionally, you can dispatch a failure action here or show an error notification to the user.
    }
  };
};

export const createClaimant = (model: any): ThunkResult<void> => {
  return async (dispatch) => {
    try {
      const response = await instance.post(
        "https://oyster-app-ejs5j.ondigitalocean.app/claimant/?format=json",
        model
      );

      // Assuming the API response contains the newly created principal member data

      const claimant: any = response;
      // Dispatch the "SET_MEMBER" action with the new principal member data
      dispatch(setClaimant(claimant));

      // Optionally, you can add any success handling here, such as showing a success notification, etc.
    } catch (error: any) {
      // console.log(error.message);
      console.log(error);

      // Optionally, you can dispatch a failure action here or show an error notification to the user.
    }
  };
};
