import { Reducer } from 'redux';
import { ActionTypes, ICourseState, ICourse, ILesson } from './types';
import { IActionPayload } from '../commonTypes';

const initialState: ICourseState = {
    courses: [],
}

export const coursesReducer: Reducer<ICourseState> = (state = initialState, action: IActionPayload<ActionTypes, ICourseState>) => {
    switch (action.type) {
        case ActionTypes.FETCH_COURSES:
            return { ...state, courses: action.payload.courses };
        default:
            return state;
    }
}

