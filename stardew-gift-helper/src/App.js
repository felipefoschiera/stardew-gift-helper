import logo from "./logo.svg";
import "./App.css";
import React, { Component } from "react";

export class App extends Component {

  state = {
    saveFile: null,
  };

  onFileChange = (event) => {
    const eventTarget = event.target;
    if (eventTarget.files.length) {
      this.setState({ saveFile: eventTarget.files[0] });
    }
  };

  gameSaveData = () => {
    if (this.state.saveFile) {
      console.log(this.state.saveFile.name)
    }
  };


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Upload your save file.
            Instructions here.
          </p>
          <div>
            <input type="file" onChange={this.onFileChange} />
          </div>

          <div>
            {this.gameSaveData()}
          </div>
        </header>
      </div>
    );
  }
}
