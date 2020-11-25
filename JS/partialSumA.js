var N, Q, currQuery = 0, currPos = -1, sum = 0;
var ex = 0;

var v = [5, 2, -3, 2, 6, 3, -1, 9];
var query = [1, 5, 3, 7, 2, 8, 5, 5, 4, 8];

N = v.length; Q = query.length / 2;

var row, cell;

function doSth(objButton) {
    ex = 1 - ex;
    if(ex == 1)
        objButton.innerHTML = "Stop";
    else objButton.innerHTML = "Run";
}

function solve(){
    if(ex == 0)
        return 0;
    
    document.getElementById("vectorTable").deleteRow(0);
    document.getElementById("vectorTable").deleteRow(0);
    
    document.getElementById("varX").innerHTML = "x = " + query[2 * currQuery];
    document.getElementById("varY").innerHTML = "y = " + query[2 * currQuery + 1];
    document.getElementById("varSum").innerHTML = "sum = " + sum;
    
    row = document.getElementById("vectorTable").insertRow(0);
    cell = row.insertCell(0);
    cell.innerHTML = "pos";
    for(var i = 1; i <= N; i++){
        cell = row.insertCell(i);
        cell.innerHTML = i;
        if(i >= query[2 * currQuery] && i <= query[2 * currQuery + 1])
            cell.style.color = "rgba(28, 207, 217, 1)";
    }
    
    row = document.getElementById("vectorTable").insertRow(1);
    cell = row.insertCell(0);
    cell.innerHTML = "v";
    for(var i = 0; i < N; i++){
        cell = row.insertCell(i + 1);
        cell.innerHTML = v[i];
        if(i + 1 == currPos)
            cell.style.color = "rgba(226, 29, 29, 1)";
    }
    
    if(currPos >= query[2 * currQuery + 1]){
        currQuery++;
        currPos = -1;
        sum = 0;
    } else {
        if(currPos == -1)
            currPos = query[2 * currQuery];
        else currPos++;
        if(currPos <= N)
           sum += v[currPos - 1];
    }
    if(currQuery >= Q){
        currQuery = 0;
        currPos = -1;
    }
}

function Update() {
    var interval = setInterval(solve, 500);
}
