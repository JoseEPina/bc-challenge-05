// Select <header> elements to change in our program
var dateElement = document.querySelector("#currentDay");
var hourElement = document.querySelector("#currentTime");

// Add Current Date and Current Time to DOM/Display
dateElement.innerHTML = moment().format("dddd, MMMM Do");
hourElement.innerHTML = moment().format("h:mm:ss a");

// Constant Variables to handle business hours
const START_TIME = 9;
const END_TIME = 18;

var tasks = {};

var listGroup = document.createElement("ul");

// Create new elements to display to DOM with bootstrap

// Updates the page clock, every second.
var updateClock = function () {
   hourElement.innerHTML = moment().format("h:mm:ss a");
};

var buildDay = function () {
   tasks = JSON.parse(localStorage.getItem("scheduler"));


   for (var hour = START_TIME; hour < END_TIME; hour++) {
      var listItems = document.createElement("li");
      listItems.className = "row day-item";

      var taskTimeBlock = document.createElement("span");
      taskTimeBlock.className = "col-2";
      taskTimeBlock.textContent = moment(hour, "HH").format("h : mm a");

      var taskDescription = document.createElement("p");
      taskDescription.className = setTaskStatusColor(hour);

      var taskSaveIcon = document.createElement("i");
      taskSaveIcon.className = "bi bi-save saveBtn col-2";

      listItems.appendChild(taskTimeBlock);
      listItems.appendChild(taskDescription);
      listItems.appendChild(taskSaveIcon);

      listGroup.appendChild(listItems);
   }
};

function setTaskStatusColor(hour) {
   if (hour < moment().hour(11).format("H")) {
      return "past col-8";
   } else if (hour == moment().hour(11).format("H")) {
      return "present col-8";
   } else {
      return "future col-8";
   }
}

var createUl = function () {
   var containerDiv = document.querySelector(".container");
   listGroup.className = "day-group";
   containerDiv.appendChild(listGroup);
   console.log(containerDiv);
};

var startScheduler = function () {
   var timerStart = setInterval(updateClock, 1000);

   createUl();
   buildDay();
};

startScheduler();

$(".day-group").on("click", "p", function () {
   var text = $(this) //
      .text() //
      .trim(); //
   console.log(text);
   var textInput = $("<textarea>") //
      .addClass("form-control col-8") //
      .val(text); //
   console.log(textInput);

   var status = $(this).taskDescription;
   console.log("Printing Status: " + status);

   $(this).replaceWith(textInput);

   textInput.trigger("focus");
});

// Editable area was Un-clicked (or "un-focused", keyword "blur")
$(".day-group").on("blur", "textarea", function () {
   // Get the textarea's current value/text
   var text = $(this) //
      .val() //
      .trim(); //

   // Get the task's position in the list of other li elements
   var index = $(this) //
      .closest(".day-item") //
      .index(); //

   // Recreate the <p> element
   var taskP = $("<p>") //
      .addClass(setTaskStatusColor(index + START_TIME)) //
      .text(text); //

   // Replace textarea with <p> element
   $(this).replaceWith(taskP);
});

// Save Icon was clicked (with <span> element)
$(".day-group").on("click", "i", function () {});
