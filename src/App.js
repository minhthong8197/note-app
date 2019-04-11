import React, { Component } from 'react';
import './App.css';
import { Query } from 'react-apollo'

import Header from './components/header/Header'
import MyBody from './components/my-body/MyBody'
import { NOTES } from './services/query'

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Query query={NOTES}>
          {({ loading, error, data, refetch }) => {
            if (loading) return <p>Loading...</p>
            if (error) return <p>Error!!!</p>
            if (data) {
              return <MyBody refetch={refetch} listNotes={data.notes} />
            }
          }}
        </Query>
      </div>
    );
  }
}

export default App;
