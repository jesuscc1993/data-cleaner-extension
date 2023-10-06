import { getFromStorage, setToStorage } from './storage.js';
import { stringify } from './../shared/generic.utils.js';

export const loadSettings = async () => {
  const { settings } = await getFromStorage(['settings']);
  console.debug(`Loaded settings ${stringify(settings)}`);
  return settings;
};

export const storeSettings = async (settings) => {
  const { settings: updatedSettings } = await setToStorage({ settings });
  console.debug(`Saved settings ${stringify(updatedSettings)}`);
  return updatedSettings;
};
