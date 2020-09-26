import { makePost, setActivity } from "./utils.js";

// Create the Sensor object
const absoluteOrientation = new AbsoluteOrientationSensor({ frequency: 60, referenceFrame: 'device' });

  // The ThingsBoard telemetry URL
  let at = document.getElementById("at").value;
  let url = "https://demo.thingsboard.io/api/v1/" + at + "/telemetry";

function startAmbientLightSensor(){
  if ( 'AmbientLightSensor' in window ) {
    const sensor = new AmbientLightSensor();
    sensor.onreading = () => {
      console.log('Current light level:', sensor.illuminance);
      document.getElementById("light").innerHTML = sensor.illuminance;
    };
    sensor.onerror = (event) => {
      console.log(event.error.name, event.error.message);
      showError(event.error.name+": "+event.error.message)
    };
    sensor.start();
  }else
  {
    showError("No AmbientLightSensor")
  }
}


function startAccelerationSensor()
{
  
var accelerometer = new LinearAccelerationSensor({ frequency: 1 });
 // Start the sensor
 accelerometer.start();

 accelerometer.addEventListener('reading', () => {
   // model is a Three.js object instantiated elsewhere.
   model.quaternion.fromArray(accelerometer.quaternion).inverse();
 });

 accelerometer.onreading = () => {
   let x = Number(accelerometer.x.toFixed(5));
   let y = Number(accelerometer.y.toFixed(5));
   let z = Number(accelerometer.z.toFixed(5));
   document.getElementById("x").innerHTML = x;
   document.getElementById("y").innerHTML = y;
   document.getElementById("z").innerHTML = z;

   // The JSON objects sent to ThingsBoard
   let telemetry = { x: x, y: y, z: z };
   let activity = setActivity(x, y, z);
   let status = { edgeStatus: activity };

   // Cloud based Model
   makePost(url, JSON.stringify(telemetry));

   // Edge based Model
   makePost(url, JSON.stringify(status));
   document.getElementById("status").innerHTML = activity;
 };

 accelerometer.onerror = (event) => {
   showError(event.error.name+": "+event.error.message)
}

}

 
function showError(e)
{
  document.getElementById("error_name").innerHTML = document.getElementById("error_name").innerHTML+"<br>"+e;
}

function start() {

  startAmbientLightSensor();
  startAccelerationSensor();
 

}




function stop() {
  // Stop the sensor
  accelerometer.stop();
}

// Link the buttons and the functions
document.getElementById("start").addEventListener("click", start, false);
document.getElementById("stop").addEventListener("click", stop, false);
