import { fetchJson } from '../shared/file.utils.js';
import { loadSettings, storeSettings } from '../storage/settings.storage.js';

const { browserAction, browsingData, notifications } = chrome;

const defaultNotificationOptions = {
  type: 'basic',
  iconUrl: '../../assets/icons/128px.png',
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

    browserAction.onClicked.addListener((tab) => {
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
  showNotification({ message: 'Clearing data...' });

  loadSettings().then(({ selectedDataSets }) => {
    browsingData.remove({}, selectedDataSets, () => {
      console.log(
        `Cleared data sets ${JSON.stringify(selectedDataSets, undefined, 2)}`
      );

      updateNotification({ message: 'Data successfully cleared.' });
      state.notificationId = undefined;
    });
  });
};

initializeBackground();
