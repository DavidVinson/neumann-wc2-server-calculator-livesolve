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

onReady();
