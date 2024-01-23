const STATIC_PROGRAM = "static_Program", INTERVAL_PRPGRAM = "interval_Program";

let isStorageExist = () => {
    let intervalProgram = localStorage.getItem(INTERVAL_PRPGRAM);
    let staticProgram = localStorage.getItem(STATIC_PROGRAM);
    return (staticProgram != null && intervalProgram != null) ? true : false;
}

let createCalendarStorage = () => {
    localStorage.setItem(INTERVAL_PRPGRAM, JSON.stringify({}));
    localStorage.setItem(STATIC_PROGRAM, JSON.stringify([]));
}

let getIntervalProgram = () => {
    return JSON.parse(localStorage.getItem(INTERVAL_PRPGRAM));
}

let setIntervalProgram = (interval_Program = {}) => {
    localStorage.setItem(INTERVAL_PRPGRAM, JSON.stringify(interval_Program));
}

let getStaticProgram = () => {
    return JSON.parse(localStorage.getItem(STATIC_PROGRAM));
}

let setStaticProgram = (static_Program = []) => {
    localStorage.setItem(STATIC_PROGRAM, JSON.stringify(static_Program));
}