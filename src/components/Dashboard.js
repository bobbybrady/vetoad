import React, { Component } from "react"
import NavBar from "./nav/NavBar"
import FeatureViews from "./FeatureViews"


class Dashboard extends Component {
  render() {
    return (
      <>
        <NavBar />
        <FeatureViews />
      </>
    )
  }
}

export default Dashboard