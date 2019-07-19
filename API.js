const requestPromise = require("request-promise-native");


class API {
    constructor(url){
        this.url = url;
        this.baseQueries = {};
    }
    makeRequest(endpoint, queries) {
        const options = {
            uri: this.url + endpoint,
            qs: {
                ...this.baseQueries,
                ...queries
            },
            headers: {
                "User-Agent": "Request-Promise"
            },
            json: true // Automatically parses the JSON string in the response
        };
        return requestPromise(options);
    }
}

module.exports.TflAPI = class tflAPI extends API{
    constructor(AppID, AppKey) {
        super("https://api.tfl.gov.uk");
        this.baseQueries = {
            app_key: AppKey,
            app_id: AppID
        };
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
};

module.exports.LocationAPI = class locationAPI extends API{

    constructor(){
        super("https://api.postcodes.io/postcodes");
    }

    getCoordinates(postcode) {
        return this.makeRequest("/" + postcode);
    }
};

