http://anthonyterrien.com/demo/knob/

$(function() {

  
  var knob1 = $(".dial").knob({
    //displayInput:false,
    min:10,
    max:110,
    lineCap:"round",
    change:function(e){console.log(e)}
  });




  window.setInterval(()=>{
    
  },1000)
});