import { Reducer } from 'redux';
import { IActionPayload } from '../commonTypes';
import { IUserState, IAuthError, ActionTypes, NullUser } from './types';

const initialState: IUserState & IAuthError = {
    currentUser: new NullUser(),
    errorMessage: '',
    statusCode: 200
};

export const userReducer: Reducer<IUserState & IAuthError> = (state: IUserState & IAuthError = initialState, action: IActionPayload<ActionTypes, IUserState & IAuthError>) => {
    switch (action.type) {
        case ActionTypes.LOGIN:
        case ActionTypes.FETCH_AUTH_STATE:
        case ActionTypes.REGISTER:
            return {...state, currentUser: action.payload.currentUser};
        case ActionTypes.AUTH_ERROR:
            return {...state, errorMessage: action.payload.errorMessage, statusCode: action.payload.statusCode};
        default:
            return state;
    }
}
