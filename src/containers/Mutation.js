import React, { Component, Fragment } from "react";
import APIContext from "./APIContext";
import axios from "axios";
import { commonFetch } from "../services/utils";
type MutationProps = {
  mutation: any,
  children: any
};
class Mutation extends Component<MutationProps> {
  render() {
    return (
      <APIContext.Consumer>
        {context => (
          <MutationExecutor
            render={this.props.children}
            mutation={this.props.mutation}
            context={context}
          />
        )}
      </APIContext.Consumer>
    );
  }
}
type MutationExecutorProps = {
  mutation: any,
  render: any,
  context: any
};

type MutationExecutorState = {
  loading: boolean,
  error: Object,
  data: any
};

class MutationExecutor extends Component<
  MutationExecutorProps,
  MutationExecutorState
> {
  state = {
    loading: false,
    data: undefined,
    error: null
  };
  mutator = data => {
    const { context, mutation } = this.props;
    this.setState({
      loading: true,
      error: null
    });
    const url = context.url + mutation.subUrl;
    commonFetch({ url, ...mutation, data: { data } })
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
    return (
      <Fragment>
        {this.props.render(this.mutator, { loading, error, data })}
      </Fragment>
    );
  }
}
export default Mutation;
