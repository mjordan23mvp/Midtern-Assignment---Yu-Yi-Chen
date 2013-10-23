var d1 = document.getElementById("d1");

init();

function init(){
  d1.classList.toggle("is-active");
  d2.classList.toggle("is-active");

  d1.addEventListener("click",function(evt){
  evt.preventDefault();
  d1.classList.toggle("is-clicked");
  d3.classList.toggle("is-active");
  copyright.classList.toggle("is-active");
},false)  
}
