import { makePost, setActivity } from "./utils.js";

// Create the Sensor object
const absoluteOrientation = new AbsoluteOrientationSensor({ frequency: 60, referenceFrame: 'device' });

  // The ThingsBoard telemetry URL
  let at = document.getElementById("at").value;
  let url = "https://demo.thingsboard.io/api/v1/" + at + "/telemetry";
  let chart = null;
function createChart()
{
  var ctx = document.getElementById('myChart').getContext('2d');
  chart = new Chart(ctx, {
      // The type of chart we want to create
      type: 'line',
  
      // The data for our dataset
      data: {
          labels: [],
          datasets: [{
              label: 'X',
              borderColor: 'rgb(0, 0, 255)',
              data: []
          },
          {
            label: 'Y',
            borderColor: 'rgb(255, 0, 0)',
            data: []
        },
        {
          label: 'Z',
          borderColor: 'rgb(0, 255, 0)',
          data: []
      }
        
        ]
      },
  
      // Configuration options go here
      options: {}
  });

}
function addData(label, data) {
  let maxLength = 100;
  chart.data.labels.push(label);
  
  chart.data.datasets[0].data.push(data[0]);
  
  chart.data.datasets[1].data.push(data[1]);
  chart.data.datasets[2].data.push(data[2]);

  if(chart.data.labels.length > maxLength)
  {
    chart.data.labels.shift();
    chart.data.datasets[0].data.shift();
    chart.data.datasets[1].data.shift();
    chart.data.datasets[2].data.shift();
  }  
  chart.update();
}
function startAccelerationSensor()
{
  
var accelerometer = new LinearAccelerationSensor({ frequency: 60 });
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
   addData(new Date().toISOString().split("T")[1],[x,y,z]);
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

  createChart();
  startAccelerationSensor();

}




function stop() {
  // Stop the sensor
  accelerometer.stop();
}

// Link the buttons and the functions
document.getElementById("start").addEventListener("click", start, false);
document.getElementById("stop").addEventListener("click", stop, false);
