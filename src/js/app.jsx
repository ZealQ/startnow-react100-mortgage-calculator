// css work was done as well check that out in  src>css>style.less

import React from 'react';
// function for the balance input box
function Balance(props) {
  return (
    <div className="shadow field">
    {/* the lable that will be next to the input box */}
      <lable className="label">
        Loan Balance
      </lable>
      <div className="control">
        <input name="balance"
          type="number"
          className="input"
          placeholder="principle"
          value={props.value}
          onChange={props.onChange}
        />
      </div>
    </div>
  );
}
// the rate function that will be from 1-100
function Rate(props) {
  return (
    <div className="shadow field">
      <label className="label">
        Interest Rate (APR%)
      </label>
      <div className="control">
        <input name="rate"
          type="number"
          min="0"
          max="100"
          className="input"
          placeholder="(APR%)"
          value={props.value}
          onChange={props.onChange}
        />
      </div>
    </div>
  );
}
// term function and how long the terms will be
function Term(props) {
  return (
    <div className="shadow feild">
      <lable className="label">
        Loan term
      </lable>
      <div className="control is-expanded">
        <div className="select is-fullwidth">
          <select name="term"
            defaultValue={props.value}
            onChange={props.onChange}>
            <option value="15">15 Years</option>
            <option value="30">30 Years</option>
          </select>
        </div>
      </div>
    </div>
  )
}
// submit button to calculate balance + apr = term
function Submit(props) {
  return (
    <button
      name="submit"
      className="button is-info is-width"
      onClick={props.onClick}>
      Calculate
    </button>
  )

}
// function output the answer of the calculation
function Output(props) {
  return (
    <div
      className="output-notification"
      id="output">
      {props.status}
    </div>
  )
}
export default class App extends React.Component {
  constructor() {
    super();
    //  the states that are in the code to later be called on
    this.state = {
      balance: 0,
      rate: 0,
      term: 0,
      output: "Hit\"Calculate\" to calculate your mortgage"
    };
    // handelchange binded to this and this is the states 
    this.handleChange =
      this.handleChange.bind(this);
    this.handleSubmit =
      this.handleSubmit.bind(this);
  }
  // handelchange event that will get the value of each state
  // and the name of each state 
  handleChange(event) {
    const value = event.target.value;
    const name = event.target.name;
// this.setstate is allowng the target name to parseFlot(value)
//[name] needs to be in side the brakets in order to be a key
    this.setState({
      [name]: parseFloat(value)
    })
  }
  // the formula to get the calculation of the  states and give you 
  // what the answer is when all input field are fill in
  calculate(balance, rate, term) {
    const P = balance;
    const r = ((rate * 1) / 100 / 12);
    const t = term * 12;
    const M = P * (r * Math.pow((1 + r), t)) / (Math.pow((1 + r), t) - 1);
    return M;
  }
  // handelSubmit event will use the calculation and the  answer to give an
  // output message with the answer
  handleSubmit(e) {
    event.preventDefault();
    const payment = "$" + this.calculate(this.state.balance, this.state.rate, this.state.term).toFixed(2) + " is your payment" || "";
    this.setState({
      output: payment
    })
  }

// the render that will take in all the functions and handels and 
// render them
  render() {
    return (
      // in react you need  to have changed things from js 
      // name is (className)
      // for is (htmlFor)
      // value is (deafultValue)
      // and when you have a target name is must be in [] so that it can be called on as a key
      <div className="mortgage app">
        <div className="body">
          <div className="container">
            <h1 className="title is large">Mortgage Calculator</h1>
            <h2 className="subtitle is large">See how much you will pay today!</h2>
          </div>
        </div>
        <section className="section">
          <div className="container is widescreen">
            <div className="column is-mobile is-multiline is-centerd">
              <div className="column has-text-centered">
                <Balance defaultValue={this.state.balance}
                  onChange={this.handleChange} />
              </div>
              <div className="column has-text-centered">
                <Rate defaultValue={this.state.rate}
                  onChange={this.handleChange} />
              </div>
              <div className="column has-text-centered">
                <Term defaultValue={this.state.term}
                  onChange={this.handleChange} />
              </div>
            </div>
            <Submit onClick={this.handleSubmit} />
          </div>
        </section>
        <section className="section">
          <div className="content is-large has-text-centered">
            <Output status={this.state.output} />
          </div>
        </section>
      </div>
    );
  }
}
