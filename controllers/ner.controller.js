const locationService = require('../services/location.service');

exports.predict = async (query) => {
    const sentence = query.s || '';

    if (!sentence) {
        return null;
    }

    const location = locationService.predict(sentence);
    return {
        LOC: location
    };
};