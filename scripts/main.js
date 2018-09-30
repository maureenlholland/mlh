const mlh = {};

mlh.body = document.getElementById('body');
mlh.uoButton = document.getElementById('user-options');
mlh.modal = document.getElementById('uo-modal');
mlh.modalInner = document.getElementById('uo-modal-inner');
mlh.modalForm = document.getElementById('uo-modal-form');
// I think there's a way to re-factor this: event listener on inputs and check value of clicked input to determine what function to run - case/switch?
mlh.darkButton = document.getElementById('invert-off');
mlh.lightButton = document.getElementById('invert-on');
mlh.normalButton = document.getElementById('uppercase-removed');
mlh.uppercaseButton= document.getElementById('uppercase-allowed');
mlh.pauseButton = document.getElementById('animation-stop');
mlh.playButton = document.getElementById('animation-play');
mlh.exitButton = document.getElementById('exit');
mlh.allH2 = document.getElementsByTagName('h2');
mlh.allH3 = document.getElementsByTagName('h3'); 
mlh.uppercase = document.getElementsByClassName('uppercase');
mlh.animation = document.getElementsByClassName('twinkling')[0];
mlh.header = document.getElementsByTagName('header')[0];

mlh.checkHeader = () => {
	// console.log('fix to top if scrolled down or return to normal size if scrolled all the way up')
	// Thanks to: http://blog.dynamicdrive.com/beautiful-examples-of-css-javascript-sticky-menus/
	console.log('running checkHeader')
	const stickymenu = mlh.header;
	let stickymenuoffset = mlh.header.offsetTop;
	console.log(stickymenuoffset)
	requestAnimationFrame(function(){
	        if (window.pageYOffset > stickymenuoffset){
	            stickymenu.classList.add('sticky');
	            let topOffset = stickymenu.getBoundingClientRect().height;
	            // mlh.body.style.paddingTop = topOffset + 30 + 'px';
	            // change padding at top of body
	        }
	        else{
	            stickymenu.classList.remove('sticky')
	            // mlh.body.style.paddingTop = 30 + 'px';
	            // change padding at top of body
	        }
	    })
}

mlh.openUOmodal = () => {
	mlh.modal.style.display = 'block';
	// adding to the word, not a separate class
	mlh.body.classList.add('fixed');
}

mlh.closeUOmodal = (e) => {
	e.preventDefault();
	// mlh.modal.style.maxHeight = '0px';
	mlh.modal.style.display = 'none';
	mlh.body.classList.remove('fixed');
}

mlh.switchTheme = (e) => {
	if (e.target.id === 'invert-on'){
		mlh.body.classList.add('invert');
		// change attributes on appropriate input to indicate which theme is active
	} else {
		mlh.body.classList.remove('invert');
	}
}

mlh.removeUppercase = (arr) => {
	if ( arr.length === 0) {
		return;
	}
	for(let i=0; i < arr.length; i++) {
		arr[i].style.textTransform = 'none';
		// arr[i].style.letterSpacing = '0.075rem';
	}
}

mlh.addUppercase = (arr) => {
	if ( arr.length === 0) {
		return;
	}
	for(let i=0; i < arr.length; i++) {
		arr[i].style.textTransform = 'uppercase';
		arr[i].style.letterSpacing = '0';
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

mlh.uoButton.addEventListener('click', mlh.openUOmodal, false);
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
mlh.exitButton.addEventListener('click', function(e){
	mlh.closeUOmodal(e);
}, false);
window.addEventListener('scroll', mlh.checkHeader, false);



