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

      const formgroup = jQuery(
        `<div class="section small hr form-group"></div>`
      );
      formgroup.append(`<label for="${item.value}">${item.label}</label>`);
      formgroup.append(checkbox);

      dataTypeSetsForm.append(formgroup);
    });
  });
};

const getFormDataTypeSets = () => {
  return dataTypeSetsForm
    .serializeArray()
    .reduce((formData, field) => ({ ...formData, [field.name]: true }), {});
};

const submitSettings = () => {
  storeSettings({ ...settings, selectedDataSets: getFormDataTypeSets() });
};

initialize();
