import React, { Component } from "react";
import { APIContextProvider } from "../containers/APIContext";
import Mutation from "../containers/Mutation";
const defaults = {
  url: "http://httpbin.org",
  getHeaders: () => {
    return {
      //headers
    };
  }
};
const postQuery = {
  method: "POST",
  subUrl: "/post",
  params: {}
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
      <APIContextProvider value={defaults}>
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
                <button onClick={() => postData({ data: this.state.text })}>
                  Submit
                </button>
                {loading && "Loading..."}
                <br />
                <br />
                <div>{data.data}</div>
                <br />
                <div>IP: {data.origin}</div>
                <span style={{ color: "red" }}>{error}</span>
              </div>
            );
          }}
        </Mutation>
      </APIContextProvider>
    );
  }
}
export default PostAPICall;
