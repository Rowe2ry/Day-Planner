/* =========================================================================
 * GRABBING DOM ELEMENTS USING JQUERY
 * ========================================================================= */

var resetBtn = $('#resetBtn'); // by ID
var scheduleContainerEl = $('.container'); // by class - where all of the populate page contents go
var currentDayEl = $('#currentDay'); // by ID - used to put live updating date & time
        // on top of page 

/* =========================================================================
 * DECLARING GLOBAL SCOPE VARIABLES
 * ========================================================================= */

// this will hold the local storage data as a global variable
// that the application can pass data to and from before re-committing
// data transfer back to local storage
var schedule;

var userSchedule; // this is declared globally just because it is defined and
        // returned out of several functions in the script, I thought this might be
        // better than defining it locally in 2 or 3 different functions

/* =========================================================================
 * FUNCTION DEFINITIONS
 * ========================================================================= */

// looks for in local storage fo an array of objects to use on the page
// if it doesn't exist, a blank one will be created and used to populate
// the page
function grabSchedule () {
    // check for an existing schedule
    if (window.localStorage.getItem('userSchedule') === null) {
        // if it doesn't exist, create this blank one (array of objects)
        userSchedule = [
            {
                indexNumber: 0,
                timeSlot: "9:00am",
                dateTime:  moment().format('09', 'HH'), // 24 hour clock
                event: ''
            }, { 
                indexNumber: 1, 
                timeSlot: "10:00am",
                dateTime:  moment().format('10', 'HH'), // 24 hour clock
                event: ''
            }, {
                indexNumber: 2,
                timeSlot: "11:00am",
                dateTime:  moment().format('11', 'HH'), // 24 hour clock
                event: ''
            }, { 
                indexNumber: 3,
                timeSlot: "12:00pm",
                dateTime:  moment().format('12', 'HH'), // 24 hour clock
                event: ''
            }, {
                indexNumber: 4,
                timeSlot: "1:00pm",
                dateTime:  moment().format('13', 'HH'), // 24 hour clock
                event: ''
            }, {
                indexNumber: 5,
                timeSlot: "2:00pm",
                dateTime:  moment().format('14', 'HH'), // 24 hour clock
                event: ''
            }, {
                indexNumber: 6,
                timeSlot: "3:00pm",
                dateTime:  moment().format('15', 'HH'), // 24 hour clock
                event: ''
            }, {
                indexNumber: 7,
                timeSlot: "4:00pm",
                dateTime:  moment().format('16', 'HH'), // 24 hour clock
                event: ''
            }, {
                indexNumber: 8,
                timeSlot: "5:00pm",
                dateTime:  moment().format('17', 'HH'), // 24 hour clock
                event: ''
            }
        ];
        // transform this object array into a JSON string
        var userScheduleJSON = JSON.stringify(userSchedule);
        // save it to local storage
        window.localStorage.setItem('userSchedule', userScheduleJSON);
        // keep the working item in native Javascript object format for populatePage
        return userSchedule
    } else {
        // since one exists, lets parse the JSON and get objects we can work with
        userSchedule = JSON.parse(window.localStorage.getItem('userSchedule'));
        // send the locally stored schedule to the populate page function
        return userSchedule
    };
};


