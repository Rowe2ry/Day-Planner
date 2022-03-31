/* =========================================================================
 * GRABBING DOM ELEMENTS USING JQUERY
 * ========================================================================= */

var scheduleContainerEl = $('.container')
var hourLabelEl = $('.hour');
// var timeBlockEl = $('.col-md-10');
var timeBlockInputEl = $('.deDecorated');
var saveButtonEl = $('.saveBtn');
var currentDayEl = $('#currentDay')

/* =========================================================================
 * DECLARING GLOBAL SCOPE VARIABLES
 * ========================================================================= */

// this will hold the local storage data as a global variable
// that the application can pass data to and from before re-commiting
// data transfer back to local storage
var schedule;

/* =========================================================================
 * FUNCTION DEFINITIONS
 * ========================================================================= */

// looks for in local storage fo an array of objects to use on the page
// if it doesn't exist, a blank one will be created and used to populate
// the page
function grabSchedule () {
    // check for an existing schedule
    if (window.localStorage.getItem('currentSchedule') === null) {
        // if it doesn't exist, create this blank one
        userSchedule = window.localStorage.setItem('currentSchedule', [
            {
                indexNumber: 0,
                timeSlot: "9:00am",
                dateTime:  moment('09', 'HH'), // 24 hour clock
                event: ''
            }, { 
                indexNumber: 1, 
                timeSlot: "10:00am",
                dateTime:  moment('10', 'HH'), // 24 hour clock
                event: ''
            }, {
                indexNumber: 2,
                timeSlot: "11:00am",
                dateTime:  moment('11', 'HH'), // 24 hour clock
                event: ''
            }, { 
                indexNumber: 3,
                timeSlot: "12:00pm",
                dateTime:  moment('12', 'HH'), // 24 hour clock
                event: ''
            }, {
                indexNumber: 4,
                timeSlot: "1:00pm",
                dateTime:  moment('13', 'HH'), // 24 hour clock
                event: ''
            }, {
                indexNumber: 5,
                timeSlot: "2:00pm",
                dateTime:  moment('14', 'HH'), // 24 hour clock
                event: ''
            }, {
                indexNumber: 6,
                timeSlot: "3:00pm",
                dateTime:  moment('15', 'HH'), // 24 hour clock
                event: ''
            }, {
                indexNumber: 7,
                timeSlot: "4:00pm",
                dateTime:  moment('16', 'HH'), // 24 hour clock
                event: ''
            }, {
                indexNumber: 8,
                timeSlot: "5:00pm",
                dateTime:  moment('17', 'HH'), // 24 hour clock
                event: ''
            }
        ]);
        return userSchedule
    } else {
        // since one exists, lets parse the JSON and get objects we can work with
        userSchedule = JSON.parse(window.localStorage.getItem('savedSchedule'));
        return userSchedule
    };
};


// page population using the array of objects representing each our of
// a work day as modified by the end user
function populatePage () {
    // create local variable for the schedule to compare against
    // as it populates the page with conditionally formatted divs
    var currentTime = moment('HH');
    // iterate through these objects and create the HTML elements
    // to populate the page
    for (i = 0; i < schedule.lenght; i++) {
        // baseline condition for this loop
        var conditionalFormatting = 'present';
        // create a parent div for all of the content
        var timeBlockEl = document.createElement('div');
        // give classes adhering to bootstrap formatting
        timeBlockEl.setAttribute('class', 'time-block row');
        // create the first child div for holding the hour
        var hourMarker = document.createElement('div');
        // give classes to adhere ot Bootstrap formatting
        hourMarker.setAttribute('class', 'hour col-md-1 align-self-center');
        // put in the time key from the object in the array
        hourMarker.textContent = schedule[i].timeSlot;
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
        var eventHolder = document.createElement('div');
        // giving the div classes with conditional formatting for color
        eventHolder.setAttribute('class', conditionalFormatting + ' col-md-10 align-self-center');
        // create the input field
        var theEvent = document.createElement('input');
        // give it the styling classes
        theEvent.setAttribute('class', 'deDecorated');
        // make sure its a text input
        theEvent.setAttribute('type', 'text');
        // put a placeholder so users know how/where to interact with it
        theEvent.setAttribute('placeholder', 'empty time slot - click to change');
        // give this an index number on HTML page will make it easier to update the
        // local storage JSON
        theEvent.setAttribute('data-index', i);
        // if the user has saved an event here, it will not be empty so....
        if (schedule[i].event != ''){
            // put the user's text here
            theEvent.textContent = schedule[i].event;
        };
        // parent holder for the save icon
        var saveDivEl = document.createElement('div');
        // give it the styling classes
        saveDivEl.setAttribute('class', 'saveBtn col-md-1 align-self-center');
        // putting data on this div to be read by the event listener for
        // linking the save button to the input field on the page as well
        // as the object index number in the JSON being held in
        // local storage
        saveDivEl.setAttribute('data-index', i);
        // create the icon tag required by the fontawesome library
        var saveIcon = document.createElement('i');
        // apply the classes used by fontawesome to show a save icon
        saveIcon.setAttribute('class', 'fa-solid fa-floppy-disk');
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

// a function used to commit schedule changes to local storage
// when the user click on the save icon button
function saveMyEvent (event) {
    // TODO:
    /* pseudocode below
     * look at the event target (save icon div)
     * grab this event target's dataset.index
     * find the input element with the same dataset index
     * assign a variable the string typed into the input element
     * grab the whole schedule from local storage
     * parse the JSON into an object
     * target the object whose index # matches this targe's
     * update the object's "time" key to a value of the local
     *    scope variable holding the user's string
     * stringify full array of objects back to JSON
     * save to local storage
     * repopulate the page using the new array
     */ 
};

/* =========================================================================
 * ACTIVE EVENT LISTENERS
 * ========================================================================= */

//TODO: create the event listener that targets all of the save
// icon divs and calls the "saveMyEvent" function on a click

/* =========================================================================
 * FUNCTION CALLS AND PAGE LOAD LOGIC EXECUTION
 * ========================================================================= */

// calling the function that gets our local storage
// data or creates the data we need as a starting point
// if none already exists
schedule = grabSchedule();

// format: Thursday March 31st 2022 3:29:45pm - displays at top of page
currentDayEl.text(moment().format('dddd MMMM Do YYYY h:mm:ssa'));

//updates every second
setInterval(function () {
currentDayEl.text(moment().format('dddd MMMM Do YYYY h:mm:ssa'));
}, 1000);

//TODO: call the populate page function
