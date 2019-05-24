import React, { Component } from 'react'
import './App.css'
import { graphql } from 'react-apollo'

import Header from './components/header/Header'
import MyBody from './components/my-body/MyBody'
import { NOTES } from './services/query'

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        {this.props.data.loading ? (
          <p>Loading...</p>
        ) : this.props.data.error ? (
          <p>Error!!!</p>
        ) : (
          <MyBody
            refetch={this.props.data.refetch}
            listNotes={this.props.data.notes}
          />
        )}
      </div>
    )
  }
}

export default graphql(NOTES)(App)
