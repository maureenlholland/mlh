var animationState=document.querySelector("#animation-state");function toggleAnimationState(){var e=pJSDom[0].pJS,t=!e.particles.move.enable;e.particles.move.enable=t,animationState.setAttribute("data-animation-state",t),animationState.textContent=t?"Stop animation":"Start animation",e.fn.particlesRefresh()}particlesJS("particles-js",{particles:{number:{value:150,density:{enable:!0,value_area:800}},color:{value:"#ffffff"},shape:{type:"circle",stroke:{width:0,color:"#000000"},polygon:{nb_sides:5},image:{src:"img/github.svg",width:100,height:100}},opacity:{value:.5,random:!1,anim:{enable:!1,speed:.2,opacity_min:.1,sync:!1}},size:{value:3,random:!0,anim:{enable:!1,speed:20,size_min:.1,sync:!1}},line_linked:{enable:!0,distance:150,color:"#ffffff",opacity:.4,width:1},move:{enable:!0,speed:3,direction:"none",random:!1,straight:!1,out_mode:"out",bounce:!1,attract:{enable:!1,rotateX:600,rotateY:1200}}},retina_detect:!0}),animationState.addEventListener("click",toggleAnimationState);