/* global window, document, Blob, MouseEvent */
/* eslint no-param-reassign: 0 */
let singleton;

/**
 * Function to download the given JSON as a json file through browser
 * adapted from http://bgrins.github.io/devtools-snippets/#console-save
 * @param {object} data -- json object to save
 * @param {string} file -- file name to save to
 */
function saveJSON(data, filename = 'export.json') {
  if (!data) {
    return;
  }

  if (typeof data === 'object') {
    data = JSON.stringify(data, undefined, 4);
  }

  const blob = new Blob([data], { type: 'application/json' });
  const a = document.createElement('a');
  const evt = new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
    view: window,
  });

  a.download = filename;
  a.href = window.URL.createObjectURL(blob);
  a.dataset.downloadurl = ['application/json', a.download, a.href].join(':');
  a.dispatchEvent(evt);
}

/**
 * Helper class to collect all the various informations about the map
 * that can be turned into JSON format and downloaded through the browser
 */
class Exporter {
  /**
   * Persits the given basic configuration of the map
   * @param {object} map - Holds the fundamental information about the current map
   */
  setMap(map) {
    // no hocus-pocus here, we can directly save it
    this.map = map;
  }

  /**
   * Converts all the passed data to JSON format
   * @return {string} JSON formatted map data
   */
  export() {
    return JSON.stringify(this);
  }

  /**
   * Triggers a native download of the exported JSON
   */
  download() {
    saveJSON(this.export(), this.map.name || 'map.json');
  }
}

export default {
  getInstance() {
    if (!singleton) {
      singleton = new Exporter();
    }
    return singleton;
  },
};
