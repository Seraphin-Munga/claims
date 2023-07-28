import { ThunkAction } from "redux-thunk";
import axiosInstance from "../../axios/axios-instance";
import instance from "../../axios/axios-instance";

export const initialState = {
  claims: [],
};

// Action Types
export const ADD_CLAIM = "ADD_CLAIM";
export const REMOVE_CLAIM = "REMOVE_CLAIM";
export const CLEAR_CLAIMS = "CLEAR_CLAIMS"; // Add the new action type value
export const ADD_CLAIMS = "ADD_CLAIMS";

type ThunkResult<R> = ThunkAction<R, any, unknown, any>;

export const ADD_CLAIM_FAILURE = "ADD_CLAIM_FAILURE";

// Action Creator for Failure
export interface AddClaimFailureAction {
  type: typeof ADD_CLAIM_FAILURE;
  payload: string; // error message
}

export const addClaimFailure = (
  errorMessage: string
): AddClaimFailureAction => ({
  type: ADD_CLAIM_FAILURE,
  payload: errorMessage,
});

// Action Creators
export const addClaim = (newClaim: any) => ({
  type: ADD_CLAIM,
  payload: newClaim,
});

export const addClaims = (newClaim: any) => ({
  type: ADD_CLAIMS,
  payload: newClaim,
});

export const removeClaim = (claimId: any) => ({
  type: REMOVE_CLAIM,
  payload: claimId,
});

export const clearClaims = () => ({
  type: CLEAR_CLAIMS,
});

export const getClaims = (url: string): ThunkResult<void> => {
  return async (dispatch) => {
    try {
      // Make a POST request to your API endpoint
      const response = await instance.get(`${url}`);
      // Assuming the API response contains the new claim data
      const newClaim: any = response.data;

      // Dispatch the "ADD_CLAIM" action with the new claim data
      dispatch(addClaims(newClaim));

      // Optionally, you can add any success handling here, such as showing a success notification, etc.
    } catch (error: any) {
      console.log(error.message);

      // Dispatch the "ADD_CLAIM_FAILURE" action with the error message
      dispatch(addClaimFailure("Failed to create a new claim."));

      // Optionally, you can show an error notification to the user.
    }
  };
};

export const claimCapture = (model: any): ThunkResult<void> => {
  return async (dispatch) => {
    try {
      // Make a POST request to your API endpoint
      const response = await instance.post(
        "https://oyster-app-ejs5j.ondigitalocean.app/?format=json",
        model
      );
      // Assuming the API response contains the new claim data
      const newClaim: any = response.data;

      // Dispatch the "ADD_CLAIM" action with the new claim data
      // dispatch(addClaim(newClaim));
      dispatch(addClaims(newClaim));

      // Optionally, you can add any success handling here, such as showing a success notification, etc.
    } catch (error: any) {
      console.log(error.message);

      // Dispatch the "ADD_CLAIM_FAILURE" action with the error message
      dispatch(addClaimFailure("Failed to create a new claim."));

      // Optionally, you can show an error notification to the user.
    }
  };
};
