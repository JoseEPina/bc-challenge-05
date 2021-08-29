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

   var listGroup = document.createElement("ul");
   listGroup.className = "day-group";
   containerDiv.appendChild(listGroup);

   const START_TIME = 9;
   const END_TIME = 18;

   for (var hour = START_TIME; hour < END_TIME; hour++) {
      var listItems = document.createElement("li");
      listItems.className = "row day-item";

      var taskTimeBlock = document.createElement("span");
      taskTimeBlock.className = "col-3";

      taskTimeBlock.textContent = moment(hour, "HH").format("h : mm a");

      var taskDescription = document.createElement("p");
      taskDescription.className = "col-6";
      taskDescription.textContent = "Dummy Task";

      if (hour < moment().hour(19).format("H")) {
         taskDescription.classList.add("past");
         console.log(hour, "This is Past Due");
      } else if (hour == moment().hour(19).format("H")) {
         taskDescription.classList.add("present");
         console.log(hour, "This is current");
      } else {
         taskDescription.classList.add("future");
         console.log(hour, "This is Yet to be Completed");
      }

      var taskSaveIcon = document.createElement("span");
      taskSaveIcon.className = "col-3";
      taskSaveIcon.textContent = "Icon";

      listItems.appendChild(taskTimeBlock);
      listItems.appendChild(taskDescription);
      listItems.appendChild(taskSaveIcon);

      listGroup.appendChild(listItems);
   }
};

startScheduler();
