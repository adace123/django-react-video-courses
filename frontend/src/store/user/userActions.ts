import { Action, ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { ActionTypes, IUserState, IUser, NullUser, IAuthError } from './types';

interface IFetchUserDetailsAction extends Action {
    type: ActionTypes.FETCH_AUTH_STATE,
    payload: {
        currentUser: IUser
    }
}

export const fetchUserDetails: ActionCreator<IFetchUserDetailsAction> = () => {
    const user: string | null = window.localStorage.getItem('currentUser');
    return {
        type: ActionTypes.FETCH_AUTH_STATE,
        payload: {
            currentUser: user ? JSON.parse(user) as IUser : new NullUser()
        }
    }
}

export const login: ActionCreator<ThunkAction<Promise<Action>, IUserState, null, Action<IUserState | IAuthError>>> = (user: IUserState) => {
    return async (dispatch: Dispatch) => {
        const response = await fetch('http://127.0.0.1:8000/api/auth/login', {method: 'POST', body: JSON.stringify(user)});
        const userDetails = await response.json();
        if (response.ok) {
            window.localStorage.setItem('currentUser', userDetails);
            return dispatch({
                type: ActionTypes.LOGIN,
                payload: userDetails
            });
        }

        return dispatch({
            type: ActionTypes.AUTH_ERROR,
            payload: {
                errorMessage: 'Incorrect username or password',
                statusCode: response.status
            }
        });
    }
}
