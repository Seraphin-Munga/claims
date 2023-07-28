import { IPolicy } from "../types/Policy";

// Action Types
export const SET_POLICY = "SET_POLICY";

// Action Creators
export interface PolicyAction {
  type: typeof SET_POLICY;
  payload: IPolicy;
}

export const setPolicy= (policy: IPolicy): PolicyAction => ({
  type: SET_POLICY,
  payload: policy,
});
