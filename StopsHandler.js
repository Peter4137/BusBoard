module.exports = class StopsHandler {
    reduceToLatLong(data){
        return {
            "latitude" : data.result.latitude, 
            "longitude" : data.result.longitude
        };
    }

    reduceToStopCodes(data, numberOfStops){
        const closestStops = data.stopPoints.slice(0,numberOfStops);
        return closestStops.map((value) => {
            return {"id":value.id, "name":value.commonName};
        });
    }
};