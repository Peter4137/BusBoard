function getDepartureBoards(postcode) {
    var xhttp = new XMLHttpRequest();
    
    xhttp.open("GET", "http://localhost:3000/departureBoards?postcode="+postcode, true);
    
    xhttp.setRequestHeader("Content-Type", "application/json");
    
    xhttp.onload = function() {
        console.log(xhttp.response);
        // Handle response here using e.g. xhttp.status, xhttp.response, xhttp.responseText
    };
    xhttp.send();
}