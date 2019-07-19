const Handler = require("./Handler");
const handler = new Handler();
const express = require("express");

module.exports = class Server {
    async run() {
        const app = express();
        const port = 3000;

        app.get("/depatureBoards", async (input,res) => {
            let closestStopCodes;
            try {
                closestStopCodes = await handler.getStopCodesFromPostcode(input.query.postcode, 2);
            }catch (err){
                res.send(`${err.error.status}: ${err.error.error}`);
                return;
            }
            const promisesArray = [];
            if (closestStopCodes.length === 0){
                res.send("No bus stops here!");
                return;
            }
            closestStopCodes.forEach(async item => {
                const tableData = this.getTableData(item);
                promisesArray.push(tableData);
            });
            Promise.all(promisesArray)
                .then((result) => res.send(result))
                .catch((err) => res.send(err));
        });
        app.listen(port, () => console.log("Started BusBoard - go to website to view local buses"));        
    }

    async getTableData(closestStopCode) {
        const tableData = await handler.getTimeData(closestStopCode.id); 
        console.log("Next buses for: "+closestStopCode.name);
        console.table(tableData);
        const dict = {};
        dict[closestStopCode.name] = tableData;
        return dict;
    }
};