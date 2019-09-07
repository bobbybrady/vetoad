import { Route } from "react-router-dom";
import React, { Component } from "react";
import CurrentEventList from "./events/currentEvents/CurrentEventList";


export default class FeatureViews extends Component {

  render() {
    return (
      <React.Fragment>

        <Route
          exact path="/" render={props => {
            return <CurrentEventList {...this.props}/>
            // Remove null and return the component which will show news articles
          }}
        />

      </React.Fragment>
    );
  }
}
