import "./style/style.css";
import React from "react";
import ReactDOM from "react-dom";
import ApolloClient from "apollo-client";
import { ApolloProvider } from "react-apollo";
import { Router, Route, hashHistory, IndexRoute } from "react-router";
import App from "./components/App";
import ApiariesList from "./components/Apiaries/ApiariesList";
import ApiaryCreate from "./components/Apiaries/ApiaryCreate";
import ApiaryDetails from "./components/Apiaries/ApiaryDetails";

const client = new ApolloClient({
  dataIdFromObject: o => o.id
});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={hashHistory}>
        <Route path='/' component={App}>
          <IndexRoute component={ApiariesList} />
          <Route path='apiaries/new' component={ApiaryCreate} />
          <Route path='apiaries/:id' component={ApiaryDetails} />
        </Route>
      </Router>
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector("#root"));
