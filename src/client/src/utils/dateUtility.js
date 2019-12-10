/* eslint-disable no-undef */
// @flow

const Moment = require('moment-timezone');

const clientTimeZone = Moment.tz.guess();

export function getFormatedDate(date, timeZone) {
  if (timeZone !== null && timeZone !== undefined) {
    return (date === null || date === undefined)
            ? null
            : Moment(date).tz(timeZone).format('h:mmA[, ]ddd[, ]DD MMM');
  }
  return (date === null || date === undefined)
          ? null
          : Moment(date).tz(clientTimeZone).format('h:mmA[, ]ddd[, ]DD MMM');
}

export function getFormatedShortDate(date, timeZone) {
  if (date === null || date === undefined) {
    return ' ';
  }
  if (timeZone !== null && timeZone !== undefined) {
    return (date === null || date === undefined)
            ? null
            : Moment(date).tz(timeZone).format('DD MMM');
  }
  return (date === null || date === undefined)
            ? null
            : Moment(date).tz(clientTimeZone).format('DD MMM');
}

export function getTodayDate(timeZone) {
  if (timeZone !== null && timeZone !== undefined) {
    return Moment().tz(timeZone).format('Do MMM [,] YYYY');
  }
  return Moment(date).tz(clientTimeZone).format('h:mmA[, ]ddd[, ]DD MMM');
}

export function getFormatedTime(time, timeZone) {
  if (timeZone !== null && timeZone !== undefined) {
    return (time === null || time === undefined)
              ? null
              : Moment(date).tz(timeZone).format('h:mmA[, ]ddd[, ]DD MMM');
  }
  return Moment(time).tz(clientTimeZone).format('hh:mm A');
}

export function getTodayTime(timeZone) {
  if (timeZone !== null && timeZone !== undefined) {
    return Moment().tz(timeZone).format('hh:mm a');
  }

  return Moment().tz(clientTimeZone).format('hh:mm a');
}

export function getRelativeDate(date, timeZone) {
  if (timeZone !== null && timeZone !== undefined) {
    return Moment(date).tz(timeZone).fromNow();
  }
  return Moment(date).tz(clientTimeZone).fromNow();
}

//12 AM
export const getTimeByAmPm = (date, timeZone) =>{
  if (timeZone !== null && timeZone !== undefined) {
    return Moment(date).tz(timeZone).format('hh A');
  }
  return Moment(date).tz(clientTimeZone).format('hh A');
 }

 //wed thu
 export const getShortDay = (date, timeZone) =>{
  if (timeZone !== null && timeZone !== undefined) {
    return Moment(date).tz(timeZone).format('ddd');
  }
  return Moment(date).tz(clientTimeZone).format('ddd');
 }

// new functtion by Anand
export function getFormatedSGDateTime(date, timeZone) {
if (date === null || date === undefined) {
  return '-';
}
if (timeZone !== null && timeZone !== undefined) {
  return Moment(date).tz(timeZone).format('h:mma[, ]ddd[, ]DD MMM');
}
return Moment(date).tz(clientTimeZone).format('h:mma[, ]ddd[, ]DD MMM');
}

export const getFormatedDateWithGivenFormat = (date, format) => {
  if (date === null || date === undefined) {
    return '-';
  }
  return Moment(date).format(format);
 }

  //ex: Wednesday, 01 May 2019
export function getFormatedDateTimeYear(date, timeZone) {
  if (date === null || date === undefined) {
    return "-";
  }
  if (timeZone !== null && timeZone !== undefined) {
    return Moment(date)
      .tz(timeZone)
      .format("dddd[, ]DD MMM YYYY");
  }
  return Moment(date)
    .tz(clientTimeZone)
    .format("dddd[, ]DD MMM YYYY");
}

export const getShortDate = (date, timeZone) =>{
  if (timeZone !== null && timeZone !== undefined) {
    return Moment(date).tz(timeZone).format('DD');
  }
  return Moment(date).tz(clientTimeZone).format('DD');
}

export const getShortMonth = (date, timeZone) =>{
  if (timeZone !== null && timeZone !== undefined) {
    return Moment(date).tz(timeZone).format('MMM');
  }
  return Moment(date).tz(clientTimeZone).format('MMM');
}