let operator = '+';

function onReady() {
  console.log('client.js is sourced!');
  fetchCalculations();
}

//get calucation data from server and display on the DOM
function fetchCalculations() {
  axios
    .get('/calculations')
    .then((response) => {
      const calcData = response.data;
      console.log('Calculations data array', calcData);
      const calcHistory = document.getElementById('resultHistory');
      const calcRecent = document.getElementById('recentResult');

      calcRecent.innerHTML = `<h2>${calcData[calcData.length - 1].result}</h2>`;
      calcHistory.innerHTML = '';
      for (let calc of calcData) {
        console.log('calculation obj', calc);
        calcHistory.innerHTML += `
        <ul>
            <li>${calc.numOne} ${calc.operator} ${calc.numTwo} = ${calc.result}</li>
        </ul>`;
      }
    })
    .catch((error) => {
      console.error('Error in fetching Calculations', error);
    });
}

function addCalculation(event) {
  event.preventDefault();
  console.log('add my calculation');
  //get our form values from user interaction
  const numOneValue = document.getElementById('numOneInput').value;
  const numTwoValue = document.getElementById('num-two-input').value;
  //build a calculation object
  const newCalculation = {
    numOne: numOneValue,
    numTwo: numTwoValue,
    operator: operator, //this is initialized as a '+' global variable
  };

  console.log('newCalculation', newCalculation);
  //send a POST request to server
  axios.post('/calculations', newCalculation).then((response) => {
    console.log('successful post');
    fetchCalculations();
  });
}

function setOperator(event) {
  event.preventDefault();
  console.log(event.target.id);
  operator = event.target.id;
}

onReady();
