// /*  Full credit and thanks to Rob Dodson for the Udacity lesson (https://www.udacity.com/course/web-accessibility--ud891) on creating an accessible modal and the GitHub access to this wonderful code: https://github.com/udacity/ud891/blob/gh-pages/lesson2-focus/07-modals-and-keyboard-traps/solution/modal.js */
(function(){
  console.log('modal functionality loaded')
  // // Will hold previously focused element
  let focusedElementBeforeModal;

  const body = document.getElementById('body');
  const uoButton = document.getElementById('user-options');
  const modal = document.getElementById('uo-modal');
  const exitButton = document.getElementById('exit');

  const closeUOmodal = (e) => {
  	e.preventDefault();
  	modal.style.display = 'none';
  	body.classList.remove('fixed');
  	// Set focus back to element that had it before the modal was opened
  	focusedElementBeforeModal.focus();
  }

  const openUOmodal = () => {
  	// Save current focus
  	focusedElementBeforeModal = document.activeElement;

  	// Listen for and trap the keyboard
  	modal.addEventListener('keydown', trapTabKey);

  	// close on ESC, "Exit" button, or clicking outside modal
  	exit.addEventListener('click', closeUOmodal);

  	// Find all focusable children
  	let focusableElementsString = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';
  	let focusableElements = modal.querySelectorAll(focusableElementsString);
  	// Convert NodeList to Array
  	focusableElements = Array.prototype.slice.call(focusableElements);

  	let firstTabStop = focusableElements[0];
  	let lastTabStop = focusableElements[focusableElements.length - 1];

  	modal.style.display = 'block';
  	body.classList.add('fixed');

  	// This is the usual code but I want to focus on the first active input when users enter the modal
  	// firstTabStop.focus();

  	let activeInputs = modal.querySelectorAll('input:checked');
  	activeInputs[0].focus();


  	function trapTabKey(e) {
  	  // Check for TAB key press
  	  if (e.keyCode === 9) {

  	    // SHIFT + TAB
  	    if (e.shiftKey) {
  	      if (document.activeElement === firstTabStop) {
  	        e.preventDefault();
  	        lastTabStop.focus();
  	      }

  	    // TAB
  	    } else {
  	      if (document.activeElement === lastTabStop) {
  	        e.preventDefault();
  	        firstTabStop.focus();
  	      }
  	    }
  	  }

  	  // ESCAPE
  	  if (e.keyCode === 27) {
  	    closeUOmodal(e);
  	  }
  	}
  }

  uoButton.addEventListener('click', openUOmodal, false);

})()