import React, { Component } from "react";
import './character.css'

class Character extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMe: false,
      plusSign: true
    };
  }

  operation() {
    this.setState({
      showMe: !this.state.showMe,
      plusSign: !this.state.plusSign
    });
  }

  render() {
    const name = this.props.character.name
    const details = `Gender: ${this.props.character.gender}, Height: ${this.props.character.height},
                     Mass: ${this.props.character.mass}, Birth year: ${this.props.character.birth_year}`

    return (
        <li className="character p-1" onClick={() => this.operation()}>
          <div className="character-name"> {this.state.plusSign ? <span>➕</span> : <span>➖</span>}  {name}</div>
          {
          this.state.showMe? <div className="character-details mt-2">{details}</div> : null
        }
        </li>);
  }
  // handleClick = () => {
          //   // Call the parent method selectCharacters
          //   this.props.selectCharacter(this.props.character);
          // }
        }
export default Character;
