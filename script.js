http://anthonyterrien.com/demo/knob/
<<<<<<< HEAD
$(function() {

  $("#dial1Key").val(localStorage.getItem('dial1Key'));
  //"Sv4EoKlQUK4MWejNhjWn";
  $("#dial2Key").val(localStorage.getItem('dial2Key'));
  //"FNZ46IXoM19OynmubEvb";

  $("#dial1Key").change(()=>{
    localStorage.setItem('dial1Key',$("#dial1Key").val());
  });
  $("#dial2Key").change(()=>{
    localStorage.setItem('dial2Key',$("#dial2Key").val());
  });
  
  $("#dial1").knob({
    //displayInput:false,
    min:10,
    max:110,
    lineCap:"round"
  });


  $("#dial2").knob({
=======

$(function() {

  
  var knob1 = $(".dial").knob({
>>>>>>> 889eece3f33b4d2c8a63538b0c54cb8f6209c58b
    //displayInput:false,
    min:10,
    max:110,
    lineCap:"round",
<<<<<<< HEAD
  });

  window.setInterval(()=>{

    console.log("Dial1: "+$("#dial1").val());
    console.log("Dial2: "+$("#dial1").val());

    postAttributes($("#dial1Key").val(),{"reading":$("#dial1").val()});
    postAttributes($("#dial2Key").val(),{"reading":$("#dial2").val()});
  },2000)
});



// An HTTP POST using Fetch APIs
export const makePost = function (url, body) {
  fetch(url, {
    method: "POST",
    // Handling CORS
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(body),
  }).then((res)=>{
    $("#postErrorDiv").css("display",res.status==200?"none":"block");
  })
  
  .catch((error)=> {
    $("#postErrorDiv").css("display","block");
    console.log("Request failed", error);
  });
};





export const postAttributes = function (deviceId,attributes)
{
  return makePost(`https://demo.thingsboard.io/api/v1/${deviceId}/telemetry`,attributes)
}
=======
    change:function(e){console.log(e)}
  });




  window.setInterval(()=>{
    
  },1000)
});
>>>>>>> 889eece3f33b4d2c8a63538b0c54cb8f6209c58b
