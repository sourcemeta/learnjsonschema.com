import './vendor/bootstrap/js/src/dropdown.js';
import Tooltip from './vendor/bootstrap/js/src/tooltip.js';

for (const element of document.querySelectorAll('[data-bs-toggle="tooltip"]')) {
  new Tooltip(element);
}

const vocabularyTab = document.getElementById('vocabulary-tab');
const alphabeticTab = document.getElementById('alphabetic-tab');
const vocabularyContent = document.getElementById('vocabulary');
const alphabeticContent = document.getElementById('alphabetic');

let alphabeticOrder = sessionStorage.getItem('alphabeticOrder');

if (alphabeticOrder === 'true') { 
  vocabularyTab.classList.remove('active');
  alphabeticTab.classList.add('active');
  alphabeticContent.classList.add('show', 'active');
  alphabeticContent.classList.remove('d-none');
} else {
  alphabeticTab.classList.remove('active');
  vocabularyTab.classList.add('active');
  vocabularyContent.classList.add('show', 'active');
  vocabularyContent.classList.remove('d-none')
}


vocabularyTab.addEventListener('click', function () {
  sessionStorage.setItem('alphabeticOrder', 'false'); // Store as string
  vocabularyTab.classList.add('active');
  alphabeticTab.classList.remove('active');
  vocabularyContent.classList.add('show', 'active');
  vocabularyContent.classList.remove('d-none')
});

alphabeticTab.addEventListener('click', function () {
  sessionStorage.setItem('alphabeticOrder', 'true'); // Store as string
  alphabeticTab.classList.add('active');
  vocabularyTab.classList.remove('active');
  vocabularyContent.classList.add('d-none');
  alphabeticContent.classList.remove('d-none');
  alphabeticContent.classList.add('show', 'active');
});
