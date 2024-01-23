
const CALENDAR_ELEM = document.querySelector("#calendar_container");

let calendarInit = (calendarEvents = []) => {
    calendar = new FullCalendar.Calendar(CALENDAR_ELEM, {
        headerToolbar: {
            center: "title",
            right: "prev",
            left: "next"
        },
        locale: "fa",
        initialView: "timeGridWeek",
        allDaySlot: false,
        // firstDay: dayOfWeek,
        // validRange: {
        //     start: startDate,
        //     end: startDate + (27 * oneDayMilliseconds)
        // },
        height: "auto",
        slotMinTime: "00:00",
        slotMaxTime: "24:00",
        selectable: true,
        selectMirror: true,
        unselectAuto: false,
        events: calendarEvents,
        // selectOverlap: false,
        // eventOverlap : true,

        // select: function (arg) {

        // },

        // eventClick: function (arg) {
        // }
    })
    calendar.render();
}

let sortCalendarEvents = (intervalProgram = {}, staticProgarm = []) => {

}