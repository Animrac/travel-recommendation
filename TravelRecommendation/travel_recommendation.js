const bookButton = document.getElementById("btnBook");
const clearButton = document.getElementById("btnClear");
const searchButton = document.getElementById('btnSearch');
const destinations = [];

function resetForm() {
    document.getElementById("conditionInput").value = "";
    // document.querySelector('destinations').checked = false;
    destinations = [];
}

function searchCondition() {
    const input = document.getElementById('conditionInput').value.toLowerCase();
    const resultDiv = document.getElementById('possibleDestinations');
    resultDiv.innerHTML = '';
    fetch('travel_recommendation_api.json')
      .then(response => response.json()) //fetch return
      .then(data => {
        const dest = data.countries.find(item => item.name.toLowerCase() === input);
        if (dest) {
          resultDiv.innerHTML += `<h2>${dest.name}</h2>`;
          resultDiv.innerHTML += `<img src="${dest.imageUrl}" alt="Destination Image">`;
          resultDiv.innerHTML += `<p><strong>Description:</strong> ${dest.description}</p>`;
        } else {
          resultDiv.innerHTML = 'There are no matching destinations.';
        }
      })
      .catch(error => {
        console.error('Error:', error);
        resultDiv.innerHTML = 'An error occurred while fetching data.';
      });
}

btnSearch.addEventListener('click', searchCondition);
btnClear.addEventListener('click', resetForm);