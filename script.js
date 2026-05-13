// Firebase Config

const firebaseConfig = {

  apiKey: "AIzaSyCsTmIRNrEyaPgWiokUg9U2C64kODzedBU",

  authDomain: "ajee-67b4c.firebaseapp.com",

  projectId: "ajee-67b4c",

  storageBucket: "ajee-67b4c.firebasestorage.app",

  messagingSenderId: "901192587616",

  appId: "1:901192587616:web:6a979df59ae58a82522605"

};

// Initialize Firebase

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

let taskList = document.getElementById("taskList");

window.onload = function () {

  db.collection("tasks")
    .get()
    .then((querySnapshot) => {

      querySnapshot.forEach((doc) => {

        showTask(doc.data().task);

      });

    });

};

function addTask(){

  let input = document.getElementById("taskInput");

  let task = input.value;

  if(task === ""){
    return;
  }

  showTask(task);

  saveTask(task);

  input.value = "";
}

function showTask(task){

  let li = document.createElement("li");

  li.innerHTML = `
  
    ${task}
    
    <button onclick="completeTask(this)">Done</button>
    
    <button onclick="deleteTask(this)">X</button>
  
  `;

  taskList.appendChild(li);
}

function saveTask(task){

  db.collection("tasks").add({

    task: task,

    created: new Date()

  });

}

function completeTask(button){

  button.parentElement.style.textDecoration = "line-through";

  button.parentElement.style.opacity = "0.6";
}

function deleteTask(button){

  button.parentElement.remove();
}


// TIMER

let timeLeft = 1500;

let timerRunning = false;

let interval;

function startTimer(){

  if(timerRunning){
    return;
  }

  timerRunning = true;

  interval = setInterval(() => {

    let minutes = Math.floor(timeLeft / 60);

    let seconds = timeLeft % 60;

    seconds = seconds < 10 ? "0" + seconds : seconds;

    document.getElementById("timer").innerText =
      minutes + ":" + seconds;

    timeLeft--;

    if(timeLeft < 0){

      clearInterval(interval);

      document.getElementById("timer").innerText = "DONE 🔥";

      timerRunning = false;
    }

  }, 1000);
}

function resetTimer(){

  clearInterval(interval);

  timeLeft = 1500;

  document.getElementById("timer").innerText = "25:00";

  timerRunning = false;
}