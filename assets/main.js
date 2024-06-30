import './vendor/bootstrap/js/src/dropdown.js';
import Tooltip from './vendor/bootstrap/js/src/tooltip.js';
import Fuse from 'fuse.js';


const executeSearch = (searchQuery) => {
  // TODO - loading screen

  fetch('/index.json').then((response) => {
      if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' + response.status);
          return;
      }
      response.json().then((pages) => {
        var fuse = new Fuse(pages, fuseOptions);
        var result = fuse.search(searchQuery);
        updateDropdown(result.slice(0, 10));
      }).catch((err) => {
        console.error('Fetch Index Fetch Error :-S', err);
      });
  });
}

const updateDropdown = (results) => {
  // Clear previous results
  searchResultBox.innerHTML = '';

  if (results.length > 0) {
    results.forEach((result) => {
      const item = document.createElement('li');
      item.innerHTML = `<a class="dropdown-item" href="${result.item.permalink}">
        ${result.item.title}
        <span class="text-light-50" style="font-size: 0.8em;">(${result.item.dialect})</span>
        <span class="fw-bold" style="font-size: 0.9em;">${result.item.vocabulary}</span>
      </a>`;
      searchResultBox.appendChild(item);
    });
  } else {
    const item = document.createElement('li');
    item.innerHTML = '<a class="dropdown-item disabled" href="#">No matches found</a>';
    searchResultBox.appendChild(item);
  }  
}

const copyToClipboard = (text, button) => {
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

// Initialize tooltips
for (const element of document.querySelectorAll('[data-bs-toggle="tooltip"]')) {
  new Tooltip(element);
}

// Fuse search options
const fuseOptions = {
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

const searchInputContent = document.getElementById('search-content');
const searchResultBox = document.getElementById('search-result-list');

searchInputContent.addEventListener('input', () => {
  const query = searchInputContent.value;

  if (query) {
    executeSearch(query);
    searchResultBox.style.display = 'block';
  } else {
    searchResultBox.style.display = 'none';
  }
});

document.addEventListener('click', (event) => {
  if (!searchInputContent.contains(event.target) && !searchResultBox.contains(event.target)) {
    searchResultBox.style.display = 'none';
    searchInputContent.value = ''; // Clear the search input
  }
});

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".copy-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const codeBlock = btn.nextElementSibling;
      if (codeBlock && codeBlock.textContent) {
        copyToClipboard(codeBlock.textContent, btn);
      }
    });
  });

const vocabularyTab = document.getElementById('sidebar-grouping-vocabulary');
const alphabeticTab = document.getElementById('sidebar-grouping-alphabetic');
const vocabularyContent = document.getElementById('vocabulary');
const alphabeticContent = document.getElementById('alphabetic');

function setSidebarGrouping(sidebarGrouping) {
  if (sidebarGrouping === 'alphabetic') {
    vocabularyTab.classList.remove('active');
    alphabeticTab.classList.add('active');
    vocabularyContent.classList.remove('show', 'active');
    vocabularyContent.classList.add('d-none');
    alphabeticContent.classList.add('show', 'active');
    alphabeticContent.classList.remove('d-none');
  } else {
    alphabeticTab.classList.remove('active');
    vocabularyTab.classList.add('active');
    alphabeticContent.classList.remove('show', 'active');
    alphabeticContent.classList.add('d-none');
    vocabularyContent.classList.add('show', 'active');
    vocabularyContent.classList.remove('d-none');
  }
}

const sidebarGrouping = localStorage.getItem('sidebarGrouping');
setSidebarGrouping(sidebarGrouping);

vocabularyTab.addEventListener('click', function () {
  localStorage.setItem('sidebarGrouping', 'vocabulary');
  setSidebarGrouping('vocabulary');
});

alphabeticTab.addEventListener('click', function () {
  localStorage.setItem('sidebarGrouping', 'alphabetic');
  setSidebarGrouping('alphabetic');
});
