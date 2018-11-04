import { ICourse, MembershipType } from '../courses/types';

export enum ActionTypes {
    FETCH_AUTH_STATE = 'FETCH_AUTH_STATE',
    LOGIN = 'LOGIN',
    REGISTER = 'REGISTER',
    LOGOUT = 'LOGOUT',
    CHANGE_MEMBERSHIP_TYPE = 'CHANGE_MEMBERSHIP_TYPE',
    AUTH_ERROR = 'AUTH_ERROR',
}

export interface IUser {
    readonly email: string;
    readonly loggedIn: boolean;
    readonly membership: MembershipType;
    readonly created: Date | undefined;
    readonly token: string;
}

export interface IAuthError {
    errorMessage: string;
    statusCode: number;
}

export interface IUserState {
    currentUser: IUser;
}

export class NullUser implements IUser {
    public loggedIn = false;
    public membership = MembershipType.FREE;
    public email = '';
    public created = undefined;
    public token = '';
}
