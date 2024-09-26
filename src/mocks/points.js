import { getRandomArrayElement } from '../utils-common';
import { nanoid } from 'nanoid';

const mockPoints = [
  {
    basePrice: 1294,
    dateFrom: '2024-10-25T18:41:09.899Z',
    dateTo: '2024-10-27T09:05:09.899Z',
    destination: 'destination-2',
    isFavorite: true,
    offers: [
      'flight-1',
      'flight-2'
    ],
    type: 'flight'
  },
  {
    basePrice: 1619,
    dateFrom: '2024-10-28T15:57:09.899Z',
    dateTo: '2024-10-29T03:09:09.899Z',
    destination: 'destination-3',
    isFavorite: false,
    offers: [
      'taxi-1',
      'taxi-2'
    ],
    type: 'taxi'
  },
  {
    basePrice: 6096,
    dateFrom: '2024-10-30T12:44:09.899Z',
    dateTo: '2024-11-01T12:11:09.899Z',
    destination: 'destination-4',
    isFavorite: false,
    offers: [
      'drive-1',
      'drive-2'
    ],
    type: 'drive'
  },
  {
    basePrice: 98,
    dateFrom: '2024-10-30T12:44:09.899Z',
    dateTo: '2024-11-01T12:11:09.899Z',
    destination: 'destination-4',
    isFavorite: false,
    offers: [
      'drive-1',
      'drive-2'
    ],
    type: 'drive'
  },
  {
    basePrice: 3295,
    dateFrom: '2024-11-03T06:31:09.899Z',
    dateTo: '2024-11-04T03:00:09.899Z',
    destination: 'destination-4',
    isFavorite: false,
    offers: [
      'train-1',
      'train-2',
      'train-3'
    ],
    type: 'train'
  },
  {
    basePrice: 54,
    dateFrom: '2024-11-03T06:31:09.899Z',
    dateTo: '2024-11-04T03:00:09.899Z',
    destination: 'destination-4',
    isFavorite: false,
    offers: [
      'train-1',
      'train-2',
      'train-3'
    ],
    type: 'train'
  },
];

function getRandomPoint() {
  return {
    id: nanoid(),
    ...getRandomArrayElement(mockPoints)
  };
}

export { getRandomPoint };
