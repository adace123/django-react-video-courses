import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { IAppState } from '../store/commonTypes';
import { IMembership, MembershipType } from '../store/courses/types';
import { ICourse } from 'src/store/courses/types';

interface IMembershipState {
    memberships: IMembership[];
}

const MembershipContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const MembershipButton = styled<{purchased: boolean}, "button">('button')`
    color: white;
    border-radius: 5px;
    min-width: 100px;
    padding: 5px 10px;
    border: none;
    font-size: 14px;
    cursor: ${({ purchased }) => purchased ? 'auto' : 'pointer'};
    box-shadow: ${({ purchased }) => purchased ? 'none' : '7px 7px 5px 0px rgba(199,199,199,1)'};
    background-color: ${({ purchased }) => purchased ? 'gray' : 'gold'};
    transition: ${({ purchased }) => purchased ? '0s' : '0.2s'};
    pointer-events: ${({ purchased }) => purchased ? 'none' : 'auto'};
    :hover {
        background-color: ${({ purchased }) => purchased ? 'gray' : 'purple'};
    }
    :active {
        box-shadow: none;
    }
`

class Memberships extends React.Component<IAppState['userState'], IMembershipState> {

    public state = {
        memberships: []
    }

    public async componentDidMount() {
        const membershipResponse = await fetch('http://127.0.0.1:8000/api/memberships/');
        const memberships = await membershipResponse.json();
        this.setState({ memberships });
    }

    public render() {
        const { currentUser } = this.props;
        const { memberships } = this.state;
        memberships.sort((a: IMembership, b: IMembership) => a.price - b.price); 
        return (
            <div>
                <h1>Memberships</h1>
                <MembershipContainer>
                    {
                        memberships.length > 0 && memberships.map((membership: IMembership, i) => 
                            <div style={{minHeight: '50vh'}} key={i}>
                                <h2>{MembershipType[membership.membership_type]}</h2>
                                <p>Price: <strong>${membership.price}</strong> per month</p>
                                <h4>Included</h4>
                                <ul>
                                    {
                                        membership.courses.map((course: ICourse, j) => <div key={j}>
                                            <li>{course.title}</li>
                                        </div>)
                                    }
                                </ul>
                                {
                                    <MembershipButton purchased={currentUser.membership.toUpperCase() === membership.membership_type}>
                                    {currentUser.membership.toUpperCase() === membership.membership_type ? 'Current membership' : 'Select'}</MembershipButton>
                                }
                            </div>
                        )
                    }
                </MembershipContainer>
            </div>
        );
    }
    
}

const mapStateToProps = ({ userState }: IAppState) => {
    return {
        currentUser: userState.currentUser
    };
}

export default connect(mapStateToProps, null)(Memberships);
