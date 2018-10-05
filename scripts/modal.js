// /*  Full credit and thanks to Rob Dodson for the Udacity lesson (https://www.udacity.com/course/web-accessibility--ud891) on creating an accessible modal and the GitHub access to this wonderful code: https://github.com/udacity/ud891/blob/gh-pages/lesson2-focus/07-modals-and-keyboard-traps/solution/modal.js */
(function(){
  // // Will hold previously focused element
  let focusedElementBeforeModal;

  const body = document.getElementById('body');
  const modal = document.getElementById('modal');
  const modalInner = document.getElementById('modal-inner');
  const uoButton = document.getElementById('user-options');
  const contactButton = document.getElementById('message');

  const uoForm = `<form id="uo-modal" class="uo-modal" action="">
        <fieldset>  
          <legend>Stop Animation</legend>
          <div class="fb-container">
              <label for="animation-stop">
                <input type="radio" id="animation-stop" name="animation" value="on">
                <span class="select">Yes</span>
              </label>
              <label for="animation-play">
              <input type="radio" id="animation-play" name="animation" value="off" checked>
              <span class="select">No</span>
              </label>
          </div>
        </fieldset> 
        <fieldset>  
          <legend>Change <span class="uppercase">Uppercase</span> to Normal Case</legend>
          <div class="fb-container">
              <label for="uppercase-removed">
              <input type="radio" id="uppercase-removed" name="uppercase" value="on">
              <span class="select">Yes</span>
              </label>
              <label for="uppercase-allowed">
              <input type="radio" id="uppercase-allowed" name="uppercase" value="off" checked>
              <span class="select">No</span>
              </label>
          </div>
        </fieldset> 
        <fieldset>  
          <legend>Invert Theme Colours</legend>
          <div class="fb-container">
              <label for="invert-on">
              <input type="radio" id="invert-on" name="invert" value="on">
              <span class="select">Yes</span>
              </label>
              <label for="invert-off">
                <input type="radio" id="invert-off" name="invert" value="off" checked>
                <span class="select">No</span>
              </label>
          </div>
        </fieldset> 
        <button id="exit" class="exit">Exit User Options</button>
        <button id="issue" class="issue">Report an issue</button>
      </form>`;

  const contactForm = `<form id="contact" class="contact" action="https://g260z3nzb7.execute-api.us-east-1.amazonaws.com/dev/static-site-mailer" method="POST">
        <label>
          Name (required)
          <input type="text" name="name" required>
        </label>
        <label>
          Email (required)
          <input type="email" name="reply_to" required>
        </label>
        <label>
          Message:
          <textarea name="message" rows="5" required></textarea>
        </label>
        <button type="submit">Send Message</button>
        <button id="exit" class="exit">Close</button>
      </form>`;

  const closeModal = (e) => {
  	e.preventDefault();
  	modal.style.display = 'none';
  	body.classList.remove('fixed');
  	// Set focus back to element that had it before the modal was opened
  	focusedElementBeforeModal.focus();
  }

  const openModal = (e) => {

    switch(e.target.id) {
      case 'user-options' :
        modalInner.innerHTML = uoForm;
        const issueButton = document.getElementById('issue');
        issueButton.addEventListener('click', function(e) {
            closeModal(e);
            openModal(e);
        }, false);
        break;
      case 'message' :
        modalInner.innerHTML = contactForm;
        prepareForm();
        break;
      case 'issue' :
        modalInner.innerHTML = contactForm;
        prepareForm();
        break;
    }

  	// Save current focus
  	focusedElementBeforeModal = document.activeElement;

  	// Listen for and trap the keyboard
  	modal.addEventListener('keydown', trapTabKey);

  	// close on ESC, "Exit" button, or clicking outside modal
    const exit = document.getElementById('exit');
  	exit.addEventListener('click', closeModal);

  	// Find all focusable children
  	let focusableElementsString = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';
  	let focusableElements = modal.querySelectorAll(focusableElementsString);
  	// Convert NodeList to Array
  	focusableElements = Array.prototype.slice.call(focusableElements);

  	let firstTabStop = focusableElements[0];
  	let lastTabStop = focusableElements[focusableElements.length - 1];

  	modal.style.display = 'block';
  	body.classList.add('fixed');

  	// This is the usual code but if inside the UO modal, I want to focus on the first active input when users enter the modal
  	// firstTabStop.focus();
    if (e.target.id === 'user-options') {
      let activeInputs = modal.querySelectorAll('input:checked');
      activeInputs[0].focus();
    } else {
      firstTabStop.focus();
    }


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
  	    closeModal(e);
  	  }
  	}
  }

  uoButton.addEventListener('click', function(e) {
      openModal(e);
  }, false);

  contactButton.addEventListener('click', function(e) {
      openModal(e);
  }, false);

  // Courtesy of Brian Holt's tutorial: https://www.smashingmagazine.com/2018/05/building-serverless-contact-form-static-website/
  const prepareForm = () => {
    const form = document.getElementById('contact');
    const formResponse = document.getElementById('js-form-response');

    form.onsubmit = e => {
      e.preventDefault();

      // Prepare data to send
      const data = {};
      const formElements = Array.from(form);
      formElements.map(input => (data[input.name] = input.value));

      // Log what our lambda function will receive
      console.log(JSON.stringify(data));

      // Construct HTTP request 
      const xhr = new XMLHttpRequest();
      xhr.open(form.method, form.action, true);
      xhr.setRequestHeader('Accept', 'application/json; charset=utf-8');
      xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

      // Send collected data as JSON
      xhr.send(JSON.stringify(data));

      // Callback
      xhr.onloadend = response => {
        if (response.target.status === 200) {
          form.reset();
          modalInner.innerHTML = `<h2>Thanks for getting in touch!</h2><p>I'll get back to you as soon as possible</p>`;
        } else {
          modalInner.innerHTML = `<h2>Sorry, something went wrong!</h2><p>Please try again later</p>`;
          console.error(JSON.parse(response.target.response).message);
        }
      }
    };
  };

})()