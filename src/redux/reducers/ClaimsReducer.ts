import {
  ADD_CLAIM,
  ADD_CLAIMS,
  CLEAR_CLAIMS,
  REMOVE_CLAIM,
} from "../actions/ClaimsActions";

interface Claim {
  id: string; // Change 'string' to the actual type of your claim IDs
  // Add other properties for each claim as needed
}

interface State {
  claims: Claim[]; // Use the 'Claim' interface for claims
}

interface AddClaimAction {
  type: typeof ADD_CLAIM;
  payload: Claim; // 'payload' is now of type 'Claim'
}

interface ClearClaimsAction {
  type: typeof CLEAR_CLAIMS;
}

interface RemoveClaimAction {
  type: typeof REMOVE_CLAIM;
  payload: string; // Change 'string' to the actual type of your claim ID
}

interface AddClaimsAction {
  type: typeof ADD_CLAIMS;
  payload: any; // 'payload' is now an array of 'Claim'
}

type Action =
  | AddClaimAction
  | RemoveClaimAction
  | ClearClaimsAction
  | AddClaimsAction;

const initialState: State = {
  claims: [],
};

const ClaimReducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case ADD_CLAIM:
      return {
        ...state,
        claims: [...state.claims, action.payload],
      };
    case REMOVE_CLAIM:
      return {
        ...state,
        claims: state.claims.filter((claim) => claim.id !== action.payload),
      };
    case CLEAR_CLAIMS:
      return {
        ...state,
        claims: [],
      };
    case ADD_CLAIMS:
      return { ...state, ...action.payload };
  
    default:
      return state;
  }
};

export default ClaimReducer;
