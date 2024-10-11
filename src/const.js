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
  EVERYTHING: 'Click New Event to create your first point',
  FUTURE: 'There are no future events now',
  PRESENT: 'There are no present events now',
  PAST: 'There are no past events now'
};

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past'
};

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

const MSEC_IN_HOUR = MSEC_IN_SEC * SEC_IN_MIN * MIN_IN_HOUR;
const MSEC_IN_DAY = MSEC_IN_HOUR * HOUR_IN_DAY;

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

const enabledSortType = {
  [SortType.DAY]: true,
  [SortType.EVENT]: false,
  [SortType.TIME]: true,
  [SortType.PRICE]: true,
  [SortType.OFFER]: false,
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

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

const POINT_COUNT = 5;

export { BLANK_POINT, POINT_COUNT, DURATION_FORMATS,
  MSEC_IN_HOUR, MSEC_IN_DAY, EventType, SortType,
  DateFormat, EditType, FilterType, EmptyPhrase,
  Attribute, Mode, enabledSortType, UserAction,
  UpdateType};


