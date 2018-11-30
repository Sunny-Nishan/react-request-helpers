# React Request helpers

Inspired from apollo react client.
https://github.com/apollographql/react-apollo

##### REST configurable `<Query/>` and `<Mutation/>` components.

Steps to run example:

```
npm install
npm start
```

## Steps to `Query` :

```
const defaults = {
    url: "https://jsonplaceholder.typicode.com",
    getHeaders: () => {
    return {
      //headers
    };
  }
}
const query = {
    subUrl: "/users",
    params: {}
};
class GetAPICall extends Component {
    render() {
        return (
            <APIContextProvider value={defaults}>
                <Query query={query}>
                    {({ loading, error, data }) => {//UI here...}}
                </Query>
            </APIContextProvider>
        )
    }
}
```

## Steps to `Mutate` :

```
const defaults = {
    url: "https://jsonplaceholder.typicode.com",
    getHeaders: () => {
    return {
      //headers
    };
  }
}
const mutation = {
    method : "post",
    subUrl: "/users"
};
class GetAPICall extends Component {
    render() {
        return (
            <APIContextProvider value={defaults}>
                <Mutation mutation={mutation}>
                    {(mutate, { loading, error, data }) => {
                             //UI here...
                    return <button onClick={()=>mutate({data:""})}/>
                }}
                </Mutation>
            </APIContextProvider>
        )
    }
}

```

Depends upon axios for request functionality.
https://github.com/axios/axios
