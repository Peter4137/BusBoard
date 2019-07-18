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
        const queries = {"stopTypes" : [
            // "NaptanBusCoachStation",
            // "NaptanBusWayPoint",
            // "NaptanCoachAccessArea",
            // "NaptanCoachBay",
            // "NaptanCoachEntrance",
            // "NaptanCoachServiceCoverage",
            // "NaptanCoachVariableBay",
            // "NaptanOnstreetBusCoachStopCluster",
            // "NaptanOnstreetBusCoachStopPair",
            // "NaptanPrivateBusCoachTram",
            "NaptanPublicBusCoachTram",
        ].join(","),
        "radius": "500",
        lat,
        lon
        };
        const endpoint = "/StopPoint";
        return this.makeRequest(endpoint, queries);
    }

    makeRequest(endpoint, queries) {
        let options = {
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
        let options = {
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



// class BusStop {
//     constructor() {
//         this.nextBuses = this.getBuses()
//     }

//     getBuses(){

//         return
//     }
// }

