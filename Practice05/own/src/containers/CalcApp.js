import React from 'react';

import CalcButton from '../components/CalcButton';

// 計算機 App
class CalcApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: "0",
      stack: ["0"]
    };
    this.buttons = [
      ["AC", "+/-", "%", "÷"],
      ["7", "8", "9", "x"],
      ["4", "5", "6", "-"],
      ["1", "2", "3", "+"],
      ["0", ".", "="]
    ];
  }

  resetState() {
    // TODO
  }

  clickHandler = (e) => {
    let text = e.target.textContent;

  }

  buttonRenderer(button, index, length) {
    let classes = [];
    if (button.match(/^[.0-9]$/)) {
      classes.push("calc-number");
      if (button === "0") {
        classes.push("bigger-btn");
      }
    }
    if (index === length - 1) {
      classes.push("calc-operator");
    }
    return <CalcButton key={button} className={classes.join(" ")} onClick={this.clickHandler}>{button}</CalcButton>;
  }

  rowRenderer(row) {
    return (
      <div key={row[0]} className="calc-row">
        {row.map((button, index) => this.buttonRenderer(button, index, row.length))}
      </div>
    );
  }

  render() {
    return (
      <div className="calc-app">
        <div className="calc-container">
          <div className="calc-output">
            <div className="calc-display">{this.state.display}</div>
          </div>
          {this.buttons.map((row => this.rowRenderer(row)))}
        </div>
      </div>
    );
  }
}

export default CalcApp;
