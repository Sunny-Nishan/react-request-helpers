import React, { Component, Fragment } from "react";
import { APIContextConsumer } from "./APIContext";
import { commonFetch, extractRequestInfo } from "../services/utils";
type MutationProps = {
  mutation: any,
  children: any
};
class Mutation extends Component<MutationProps> {
  render() {
    return (
      <APIContextConsumer>
        {context => (
          <MutationExecutor
            render={this.props.children}
            mutation={this.props.mutation}
            context={context}
          />
        )}
      </APIContextConsumer>
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
  extractRequestInfo = () => {
    const { context, mutation } = this.props;
    return extractRequestInfo(context, mutation);
  };
  mutator = data => {
    this.setState({
      loading: true,
      error: null
    });
    const { url, headers, method } = this.extractRequestInfo();
    commonFetch({ url, method, data, headers })
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
