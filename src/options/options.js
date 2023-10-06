import { loadSettings, storeSettings } from '../storage/settings.storage.js';

const clearableItems = [
  { label: 'App cache', value: 'appcache' },
  { label: 'Cache', value: 'cache' },
  { label: 'Cache storage', value: 'cacheStorage' },
  { label: 'Cookies', value: 'cookies' },
  { label: 'Downloads', value: 'downloads' },
  { label: 'File systems', value: 'fileSystems' },
  { label: 'Form data', value: 'formData' },
  { label: 'History', value: 'history' },
  { label: 'IndexedDB', value: 'indexedDB' },
  { label: 'Local storage', value: 'localStorage' },
  { label: 'Passwords', value: 'passwords' },
  { label: 'Service workers', value: 'serviceWorkers' },
  { label: 'WebSQL', value: 'webSQL' },
];

const dataTypeSetsForm = jQuery('#dataTypeSetsForm');
const notificationsEnabled = jQuery('#notificationsEnabled');

let settings;

const initialize = () => {
  loadSettings().then((storageSettings) => {
    settings = storageSettings;

    clearableItems.forEach((item) => {
      const checkbox = jQuery(
        `<input id="${item.value}" name="${item.value}" type="checkbox" />`
      );
      checkbox.change(submitSettings);
      if (settings && settings.selectedDataSets[item.value]) {
        checkbox.attr('checked', 'checked');
      }

      const formGroup = jQuery(
        `<div class="section small hr form-group"></div>`
      );
      formGroup.append(`<label for="${item.value}">${item.label}</label>`);
      formGroup.append(checkbox);

      dataTypeSetsForm.append(formGroup);
    });

    notificationsEnabled.attr(
      'checked',
      settings.notificationsEnabled ? 'checked' : undefined
    );
    notificationsEnabled.change(submitSettings);
  });
};

const getFormDataTypeSets = () => {
  return dataTypeSetsForm
    .serializeArray()
    .reduce((formData, field) => ({ ...formData, [field.name]: true }), {});
};

const isChecked = (input) => {
  return input.is(':checked');
};

const submitSettings = () => {
  storeSettings({
    ...settings,
    selectedDataSets: getFormDataTypeSets(),
    notificationsEnabled: isChecked(notificationsEnabled),
  });
};

initialize();
