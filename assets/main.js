import './vendor/bootstrap/js/src/dropdown.js';
import Tooltip from './vendor/bootstrap/js/src/tooltip.js';
import Fuse from 'fuse.js';

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

const searchInput = document.getElementById('search-query');
const box = document.getElementById('listBox');

searchInput.addEventListener('input', function() {
  const query = searchInput.value;
  console.log('Search query:', query);

  if (query) {
    executeSearch(query);
    box.style.display = 'block';
  } else {
    box.style.display = 'none';
  }
});

document.addEventListener('click', function(event) {
  if (!searchInput.contains(event.target) && !box.contains(event.target)) {
    box.style.display = 'none';
    searchInput.value = ''; // Clear the search input
  }
});

function executeSearch(searchQuery) {
  // TODO
  // show(document.querySelector('.search-loading'));

  fetch('/index.json').then(function (response) {
      if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' + response.status);
          return;
      }
      response.json().then(function(pages) {
        var fuse = new Fuse(pages, fuseOptions);
        var result = fuse.search(searchQuery);
        updateDropdown(result.slice(0, 10));
      }).catch(function(err) {
        console.log('Fetch Error :-S', err);
      });
  });
}

function updateDropdown(results) {
  // Clear previous results
  box.innerHTML = '';

  if (results.length > 0) {
    results.forEach(function(result) {
      const item = document.createElement('li');
      item.innerHTML = `<a class="dropdown-item" href="${result.item.permalink}">
        ${result.item.title}
        <span style="font-size: 0.8em; color: #888;">(${result.item.dialect})</span>
        <span style="font-size: 0.9em; color: #007bff;">${result.item.vocabulary}</span>
      </a>`;
      box.appendChild(item);
    });
  } else {
    const item = document.createElement('li');
    item.innerHTML = '<a class="dropdown-item disabled" href="#">No matches found</a>';
    box.appendChild(item);
  }  
}

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".copy-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const codeBlock = btn.nextElementSibling;
      if (codeBlock && codeBlock.textContent) {
        copyToClipboard(codeBlock.textContent, btn);
      }
    });
  });
});

function copyToClipboard(text, button) {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      const originalIcon = button.innerHTML;
      button.innerHTML = '<i class="bi bi-check-lg"></i> Copied!';
      setTimeout(() => {
        button.innerHTML = originalIcon;
      }, 1500);
    })
    .catch((err) => {
      console.error("Failed to copy text: ", err);
    });
}