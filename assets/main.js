import './vendor/bootstrap/js/src/dropdown.js';
import Tooltip from './vendor/bootstrap/js/src/tooltip.js';

// Initialize tooltips
for (const element of document.querySelectorAll('[data-bs-toggle="tooltip"]')) {
  new Tooltip(element);
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
