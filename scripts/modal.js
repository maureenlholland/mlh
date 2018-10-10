// /*  Full credit and thanks to Rob Dodson for the Udacity lesson (https://www.udacity.com/course/web-accessibility--ud891) on creating an accessible modal and the GitHub access to this wonderful code: https://github.com/udacity/ud891/blob/gh-pages/lesson2-focus/07-modals-and-keyboard-traps/solution/modal.js */
(function(){
  // // Will hold previously focused element
  let focusedElementBeforeModal;

  const body = document.getElementById('body');
  const modal = document.getElementById('modal');
  const modalInner = document.getElementById('modal-inner');
  const uoButton = document.getElementById('user-options');
  const contactButton = document.getElementById('message');
  // Allow changes in copy for different forms
  let submitButton;
  let responseText;
  // Allow different tab stops for different modals
  let firstTabStop;
  let lastTabStop;

  const uoForm = `<form id="uo-modal" class="uo-modal" action="">
        <fieldset>  
          <legend>Stop Animation</legend>
          <div class="fb-container">
              <label for="animation-stop">
                <input type="radio" id="animation-stop" name="animation" value="on">
                <span class="select">Yes</span>
              </label>
              <label for="animation-play">
              <input type="radio" id="animation-play" name="animation" value="off">
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
              <input type="radio" id="uppercase-allowed" name="uppercase" value="off">
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
                <input type="radio" id="invert-off" name="invert" value="off">
                <span class="select">No</span>
              </label>
          </div>
        </fieldset> 
        <button id="exit" class="exit">Exit User Options</button>
        <button id="issue" class="issue">Report an issue</button>
      </form>`;

  const contactForm = `<form id="contact" class="contact" action="https://g260z3nzb7.execute-api.us-east-1.amazonaws.com/dev/static-site-mailer" method="POST" aria-live="polite">
        <label>
          Name (required)
          <input type="text" name="name" required>
        </label>
        <label>
          Email (required)
          <input type="email" name="reply_to" required>
        </label>
        <label>
          Message (required):
          <textarea name="message" rows="5" required></textarea>
        </label>
        <div style="display: none;">
           <input type="text" name="bots-only" id="bots-only" />
        </div>
        <input type="submit"></input>
        <button id="exit" class="exit">Close</button>
      </form>`;

  const validateForm = () => {
    /* code example from Jenna Molby: https://jennamolby.com/how-to-prevent-form-spam-by-using-the-honeypot-technique/*/

    // The field is empty, submit the form.
    if(!document.getElementById("bots-only").value) { 
      return true;
    } 
     // the field has a value it's a spam bot
    else {
      return false;
    }
  }

  const trapTabKey = (e) => {
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
        for (let value in mlh.checked) {
          mlh.checked[value] ? 
            document.querySelectorAll(`input[name=${value}][value="on"]`)[0].setAttribute('checked', 'true') : 
            document.querySelectorAll(`input[name=${value}][value="off"]`)[0].setAttribute('checked', 'true')
        }
        // set event listeners for each option
        const inputs = modalInner.querySelectorAll('input');
        const inputArr = Array.from(inputs);
        inputArr.forEach(function(input){
          input.addEventListener('change', function(e){
            mlh.userOptionUpdate(e);
          }, false);
        })
        // open issue form 
        const issueButton = document.getElementById('issue');
        issueButton.addEventListener('click', function(e) {
            closeModal(e);
            openModal(e);
        }, false);
        break;
      case 'message' :
        modalInner.innerHTML = contactForm;
        submitButton = document.querySelectorAll('input[type="submit"]')[0];
        submitButton.setAttribute('value', 'Send Message');
        responseText = `<div role="alert" class="response"><h2>Thanks for getting in touch!</h2><p>I will get back to you as soon as possible.</p><button id="exit" class="exit">Close</button></div>`
        prepareForm();
        break;
      case 'issue' :
        modalInner.innerHTML = contactForm;
        submitButton = document.querySelectorAll('input[type="submit"]')[0];
        submitButton.setAttribute('value', 'Report issue');
        responseText = `<div role="alert" class="response"><h2>Thanks for bring my attention to this issue!</h2><p>I will record the details on GitHub and create a fix as soon as possible.</p><button id="exit" class="exit">Close</button></div>`
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

    	firstTabStop = focusableElements[0];
    	lastTabStop = focusableElements[focusableElements.length - 1];

    	modal.style.display = 'flex';
    	body.classList.add('fixed');

    	// This is the usual code but if inside the UO modal, I want to focus on the first active input when users enter the modal
    	// firstTabStop.focus();
      if (e.target.id === 'user-options') {
        let activeInputs = modal.querySelectorAll('input:checked');
        activeInputs[0].focus();
      } else {
        firstTabStop.focus();
      }
  }

  uoButton.addEventListener('click', function(e) {
      openModal(e);
  }, false);

  contactButton.addEventListener('click', function(e) {
      openModal(e);
  }, false);

  // Based on Brian Holt's tutorial: https://www.smashingmagazine.com/2018/05/building-serverless-contact-form-static-website/
  const prepareForm = () => {
    const form = document.getElementById('contact');

    form.onsubmit = e => {
      e.preventDefault();

      if (validateForm()) {
        // Prepare data to send
        const data = {};
        const formElements = Array.from(form);
        formElements.map(input => (data[input.name] = input.value));

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
            modalInner.innerHTML = responseText;
            let exit = document.getElementById('exit');
            console.log(exit);
            exit.addEventListener('click', closeModal);
            exit.focus();
            firstTabStop = exit;
            lastTabStop = exit;
            exit.addEventListener('keydown', trapTabKey(e), false);
          } else {
            let copy = document.createElement('div');
            copy.innerHTML = `<div><h2>Sorry, something went wrong!</h2><p>Please try again later</p><button id="exit" class="exit">Close</button></div>`; 
            form.innerHTML = copy;
            console.error(JSON.parse(response.target.response).message);
            let exit = form.getElementById('exit');
            exit.addEventListener('click', closeModal);
          }
        }
      }
    };
  };

})()