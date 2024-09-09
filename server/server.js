const express = require('express');
const app = express();
let PORT = process.env.PORT || 5000;

//middleware to provide req.body used in the POST
app.use(express.json());
app.use(express.static('server/public'));

// Global variable that will contain all of the
// calculation objects:
let calculations = [{ numOne: 25, numTwo: 10, operator: '+', result: 35 }];

// Here's a wonderful place to make some routes:

// GET /calculations
app.get('/calculations', (req, res) => {
  console.log('GET calculations');
  res.send(calculations);
});

// POST /calculations
app.post('/calculations', (req, res) => {
  //what will our req.body look like? { numOne: 25, numTwo: 10, operator: '+' }
  console.log('req.body', req.body);
  let obj2 = {
    numOne: req.body.numOne,
    numTwo: req.body.numTwo,
    operator: req.body.operator,
    result: 0,
  };
  if (req.body.operator === '+') {
    //add req.body.numOne and req.body.numTwo
    obj2.result = Number(req.body.numOne) + Number(req.body.numTwo);
  } else if (req.body.operator === '-') {
    obj2.result = Number(req.body.numOne) - Number(req.body.numTwo);
  } else if (req.body.operator === '*') {
    obj2.result = Number(req.body.numOne) * Number(req.body.numTwo);
    // res.status(201);
    //jacob
  } else if (req.body.operator === '/') {
    obj2.result = Number(req.body.numOne) / Number(req.body.numTwo);
    //jenny
  }

  console.log('calc obj', obj2);
  calculations.push(obj2);

  res.sendStatus(201); //201 created
});

// PLEASE DO NOT MODIFY ANY CODE BELOW THESE BEARS:
// 🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸 🐻‍❄️ 🐼 🐨 🐨 🐼 🐼 📉 <(bear market)

// Makes it so you don't have to kill the server
// on 5000 in order to run the tests:
if (process.env.NODE_ENV === 'test') {
  PORT = 5001;
}

// This starts the server...but also stores it in a variable.
// This is weird. We have to do it for testing reasons. There
// is absolutely no need for you to reason about this.
const server = app.listen(PORT, () => {
  console.log('server running on: ', PORT);
});

// server.setTimeout(500)

// This is more weird "for testing reasons" code. There is
// absolutely no need for you to reason about this.
app.closeServer = () => {
  server.close();
};

app.setCalculations = (calculationsToSet) => {
  calculations = calculationsToSet;
};

module.exports = app;
