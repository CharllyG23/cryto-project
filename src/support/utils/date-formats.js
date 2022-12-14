export const parseToUnix = (date) => {
    return Math.floor(new Date(date).getTime()/1000.0)
}

export const parseFromUnix = (unixDate) => {
    return new Date(unixDate * 1000);
}

export const toLocaleUTCDateString = (date, locales, options) => {
    const timeDiff = date.getTimezoneOffset() * 60000;
    const adjustedDate = new Date(date.valueOf() + timeDiff);
    return adjustedDate.toLocaleString(locales, options);
}