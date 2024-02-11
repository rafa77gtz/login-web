/* Vanilla JS Demo */
const firebaseConfig = {
  /* Credentials */
  apiKey: "AIzaSyCnilwm_Sh7GD4HgsDtY1i-9jIoV3mI9JA",
  authDomain: "server-monitoring-db.firebaseapp.com",
  databaseURL: "https://server-monitoring-db-default-rtdb.firebaseio.com",
  projectId: "server-monitoring-db",
  storageBucket: "server-monitoring-db.appspot.com",
  messagingSenderId: "202668882586",
  appId: "1:202668882586:web:0f2fec01799e79a2e47d23"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
/* Globals */
const toastLiveExample = document.getElementById("liveToast");
let toast_message = document.getElementById("toastMessage");
let cpu_usage = firebase.database().ref().child("cpu_percent");
let disk_usage = firebase.database().ref().child("disk_usage");
let failure_warning = firebase.database().ref().child("failure_warning");
/* Event Listeners */
cpu_usage.on("value", (snapshot) => {
  let cpu_usage_value = snapshot.val();
  let cpu_object = document.getElementById("cpu");
  cpu_object.innerText = cpu_usage_value;
  console.log("CPU Usage changed: " + cpu_usage_value);
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
  toast_message.innerText = "CPU Usage changed: " + cpu_usage_value;
  toastBootstrap.show();
});
disk_usage.on("value", (snapshot) => {
  let disk_usage_value = snapshot.val();
  let disk_object = document.getElementById("disk");
  disk_object.innerText = disk_usage_value;
  console.log("Disk Usage changed: " + disk_usage_value);
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
  toast_message.innerText = "Disk Usage changed: " + disk_usage_value;
  toastBootstrap.show();
});
failure_warning.on("value", (snapshot) => {
  let failure_warning_value = snapshot.val();
  let failure_warning_object = document.getElementById("failure");
  if(parseInt(failure_warning_value) == 0) {
    // class="badge rounded-pill text-bg-primary"
    failure_warning_object.setAttribute("class", "badge rounded-pill text-bg-success");
    failure_warning_object.innerText = "Sin riesgo";
  }
  else {
    failure_warning_object.setAttribute("class", "badge rounded-pill text-bg-danger");
    failure_warning_object.innerText = "Tomar accion inmediata";
  }
  console.log("Failure status changed: " + failure_warning_value);
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
  toast_message.innerText = "Failure status changed changed: " + failure_warning_value;
  toastBootstrap.show();
});