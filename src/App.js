import React, { Component } from 'react';
import uid from 'uid';
import './App.css';

import Navbar from "./Navbar";
import Board from 'react-trello'

const data = {
  lanes: [
    {
      id: 'lane1',
      title: 'ToDo',
      cards: [
        { id: 'Card1', description: 'Can AI make memes' },
        { id: 'Card2', description: 'Goa Trip' }
      ]
    },
    {
      id: 'lane2',
      title: 'In Progress',
      cards: [
        { id: 'Card1', description: 'Can AI make memes' },
        { id: 'Card2', description: 'Transfer via NEFT' },
        { id: 'Card3', description: 'Buy Milk' },
        { id: 'Card4', description: 'Mopping' }
      ]
    },
    {
      id: 'lane3',
      title: 'Done',
      cards: [
        { id: 'Card4', description: 'Go to Mars' }
      ]
    }
  ]
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      task: '',
    };

    this.eventBus = undefined;
  }

  setEventBus = (handle) => {
    this.eventBus = handle
  }

  handleTaskInputChange = (e) => {
    this.setState({ task: e.target.value });
  }

  handleTaskInputKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.handleTaskInputClick()
    }
  }


  handleTaskInputClick = () => {
    console.log(this.state.task)
    if (this.state.task.length < 1) {
      return
    }
    this.eventBus.publish({
      type: 'ADD_CARD',
      laneId: 'lane1',
      card: { id: uid(), description: this.state.task }
    })
  }


  render() {
    return (
      <div className="App">
        <Navbar />
        {/* add task */}
        <div className="pt-form-group" style={{ margin: 'auto' }}>
          <div className="pt-input-group" style={{ width: '30%', float: 'left' }}>
            <span className="pt-icon pt-icon-list"></span>
            <input
              type="text"
              className="pt-input"
              placeholder="Enter your task..."
              onChange={this.handleTaskInputChange}
              onKeyPress={this.handleTaskInputKeyPress}
            />
            <button
              className="pt-button pt-minimal pt-intent-primary pt-icon-plus"
              onClick={this.handleTaskInputClick}
            />
          </div>

          {/* task lists */}
          <Board
            data={data}
            draggable
            style={{ backgroundColor: 'white' }}
            eventBusHandle={this.setEventBus}
          />

        </div>
      </div >
    );
  }
}

export default App;
