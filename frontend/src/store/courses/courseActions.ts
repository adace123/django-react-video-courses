import { Action, ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { ActionTypes, IMembership, MembershipType, ILesson, ICourse } from './types';

export const fetchCourses: ActionCreator<
ThunkAction<Promise<Action>, IMembership, null, Action<IMembership>>> = (membershipType: string = MembershipType.FREE) => {
    return async (dispatch: Dispatch) => {
        const response = await fetch(`http://127.0.0.1:8000/api/memberships/${membershipType}`);
        const courses = await response.json();
        return dispatch({
            type: ActionTypes.FETCH_COURSES,
            payload: courses
        });
    }
}
