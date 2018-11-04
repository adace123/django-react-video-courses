import * as React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { NavLink, RouteComponentProps, withRouter, matchPath } from 'react-router-dom';
import { IAppState } from '../store/commonTypes';
import { fetchCourses } from '../store/courses/courseActions';
import { fetchUserDetails } from '../store/user/userActions';
import { ICourse } from 'src/store/courses/types';

const NavContainer = styled("nav")`
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 0 15px;
    background-color: #eeeeee;
    border-radius: 4px;
`;

const StyledNavLink = styled(NavLink)`
    text-decoration: none;
    height: 100%;
    font-size: 15px;
    margin: 20px 0;
`;

const NavSection = styled('div')`
    display: flex;
`;

const NavDivider = styled('span')`
    margin: 0 7px;
`

const activeLink = {
    'color': 'black',
    'cursor': 'default'
}

const inactiveLink = {
    'color': '#2196f3',
    'cursor': 'pointer'
}

interface INavLinkProps {
    to: string;
    currentPath: string;
}

const NavlinkSwitch: React.SFC<INavLinkProps> = ({ to, currentPath, children }) => {
    const splitTo = to.split('/').pop();
    const splitPath = currentPath.split('/').pop();
    return (
        <StyledNavLink to={to} style={splitTo === splitPath ? activeLink : inactiveLink}>
            {children}
        </StyledNavLink>
    );
}

interface INavbarMethods {
    fetchCourses: (membership: string) => void;
    fetchUserDetails: () => void;
}

type NavbarProps = RouteComponentProps & IAppState['userState'] & IAppState['courses'] & INavbarMethods;

class Navbar extends React.Component<NavbarProps, {}> {

    public async componentDidMount() {
        if (!this.props.currentUser.email.length) {
            await this.props.fetchUserDetails();
        }
        if (!this.props.courses.length) {
            await this.props.fetchCourses(this.props.currentUser.membership);
        }
    }

    public render() {
        const divider = <NavDivider>/</NavDivider>;
        const { location, currentUser } = this.props;
        const splitPathname = location.pathname.split('/').filter(s => s.includes('-'));
        return (
        <NavContainer>
            <NavSection>
                <h4><NavlinkSwitch to="/home" currentPath={location.pathname}>Home</NavlinkSwitch>{divider}</h4>
                <h4><NavlinkSwitch to="/profile" currentPath={location.pathname}>Profile</NavlinkSwitch></h4>
                {
                    splitPathname.length > 0 && splitPathname.map((s, i) => (
                        <h4 key={i}>
                            {divider}<NavlinkSwitch to={`/courses/${splitPathname.slice(0, i + 1).join('/')}`} currentPath={location.pathname}>{s}</NavlinkSwitch>
                        </h4>
                    ))
                }
            </NavSection>  
            <NavSection>
                <h4><NavlinkSwitch to="/memberships" currentPath={location.pathname}>Memberships</NavlinkSwitch></h4>
                {
                    !currentUser.loggedIn && <h4>{divider}<NavlinkSwitch to="/login" currentPath={location.pathname}>Login</NavlinkSwitch></h4>
                }
            </NavSection>
        </NavContainer>
        )
    }
}

const mapStateToProps = ({ userState, courses }: IAppState) => {
    return ({ currentUser: userState.currentUser, courses: courses.courses });
};

export default withRouter(connect(mapStateToProps, { fetchCourses, fetchUserDetails })(Navbar));
