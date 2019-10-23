import React from 'react';

import { ApolloClient, InMemoryCache, HttpLink } from "apollo-boost";
import { ApolloProvider } from "react-apollo";

//components
import TaskList from './components/TaskList';
import AddTask from './components/AddTask';


const apolloClient = new ApolloClient({
  link: new HttpLink({uri: 'http://localhost:4000/graphql'}),
  cache: new InMemoryCache()
});

class App extends React.Component {

  render(){
    return (
      <ApolloProvider client={apolloClient}>
        <div className="main">
          <h1>My Tasks</h1>
          <TaskList/>
          <AddTask/>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
