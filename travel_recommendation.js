const bookButton = document.getElementById("btnBook"); //doesn't need to do anything
const clearButton = document.getElementById("btnClear");
const searchButton = document.getElementById('btnSearch');
const resultDiv = document.getElementById('possibleDestinations');

function resetForm() {
    document.getElementById("conditionInput").value = "";
    resultDiv.innerHTML = '<p>Start your journey by entering a destination or keyword in the search bar!</p>';
}

function searchCondition() {
    const input = document.getElementById('conditionInput').value.toLowerCase();
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
        if (input.toLowerCase() === "country" || input.toLowerCase() === "countries") {
            destKeyword = data.countries;        
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