window.addEventListener("DOMContentLoaded", () => {
    (!isStorageExist()) ? createCalendarStorage() : null;
    let intervalProgerm = getIntervalProgram(), staticProgerm = getStaticProgram();
    if(!Array.isArray(intervalProgerm) || !Array.isArray(staticProgerm)){
        createCalendarStorage();
        intervalProgerm = getIntervalProgram();
        staticProgerm = getStaticProgram();
    }

    let sortedCalendarEvents = sortCalendarEvents(intervalProgerm , staticProgerm);
    calendarInit(sortedCalendarEvents);  
})