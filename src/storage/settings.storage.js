import { getFromStorage, setToStorage } from './storage.js';

export const loadSettings = () => {
  return getFromStorage(['settings']).then(({ settings }) => settings);
};

export const storeSettings = (settings) => {
  return setToStorage({ settings }).then(({ settings }) => settings);
};
