var hourList = [
    "9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM"
]
var now = moment()
loadEvents()
$("#currentDay").text(now.format("dddd, MMMM Do YYYY"))
updateTime()
setInterval(updateTime, 1000)
function updateTime() {
    now = moment()
    $("#currentTime").text(now.format("h:mm:ss a"))
}


var eventSaveBtns = $(".save-button")

eventSaveBtns[0].addEventListener("click", function()  {
    saveEvent(hourList[0])
})
eventSaveBtns[1].addEventListener("click", function()  {
    saveEvent(hourList[1])
})
eventSaveBtns[2].addEventListener("click", function()  {
    saveEvent(hourList[2])
})
eventSaveBtns[3].addEventListener("click", function()  {
    saveEvent(hourList[3])
})
eventSaveBtns[4].addEventListener("click", function()  {
    saveEvent(hourList[4])
})
eventSaveBtns[5].addEventListener("click", function()  {
    saveEvent(hourList[5])
})
eventSaveBtns[6].addEventListener("click", function()  {
    saveEvent(hourList[6])
})
eventSaveBtns[7].addEventListener("click", function()  {
    saveEvent(hourList[7])
})
eventSaveBtns[8].addEventListener("click", function()  {
    saveEvent(hourList[8])
})

function saveEvent(hour) {
    let eventName = $("#event_" + hour)
    let eventStorageName = now.format("M_D_YYYY_") + hour
    localStorage.setItem(eventStorageName, eventName.val())
}

function loadEvents() {
    console.log(hourList)
    for (let i =0; i < hourList.length; i++) {
        let eventStorageName = now.format("M_D_YYYY_") + hourList[i]
        $("#event_" + hourList[i]).val(localStorage.getItem(eventStorageName))
    }
}


