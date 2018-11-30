import React, { Component, Fragment } from "react";
import { APIContextConsumer } from "./APIContext";
import { commonFetch, extractRequestInfo } from "../services/utils";
type query = {
  method: "get",
  subUrl: string,
  data: ?Object,
  params: ?Object
};

type QueryProps = {
  query: query,
  children: any
};
class Query extends Component<QueryProps> {
  render() {
    return (
      <APIContextConsumer>
        {context => (
          <QueryExecutor
            render={this.props.children}
            query={this.props.query}
            context={context}
          />
        )}
      </APIContextConsumer>
    );
  }
}
type QueryExecutorProps = {
  query: any,
  render: any,
  context: any
};

type QueryExecutorState = {
  loading: boolean,
  error: Object,
  data: any
};

class QueryExecutor extends Component<QueryExecutorProps, QueryExecutorState> {
  state = {
    loading: false,
    data: undefined,
    error: null
  };
  extractRequestInfo = () => {
    const { context, query } = this.props;
    return extractRequestInfo(context, query);
  };
  componentDidMount = () => {
    this.setState({
      loading: true,
      error: null
    });
    const method = "get";
    const { url, headers, params } = this.extractRequestInfo();
    commonFetch({ url, method, params, headers })
      .then(res => {
        this.setState({
          loading: false,
          data: res.data
        });
      })
      .catch(e => {
        this.setState({
          loading: false,
          error: e.message
        });
      });
  };
  render() {
    const { loading, error, data } = this.state;
    return <Fragment>{this.props.render({ loading, error, data })}</Fragment>;
  }
}
export default Query;
