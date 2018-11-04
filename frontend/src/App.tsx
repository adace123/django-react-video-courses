import * as React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import styled from 'styled-components';
import store from './store/index';
import Navbar from './components/Nav';
import CourseList from './components/CourseList';
import Profile from './components/Profile';
import Memberships from './components/Memberships';
import CourseDetails from './components/CourseDetails';
import ErrorPage from './components/404';
import LessonDetails from './components/LessonDetails';

const MainContainer = styled('div')`
  width: 100%;
  margin-bottom: 25px;
`;

class App extends React.Component {
  public render() {
    return (
      <Provider store={store}>
        <div className="app">
          <Router>
            <MainContainer>
              <Navbar />
              <Switch>
                <Route exact={true} path="/home" component={CourseList} />
                <Route exact={true} path="/profile" component={Profile}/>
                <Route exact={true} path="/memberships" component={Memberships} />
                <Route exact={true} path="/courses/:title/" component={CourseDetails}/>
                <Route exact={true} path="/courses/:title/:lesson" component={LessonDetails} />
                <Redirect exact={true} from="(/|/courses|/home/courses)" to="/home"/>
                <Route component={ErrorPage}/>
              </Switch>
            </MainContainer>
          </Router>
        </div>
      </Provider>
    );
  }
}

export default App;
