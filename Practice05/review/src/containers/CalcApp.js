import React from 'react';

import CalcButton from '../components/CalcButton';

// 計算機 App
class CalcApp extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      AC_C: "AC",
      Time: this.tick(),
      number: 0,
      prevNumber: 0,
      currentOp: 0, //1: +, 2: -, 3: x, 4: /
      afterOp: false,
      lastSeccussEqual: 0,
      inOp: false,
      floatInput: false,
      floatDigit: 0,
      useCinsteadAC: false
      // digit: 0
      // TODO
    };
  }
  componentDidMount() {
    setInterval(() => this.goTick(), 1000);
  }
  tick() {
    let dateVar = new Date();
    let tmpTime = "";
    if(dateVar.getHours() >= 12) {
      if(dateVar.getHours() > 12)
        tmpTime = (dateVar.getHours() - 12).toString() + ':' + dateVar.getMinutes().toString() + " PM";
      else
        tmpTime = (dateVar.getHours()).toString() + ':' + dateVar.getMinutes().toString() + " PM";
    }
    else {
      if(dateVar.getHours() === 0)
        tmpTime = (dateVar.getHours() + 12).toString() + ':' + dateVar.getMinutes().toString() + " AM";
      else
        tmpTime = (dateVar.getHours()).toString() + ':' + dateVar.getMinutes().toString() + " AM";
    }
    return tmpTime;
  }
  goTick() {
    let tmpTime = this.tick();
    this.setState({ Time: tmpTime }); 
  }

  precision(a) {
    if (!isFinite(a)) return 0;
    var e = 1, p = 0;
    while (Math.round(a * e) / e !== a) { e *= 10; p++; }
    return p;
  }
  
  percentage() {
    let new_num = this.state.number / 100
    if(!Number.isInteger(new_num))
      this.setState({floatInput: true, floatDigit: this.precision(new_num)})
    if(this.state.number !== this.state.prevNumber)
      this.setState({number: new_num})
    else
      this.setState({number: new_num, prevNumber: new_num})
  }
  changeSign() {
    if(this.state.number !== this.state.prevNumber)
      this.setState({number: -this.state.number})
    else
      this.setState({number: -this.state.number, prevNumber: -this.state.number})
  }
  readDigit(num) {
    if(this.state.afterOp) {
      if(this.state.floatInput) {
        this.setState({number: num/10, afterOp: false, floatDigit: this.state.floatDigit+1, AC_C: "C"})
      }
      else
        this.setState({number: num, afterOp: false, AC_C: "C"})
    }
    else {
      if(this.state.floatInput) {
        let ten = 10;
        let digit = this.state.floatDigit;
        while(digit > 0){
          ten *= 10;
          digit -= 1;
        }
        if(this.state.number >= 0)
          this.setState({number: parseFloat((this.state.number + num/ten).toFixed(this.state.floatDigit + 1)), floatDigit: this.state.floatDigit+1})
        else
          this.setState({number: parseFloat((this.state.number - num/ten).toFixed(this.state.floatDigit + 1)), floatDigit: this.state.floatDigit+1})
      }
      else {
        if(this.state.number >= 0)
          this.setState({number: this.state.number*10 + num})
        else
          this.setState({number: this.state.number*10 - num})
      }
    }
    // console.log(num)
  }
  doEqualLast(Op) {
    let new_num = 0;
    if(Op === 1)
      new_num = parseFloat((this.state.lastSeccussEqual + this.state.number).toFixed(3))
    if(Op === 2)
      new_num = parseFloat((this.state.number - this.state.lastSeccussEqual).toFixed(3))
    if(Op === 3)
      new_num = parseFloat((this.state.number * this.state.lastSeccussEqual).toFixed(3))
    if(Op === 4)
      new_num = parseFloat((this.state.number / this.state.lastSeccussEqual).toFixed(3))
    this.setState({prevNumber: new_num, number: new_num, afterOp: true, inOp: false, AC_C: "AC"})
  }
  ACorC() {
    if(this.state.AC_C === "AC") {
      this.resetState();
    }
    else {
      this.setState({number: 0, floatInput:false, floatDigit:0, AC_C: "AC"})
    }
  }
  doEqual(Op) {
    let new_num = 0;
    if(Op === 1)
      new_num = parseFloat((this.state.prevNumber + this.state.number).toFixed(3))
    if(Op === 2)
      new_num = parseFloat((this.state.prevNumber - this.state.number).toFixed(3))
    if(Op === 3)
      new_num = parseFloat((this.state.prevNumber * this.state.number).toFixed(3))
    if(Op === 4)
      new_num = parseFloat((this.state.prevNumber / this.state.number).toFixed(3))
    this.setState({prevNumber: new_num, number: new_num, afterOp: true, inOp:false, lastSeccussEqual: this.state.number, AC_C: "AC"})
  }
  startFloat() {
    this.setState({floatInput:true})
  }
  readOps(Op) {
    if(Op === '+') {
      if(!this.state.inOp) {
        this.setState({prevNumber: this.state.number, number: this.state.number, currentOp: 1, afterOp: true, inOp:true, lastSeccussEqual: 0, AC_C: "AC"})
      }
      else {
        if(!this.state.afterOp)
          this.doEqual(this.state.currentOp);
        this.setState({currentOp: 1, afterOp: true, inOp:true, lastSeccussEqual: 0, AC_C: "AC"})
      }
    }
    else if(Op === '-') {
      if(!this.state.inOp)
        this.setState({prevNumber: this.state.number, number: this.state.number, currentOp: 2, afterOp: true, inOp:true, AC_C: "AC"})
      else {
        if(!this.state.afterOp)
          this.doEqual(this.state.currentOp);
        this.setState({currentOp: 2, afterOp: true, inOp:true, lastSeccussEqual: 0, AC_C: "AC"})
      }
    }
    else if(Op === 'x') {
      if(!this.state.inOp)
        this.setState({prevNumber: this.state.number, number: this.state.number, currentOp: 3, afterOp: true, inOp:true, AC_C: "AC"})
      else {
        if(!this.state.afterOp)
          this.doEqual(this.state.currentOp);
        this.setState({currentOp: 3, afterOp: true, inOp:true, lastSeccussEqual: 0, AC_C: "AC"})
      }
    }
    else if(Op === '=') {
      if(this.state.lastSeccussEqual !== 0) {
        this.doEqualLast(this.state.currentOp);
      }
      else
        this.doEqual(this.state.currentOp);
    }
    else {
      if(!this.state.inOp)
        this.setState({prevNumber: this.state.number, number: this.state.number, currentOp: 4, afterOp: true, inOp:true, AC_C: "AC"})
      else {
        if(!this.state.afterOp)
          this.doEqual(this.state.currentOp);
        this.setState({currentOp: 4, afterOp: true, inOp:true, lastSeccussEqual: 0, AC_C: "AC"})
      }
    }
    this.setState({floatInput: false, floatDigit: 0})
  }
  resetState() {
    this.setState({prevNumber: 0, number: 0, currentOp: 0, afterOp: false, floatInput:false, floatDigit:0, AC_C: "AC"})
    // TODO
  }

  showNotImplemented() {
    console.warn('This function is not implemented yet.');
  }

  render() {
    return (
      <div className="calc-app">

        <div className="calc-container">
          <header className="phone-header">
            <div className="wifi">
              <div>
                Carrier
              </div>
              <span className="icon">
                <i className="fas fa-wifi"></i>
              </span>
            </div>
            <div className="TimeFirst">
              <div className="TimeSecond">
                {this.state.Time}
              </div>
            </div>
            <span className="icon">
              <i className="fas fa-battery-full"></i>
            </span>
          </header>
          <div className="calc-output">
            <div className="calc-display">{this.state.number}</div>
          </div>
          <div className="calc-row">
            <CalcButton onClick={this.ACorC.bind(this)}>{this.state.AC_C}</CalcButton>
            <CalcButton onClick={this.changeSign.bind(this)}>+/-</CalcButton>
            <CalcButton onClick={this.percentage.bind(this)}>%</CalcButton>
            <CalcButton className="calc-operator" onClick={this.readOps.bind(this,'÷')}>÷</CalcButton>
          </div>
          <div className="calc-row">
            <CalcButton className="calc-number" onClick={this.readDigit.bind(this,7)}>7</CalcButton>
            <CalcButton className="calc-number" onClick={this.readDigit.bind(this,8)}>8</CalcButton>
            <CalcButton className="calc-number" onClick={this.readDigit.bind(this,9)}>9</CalcButton>
            <CalcButton className="calc-operator" onClick={this.readOps.bind(this,'x')}>x</CalcButton>
          </div>
          <div className="calc-row">
            <CalcButton className="calc-number" onClick={this.readDigit.bind(this,4)}>4</CalcButton>
            <CalcButton className="calc-number" onClick={this.readDigit.bind(this,5)}>5</CalcButton>
            <CalcButton className="calc-number" onClick={this.readDigit.bind(this,6)}>6</CalcButton>
            <CalcButton className="calc-operator" onClick={this.readOps.bind(this,'-')}>-</CalcButton>
          </div>
          <div className="calc-row">
            <CalcButton className="calc-number" onClick={this.readDigit.bind(this,1)}>1</CalcButton>
            <CalcButton className="calc-number" onClick={this.readDigit.bind(this,2)}>2</CalcButton>
            <CalcButton className="calc-number" onClick={this.readDigit.bind(this,3)}>3</CalcButton>
            <CalcButton className="calc-operator" onClick={this.readOps.bind(this,'+')}>+</CalcButton>
          </div>
          <div className="calc-row">
            <CalcButton className={"calc-number bigger-btn"} onClick={this.readDigit.bind(this,0)}>0</CalcButton>
            <CalcButton className="calc-number" onClick={this.startFloat.bind(this)}>.</CalcButton>
            <CalcButton className="calc-operator" onClick={this.readOps.bind(this,'=')}>=</CalcButton>
          </div>
        </div>
        <div className="Words">
          Implement All features, include %, +/-, A transition between AC/C, floating point, and +, -, x, ÷.
          have already tested with <code>npm test</code>.
        </div>
      </div>
    );
  }
}

export default CalcApp;
