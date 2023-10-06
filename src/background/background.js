import { fetchJson } from '../shared/file.utils.js';
import { loadSettings, storeSettings } from '../storage/settings.storage.js';
import { stringify } from '../shared/generic.utils.js';

const { browserAction, browsingData, notifications } = chrome;

const defaultNotificationOptions = {
  type: 'basic',
  iconUrl: '../../assets/icons/material_trash/128px.png',
  title: 'Browser Data Cleaner',
};

const state = {};

const initializeBackground = () => {
  loadSettings().then((storageSettings) => {
    if (!storageSettings) {
      fetchJson('../../assets/data/defaultSettings.json').then(
        (defaultSettings) => {
          storeSettings(defaultSettings);
        }
      );
    }

    browserAction.onClicked.addListener(() => {
      if (!state.notificationId) {
        clearHistory();
      }
    });
  });
};

const getUniqueId = () => {
  return new Date().getTime().toString();
};

const showNotification = (notificationOptions) => {
  state.notificationId = getUniqueId();
  notifications.create(state.notificationId, {
    ...defaultNotificationOptions,
    ...notificationOptions,
  });
};

const updateNotification = (notificationOptions) => {
  notifications.update(state.notificationId, {
    ...defaultNotificationOptions,
    ...notificationOptions,
  });
};

const clearHistory = () => {
  loadSettings().then(({ selectedDataSets, notificationsEnabled }) => {
    if (notificationsEnabled) {
      showNotification({ message: 'Clearing data...' });
    }

    browsingData.remove({}, selectedDataSets, () => {
      console.debug(`Cleared data sets ${stringify(selectedDataSets)}`);

      if (notificationsEnabled) {
        updateNotification({ message: 'Data successfully cleared.' });
      }
      state.notificationId = undefined;
    });
  });
};

initializeBackground();
