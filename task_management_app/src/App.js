import React, { Component } from 'react';
import './App.css';

import Navbar from "./Navbar";

// import Data from './data.json';

class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="App">
        <Navbar />
        {/* add task */}
        <div className="pt-form-group" style={{ display: 'inline' }}>
          <div className="pt-input-group" style={{ width: '30%', float: 'left' }}>
            <span className="pt-icon pt-icon-list"></span>
            <input
              type="text"
              className="pt-input"
              placeholder="Enter your task..."
            // onChange={}
            // onKeyPress={}
            />
            <button
              className="pt-button pt-minimal pt-intent-primary pt-icon-plus"
              onClick={this.handleUserInputClick}
            />
          </div>

          {/* task lists */}


        </div>
      </div >
    );
  }
}

const styles = ({
  header: {
    height: '5',
    backgroundColor: '#D3D3D3',
    fontSize: '3rem',
    color: '$grey',
    marginBottom: '0.5',
    textAlign: 'center',
    fontFamily: 'Merriweather',
    boxSizing: 'border-box',
  },
  todoForm: {
    width: '40%',
    height: '100',
    marginTop: '5%',
  },
  columns: {
    display: 'inline-block',
    direction: 'flex-row',
    flexDirection: 'column',
    width: '33%',
    height: 100,
    border: 'black',
    borderCollapse: 'collapse',
  },
  ul: {
    listStyleType: 'none',
    width: 100,
    textAlign: 'center',
  }
});

export default App;
