let getKeyByValue = (object, searchKey, value) => {
    let o = Object.keys(object).find(key =>
        object[key][searchKey] === value);
    return object[o];
}

let createCustomeTime = (time) => {
    let date = new Date(time);
    let minute = (String(date.getMinutes()).length == 2) ? date.getMinutes() : `0${date.getMinutes()}`;
    return `${date.getHours()}:${minute}`;
}
