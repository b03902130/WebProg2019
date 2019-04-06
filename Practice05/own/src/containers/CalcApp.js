import React from 'react';

import CalcButton from '../components/CalcButton';

const operators = ["+", "-", "x", "÷", "="];

// 計算機 App
class CalcApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: "0",
      operands: ["0"],
      operator: ""
    };
    this.editable = true;
    this.tmp = [];
    this.buttons = [
      ["AC", "+/-", "%", operators[3]],
      ["7", "8", "9", operators[2]],
      ["4", "5", "6", operators[1]],
      ["1", "2", "3", operators[0]],
      ["0", ".", operators[4]]
    ];
  }

  calculate(tmp) {
    let a = parseInt(this.state.operands[0]);
    let b = tmp ? this.tmp[1] : parseInt(this.state.operands[1]);
    let operator = tmp ? this.tmp[0] : this.state.operator;
    let result;
    if (operator === operators[0]) {
      result = a + b;
    }
    else if (operator === operators[1]) {
      result = a - b;
    }
    else if (operator === operators[2]) {
      result = a * b;
    }
    else if (operator === operators[3]) {
      result = Math.floor(a / b);
    }
    return result.toString();
  }

  resetState() {
    this.setState(state => {
      return {
        operands: [this.state.display],
        operator: ""
      };
    });
  }

  clickHandler = (e) => {
    let input = e.target.textContent;
    if (input.match(/^[0-9]$/)) {
      if (this.editable) {
        this.setState(state => {
          let lastest = state.operands[state.operands.length - 1];
          let newDisplay = lastest === "0" ? input : lastest + input;
          state.display = newDisplay;
          state.operands[state.operands.length - 1] = newDisplay;
          return state;
        });
      }
      else {
        this.editable = true;
        this.setState({
          display: input,
          operands: [input],
          operator: ""
        });
      }
    }
    else if (input === "=") {
      this.editable = false;
      let newDisplay = (this.state.operands.length === 2 && this.state.operands[1] !== "") ? this.calculate(false) : this.state.operands[0];
      this.setState({
        display: newDisplay,
        operands: [newDisplay],
        operator: ""
      });
    }
    else if (operators.indexOf(input) !== -1) {
      this.editable = true;
      if (this.state.operands.length === 2) {
        if (this.state.operands[1] === "") {
          this.setState({
            operator: input
          });
        }
        else {
          let newDisplay = this.calculate(false);
          this.setState({
            display: newDisplay,
            operands: [newDisplay, ""],
            operator: input
          });
        }
      }
      else if (this.state.operands.length < 2) {
        this.setState(state => {
          state.operands.push("");
          state.operator = input;
          return state;
        });
      }
    }
    else if (input === "AC") {
      this.resetState();
    }
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
