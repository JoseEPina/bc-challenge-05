// Select <header> elements to change in our program
var dateElement = document.querySelector("#currentDay");
var hourElement = document.querySelector("#currentTime");

var updateClock = function () {
   hourElement.innerHTML = moment().format("h:mm:ss a");
};

var startScheduler = function () {
   dateElement.innerHTML = moment().format("dddd, MMMM Do");
   hourElement.innerHTML = moment().format("h:mm:ss a");

   var timerStart = setInterval(updateClock, 1000);
};

startScheduler();
