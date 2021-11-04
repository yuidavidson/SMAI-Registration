const dictionaryConfig = {
    neighborhood: {
        '1': 'American Hill',
        '2': 'Balkan Camp',
        '3': 'Car Camp',
        '4': 'Coffee House',
        '5': 'Cowboy Camp',
        '6': 'Flamenco Camp',
        '7': 'The Heights',
        '8': 'Kitchen',
        '9': 'Lakeshore',
        '10': 'Meditation Meadow',
        '11': 'Rec Row',
        '12': 'South Pole',
        '13': 'Upper Touristan',
        '14': 'Other',
        '15': 'Don\'t know yet'
    }
};

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

