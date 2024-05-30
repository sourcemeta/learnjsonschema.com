import './vendor/bootstrap/js/src/dropdown.js';
import Tooltip from './vendor/bootstrap/js/src/tooltip.js';

// Initialize tooltips
for (const element of document.querySelectorAll('[data-bs-toggle="tooltip"]')) {
  new Tooltip(element);
}

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