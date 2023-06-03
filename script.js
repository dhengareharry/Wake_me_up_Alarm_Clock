// JavaScript code

// Array to store alarm objects
let alarms = [];

// Function to update the clock display
function updateClock() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  const clockDisplay = document.getElementById("clock");
  clockDisplay.textContent = formatTime(hours % 12) + ":" + formatTime(minutes) + ":" + formatTime(seconds) + " " + (hours >= 12 ? "PM" : "AM");

  checkAlarms(hours, minutes, seconds);

  setTimeout(updateClock, 1000);
}

// Function to format time with leading zeros
function formatTime(time) {
  return time.toString().padStart(2, "0");
}

// Function to check if any alarms match the current time
function checkAlarms(hours, minutes, seconds) {
  const currentTime = formatTime(hours % 12) + ":" + formatTime(minutes) + ":" + formatTime(seconds) + " " + (hours >= 12 ? "PM" : "AM");
  for (let i = 0; i < alarms.length; i++) {
    if (alarms[i].time === currentTime && !alarms[i].triggered) {
      alarms[i].triggered = true;
      playAlarmSound();
      alert("Alarm!");
    }
  }
}

// Function to play the alarm sound
function playAlarmSound() {
  const alarmSound = document.getElementById("alarmSound");
  alarmSound.play();
}

// Function to set a new alarm
function setAlarm() {
  const alarmHourInput = document.getElementById("alarmHour");
  const alarmMinuteInput = document.getElementById("alarmMinute");
  const alarmSecondInput = document.getElementById("alarmSecond");
  const alarmAmPmInput = document.getElementById("alarmAmPm");

  const alarmHour = parseInt(alarmHourInput.value);
  const alarmMinute = parseInt(alarmMinuteInput.value);
  const alarmSecond = parseInt(alarmSecondInput.value);
  const alarmAmPm = alarmAmPmInput.value;

  if (
    isNaN(alarmHour) ||
    isNaN(alarmMinute) ||
    isNaN(alarmSecond) ||
    alarmHour < 1 ||
    alarmHour > 12 ||
    alarmMinute < 0 ||
    alarmMinute > 59 ||
    alarmSecond < 0 ||
    alarmSecond > 59
  ) {
    // Display an alert if the input values are invalid
    alert("Please enter valid alarm time!");
    return;
  }

  const alarmTime =
    formatTime(alarmHour) +
    ":" +
    formatTime(alarmMinute) +
    ":" +
    formatTime(alarmSecond) +
    " " +
    alarmAmPm;

  const newAlarm = {
    time: alarmTime,
    triggered: false
  };

  alarms.push(newAlarm);
  addToAlarmList(newAlarm);

  alarmHourInput.value = "";
  alarmMinuteInput.value = "";
  alarmSecondInput.value = "";
}


// Function to delete an alarm
function deleteAlarm(index) {
  alarms.splice(index, 1);
  renderAlarmList();
}

// Function to add an alarm to the alarm list
function addToAlarmList(alarm) {
  const alarmsList = document.getElementById("alarmsList");
  const listItem = document.createElement("li");

  const label = document.createElement("label");
  label.textContent = alarm.time;

  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = "&#128465;";
  deleteButton.className = "delete-button";
  deleteButton.setAttribute("data-index", alarms.length - 1);
  deleteButton.addEventListener("click", function() {
    const index = parseInt(this.getAttribute("data-index"));
    deleteAlarm(index);
  });

  listItem.appendChild(label);
  listItem.appendChild(deleteButton);
  alarmsList.appendChild(listItem);
}

// Function to render the alarm list
function renderAlarmList() {
  const alarmsList = document.getElementById("alarmsList");
  alarmsList.innerHTML = "";

  for (let i = 0; i < alarms.length; i++) {
    addToAlarmList(alarms[i]);
  }
}

// Start the clock update
updateClock();

// Add event listener to the set alarm button
const setAlarmButton = document.getElementById("setAlarmButton");
setAlarmButton.addEventListener("click", setAlarm);

// Add event listener to the stop alarm button
const stopAlarmButton = document.getElementById("stopAlarmButton");
stopAlarmButton.addEventListener("click", function() {
  const alarmSound = document.getElementById("alarmSound");
  alarmSound.pause();
  alarmSound.currentTime = 0;
});
