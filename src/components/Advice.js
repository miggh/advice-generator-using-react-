import React from "react";
import axios from "axios";
import { API_URL } from "../apis/API_URL";
import dividerDesktop from "../images/pattern-divider-desktop.svg";
import dividerMobile from "../images/pattern-divider-mobile.svg";
import diceIcon from "../images/icon-dice.svg";

class Advice extends React.Component {
  state = { id: null, advice: null, waiting: true };

  getAdvice = async () => {
    this.setState({ waiting: true });
    try {
      const response = await axios.get(API_URL);
      this.setState({
        id: response.data.slip.id,
        advice: `"${response.data.slip.advice}"`,
        waiting: false,
      });
    } catch (err) {
      this.setState({
        id: "?",
        advice: "Something went wrong💥💥💥 please try again!",
        waiting: true,
      });
    }
  };

  componentDidMount() {
    this.getAdvice();
  }

  render() {
    return (
      <main className="main">
        {this.state.advice ? (
          <React.Fragment>
            <h1 className="advice-header">Advice #{this.state.id}</h1>
            <p className="advice-text">{this.state.advice}</p>
          </React.Fragment>
        ) : (
          <p className="advice-text">Loading...</p>
        )}
        <img src={dividerDesktop} className="divider-desktop" alt="divider" />
        <img src={dividerMobile} className="divider-mobile" alt="divider" />
        <button className="dice-btn" onClick={this.getAdvice}>
          <img
            src={diceIcon}
            className={this.state.waiting ? "dice-icon waiting" : "dice-icon"}
            alt="dice"
          />
        </button>
      </main>
    );
  }
}

export default Advice;
