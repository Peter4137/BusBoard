const requestPromise = require("request-promise-native");

module.exports.TflAPI = class tflAPI {
    constructor(AppID, AppKey) {
        this.AppID = AppID;
        this.AppKey = AppKey;
    }
    getBusTimesFromStop(stopCode) {
        const endpoint = `/StopPoint/${stopCode}/Arrivals`;
        return this.makeRequest(endpoint);
    }

    getStopsNearby(lat, lon){
        const queries = {
            "stopTypes" : "NaptanPublicBusCoachTram",
            "radius": "500",
            lat,
            lon
        };
        const endpoint = "/StopPoint";
        return this.makeRequest(endpoint, queries);
    }

    makeRequest(endpoint, queries) {
        const options = {
            uri: "https://api.tfl.gov.uk" + endpoint,
            qs: {
                app_key: this.AppKey,
                app_id: this.AppID,
                ...queries
            },
            headers: {
                "User-Agent": "Request-Promise"
            },
            json: true // Automatically parses the JSON string in the response
        };
        return requestPromise(options);
    }
};

module.exports.LocationAPI = class locationAPI {
    makeRequest(endpoint) {
        const options = {
            uri: "https://api.postcodes.io/postcodes" + endpoint,
            headers: {
                "User-Agent": "Request-Promise"
            },
            json: true // Automatically parses the JSON string in the response
        };
        return requestPromise(options);
    }

    async getCoordinates(postcode) {
        return this.makeRequest("/" + postcode);
    }
};