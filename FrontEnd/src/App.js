import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import HomePage from "./components/HomePage";
import Login from "./components/Login";
import SponsoredPrograms from "./components/SponsoredPrograms";
import AllPrograms from "./components/AllPrograms";
import Navbar from "./components/NavBar";
import Upload from "./components/Upload";
import LogIn from "./components/Login";
import Register from "./components/Register";
import DiscoverTrainers from "./components/DiscoverTrainers"
import Profile from "./components/Profile"

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={LogIn} />
          <Route exact path="/home" component={HomePage} />
          <Route exact path="/register" component={Register} />
          <Route path="/sponsoredPrograms" component={SponsoredPrograms} />
          <Route path="/allPrograms" component={AllPrograms} />
          <Route path="/discoverTrainers" component={DiscoverTrainers} />
          <Route path="/profile" component={Profile} />
          <Route path="/upload" component={Upload} />
        </Switch>
      </div>
    );
  }
}

export default App;
