import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import HomePage from "./components/HomePage";
import Login from "./components/Login";
import SponsoredPrograms from "./components/SponsoredPrograms";
import AllPrograms from "./components/AllPrograms";
import Navbar from "./components/NavBar";
import Upload from "./components/Upload";
import Authentication from "./components/Authentication";

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Authentication} />
          <Route path="/sponsoredPrograms" component={SponsoredPrograms} />
          <Route path="/allPrograms" component={AllPrograms} />
        </Switch>
      </div>
    );
  }
}

export default App;
