import * as React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { IAppState } from '../store/commonTypes';
import { fetchCourses } from '../store/courses/courseActions';
import { Link, withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import { ICourse } from '../store/courses/types';
import { IUser } from '../store/user/types';
import { CommonLink } from '../common/styles';
import { slugify } from '../common/utils';

const LessonLink = styled(CommonLink)`
    font-size: 16px;
`;

interface ICourseDetailsProps {
    fetchCourses: (membership: string) => void;
    currentUser: IUser;
    courses: ICourse[];
}

class CourseDetails extends React.Component<ICourseDetailsProps & RouteComponentProps, {}> {

    public async componentDidMount() {
        const { url } = this.props.match;
        const splitURL = url.split("/");
        const matchingCourse = this.props.courses.filter(c => slugify(c.title) === splitURL[splitURL.length - 1])[0];
        this.setState({ course: matchingCourse });
    }

    public render() {
        const { courses } = this.props;
        const { url } = this.props.match;
        const splitURL = url.split('/');
        const courseName = splitURL[splitURL.length - 1];
        let course = null;
        if (courses.length) {
            const matchingCourses = courses.filter(c => slugify(c.title) === courseName);
            course = matchingCourses[0];
        }
        return (
            <div>
                {course ? <>
                <h2>{course.title}</h2>
                <h3>{course.description}</h3>
                <h4>Lessons:</h4>
                {
                    course.lessons.map((lesson, i) => 
                    <LessonLink key={i}><Link to={{pathname:`${url}/${slugify(lesson.title)}`}}>{lesson.title}</Link></LessonLink>)
                }
                </> : <h3>Loading...</h3>}
            </div>
        )
    }
}

const mapStateToProps = (state: IAppState) => {
    return { courses: state.courses.courses, currentUser: state.userState.currentUser };
}

export default connect(mapStateToProps, { fetchCourses })(withRouter(CourseDetails));
