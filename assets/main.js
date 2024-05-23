import './vendor/bootstrap/js/src/dropdown.js';
import Tooltip from './vendor/bootstrap/js/src/tooltip.js';

// Initialize tooltips
for (const element of document.querySelectorAll('[data-bs-toggle="tooltip"]')) {
  new Tooltip(element);
}

// Fuse search options
var fuseOptions = {
  shouldSort: true,
  includeMatches: true,
  includeScore: true,
  keys: [
    { name: "title", weight: 0.45 },
    { name: "contents", weight: 0.4 },
    { name: "tags", weight: 0.1 },
    { name: "categories", weight: 0.05 }
  ]
};

// Get references to the form and input box
const searchForm = document.getElementById('search-form');
const inputBox = document.getElementById('search-query');

// Add event listener to the form
if (searchForm) {
  searchForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const searchQuery = inputBox.value.trim();
    if (searchQuery) {
      executeSearch(searchQuery);
    } else {
      alert('Please enter a valid search query.');
    }
  });
}


function executeSearch(searchQuery) {

  // show(document.querySelector('.search-loading'));

  fetch('/index.json').then(function (response) {
      if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' + response.status);
          return;
      }
      // Examine the text in the response
      response.json().then(function (pages) {
          var fuse = new Fuse(pages, fuseOptions);
          var result = fuse.search(searchQuery);
          if (result.length > 0) {
              window.location.replace(result[0].item.permalink);
          } else {
            alert('No matches found.');
          }
          // hide(document.querySelector('.search-loading'));
      })
      .catch(function (err) {
          console.log('Fetch Error :-S', err);
      });
  });
}

// Helper Functions
// function show(elem) {
//   elem.style.display = 'block';
// }
// function hide(elem) {
//   elem.style.display = 'none';
// }