// page population using the array of objects representing each hour of
// a work day as modified by the end user
function populatePage () {
    // create local variable for the schedule to compare against
    // as it populates the page with conditionally formatted divs
    var currentTime = moment().format('HH');
    // iterate through these objects and create the HTML elements
    // to populate the page
    console.log(schedule.length);
    for (var i = 0; i < schedule.length; i++) {
        // baseline condition for this loop
        var conditionalFormatting = 'present';
        // create a parent div for all of the content
        var timeBlockEl = $('<div>');
        // give classes adhering to bootstrap formatting
        timeBlockEl.addClass('time-block row');
        // create the first child div for holding the hour
        var hourMarker = $('<div>');
        // give classes to adhere ot Bootstrap formatting
        hourMarker.addClass('hour col-md-1 align-self-center');
        // put in the "time" key from the object in the array
        hourMarker.text(schedule[i].timeSlot);
        // check to see if the object we are looking at is from ahead of,
        // behind, or equal to the current hour on a 24 hour clock
        if (currentTime > schedule[i].dateTime) {
            // for times smaller than current time, this is the past
            conditionalFormatting = 'past';
        } else if (currentTime < schedule[i].dateTime) {
            // for times ahead, the future
            conditionalFormatting = 'future';
        } else {
            // otherwise this is that hour
            conditionalFormatting = 'present';
        };
        // making the div parent to hold the input field
        var eventHolder = $('<div>');
        // giving the div classes with conditional formatting for color
        eventHolder.addClass(conditionalFormatting + ' col-md-10 align-self-center');
        // create the input field
        var theEvent = $('<input>');
        // give it the styling classes
        theEvent.addClass('deDecorated');
        // make sure its a text input
        theEvent.attr('type', 'text');
        // put a placeholder so users know how/where to interact with it
        theEvent.attr('placeholder', 'empty time slot - click to change');
        // give this an index number on HTML page will make it easier to update the
        // local storage JSON
        theEvent.attr('data-index', i);
        // if the user has saved an event here, 
        // put the user's text here
        // not an if statement because the default state is an empty
        // string, which will display the placeholder text
        theEvent.attr('value', schedule[i].event);
        // parent holder for the save icon
        var saveDivEl = $('<div>');
        // give it the styling classes
        saveDivEl.addClass('saveBtn col-md-1 align-self-center');
        // putting data on this div to be read by the event listener for
        // linking the save button to the input field on the page as well
        // as the object index number in the JSON being held in
        // local storage
        saveDivEl.attr('data-save', i);
        // create the icon tag required by the fontawesome library
        var saveIcon = $('<i>');
        // apply the classes used by fontawesome to show a save icon
        saveIcon.addClass('fa-solid fa-floppy-disk');
        // giving the index number to the icon itself just in case
        saveIcon.attr('data-save', i);
        // put this parent container on the page under the appropriate parent
        scheduleContainerEl.append(timeBlockEl);
        // add the hour marker element (first object in the row)
        timeBlockEl.append(hourMarker);
        // add 2nd object in the row is a div used to hold the user inputs
        timeBlockEl.append(eventHolder);
        // add the 3rd object in the row, the div used for centering the save icon
        timeBlockEl.append(saveDivEl);
        // put the event input text field inside the 2nd div from above
        eventHolder.append(theEvent);
        // put the save icon in the 3rd div from above
        saveDivEl.append(saveIcon);
    };
};

/* =========================================================================
 * ACTIVE EVENT LISTENERS
 * ========================================================================= */

// if someone clicks on any save icon, grab the index number and pass to the
// function to save to local storage
scheduleContainerEl.on('click', '.saveBtn', function (event) {
    // get index number from clicked save icon's `data-save` attribute
    var localIndex = ($(event.target).attr('data-save'));
    // tracking function progression
    console.log(" This is save button " + localIndex);
    // grab all 8 input fields as a node list
    var localInput = document.querySelectorAll("input");
    // go to the node list index matching the save button
    // in other words, grab the input field located in the
    // same row as THIS save button that was clicked
    localInput = localInput[localIndex];
    // verify which HTML element has been targeted in the console
    console.log(localInput);
    // grab what the user has entered and assign this as the value to our variable
    var usersEvent = localInput.value
    // verify that it has grabbed the right content
    console.log(usersEvent);
    // pull out our local storage array of objects and convert to a
    // function Javascript object
    var tempSchedule = JSON.parse(window.localStorage.getItem('userSchedule'));
    // update the event key with a new value for the matched object index
    tempSchedule[localIndex].event = usersEvent;
    // re-package our functional object into a JSON string
    var tempScheduleJSON = JSON.stringify(tempSchedule);
    // save it back into local storage
    window.localStorage.setItem('userSchedule', tempScheduleJSON);
  });

  // I added a reset button if the users wants a blank slate for the new day
resetBtn.on('click', function () {
    // this will empty out the schedule, so I am giving users a chance to
    // decide not to in case the button click was a mistake
    if (!window.confirm("Are you sure you want to reset this schedule?")) {
        return;
    }
    console.log("resetting schedule");
    // pull out our local storage array of objects and convert to a
    // function Javascript object
    var tempSchedule = JSON.parse(window.localStorage.getItem('userSchedule'));
    //iterate through the 8 hour time slots and make all of the events blank
    for (var i = 0; i < 8; i++) {
    // update the event key with a new value for the matched object index
        tempSchedule[i].event = '';
    };
    // re-package our functional object into a JSON string
    var tempScheduleJSON = JSON.stringify(tempSchedule);
    // save it back into local storage
    window.localStorage.setItem('userSchedule', tempScheduleJSON);
    // reload the page to show the cleared schedule
    document.location.reload()
});

/* =========================================================================
 * FUNCTION CALLS AND PAGE LOAD LOGIC EXECUTION
 * ========================================================================= */

// calling the function that gets our local storage
// data or creates the data we need as a starting point
// if none already exists
schedule = grabSchedule();
console.log(schedule);

// format: Thursday March 31st 2022 3:29:45pm - displays at top of page
currentDayEl.text(moment().format('dddd MMMM Do YYYY h:mm:ssa'));

//updates every second
setInterval(function () {
currentDayEl.text(moment().format('dddd MMMM Do YYYY h:mm:ssa'));
}, 1000);

// call the populate page function to put the schedule onto the page
populatePage ();