//global variable that holds our user selected calculation
let operator = '+'; //default is '+'

function onReady() {
  console.log('client.js is sourced!');
  //upon page reload, fetch our server data
  fetchCalculations();
  resetForm();
}

//get calculation data from server and display on the DOM
function fetchCalculations() {
  //this is short-axios GET method
  axios
    .get('/calculations')
    .then((response) => {
      //upon success response from server, use the response.data
      const calcData = response.data;
      console.log('Calculations data array', calcData);
      renderDOM(calcData);
    })
    .catch((error) => {
      console.error('Error in fetching Calculations', error);
    });
}

function addCalculation(event) {
  event.preventDefault(); //stop page reload
  console.log('add my calculation'); //ensure button event works
  //get our form values from user interaction
  const numOneValue = document.getElementById('numOneInput').value;
  const numTwoValue = document.getElementById('num-two-input').value;

  //check for empty values, currently just ckecking for empty strings
  //this could be expanded for better user checks before sending to the server
  //but ultimate check is done on the server...never trust the front-end!!
  if (!numOneValue || !numTwoValue) {
    alert('Need some numbers!');
    return;
  } else {
    //build a calculation object
    const newCalculation = {
      numOne: numOneValue,
      numTwo: numTwoValue,
      operator: operator, //this is initialized as a '+' global variable
    };

    console.log('newCalculation', newCalculation);
    //send a POST request to server (short-hand axios post)
    axios
      .post('/calculations', newCalculation)
      .then((response) => {
        console.log('successful post');
        //GET data
        fetchCalculations();
        //clear forms
        resetForm();
      })
      .catch((error) => {
        console.error('Error submitting calculation');
      });

    //longhand axios POST
    //   axios({
    //     method: 'POST',
    //     url: '/calculations',
    //     data: newCalculation,
    //   })
    //     .then((response) => {
    //       console.log('get updates from server...');
    //       fetchCalculations();
    //     })
    //     .catch((error) => {
    //       console.error('Error submitting calculation');
    //     });
  }
}

function setOperator(event) {
  console.log(event.target.id);
  //the event object has a 'target' property that has access to the the button that was clicked
  //we set an 'id' on each button with a corresponding operation, ie, id="+"
  //the operator is set to the clicked operation button in the html
  operator = event.target.id;
}

function clearHistory(event) {
  //delete request to server
  console.log('clear server calc history');
  axios
    .delete('/calculations')
    .then((response) => {
      console.log('refresh dom');
      //GET data
      fetchCalculations();
      //clear forms
      resetForm();
    })
    .catch((error) => {
      console.error('Error Clearing Calc History', error);
    });
}

//Function to Display and keep DOM updated
function renderDOM(calcData) {
  //access the elements from the DOM
  const calcHistory = document.getElementById('resultHistory');
  const calcRecent = document.getElementById('recentResult');

  //initial value for most recent calculation
  calcRecent.innerHTML = 0;

  //check to see if there is calculation data to display
  if (calcData.length > 0) {
    calcRecent.innerHTML = `<h2>${calcData[calcData.length - 1].result}</h2>`;
    //clear history only if there is data to clear
    calcHistory.innerHTML = '';
    for (let calc of calcData) {
      console.log('calculation obj', calc);
      calcHistory.innerHTML += `
      <ul>
          <li>${calc.numOne} ${calc.operator} ${calc.numTwo} = ${calc.result}</li>
      </ul>`;
    }
  } else {
    console.log('No calculations to grab.');
    //user friendly message as to why nothing is showing
    calcHistory.innerHTML = `<ul><li>No calculations to grab</li></ul>`;
  }
}

function resetForm() {
  //clear the form inputs
  document.getElementById('calc-form').reset();
  //   document.getElementById('numOneInput').value = '';
  //   document.getElementById('num-two-input').value = '';
  operator = '+';
}

//run onReady upon html/page loading
onReady();
