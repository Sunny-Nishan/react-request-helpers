import React, { Component, Fragment } from "react";
import PostAPICall from "./Mutation";
import GetAPICall from "./Query";

class APICalls extends Component {
  render() {
    return (
      <Fragment>
        <GetAPICall />
        <PostAPICall />
      </Fragment>
    );
  }
}
export default APICalls;
