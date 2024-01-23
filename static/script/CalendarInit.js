
const CALENDAR_ELEM = document.querySelector("#calendar_container");
const DESCRIPTION_ELEMENT = document.querySelector("#td_description");
let calendar, currentSelectedEventId, serializedEventId = 0;

const serializedEventsArry = [], diserializedIntervalArry = []

const WEEKLY_SCHEDULE = Object.freeze({
    0: { name: "شنبه", dayOfWeek: 6, baseDate: "d1" },
    1: { name: "یکشنبه", dayOfWeek: 0, baseDate: "d2" },
    2: { name: "دوشنبه", dayOfWeek: 1, baseDate: "d3" },
    3: { name: "سه شنبه", dayOfWeek: 2, baseDate: "d4" },
    4: { name: "چهارشنبه", dayOfWeek: 3, baseDate: "d5" },
    5: { name: "پنجشنبه", dayOfWeek: 4, baseDate: "d6" },
    6: { name: "جمعه", dayOfWeek: 5, baseDate: "d7" }
})

const PROGRAM_STATE = Object.freeze({
    interval: { color: "blue", state: 1 },
    specefic: { color: "#0aaf0a", state: 2 },
    wait: { color: "blue", state: 3 },
    close: { color: "red", state: 4 }
})

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

        longPressDelay: 200,
        eventLongPressDelay: 200,
        selectLongPressDelay: 200,


        select: function (arg) {
            document.querySelector("#schedule_info_table_modal").classList.remove("hide");
            let o = {
                dateName: getKeyByValue(WEEKLY_SCHEDULE, "dayOfWeek", new Date(arg.start).getDay()).name,
                startTime: createCustomeTime(arg.start),
                endTime: createCustomeTime(arg.end),
            }
            putEventHourAndState(o);

            let newEvent = {
                id: serializedEventId++,
                start: arg.start,
                end: arg.end,
                color: PROGRAM_STATE["wait"].color,
                title: arg.title
            }
            addNewEventObj(newEvent);
            currentSelectedEventId = newEvent.id;
            changeRadioButtonvisibility("scheduleTypeCalendar", false)
        },

        eventClick: function (arg) {

            let o = {
                dateName: getKeyByValue(WEEKLY_SCHEDULE, "dayOfWeek", new Date(arg.event.startStr).getDay()).name,
                startTime: createCustomeTime(arg.event.startStr),
                endTime: createCustomeTime(arg.event.endStr)
            }
            putEventHourAndState(o);

            putDescriptionInEvent("#td_description", arg.event.title);
            changeRadioButtonvisibility("scheduleTypeCalendar", true);

            putProgramStateRadioButton(getKeyByValue(serializedEventsArry, "backgroundColor", arg.event.backgroundColor).programState);
            currentSelectedEventId = arg.event.id;

            document.querySelector("#schedule_info_table_modal").classList.remove("hide");
        }
    })
    calendar.render();
}

let sortCalendarEvents = (intervalProgram = {}, staticProgarm = []) => {



    for (let i = 0; i < 7; i++) {
        let day = new Date(new Date(new Date().toLocaleDateString()).getTime() + (86400000 * i));
        let change = getKeyByValue(WEEKLY_SCHEDULE, "dayOfWeek", day.getDay());
        change["baseDate"] = day.getTime();
    }

    for (const iterator of intervalProgram) {
        let endTimeHour = (iterator["eTime"][0] == 0) ? 24 : iterator["eTime"][0];
        let endTimeMin = (iterator["sTime"][1] == undefined) ? 0 : iterator["sTime"][1];
        let startDate = new Date(iterator["start"]).getDay();
        let endDate = new Date(iterator["end"]).getDay()
        let o = {
            title: iterator["title"],
            start: new Date(WEEKLY_SCHEDULE[startDate].baseDate).setHours(iterator["sTime"][0], iterator["eTime"][1]),
            end: new Date(WEEKLY_SCHEDULE[endDate].baseDate).setHours(endTimeHour, endTimeMin),
            backgroundColor: PROGRAM_STATE["interval"].color,
            programState: PROGRAM_STATE["interval"].state,
            sTime: iterator["sTime"],
            eTime: iterator["eTime"]
        }
        diserializedIntervalArry.push(o);
    }


    // for (const iterator of obj.specefic) {
    //     let o = {
    //         id: serializedEventId++,
    //         title: iterator["title"],
    //         start: Number(iterator["time"][0]) * 1000,
    //         end: Number(iterator["time"][1]) * 1000,
    //         backgroundColor: PROGRAM_STATE["specefic"].color,
    //         programState: PROGRAM_STATE["specefic"].state
    //     }
    //     serializedEventsArry.push(o);
    // }





    // for (let i = 0; i < diserializedIntervalArry.length; i++) {
    //     diserializedIntervalArry[i].id = serializedEventId++;

    //     for (let j = 0; j < 4; j++) {
    //         let o = {
    //             id: diserializedIntervalArry[i]["id"],
    //             title: diserializedIntervalArry[i]["title"],
    //             start: diserializedIntervalArry[i]["start"] + ((86400000 * 7) * j),
    //             end: diserializedIntervalArry[i]["end"] + ((86400000 * 7) * j),
    //             backgroundColor: diserializedIntervalArry[i]["backgroundColor"],
    //             programState: diserializedIntervalArry[i]["programState"]
    //         }
    //         serializedEventsArry.push(o);
    //     }
    // }
}