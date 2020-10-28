
$(function() {
  $("#deviceToken").val(localStorage.getItem('deviceToken'));
  $("#deviceID").val(localStorage.getItem('deviceID'));
  //"FNZ46IXoM19OynmubEvb";

  $("#deviceID").change(()=>{
    localStorage.setItem('deviceID',$("#deviceID").val());
  });
  $("#deviceToken").change(()=>{
    localStorage.setItem('deviceToken',$("#deviceToken").val());
  });
  
  $("#temperatureDial").knob({
    //displayInput:false,
    min:10,
    max:110,
    lineCap:"round"
  });


  $("#humidityDial").knob({
    //displayInput:false,
    min:10,
    max:110,
    lineCap:"round",
  });

  window.setInterval(()=>{

    postAttributes($("#deviceID").val(),"temperature",{"value":parseInt($("#temperatureDial").val())});
    postAttributes($("#deviceID").val(),"humidity",{"value":parseInt($("#humidityDial").val())});
    getAlarmState();
  },2000)
});



// An HTTP POST using Fetch APIs
export const makePost = function (url, body) {
  fetch(url, {
    method: "PUT",
    
    // Handling CORS
    headers: {
      "Authorization": "Bearer "+$("#deviceToken").val(),
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

export const getAlarmState = function () {
  fetch("https://api.allthingstalk.io/device/"+$("#deviceID").val()+"/asset/alarm/state", {
    method: "GET",
    // Handling CORS
    headers: {
      "Authorization": "Bearer "+$("#deviceToken").val()
    },
  }).then(response => response.json()).then((res)=>{
    console.log(res.state.value)
    $("#alarm").css("display",res.state.value==true?"block":"none");
  })
  
  .catch((error)=> {
    $("#postErrorDiv").css("display","block");
    console.log("Request failed", error);
  });
};





export const postAttributes = function (deviceId,sensorName,attributes)
{
  //https://connect.cloud.kaaiot.com:443/kp1/<app-version-name>/dcx/<endpoint-token>/json
  return makePost(`https://api.allthingstalk.io/device/${deviceId}/asset/${sensorName}/state`,attributes)
  
}
