import { ICourseState } from './courses/types';
import { IUserState } from './user/types';

export interface IActionPayload<T, P> {
    type: T;
    payload: P;
}

export interface IAppState {
    courses: ICourseState;
    userState: IUserState;
}
