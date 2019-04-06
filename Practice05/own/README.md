# Calculator
A calculator simulating the one on iphone.

## Available scripts
### npm start
- Start a server allowing you to use the calculator at `localhost:3000`
### npm test
- Automatically test functionalities of the calculator
- ***Warning:***
    - The originally provided `CalcApp.spec.js` contains a bug at the last testcase which uses `shallow copy` to temporarily backup initial state
    - Initial state should be backup with `deep copy`
    - Here I use `JSON.stringify` and `JSON.parse` to realize `deep copy`
