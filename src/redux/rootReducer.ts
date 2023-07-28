// rootReducer.ts

import { combineReducers } from "redux";
import { bankDetailReducer } from "./reducers/bankDetailReducer";
import MemberDetailReducer from "./reducers/MemberDetailReducer";
import EventDetailReducer from "./reducers/EventDetailReducer";
import DeceasedDetailsReducer from "./reducers/DeceasedDetailsReducer";
import PolicyReducer from "./reducers/PolicyReducer";
import ClaimReducer from "./reducers/ClaimsReducer";
import PrincipalMemberReduce from "./reducers/PrincipalMemberReduce";
import { ClaimantReducer } from "./reducers/ClaimantReducer";
import authReducer from "./reducers/auth.reducers";

// Import other reducers

const rootReducer = combineReducers({
  claims: ClaimReducer,
  banks: bankDetailReducer,
  deceased: DeceasedDetailsReducer,
  prinicpalMember: PrincipalMemberReduce,
  event: EventDetailReducer,
  memeber: MemberDetailReducer,
  policy: PolicyReducer,
  claimant: ClaimantReducer,
  login: authReducer
});

export default rootReducer;
