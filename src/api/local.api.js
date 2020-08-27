export const fetchLocalStorage = (key) => {
    let localData = null;
    if (typeof (Storage) !== "undefined") {
        localData = JSON.parse(localStorage.getItem(key));
    } else {
        throw new Error('No Web Storage support..');
    }
    return localData;
}

export const updateLocalStorage = (key, value) => {
    let localData = fetchLocalStorage(key);
    if (localData === null) {
        localStorage.setItem(key, JSON.stringify([value]));
    } else {
        let newData = [
            { ...value },
            ...localData,
        ]
        localStorage.setItem(key, JSON.stringify(newData));
    }
}

export const clearLocalStorage = () => {
    localStorage.clear();
}