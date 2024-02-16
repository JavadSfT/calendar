let putEventHourAndState = (obj) => {
    Object.keys(obj).forEach(key => {
        document.querySelector(`#td_${key}`).textContent = obj[key];
    });
}

let changeRadioButtonvisibility = (radioButtonName, type) => {
    let radio = document.querySelectorAll(`input[name="${radioButtonName}"]`);
    for (let i = 0; i < radio.length; i++) {
        radio[i].disabled = type;
    }
}

let putDescriptionInEvent = (tagElem, value) => {
    let elem = document.querySelector(tagElem);
    elem.value = value;
}

let putProgramStateRadioButton = (programState, type) => {
    let radios = document.querySelectorAll('input[name="scheduleTypeCalendar"]')
    for (const iterator of radios) {
        if (iterator.value == programState) { iterator.checked = true; }
    }
}

let addNewEventObj = (obj) => {
    let o = {
        id: obj.id,
        start: new Date(obj.start).getTime(),
        end: new Date(obj.end).getTime(),
        title: obj.title,
        color: obj.color,
        state: getKeyByValue(PROGRAM_STATE, "color", obj.color).state
    }
    calendar.addEvent(obj);
    calendar.unselect();
    serializedEventsArry.push(o);
}

let editEventById = (id, arry, state) => {
    for (let i = 0; i < arry.length; i++) {
        if (id == arry[i].id) {
            arry[i].title = DESCRIPTION_ELEMENT.value;
            arry[i].programState = state;
            arry[i].color = getKeyByValue(PROGRAM_STATE, "state", state).color;
        }
    }
}

let updateCalendarEvents = () => {
    let intervalProgram = diserializedIntervalArry.filter(obj => {
        return obj.programState == PROGRAM_STATE["interval"].state;
    });
    let staticProgarm = diserializedIntervalArry.filter(obj => {
        return obj.programState == PROGRAM_STATE["specefic"].state;
    })

    setIntervalProgram(intervalProgram);
    setStaticProgram(staticProgarm);
}