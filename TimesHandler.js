module.exports = class TimesHandler {
    handleTimeData(data){
        let tableData = [];
        data.forEach(item => {
            tableData.push({
                "Route":item.lineId, 
                "Destination":item.destinationName, 
                "Expected (mins)": Math.round(item.timeToStation/60)});
        });
        tableData.sort((a, b) => a["Expected (mins)"]- b["Expected (mins)"]);
        return tableData.slice(0, 5);
    }
};