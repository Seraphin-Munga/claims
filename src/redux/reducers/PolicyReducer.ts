import { PolicyAction, SET_POLICY } from "../actions/PolicyAction";
import { IPolicy } from "../types/Policy";


  
  const initialState: IPolicy = {
    schemeName: 0,
    insurerName: '',
    schemeEmail: '',
    policyNumber: '',
    claimAmount: 0,
    grossPremium: 0,
    inceptionDate: '',
    dateClaimSubmission: '',
  };
  
  type Action = PolicyAction;
  
  const PolicyReducer = (
    state = initialState,
    action: Action
  ): IPolicy => {
    switch (action.type) {
      case SET_POLICY:
        return {
          ...state,
          ...action.payload,
        };
      default:
        return state;
    }
  };
  
  export default PolicyReducer;
  