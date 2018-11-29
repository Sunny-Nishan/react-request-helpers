import React, { Component, Fragment } from "react";
import APIContext from "./APIContext";
import axios from "axios";
import { commonFetch } from "../services/utils";
type QueryProps = {
  query: any,
  children: any
};
class Query extends Component<QueryProps> {
  render() {
    return (
      <APIContext.Consumer>
        {context => (
          <QueryExecutor
            render={this.props.children}
            query={this.props.query}
            context={context}
          />
        )}
      </APIContext.Consumer>
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
  componentDidMount = () => {
    const { context, query } = this.props;
    this.setState({
      loading: true,
      error: null
    });
    const url = context.url + query.subUrl;
    commonFetch({ url, ...query })
      .then(res => {
        console.log(res);
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
