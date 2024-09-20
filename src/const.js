const MSEC_IN_SEC = 1000;
const SEC_IN_MIN = 60;
const MIN_IN_HOUR = 60;
const HOUR_IN_DAY = 24;

const DURATION_FORMATS = {
  days: 'DD[D] HH[H] mm[M]',
  hours: 'HH[H] mm[M]',
  mins: 'mm[M]'
};

const EmptyPhrase = {
  NO_POINTS: 'Click New Event to create your first point'
};

const MSEC_IN_HOUR = MSEC_IN_SEC * SEC_IN_MIN * MIN_IN_HOUR;
const MSEC_IN_DAY = MSEC_IN_HOUR * HOUR_IN_DAY;

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past'
};

const Attribute = {
  CHECKED: 'checked',
  DISABLED: 'disabled'
};

const EventType = {
  TAXI: 'taxi',
  BUS: 'bus',
  TRAIN: 'train',
  SHIP: 'ship',
  DRIVE: 'drive',
  FLIGHT: 'flight',
  CHECK_IN: 'check-in',
  SIGHTSEEING: 'sightseeing',
  RESTAURANT: 'restaurant'
};

const SortType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFER: 'offer'
};

const DateFormat = {
  DAY: 'MMM D',
  TIME: 'hh:mm',
  FULL: 'YYYY-MM-DD',
  POINT: 'DD,HH,mm',
  EDIT_POINT: 'DD/MM/YY HH:mm'
};

const EditType = {
  ADD: 'add',
  EDIT: 'edit'
};

const BLANK_POINT = {
  id: null,
  basePrice: 0,
  dateFrom: '',
  dateTo: '',
  destination: '',
  isFavorite: false,
  offers: [],
  type: EventType.TRAIN
};

const POINT_COUNT = 9;

export { BLANK_POINT, POINT_COUNT, DURATION_FORMATS, MSEC_IN_HOUR, MSEC_IN_DAY, EventType, SortType, DateFormat, EditType, FilterType, EmptyPhrase, Attribute};


