const mlh = {};

mlh.root = document.documentElement;
mlh.body = document.getElementById('body');
// I think there's a way to re-factor this: event listener on inputs and check value of clicked input to determine what function to run - case/switch?
mlh.darkButton = document.getElementById('invert-off');
mlh.lightButton = document.getElementById('invert-on');
mlh.normalButton = document.getElementById('uppercase-removed');
mlh.uppercaseButton= document.getElementById('uppercase-allowed');
mlh.pauseButton = document.getElementById('animation-stop');
mlh.playButton = document.getElementById('animation-play');
mlh.allH2 = document.getElementsByTagName('h2');
mlh.allH3 = document.getElementsByTagName('h3'); 
mlh.uppercase = document.getElementsByClassName('uppercase');
mlh.animation = document.getElementsByClassName('twinkling')[0];
mlh.header = document.getElementsByTagName('header')[0];

mlh.checkHeader = () => {
	// Thanks to: http://blog.dynamicdrive.com/beautiful-examples-of-css-javascript-sticky-menus/
	const stickymenu = mlh.header;
	let stickymenuoffset = mlh.header.offsetTop;
	requestAnimationFrame(function(){
	        if (window.pageYOffset > stickymenuoffset){
	            stickymenu.classList.add('sticky');
	        }
	        else{
	            stickymenu.classList.remove('sticky')
	        }
	    })
}

mlh.switchTheme = (e) => {
	if (e.target.id === 'invert-on'){
		mlh.root.classList.add('invert');
	} else {
		mlh.root.classList.remove('invert');
	}
}

mlh.removeUppercase = (arr) => {
	if ( arr.length === 0) {
		return;
	}
	for(let i=0; i < arr.length; i++) {
		arr[i].style.textTransform = 'none';
	}
}

mlh.addUppercase = (arr) => {
	if ( arr.length === 0) {
		return;
	}
	for(let i=0; i < arr.length; i++) {
		arr[i].style.textTransform = 'uppercase';
	}
}

mlh.switchCasing = (e) => {
	if ( e.target.id === 'uppercase-removed' ) {
		mlh.removeUppercase(mlh.allH2);
		mlh.removeUppercase(mlh.allH3);
		mlh.removeUppercase(mlh.uppercase);
	} else {
		mlh.addUppercase(mlh.allH2);
		mlh.addUppercase(mlh.allH3);
		mlh.addUppercase(mlh.uppercase);
	}

}

mlh.switchAnimation = (e) => {
	if (e.target.id === 'animation-stop') {
		mlh.animation.style.animationPlayState = 'paused';
	} else {
		mlh.animation.style.animationPlayState = 'running';
	}
}

mlh.darkButton.addEventListener('change', function(e){
	mlh.switchTheme(e);
}, false);
mlh.lightButton.addEventListener('change', function(e){
	mlh.switchTheme(e);
}, false);
mlh.normalButton.addEventListener('change', function(e){
	mlh.switchCasing(e);
}, false);
mlh.uppercaseButton.addEventListener('change', function(e){
	mlh.switchCasing(e);
}, false);
mlh.pauseButton.addEventListener('change', function(e){
	mlh.switchAnimation(e);
}, false);
mlh.playButton.addEventListener('change', function(e){
	mlh.switchAnimation(e);
}, false);
// only run on desktop/tablet size
window.addEventListener('scroll', mlh.checkHeader, false);

// Courtesy of Brian Holt's tutorial: https://www.smashingmagazine.com/2018/05/building-serverless-contact-form-static-website/
(() => {
  const form = document.getElementById('test');
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
    		formResponse.innerHTML = 'Thanks for your message. I\'ll be in touch as soon as possible';
    	} else {
    		formResponse.innerHTML = 'Sorry. Something went wrong!';
    		console.error(JSON.parse(response.target.response).message);
    	}
    }
  };
})();



