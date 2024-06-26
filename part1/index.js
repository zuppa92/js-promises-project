// Function to get a fact about a number
function getNumberFact(number) {
  const url = `http://numbersapi.com/${number}?json`;
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    });
}

// Function to get multiple facts about a number
function getMultipleNumberFacts(number, count) {
  const factsPromises = [];
  for (let i = 0; i < count; i++) {
    factsPromises.push(getNumberFact(number));
  }

  Promise.all(factsPromises)
    .then(facts => {
      const factsDiv = document.getElementById('facts');
      factsDiv.innerHTML = ''; // Clear any previous facts
      facts.forEach((factData, index) => {
        const factElement = document.createElement('p');
        factElement.textContent = `Fact ${index + 1} about the number ${number}: ${factData.text}`;
        factsDiv.appendChild(factElement);
      });
    })
    .catch(error => {
      console.error('There has been a problem with your fetch operation:', error);
    });
}

// Calling the function with your favorite number and the number of facts you want
getMultipleNumberFacts(7, 4);
