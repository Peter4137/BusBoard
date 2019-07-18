
const {TflAPI, LocationAPI} = require("./API");

const AppID = "b154d8d7";
const AppKey = "5982cb595a9801b30dc65c20874133c4";

const tfl = new TflAPI(AppID, AppKey);
const location = new LocationAPI();

module.exports = class Handler {

    async getTimeData(id){
        return await this.handleTimeData(await tfl.getBusTimesFromStop(id));
    }


    handleTimeData(data){
        const tableData = [];
        data.forEach(item => {
            tableData.push({
                "Route":item.lineId, 
                "Destination":item.destinationName, 
                "Expected (mins)": Math.round(item.timeToStation/60)});
        });
        tableData.sort((a, b) => a["Expected (mins)"]- b["Expected (mins)"]);
        return tableData.slice(0, 5);
    }

    async getLatLong(postcode){
        return this.reduceToLatLong(await location.getCoordinates(postcode));
    }

    reduceToLatLong(data){
        return {
            "latitude" : data.result.latitude, 
            "longitude" : data.result.longitude
        };
    }

    async getStopCodes(position, numberOfStops){
        const nearbyStopData = await tfl.getStopsNearby(position.latitude, position.longitude);
        return this.reduceToStopCodes(nearbyStopData, numberOfStops);
    }
    
    reduceToStopCodes(data, numberOfStops){
        const closestStops = data.stopPoints.slice(0,numberOfStops);
        return closestStops.map((value) => {
            return {"id":value.id, "name":value.commonName};
        });
    }

    async getStopCodesFromPostcode(postcode, numberOfStops){
        const position = await this.getLatLong(postcode);
        return this.getStopCodes(position, numberOfStops);
    }
};