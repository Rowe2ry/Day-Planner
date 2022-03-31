/* =========================================================================
 * GRABBING DOM ELEMENTS USING JQUERY
 * ========================================================================= */

var hourLabelEl = $('.hour');
var timeBlockEl = $('.col-md-10');
var timeBlockInputEl = $('.deDecorated');
var saveButtonEl = $('.saveBtn');
var currentDayEl = $('#currentDay')

/* =========================================================================
 * DECLARING GLOBAL SCOPE VARIABLES
 * ========================================================================= */


/* =========================================================================
 * FUNCTION DEFINITIONS
 * ========================================================================= */


/* =========================================================================
 * ACTIVE EVENT LISTENERS
 * ========================================================================= */


/* =========================================================================
 * FUNCTION CALLS AND PAGE LOAD LOGIC EXECUTION
 * ========================================================================= */

// format: Thursday March 31st 2022 - displays at top of page
currentDayEl.text(moment().format("dddd MMMM Do YYYY"));
