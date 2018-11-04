import * as React from 'react';
import styled from 'styled-components';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchCourses } from '../store/courses/courseActions';
import { fetchUserDetails } from '../store/user/userActions';
import { IAppState } from '../store/commonTypes';
import { ICourse } from '../store/courses/types';
import { CommonLink } from '../common/styles';
import { slugify } from '../common/utils';
import { IUser } from 'src/store/user/types';

interface ICourseListProps {
    courses: ICourse[];
    currentUser: IUser;
    fetchCourses: (membershipType: string) => void;
    fetchUserDetails: () => void;
}

class CourseList extends React.Component<ICourseListProps & RouteComponentProps, {}> {

    public render() {
        const { courses } = this.props;
        return (
            <div>
                <h1>Course List View</h1>
                <ul style={{padding: 0}}>
                    {
                        courses.length ? courses.map((course: ICourse, i: number) => 
                        <CommonLink key={i}>
                            <Link to={`courses/${slugify(course.title)}`}>{course.title}</Link>
                        </CommonLink>
                        ) : <h3>Loading...</h3>
                    }
                </ul>
            </div>
        );
    }
}

const mapStateToProps = (state: IAppState) => {
    return { courses: state.courses.courses, currentUser: state.userState.currentUser };
}

export default connect(mapStateToProps, { fetchCourses, fetchUserDetails })(withRouter(CourseList));
