import React, { Component } from 'react';
import Character from './character'
import './app.css'

async function getPages() {
  let url = `https://swapi.dev/api/people`;
  let people = [];
  do {
    try {
      const resp = await fetch(url);
      const data = await resp.json();
      data.results.forEach(person => {
        const { name, height, mass, birth_year, gender } = person
        people.push({ name, height, mass, birth_year, gender });
      });
      url = data.next;
    } catch (err) {
      console.error(`Oeps, something is wrong ${err}`);
    }

  } while (url !== null);
  return people;
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      characters: [],
      allCharacters: [],
      search: ""
    };
  }

  componentDidMount() {
    getPages()
      .then(characters => this.setState({
        characters: characters,
        allCharacters: characters
      }));
  }

  handleSearch = (event) => {
    this.setState({
      search: event.target.value,
      characters: this.state.allCharacters.filter((character) => new RegExp(event.target.value, "i").exec(character.name))
    })
  }

  render() {
    return (
      <div className="app">
        <h1 className="text-center mt-5">Star Wars Characters</h1>
        <div className="search">
          <input type="text" placeholder="🔎" value={this.state.search} onChange={this.handleSearch} />
        </div>
        <ul className="characters mt-5">
          {this.state.characters.map(character => (
            <Character
              key={`${character.name}`}
              character={character}
            />
          ))}
        </ul>
      </div>
    )
  }
}

export default App
