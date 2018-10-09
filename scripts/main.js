const mlh = {};

mlh.root = document.documentElement;
mlh.allH2 = document.getElementsByTagName('h2');
mlh.allH3 = document.getElementsByTagName('h3'); 
mlh.uppercase = document.getElementsByClassName('uppercase');
mlh.animation = document.getElementsByClassName('twinkling')[0];
mlh.header = document.getElementsByTagName('header')[0];
mlh.uoButton = document.getElementById('user-options');
mlh.featured = document.querySelectorAll('.featured')[0];
mlh.checked = {
  animation: false,
  uppercase: false,
  invert: false
};

mlh.checkSize = () => {
	if (window.innerWidth > 650) {
		window.addEventListener('scroll', mlh.checkHeader, false);
		mlh.header.style.position = 'fixed';
		mlh.featured.style.paddingTop = '60px';
		mlh.header.classList.remove('mobile');
		mlh.header.style.paddingTop = 0;

	} else {
		window.removeEventListener('scroll', mlh.checkHeader, false);
		mlh.header.style.position = 'absolute';
		mlh.header.classList.add('mobile');
		mlh.featured.style.paddingTop = '80px';
		let headerPadding = mlh.uoButton.getBoundingClientRect().height;
		mlh.header.style.paddingTop = headerPadding + 'px';
	}

}

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

mlh.userOptionUpdate = (e) => {
	// change checked attribute
	mlh.checked[e.target.name] = !mlh.checked[e.target.name];
	// send to appropriate function
	if ( e.target.name === 'animation' ) {
	  mlh.switchAnimation(e);
	} else if ( e.target.name === 'uppercase'  ) {
	  mlh.switchCasing(e);
	} else {
	  mlh.switchTheme(e);
	}
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

// only run on desktop/tablet size
window.addEventListener('load', mlh.checkSize, false);
window.addEventListener('resize', mlh.checkSize, false);





