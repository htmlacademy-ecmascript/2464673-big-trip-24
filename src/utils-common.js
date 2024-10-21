import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);
import { MSEC_IN_HOUR, MSEC_IN_DAY, DURATION_FORMATS } from './const.js';
import { SortType } from './const';

const humanizeDate = (currentDate, format) => currentDate ? dayjs(currentDate).format(format) : '';
const calculateDuration = (dateFrom, dateTo) => {
  const diff = dayjs(dateTo).diff(dayjs(dateFrom));
  let pointDuration;
  switch (true) {
    case (diff >= MSEC_IN_DAY):
      pointDuration = dayjs.duration(diff).format(DURATION_FORMATS.days);
      break;
    case (diff >= MSEC_IN_HOUR):
      pointDuration = dayjs.duration(diff).format(DURATION_FORMATS.hours);
      break;
    case (diff < MSEC_IN_HOUR):
      pointDuration = dayjs.duration(diff).format(DURATION_FORMATS.mins);
      break;
  }
  return pointDuration;
};
const capitalizedString = (string) => string.replace(string[0], string[0].toUpperCase());

const updateItem = (items, update) => items.map((item) => item.id === update.id ? update : item);

function getPointsByDate(pointA, pointB) {
  return dayjs(pointB.dateFrom).diff(dayjs(pointA.dateFrom));
}

function getPointsByPrice(pointA, pointB) {
  return pointB.basePrice - pointA.basePrice;
}

function getPointsByTime(pointA, pointB) {
  const pointADuration = dayjs(pointA.dateTo).diff(dayjs(pointA.dateFrom));
  const pointBDuration = dayjs(pointB.dateTo).diff(dayjs(pointB.dateFrom));
  return pointBDuration - pointADuration;
}

const sorting = {
  [SortType.DAY]: (points) => points.toSorted(getPointsByDate),
  [SortType.EVENT]: () => {
    throw new Error(`Sort by ${SortType.EVENT} is disabled`);
  },
  [SortType.TIME]: (points) => points.toSorted(getPointsByTime),
  [SortType.PRICE]: (points) => points.toSorted(getPointsByPrice),
  [SortType.OFFER]: () => {
    throw new Error(`Sort by ${SortType.OFFER} is disabled`);
  },
};


export { updateItem,
  calculateDuration, humanizeDate, capitalizedString,
  sorting };
