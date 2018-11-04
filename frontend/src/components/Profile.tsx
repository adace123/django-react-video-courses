import * as React from 'react';
import styled from 'styled-components';
import { connect, DispatchProp } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchUserDetails } from '../store/user/userActions';
import { IAppState } from '../store/commonTypes';

const Profile: React.SFC<IAppState['userState']> = ({ currentUser }) => {
    return (
        <div>
            <h1>My Profile</h1>
            
            <h3>Current Membership: {currentUser.membership}</h3>
            {
                currentUser.created && <small style={{color: 'gray'}}>Since {currentUser.created.toLocaleString()}</small>
            }
            {
                !currentUser.created &&
                <p>You don't have an active membership plan. Check our memberships <Link to="/memberships">here</Link></p>
            }
        </div>
    );
}

const mapStateToProps = ({ userState }: IAppState) => {
    return { currentUser: userState.currentUser };
}

export default connect(mapStateToProps, null)(Profile);
