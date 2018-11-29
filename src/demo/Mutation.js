import React, { Component } from "react";
import APIContext from "../containers/APIContext";
import Mutation from "../containers/Mutation";
const configDefaults = {
  url: "http://httpbin.org",
  headers: {}
};
const postQuery = {
  method: "POST",
  subUrl: "/post"
};

class PostAPICall extends Component {
  state = {
    text: ""
  };
  onChange = e => {
    this.setState({
      text: e.target.value
    });
  };
  render() {
    return (
      <APIContext.Provider value={configDefaults}>
        <div>Post</div>
        <br />
        <Mutation mutation={postQuery}>
          {(postData, { data = { json: {} }, error, loading }) => {
            return (
              <div>
                <input
                  value={this.state.value}
                  onChange={this.onChange}
                  type="text"
                  placeholder="Enter text here..."
                />
                <button onClick={() => postData(this.state.text)}>
                  Submit
                </button>
                {loading && "Loading..."}
                <br />
                <br />
                <div>{data.json.data}</div>
                <br />
                <div>IP: {data.origin}</div>
                <span style={{ color: "red" }}>{error}</span>
              </div>
            );
          }}
        </Mutation>
      </APIContext.Provider>
    );
  }
}
export default PostAPICall;
