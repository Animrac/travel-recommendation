const bookButton = document.getElementById("btnBook");
const clearButton = document.getElementById("btnClear");
const searchButton = document.getElementById('btnSearch');
const destinations = [];

function resetForm() {
    document.getElementById("conditionInput").value = "";
    destinations = [];
}

function searchCondition() {
    const input = document.getElementById('conditionInput').value.toLowerCase();
    const resultDiv = document.getElementById('possibleDestinations');
    resultDiv.innerHTML = '';
    fetch('travel_recommendation_api.json')
      .then(response => response.json()) //fetch return
      .then(data => {
        const destCountries = data.countries.find(item => item.name.toLowerCase() === input.toLowerCase());
        let destKeyword;
        if (input.toLowerCase() === "temples" || input.toLowerCase() === "temple") {
            destKeyword = data.temples;
            console.log(destKeyword)
        }
        if (input.toLowerCase() === "beaches" || input.toLowerCase() === "beach") {
            destKeyword = data.beaches;        
        }
        
        if (destCountries) {
            for (let j = 0; j < destCountries.cities.length; j++) {
                resultDiv.innerHTML += `<h2>${destCountries.cities[j].name}</h2>`;
                resultDiv.innerHTML += `<img src="${destCountries.cities[j].imageUrl}" alt="Destination Image" class="dest-img">`;
                resultDiv.innerHTML += `<p><strong>Description:</strong> ${destCountries.cities[j].description}</p><div class="divider"></div>`;
            }
        } else if (destKeyword) {
            for (const d of destKeyword) {
                resultDiv.innerHTML += `<h2>${d.name}</h2>`;
                resultDiv.innerHTML += `<img src="${d.imageUrl}" alt="Destination Image" class="dest-img">`;
                resultDiv.innerHTML += `<p><strong>Description:</strong> ${d.description}</p><div class="divider"></div>`;
            }
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