const readline = require("readline-sync");
const {TflAPI, LocationAPI} = require("./API");
const TimesHandler = require("./TimesHandler");
const StopsHandler = require("./StopsHandler");
const AppID = "b154d8d7";
const AppKey = "5982cb595a9801b30dc65c20874133c4";

const tfl = new TflAPI(AppID, AppKey);
const location = new LocationAPI();
const timesHandler = new TimesHandler();
const stopsHandler = new StopsHandler();
module.exports = class ConsoleHandler {
    async run() {
        console.log("Welcome to bus board >:( ");
        const input = readline.question("Give me a postcode NOW!");

        const position = stopsHandler.reduceToLatLong(await location.getCoordinates(input));
        const nearbyStopData = await tfl.getStopsNearby(position.latitude, position.longitude);
        const closestStopCodes = stopsHandler.reduceToStopCodes(nearbyStopData, 2);
        
        closestStopCodes.forEach(async item => {
            const tableData =  timesHandler.handleTimeData(await tfl.getBusTimesFromStop(item.id));
            console.log("Next buses for: "+item.name);
            console.table(tableData);
        });
    }
};