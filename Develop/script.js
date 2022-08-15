
// Global variables
var hourList = [
    "9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM"
]

// Dynamically build our HTML
buildScheduler()

var eventSaveBtns = $(".save-button")
var now = moment()

// Load the day
$("#currentDay").text(now.format("dddd, MMMM Do YYYY"))

// Load the clock & update every second
updateTime()
setInterval(updateTime, 1000)

// Clock update handler
function updateTime() {
    now = moment()
    $("#currentTime").text(now.format("h:mm:ss A"))
}

// Set up our save button listeners
for(var eventSaveBtnIndex = 0; eventSaveBtnIndex < eventSaveBtns.length; eventSaveBtnIndex++) {
    const currentHour = hourList[eventSaveBtnIndex]
    const eventSaveBtnHanlder = (event, hour) => saveEvent(hour)
    eventSaveBtns[eventSaveBtnIndex].addEventListener("click", (event) => eventSaveBtnHanlder(event, currentHour))
}

// Load the current day's events from local storage
loadEvents()

/*********************
 *  HELPER FUNCTIONS *
 *********************/

/**
 *  This function builds our scheduler dynamically adding time slots.
 */
function buildScheduler() {
    let container = $(".container")

    for(let i = 0; i < hourList.length; i++) {
        container.append(getTimeSlotHtml(hourList[i]))
    }
}

/**
 *  This function gets the HTML for a specified time slot hour
 */
function getTimeSlotHtml(hour) {
    var timeSlotHtml = `
        <div class="row row_` + hour + ` time-block">
            <div class="col-sm-12 col-md-2 time">
                <span>` + hour + `</span>
            </div>
            <div class="w-100 d-block d-md-none">&nbsp;</div>
            <div class="col-sm-12 col-md-8 event-name">
                <textarea id="event_` + hour + `" class="event-text form-control" placeholder="Add your scheduler notes here..."></textarea>
            </div>
            <div class="w-100 d-block d-md-none">&nbsp;</div>
            <div class="col-sm-12 col-md-2">
                <button type="button" class="save-btn btn">
                    <div class="button-content">
                        <i class="bi bi-save"></i>
                        <span>Save</span>
                    </div>
                </button>
            </div>
        </div>`
    return timeSlotHtml
}

/**
 *  This function saves the event to local storage.
 */
function saveEvent(hour) {
    // Build our local storage selector string
    let eventStorageName = now.format("M_D_YYYY_") + hour

    // Save our event's text field value in local storage
    localStorage.setItem(eventStorageName, $("#event_" + hour).val())
}

/**
 *  This function loads the events from local storage & calls a helper function to
 *  color our events.
 */
function loadEvents() {
    // Loop through each time slot
    for (let i =0; i < hourList.length; i++) {
        // Build our local storage selector string
        let eventStorageName = now.format("M_D_YYYY_") + hourList[i]

        // Load the event value into the event's text field
        $("#event_" + hourList[i]).val(localStorage.getItem(eventStorageName))

        // Call our helper to add our past, present, future color classes
        loadEventColors(hourList[i])
    }
}

/**
 *  This function loads the events from local storage & calls a helper function to
 *  color our events.
 */
function loadEventColors(hour) {
    // Local variables
    let thisRow = $(".row_" + hour)
    let currentHour =  now.format("hA")

    // Get the current hour value & AM/PM from the moment string
    let currentHourVal = parseInt(currentHour.substr(0,currentHour.length-2))
    let currentHourDayNight = currentHour.substr(currentHour.length-2)

    // Get the event hour value & AM/PM from the hour parameter
    let eventHourVal = parseInt(hour.substr(0,hour.length-2))
    let eventHourDayNight = hour.substr(hour.length-2)

    // Determine if the event is in the past, present, or future
    if (currentHourVal === eventHourVal && currentHourDayNight === eventHourDayNight) {
        thisRow.addClass("present")
    } else if ((currentHourDayNight == "PM" && eventHourDayNight == "AM") ||
        (currentHourDayNight === eventHourDayNight && 
            currentHourVal !== 12 &&
            (currentHourVal > eventHourVal || eventHourVal === 12))) {
        thisRow.addClass("past")
    } else {
        thisRow.addClass("future")
    }
}