import './vendor/bootstrap/js/src/dropdown.js';
import Tooltip from './vendor/bootstrap/js/src/tooltip.js';

// Initialize tooltips
for (const element of document.querySelectorAll('[data-bs-toggle="tooltip"]')) {
  new Tooltip(element);
}
