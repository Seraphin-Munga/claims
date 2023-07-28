// principalMemberActions.ts

import { ThunkAction } from "redux-thunk";
import axiosInstance from "../../axios/axios-instance";
import { IPrincipalMemember } from "../types/principalMember";
import { Alert } from "antd";

// Action Types
export const SET_MEMBER = "SET_MEMBER";
export const SET_ERROR = "SET_ERROR";
type ThunkResult<R> = ThunkAction<R, any, unknown, any>;

// Action Creators
export interface PrincipalMemberAction {
  type: typeof SET_MEMBER;
  payload: IPrincipalMemember;
}

// Action Creator for setting error
export interface SetErrorAction {
  type: typeof SET_ERROR;
  payload: string;
}

export const setMember = (
  memberDetail: IPrincipalMemember
): PrincipalMemberAction => ({
  type: SET_MEMBER,
  payload: memberDetail,
});

export const setError = (errorMessage: string): SetErrorAction => ({
  type: SET_ERROR,
  payload: errorMessage,
});

// Async Action Creator using redux-thunk for creating a principal member
export const createPrincipalMember = (memberData: any): ThunkResult<void> => {
  return async (dispatch) => {
    try {
      const response = await axiosInstance.post(
        "https://oyster-app-ejs5j.ondigitalocean.app/principal/?format=json",
        memberData
      );

      // Assuming the API response contains the newly created principal member data
      const newPrincipalMember: IPrincipalMemember = response.data;

      // Dispatch the "SET_MEMBER" action with the new principal member data
      dispatch(setMember(newPrincipalMember));

      // Optionally, you can add any success handling here, such as showing a success notification, etc.
    } catch (error: any) {
      // console.log(error.message);
      console.log(error.message);

      // Optionally, you can dispatch a failure action here or show an error notification to the user.
    }
  };
};

export const fetchPrincipalMembers = (): ThunkResult<void> => {
  return async (dispatch) => {
    try {
      const response = await axiosInstance.get(
        "https://oyster-app-ejs5j.ondigitalocean.app/principal/?format=json"
      );

      // Assuming the API response contains an array of principal members
      const principalMembers: any = response;
      dispatch(setMember(principalMembers));

      // Optionally, you can add any success handling here, such as updating the UI or performing additional actions.
    } catch (error: any) {
      console.log(error.message);
      // Optionally, you can dispatch a failure action here or show an error notification to the user.
    }
  };
};

// ... (your existing imports)
