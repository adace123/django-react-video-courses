export enum ActionTypes {
    FETCH_COURSES = 'FETCH_COURSES',
}

export interface ILesson {
    readonly title: string;
    readonly video_url: string;
    readonly course: string;
}

export interface ICourse {
    readonly id: number;
    readonly title: string;
    readonly description: string;
    readonly lessons: ILesson[];
}

export enum MembershipType {
    FREE = "Free",
    PROFESSIONAL = "Professional",
    ENTERPRISE = "Enterprise"
}

export interface IMembership {
    readonly membership_type: MembershipType;
    readonly price: number;
    readonly courses: ICourse[];
}

export interface ICourseState {
    courses: ICourse[];
}
