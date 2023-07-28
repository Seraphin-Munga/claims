import {
  EventDetailAction,
  SET_EVENT_DETAIL,
} from "../actions/EventDetailAction";
import { IEventDetail } from "../types/EventDetail";



const initialState: IEventDetail = {
  sourceOfFunds: "",
  taxReference: "",
  natureOfIncome: "",
  placeOfDeath: "",
  nameOfHospital: "",
  drNursePathologist: "",
  drNursePathologistPracticeNumber: "",
  funeralParlour: "",
  chiefsName: "",
  chiefsPhoneNumber: "",
  dha1663: "",
  dha1680: "",
  deathCertificateIssuedByUser: "",
  haThatIssuedDeathCertificate: "",
};

type Action = EventDetailAction;

const EventDetailReducer = (
  state = initialState,
  action: Action
): IEventDetail => {
  switch (action.type) {
    case SET_EVENT_DETAIL:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default EventDetailReducer;
