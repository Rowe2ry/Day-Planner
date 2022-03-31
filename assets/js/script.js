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


/* =========================================================================
 * FUNCTION DEFINITIONS
 * ========================================================================= */

function populatePage () {
    // create local variable for the schedule
    var schedule;
    var currentTime = moment('HH');
    // check for an existing schedule
    if (window.localStorage.getItem('currentSchedule') === null) {
        // if it doesn't exist, create this blank one
        schedule = window.localStorage.setItem('currentSchedule', [
            { timeSlot: "9:00am", // index 0
            dateTime:  moment('09', 'HH'),
            event: ''
            }, { timeSlot: "10:00am", // index 1
            dateTime:  moment('10', 'HH'),
            event: ''
            }, { timeSlot: "11:00am", // index 2
            dateTime:  moment('11', 'HH'),
            event: ''
            }, { timeSlot: "12:00pm", // index 3
            dateTime:  moment('12', 'HH'),
            event: ''
            }, { timeSlot: "1:00pm", // index 4
            dateTime:  moment('13', 'HH'),
            event: ''
            }, { timeSlot: "2:00pm", // index 5
            dateTime:  moment('14', 'HH'),
            event: ''
            }, { timeSlot: "3:00pm", // index 6
            dateTime:  moment('15', 'HH'),
            event: ''
            }, { timeSlot: "4:00pm", // index 7
            dateTime:  moment('16', 'HH'),
            event: ''
            } { timeSlot: "5:00pm", // index 8
            dateTime:  moment('17', 'HH'),
            event: ''
            }
        ]);
    } else {
        // since one exists, lets parse the JSON and get objects we can work with
        schedule = JSON.parse(window.localStorage.getItem('savedSchedule'));
    };

    // iterate through these objects and create the HTML elements
    // to populate the page
    for (i = 0; i < schedule.lenght; i++) {
        var conditionalFormatting = 'present';
        var timeBlockEl = document.createElement('div');
        timeBlockEl.setAttribute('class', 'time-block row');
        var hourMarker = document.createElement('div');
        hourMarker.setAttribute('class', 'hour col-md-1 align-self-center');
        hourMarker.textContent = schedule[i].timeSlot;
        if (currentTime > schedule[i].dateTime) {
            conditionalFormatting = 'past';
        } else if (currentTime < schedule[i].dateTime) {
            conditionalFormatting = 'future';
        } else {
            conditionalFormatting = 'present';
        };
        var eventHolder = document.createElement('div');
        eventHolder.setAttribute('class', conditionalFormatting + ' col-md-10 align-self-center');
        var theEvent = document.createElement('input');
        theEvent.setAttribute('class', 'deDecorated');
        theEvent.setAttribute('type', 'text');
        theEvent.setAttribute('placeholder', 'empty time slot - click to change');


    }

};

/* =========================================================================
 * ACTIVE EVENT LISTENERS
 * ========================================================================= */


/* =========================================================================
 * FUNCTION CALLS AND PAGE LOAD LOGIC EXECUTION
 * ========================================================================= */

// format: Thursday March 31st 2022 3:29:45pm - displays at top of page
currentDayEl.text(moment().format('dddd MMMM Do YYYY h:mm:ssa'));
//updates every second
setInterval(function () {
currentDayEl.text(moment().format('dddd MMMM Do YYYY h:mm:ssa'));
}, 1000);

