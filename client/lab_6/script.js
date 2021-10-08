/* eslint-disable consistent-return */
/* eslint-disable linebreak-style */
const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

async function windowActions() {
  const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';

  const request = await fetch(endpoint);

  const arrayName = await request.json();
  console.log(arrayName);

  // eslint-disable-next-line no-shadow
  function findMatches(wordToMatch, arrayName) {
    // eslint-disable-next-line eqeqeq
    if (wordToMatch.length != 0) {
      return arrayName.filter((place) => {
        const regex = new RegExp(wordToMatch, 'gi');
        return place.name.match(regex) || place.category.match(regex);
      });
    }
    suggestions.innerHTML = '';
  }

  function displayMatches(event) {
    const matchArray = findMatches(event.target.value, arrayName);
    console.log(matchArray);
    if (matchArray) {
      const html = matchArray.map((place) => {
        const regex = new RegExp(event.target.value, 'gi');
        const restaurantName = place.name;
        const foodCategory = place.category;

        return `
        
            <li><p class='name'>${restaurantName}<br/>
                <class='category'>${foodCategory}<br/>
                <class='address_line_1'>${place.address_line_1}<br/>
                <class='city'>${place.city}<br/>
                <class='zip'>${place.zip}</p>         
            </li>
            `;
      }).join('');
      suggestions.innerHTML = html;
    }
  }

  searchInput.addEventListener('change', displayMatches);
  searchInput.addEventListener('keyup', (evt) => { displayMatches(evt); });
}

window.onload = windowActions;