import React, { Component } from 'react';
import './App.css';
import gql from 'graphql-tag'
import { Query } from 'react-apollo'

import Header from './components/header/Header'
import MyBody from './components/my-body/MyBody'

class App extends Component {
  render() {
    return (
      <div>
        <Header />

        <Query query={gql`
                {
                    notes {
                        _id
                        content
                        isActive
                    }
                }
            `}>
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>
            if (error) return <p>Error!!!</p>
            if (data) {
              return <MyBody listNotes={data.notes} />
            }
          }}
        </Query>
      </div>
    );
  }
}

export default App;
