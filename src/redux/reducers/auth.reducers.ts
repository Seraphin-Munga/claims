import { Reducer } from 'redux';
import { AuthAction } from '../actions/auth.actions';
import { IUser } from '../../core/user';

interface AuthState {
  isLoggedIn: boolean;
  user: IUser | null;
  error: string | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  user: null,
  error: null,
};

const authReducer: Reducer<AuthState, AuthAction> = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_REQUEST':
      return {
        ...state,
        isLoggedIn: false,
        error: null,
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload.user,
        error: null,
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        isLoggedIn: false,
        user: null,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default authReducer;
