// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  const timeBlocksParent = document.getElementById("time-blocks-parent");
  // Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. 
  let saveButtonArr = document.querySelectorAll(".saveBtn");
  console.log(saveButtonArr);
  for (let i = 0; i < saveButtonArr.length; i++) {
    saveButtonArr[i].addEventListener("click", saveEvents);
  }

  function saveEvents(event) {
    console.log("Event Saved");
    console.log(event);
    let timeBlockId = this.parentElement.getAttribute("id");
    console.log(timeBlockId);
    let timeBlockText = document
      .getElementById(`${timeBlockId}`)
      .getElementsByTagName("textarea")[0]
      .value.trim();
    console.log(timeBlockText);
    localStorage.setItem(`${timeBlockId}`, `${timeBlockText}`);
  }

  // Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. 

  function colorCodeBlocks() {
    // select time blocks parent element
    // create an array of the time blocks parent's children
    const timeBlocksArr = [...timeBlocksParent.children];

    // Select the block elements

    // Compare each time block's time id to the current hour, and if less than than add past class, if equal add present class, if less than add future class
    for (let i = 0; i <= 8; i++) {
      // get current hour
      const currentTime = dayjs().$H;
      // get each block element id
      const timeBlockId = timeBlocksArr[i].getAttribute("id");
      // select each block element
      const timeBlock = document.getElementById(`${timeBlockId}`);

      // add respective past, present, future class to block element
      if (timeBlockId < currentTime) {
        timeBlock.classList.add("past");
      } else if (timeBlockId == currentTime) {
        timeBlock.classList.add("present");
      } else {
        timeBlock.classList.add("future");
      }
    }
  }
  colorCodeBlocks();
  
  //Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. 
  function loadEvents() {
    // create array of timeblocks to loop through
    const timeBlocksArr = [...timeBlocksParent.children];

    for (let i = 0; i <= 8; i++) {
      let timeBlockId = timeBlocksArr[i].getAttribute("id");
      // select the time block
      let timeBlockText = document
        .getElementById(timeBlockId)
        .getElementsByTagName("textarea");

      // retrive stored data from local storage
      let eventText = localStorage.getItem(timeBlockId);

      // set the retrived data in the respective time block according to the key
      timeBlockText[0].value = eventText;
    }
  }

  loadEvents();
  //Add code to display the current date in the header of the page.
  var today = dayjs();
  var dayWeek = today.format("dddd");
  $("#currentDay").text(`${dayWeek} ${today.format("MMM D, YYYY")}`);
});
