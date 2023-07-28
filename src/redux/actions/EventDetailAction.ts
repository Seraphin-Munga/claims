import { IEventDetail } from "../types/EventDetail";



// Action Types
export const SET_EVENT_DETAIL = "SET_EVENT_DETAIL";

// Action Creators
export interface EventDetailAction {
  type: typeof SET_EVENT_DETAIL;
  payload: IEventDetail;
}

export const setEventDetail = (eventDetail: IEventDetail): EventDetailAction => ({
  type: SET_EVENT_DETAIL,
  payload: eventDetail,
});
