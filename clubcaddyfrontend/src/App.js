import React, {Component} from "react";
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MemberList from "./MemberList";
import MemberEdit from "./MemberEdit";

class App extends Component {
  render() {
    return (
        <Router>
          <Switch>
            <Route path='/' exact={true} component={Home}/>
            <Route path='/members' exact={true} component={MemberList}/>
            <Route path='/members:MemberId' component={MemberEdit}/>
          </Switch>
        </Router>
    )
  }
}
export default App;
/*import {Component} from "react";

class App extends Component {
  state = {
    members: []
  };

  async componentDidMount() {
    const response = await fetch('/members');
    const body = await response.json();
    this.setState({members: body});
  }

  render() {
    const {members} = this.state;
    return (
        <div className="App">
          <header className="App-header">
            <div className="App-intro">
              <h2>Members</h2>
              {members.map(member =>
                <div key={member.memberId}>
                  {member.firstName} {member.lastName} {member.memberId} {member.cartSpace} {member.hasCartLease.toString()} {member.clubSpace}
                </div>
              )}
            </div>
          </header>
        </div>
    )
  }
}

export default App;*/
