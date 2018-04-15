$(window).load(function(){

            
	const firebases=firebase.firestore();
var name=document.querySelector("#name");
var email=document.querySelector("#email");
var number=document.querySelector("#number");
var message=document.querySelector("#message");
var form=document.querySelector("#userqu");
const imageload=document.querySelector(".portfolioContainer");
/*imageload.innerHTML="<div class='Portfolio-box general'> <img src='img/Portfolio-pic2.jpg' alt=''> <h3>Luca Theme</h3> </div><div class=' Portfolio-box association'> <img src='img/Portfolio-pic3.jpg' alt=''> <h3>Uni Sans</h3> </div><div class=' Portfolio-box competetions'> <img src='img/Portfolio-pic4.jpg' alt=''> <h3>Vinyl Record</h3> </div><div class=' Portfolio-box competetions'> <img src='img/Portfolio-pic5.jpg' alt=''> <h3>Hipster</h3> </div><div class=' Portfolio-box competetions'> <img src='img/Portfolio-pic6.jpg' alt=''> <h3>Windmills</h3> </div>";
*/

var image=(function(){
   const dbRef=firebases.collection("images");
   
  dbRef.orderBy("date","desc").get().then((doc)=>{
	imageload.innerHTML="";
doc.docs.forEach((datas,index)=>{
	var $template=$("<div class='Portfolio-box "+datas.data().category+"'><img src='"+datas.data().filePath+"' alt='image'><h3>"+datas.data().heading+"</h3></div>");
	$(imageload).append($template);
});
  initialize();
  }).catch((error)=>alert(error.message));


})();

form.addEventListener("submit",function(event){
	event.preventDefault();
const dbRef=firebases.collection("users");
dbRef.add({
	name:name.value,
	email:email.value,
	number:number.value,
	message:message.value,
	date:firebase.firestore.FieldValue.serverTimestamp()
}).then((success)=>alert("Successfully added")).catch((error)=>console.log(error.message));
});
  
  function initialize(){

  
  var $container = $('.portfolioContainer'),
      $body = $('body'),
      colW = 375,
      columns = null;

  
  $container.isotope({
    // disable window resizing
    resizable: true,
    masonry: {
      columnWidth: colW
    }
  });
  
  $(window).smartresize(function(){
    // check if columns has changed
    var currentColumns = Math.floor( ( $body.width() -30 ) / colW );
    if ( currentColumns !== columns ) {
      // set new column count
      columns = currentColumns;
      // apply width to container manually, then trigger relayout
      $container.width( columns * colW )
        .isotope('reLayout');
    }
    
  }).smartresize(); // trigger resize to set container width
  $('.portfolioFilter a').click(function(){
        $('.portfolioFilter .current').removeClass('current');
        $(this).addClass('current');
 
        var selector = $(this).attr('data-filter');
        $container.isotope({
            
            filter: selector,
         });
         return false;
    });
  }

});	//end
	

