// Select <header> elements to change in our program
var dateElement = document.querySelector("#currentDay");
var hourElement = document.querySelector("#currentTime");

// Create new elements to display to DOM with bootstrap

var updateClock = function () {
   hourElement.innerHTML = moment().format("h:mm:ss a");
};

var startScheduler = function () {
   dateElement.innerHTML = moment().format("dddd, MMMM Do");
   hourElement.innerHTML = moment().format("h:mm:ss a");

   var timerStart = setInterval(updateClock, 1000);

   var containerDiv = document.querySelector(".container");
   console.log(containerDiv);

   var listGroup = document.createElement("ul");
   listGroup.className = "day-group";
   console.log("this is a: " + listGroup);

   var listItems = document.createElement("li");
   listItems.className = "row day-item";
   console.log("this will print: " + listItems);

   var taskTimeBlock = document.createElement("span");
   taskTimeBlock.className = "col-3";
   taskTimeBlock.textContent = "HOur";
   var taskDescription = document.createElement("p");
   taskDescription.className = "col-6";
   taskDescription.textContent = "Dummy Task";
   var taskSaveIcon = document.createElement("span");
   taskSaveIcon.className = "col-3";
   taskSaveIcon.textContent = "Icon";

   listItems.appendChild(taskTimeBlock);
   listItems.appendChild(taskDescription);
   listItems.appendChild(taskSaveIcon);
   console.log(listItems);

   listGroup.appendChild(listItems);
   console.log(listGroup);

   containerDiv.appendChild(listGroup);
   console.log(listGroup);
};

startScheduler();
