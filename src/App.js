import React, { Component } from 'react';
import './App.css';

import Header from './components/header/Header'
import MyBody from './components/my-body/MyBody'

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <MyBody />
      </div>
    );
  }
}

export default App;
