import { loadSettings, storeSettings } from '../storage/settings.storage.js';

const clearableItems = [
  'appcache',
  'cache',
  'cacheStorage',
  'cookies',
  'downloads',
  'fileSystems',
  'formData',
  'history',
  'indexedDB',
  'localStorage',
  'passwords',
  'serviceWorkers',
  'webSQL',
];

const dataTypeSetsForm = jQuery('#dataTypeSetsForm');

let settings;

const initialize = () => {
  loadSettings().then((storageSettings) => {
    settings = storageSettings;

    clearableItems.forEach((item) => {
      const checkbox = jQuery(
        `<input id="${item}" name="${item}" type="checkbox" />`
      );
      checkbox.change(submitSettings);
      if (settings && settings.selectedDataSets[item]) {
        checkbox.attr('checked', 'checked');
      }

      const formgroup = jQuery(`<div class="form-group"></div>`);
      formgroup.append(checkbox);
      formgroup.append(`<label for="${item}">${item}</label>`);

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
