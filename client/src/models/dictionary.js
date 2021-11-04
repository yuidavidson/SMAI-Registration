import dictionaryConfig  from './dictionary-config.js';

function DictionaryModelFn() {
    const config = dictionaryConfig;
    const invertedConfig = {};
    // static init(config) {
    //     Dictionary.config = config;
    // }
    this.getValue = function(type, key) {
        return config[type][key];
    };

    this.get = function(type) {
        return config[type];
    }

    this.getKey = function(type, value) {
        // flip array on deman
        if (!invertedConfig[type]) {
            invertedConfig[type] = {};
            Object.entries(config).forEach(([k,v]) => invertedConfig[v] = k);
        }
        return invertedConfig[type][value];
    }
}
const DictionaryModel = new DictionaryModelFn();
export default DictionaryModel;

