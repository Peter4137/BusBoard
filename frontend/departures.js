function getDepartureBoards(postcode) {
    var xhttp = new XMLHttpRequest();
    
    xhttp.open("GET", "http://localhost:3000/departureBoards?postcode="+postcode, true);
    
    xhttp.setRequestHeader("Content-Type", "application/json");
    
    xhttp.onload = function() {
        let newHtml = "";
        if(xhttp.status != 200){
            newHtml +=  `<h2>Error:${xhttp.status}, ${xhttp.response}</h2>\n`;
        }
        else{
            const data = JSON.parse(xhttp.response);
            newHtml += "<h2>Results</h2>\n";
            data.forEach(element => newHtml += getTableForStop(element));
        }
        document.getElementById("results").innerHTML = newHtml;
    };
    xhttp.send();
}

let intervalRunning;

function getDepartureBoardsOnRepeat(postcode) {
    clearInterval(intervalRunning);
    getDepartureBoards(postcode);
    intervalRunning = setInterval( () => {
        getDepartureBoards(postcode);
    }, 30000);
}

function getTableForStop(stop){
    let tableHTML = `<h3>${stop.name}</h3>\n
                <table>\n
                <tr>\n
                <th>Route</th>\n
                <th>Destination</th>\n
                <th>Expected (mins)</th>\n
                </tr>\n`;
    stop.times.forEach(item => {
        tableHTML += `<tr>\n
                    <th>${item["Route"]}</th>\n               
                    <th>${item["Destination"]}</th>\n
                    <th>${item["Expected (mins)"]}</th>\n
                    </tr>\n`;
    });
    tableHTML += "</table>\n";
    return tableHTML;
}