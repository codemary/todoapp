import React, { Component } from 'react';
import './App.css';

// import Data from './data.json';

class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="App">
        <nav className="pt-navbar pt-dark">
          <div className="pt-navbar-group center-title">
            <div className="pt-navbar-heading">Task Manager</div>
          </div>
        </nav>
        <div className="pt-form-content" style={styles.todoForm}>
          <input id="example-form-group-input-a" className="pt-input" placeholder="Add Project" type="text" dir="auto" />
          <div className="pt-form-helper-text"></div>
        </div>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-4" style={styles.columns}>
              <h5 className="mb-1">Todo</h5>
            </div>
            <div className="col-md-4" style={styles.columns}>
              <h5 className="mb-1">In Progress</h5>
              <ul style={styles.ul}>
                <li><a>Home</a></li>
                <li><a>News</a></li>
                <li><a>Contact</a></li>
                <li><a>About</a></li>
              </ul>
            </div>
            <div className="col-md-4" style={styles.columns}>
              <h5 className="">Done</h5>
              <ul style={styles.ul}>
                <li><a>Home</a></li>
                <li><a>News</a></li>
                <li><a>Contact</a></li>
                <li><a>About</a></li>
              </ul>
            </div>
          </div>
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
