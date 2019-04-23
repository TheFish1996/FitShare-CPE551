import React, { Component } from "react";

import HomePage from "./components/HomePage";
import SponsoredPrograms from "./components/SponsoredPrograms";
import AllPrograms from "./components/AllPrograms"

class App extends Component {
  render() {
    return (
      <div>
        <AllPrograms />
      </div>
    );
  }
}

export default App;
