// Select <header> elements to change in our program
var dateElement = document.querySelector("#currentDay");
var hourElement = document.querySelector("#currentTime");

// Add Current Date and Current Time to DOM/Display
dateElement.innerHTML = moment().format("dddd, MMMM Do");
hourElement.innerHTML = moment().format("h:mm:ss a");

// Constant Variables to handle business hours
const START_TIME = 9;
const END_TIME = 18;

// Variable to hold info to localStorage
var tasks = {};

// Create <ul> element globally
var listGroup = document.createElement("ul");

// Updates the page clock, every second.
var updateClock = function () {
   hourElement.innerHTML = moment().format("h:mm:ss a");
};

// Create DOM elements to display on page
var buildDay = function () {
   // Declare empty array to store new tasks
   // (these will be sent/pushed later, into localStorage)
   // var tempArray = [];

   // Loop through working hrs of the day to then create a total of 8 <li> elements in "row"
   for (var hour = START_TIME; hour < END_TIME; hour++) {
      var listItems = document.createElement("li");
      listItems.className = "row day-item"; // give new <li> element the appropriate classes

      var taskTimeBlock = document.createElement("span");
      taskTimeBlock.className = "time-block hour col-2";
      taskTimeBlock.textContent = moment(hour, "HH").format("h:mma");

      var taskDescription = document.createElement("p");
      // give tasks the correct color code, depending on the time of day, and also the appropriate classes
      taskDescription.className = setTaskStatusColor(hour);

      // assign task element the correct textContent based on its array position
      taskDescription.textContent = tasks[hour - START_TIME];
      // store textContent from array into a new temporary array for storage
      // tempArray.push(tasks[hour - START_TIME]);

      var taskSaveIcon = document.createElement("i");
      taskSaveIcon.className = "bi bi-save saveBtn col-2";

      // send all new <li> items to <ul> parent for DOM display
      listItems.appendChild(taskTimeBlock);
      listItems.appendChild(taskDescription);
      listItems.appendChild(taskSaveIcon);

      listGroup.appendChild(listItems);
   }
};

// Creates a function to check current time and then assign the proper color code to the task element
function setTaskStatusColor(hour) {
   if (hour < moment().format("H")) {
      // add .hour(some numner from 9 to 17) to test
      return " past col-8 description";
   } else if (hour == moment().format("H")) {
      // add .hour(some numner from 9 to 17) to test
      return " present col-8 description";
   } else {
      return " future col-8 description";
   }
}

// function will add our <ul> elements into a "container" div in the DOM
var createUl = function () {
   var containerDiv = document.querySelector(".container");
   listGroup.className = "day-group";
   containerDiv.appendChild(listGroup);
};

// Initialize scheduluer program
var startScheduler = function () {
   // Updates current clock, every second
   var timerStart = setInterval(updateClock, 1000);

   // Check for any current or previous data located in localStorage
   tasks = JSON.parse(localStorage.getItem("scheduler"));
   if (!tasks) {
      // If some data is found, then store that in tasks array
      tasks = [];
   }
   createUl();
   buildDay();
};

startScheduler();

// Task Element was clicked (with <p> element)
$(".day-group").on("click", "p", function () {
   var text = $(this) // get current data from clicked element <p>
      .text() //
      .trim(); //
   var textInput = $("<textarea>") // edit Task with new text
      .addClass("form-control col-8") //
      .val(text); //

   // Newly entered text will replace old in task field
   $(this).replaceWith(textInput);

   // give new textInput field the "auto-focus"
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
   // give classes/color using new setTaskStatusColor function
   var taskP = $("<p>") //
      .addClass(setTaskStatusColor(index + START_TIME)) //
      .text(text); //

   // last change is "stored" into array (but not yet sent to localStorage)
   tasks[index] = text;

   // Replace textarea with <p> element
   $(this).replaceWith(taskP);
});

// Save Icon was clicked (with <i> element)
$(".day-group").on("click", "i", function () {
   // "Save" or send new tasks info to localStorage
   localStorage.setItem("scheduler", JSON.stringify(tasks));
});
