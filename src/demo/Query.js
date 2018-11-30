import React, { Component, Fragment } from "react";
import { APIContextProvider } from "../containers/APIContext";
import Query from "../containers/Query";
const defaults = {
  url: "https://jsonplaceholder.typicode.com",
  getHeaders: () => {
    return {
      //headers
    };
  }
};
const query = {
  subUrl: "/users",
  params: {
    page: 2
  }
};
class GetAPICall extends Component {
  render() {
    return (
      <APIContextProvider value={defaults}>
        Get
        <Query query={query}>
          {({ loading, error, data = [] }) => {
            return (
              <div>
                {loading ? (
                  "loading..."
                ) : (
                  <ul>
                    {data.map(
                      (item, i) => i < 20 && <li key={item.id}>{item.name}</li>
                    )}
                  </ul>
                )}
                <span style={{ color: "red" }}>{error}</span>
              </div>
            );
          }}
        </Query>
      </APIContextProvider>
    );
  }
}
export default GetAPICall;
