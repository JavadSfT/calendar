
function acceptEvent() {
    let event = calendar.getEventById(currentSelectedEventId);
    let radio = document.querySelector('input[name="scheduleTypeCalendar"]:checked').value;

    if (radio == PROGRAM_STATE["interval"].state) {
        for (let i = 0; i < 4; i++) {
            let o = {
                id: currentSelectedEventId,
                backgroundColor: PROGRAM_STATE["interval"].color,
                end: new Date(event.end).getTime() + ((86400000 * 7) * i),
                programState: PROGRAM_STATE["interval"].state,
                start: new Date(event.start).getTime() + ((86400000 * 7) * i),
                title: DESCRIPTION_ELEMENT.value
            }
            calendar.addEvent(o);
            if (i === 0) {
                diserializedIntervalArry.push(o);
            }
            serializedEventsArry.push(o)
        }
    } else if (radio == PROGRAM_STATE["specefic"].state) {
        let o = {
            id: currentSelectedEventId,
            backgroundColor: PROGRAM_STATE["specefic"].color,
            end: new Date(event.end).getTime(),
            programState: PROGRAM_STATE["specefic"].state,
            start: new Date(event.start).getTime(),
            title: DESCRIPTION_ELEMENT.value
        }
        calendar.addEvent(o);

        serializedEventsArry.push(o);
        diserializedIntervalArry.push(o);
    }

    event.remove();
    DESCRIPTION_ELEMENT.value = "";
    cancelEvent();
    updateCalendarEvents();
}

function editEvent() {

    let radio = document.querySelector('input[name="scheduleTypeCalendar"]:checked').value

    let event = calendar.getEventById(currentSelectedEventId);

    if (radio == PROGRAM_STATE["interval"].state) {
        do {
            let event = calendar.getEventById(currentSelectedEventId);
            event.remove();
        } while (calendar.getEventById(currentSelectedEventId) != null);

        for (let i = 0; i < 4; i++) {
            let o = {
                id: currentSelectedEventId,
                start: new Date(event.start).getTime() + ((86400000 * 7) * i),
                end: new Date(event.end).getTime() + ((86400000 * 7) * i),
                backgroundColor: PROGRAM_STATE["interval"].color,
                title: DESCRIPTION_ELEMENT.value
            }
            calendar.addEvent(o);
            event.remove();
        }
        editEventById(currentSelectedEventId, diserializedIntervalArry, PROGRAM_STATE["interval"].state);

    } else if (radio == PROGRAM_STATE["specefic"].state) {
        let o = {
            id: currentSelectedEventId,
            start: event.start,
            end: event.end,
            backgroundColor: PROGRAM_STATE["specefic"].color,
            title: DESCRIPTION_ELEMENT.value
        }
        calendar.addEvent(o);
        event.remove();
        editEventById(currentSelectedEventId, serializedEventsArry, PROGRAM_STATE["specefic"].state);
    }

    DESCRIPTION_ELEMENT.value = "";
    cancelEvent();
    updateCalendarEvents();
}


function deleteEvent() {
    let radio = document.querySelector('input[name="scheduleTypeCalendar"]:checked').value;

    if (radio == PROGRAM_STATE["interval"].state) {
        editEventById(currentSelectedEventId, diserializedIntervalArry, PROGRAM_STATE["close"].state);
        do {
            let event = calendar.getEventById(currentSelectedEventId);
            event.remove();
        } while (calendar.getEventById(currentSelectedEventId) != null);
    } else if (radio == PROGRAM_STATE["specefic"].state) {
        editEventById(currentSelectedEventId, serializedEventsArry, PROGRAM_STATE["close"].state);
        let event = calendar.getEventById(currentSelectedEventId);
        event.remove();
    }

    DESCRIPTION_ELEMENT.value = "";
    cancelEvent();
    updateCalendarEvents();
}


function cancelEvent() {
    document.querySelector("#schedule_info_table_modal").classList.add("hide");
    calendar.unselect();
}