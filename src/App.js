import './App.css';
import { CardList } from './components/card-list/card-list.component';

import React, { Component } from 'react'
import { SearchBox } from './components/search-box/search-box.component';

export default class App extends Component {

  constructor() {
    super();

    this.state = {

      monsters: [],
      searchField: '',
      secretOfLife:47
    }
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => this.setState({ monsters: users }))
  }

  // Arrow function bind automaticly
  handleChange = (e) => {
    this.setState({ searchField: e.target.value })
  }

  handleClick=()=>{
    this.setState((prevState,prevProps)=>{
      return {secretOfLife:prevState.secretOfLife+1}
    },
    ()=>console.log(this.state.secretOfLife))
  }
  render() {

    // const monsters= this.state.monsters same thing
    const { monsters, searchField } = this.state;
    const filteredMonsters = monsters.filter(monster =>
      monster.name.toLowerCase().includes(searchField.toLowerCase()));

    return (
      <div className="App">
        <p>{this.state.secretOfLife}</p>
        <button
          onClick={this.handleClick}
        >Increment Number</button>
        <h1>Monsters Rolodex</h1>
        <SearchBox
          placeholder='Search Monster'
          handleChange={this.handleChange} />
        <CardList monsters={filteredMonsters} />
      </div>
    )
  }
}
