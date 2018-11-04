import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { IAppState } from '../store/commonTypes';
import { ICourse } from '../store/courses/types';
import { slugify } from '../common/utils';

interface ILessonDetailProps {
    courses: ICourse[];
}

type LessonProps = ILessonDetailProps & RouteComponentProps;

const LessonDetails: React.SFC<LessonProps> = ({ location, courses }) => {
    const splitPath = location.pathname.split("/");
    const lessonName = splitPath[splitPath.length - 1];
    const courseName = splitPath[splitPath.length - 2];
    let lesson = null;
    if (courses.length) {
        courses = courses.filter(c => slugify(c.title) === courseName);
        const matchingLessons = courses[0].lessons.filter(l => slugify(l.title) === lessonName);
        lesson = matchingLessons[0];
    }
    return (
        <div>
            {
                lesson ? <div>
                    <h1>{lesson.title}</h1>
                    <iframe src={lesson.video_url} height="300" width="500"/>
                    </div>
                 : <h4>Loading...</h4>
            }
        </div>
    )
}

const mapStateToProps = ({ courses }: IAppState) => {
    return { courses: courses.courses };
}

export default connect(mapStateToProps, null)(withRouter(LessonDetails));
