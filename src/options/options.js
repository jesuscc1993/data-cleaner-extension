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

const dataTypeSetsForm = document.querySelector('#dataTypeSetsForm');

let settings;

const initialize = () => {
  loadSettings().then((storageSettings) => {
    settings = storageSettings;

    clearableItems.forEach((item) => {
      const label = document.createElement('label');
      label.htmlFor = item.value;
      label.textContent = item.label;

      const checkbox = document.createElement('input');
      checkbox.id = item.value;
      checkbox.name = item.value;
      checkbox.type = 'checkbox';
      checkbox.addEventListener('change', submitSettings);
      if (settings && settings.selectedDataSets[item.value]) {
        checkbox.checked = true;
      }

      const formGroup = document.createElement('div');
      formGroup.className = 'section small hr form-group';
      formGroup.append(label);
      formGroup.append(checkbox);

      dataTypeSetsForm.append(formGroup);
    });
  });
};

const getFormDataTypeSets = () => {
  return Array.from(new FormData(dataTypeSetsForm)).reduce(
    (formData, [name]) => ((formData[name] = true), formData),
    {}
  );
};

const submitSettings = () => {
  storeSettings({ ...settings, selectedDataSets: getFormDataTypeSets() });
};

initialize();
