import React from 'react';
import {
  Router, Route, hashHistory, IndexRoute,
} from 'react-router';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { ApolloProvider } from 'react-apollo';
import App from './components/App';
import ApiariesList from './components/Apiaries/ApiariesList';
import ApiaryCreate from './components/Apiaries/ApiaryCreate';
import ApiaryDetails from './components/Apiaries/ApiaryDetails';
import MainPage from './components/MainPage/MainPage';
import Calendar from './components/Calendar/Calendar';

const client = new ApolloClient({
  link: createHttpLink({ uri: '/graphql' }),
  cache: new InMemoryCache(),
});

export default () => (
  <ApolloProvider client={client}>
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={MainPage} />
        <Route path="apiaries" exact component={ApiariesList} />
        <Route path="apiaries/new" component={ApiaryCreate} />
        <Route path="apiaries/:id" component={ApiaryDetails} />
        <Route path="calendar" component={Calendar} />
      </Route>
    </Router>
  </ApolloProvider>
);
