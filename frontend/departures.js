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
            data.forEach(element => {
                newHtml += `<h3>${element.name}</h3>\n`;
                newHtml += "<table>\n";
                newHtml += "<tr>\n";
                newHtml += "<th>Route</th>\n";
                newHtml += "<th>Destination</th>\n";
                newHtml += "<th>Expected (mins)</th>\n";            
                newHtml += "</tr>\n";
                element.times.forEach(item => {
                    newHtml += "<tr>\n";
                    newHtml += `<th>${item["Route"]}</th>\n`;                
                    newHtml += `<th>${item["Destination"]}</th>\n`;
                    newHtml += `<th>${item["Expected (mins)"]}</th>\n`;
                    newHtml += "</tr>\n";
                });
                newHtml += "</table>\n";
            });
        }
        document.getElementById("results").innerHTML = newHtml;
    };
    xhttp.send();
}

function getDepartureBoardsOnRepeat(postcode) {
    getDepartureBoards(postcode);
    setInterval( () => {
        getDepartureBoards(postcode);
    }, 30000);
}