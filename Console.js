const readline = require("readline-sync");
const Handler = require("./Handler");
const handler = new Handler();

module.exports = class ConsoleHandler {
    async run() {
        console.log("Welcome to bus board >:( ");
        const input = readline.question("Give me a postcode NOW! ");

        const closestStopCodes = await handler.getStopCodesFromPostcode(input, 2);
        closestStopCodes.forEach(async item => {
            const tableData = await handler.getTimeData(item.id); 
            console.log("Next buses for: "+item.name);
            console.table(tableData);
        });
    }
};