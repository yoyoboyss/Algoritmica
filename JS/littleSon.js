var N, M, pos, ifinish, jfinish, button;
var run = 0, nrPass;
var matrix = [], string = [], par = [];
var Q, currPos = [], neigh = [], nrNeigh;

var di = [-1, 0, 1, 0];
var dj = [0, 1, 0, -1];

class Queue {
    constructor() {
        this.items = [];
    }
    
    addElement(element) {
        this.items.push(element);
    }
    
    pop() {
        if(this.isEmpty()) 
            return "Underflow"; 
        return this.items.shift();
    }
    
    front() {
        if(this.isEmpty()) 
            return "No elements in Queue"; 
        return this.items[0];
    }
    
    isEmpty() {
        return this.items.length == 0;
    }
}

function extractValue() {
    var x = 0, ok = 0;
    for(pos = pos; pos < string.length; pos++){
        if(string[pos] >= '0' && string[pos] <= '9'){
            x = 10 * x + parseInt(string[pos]);
            ok = 1;
        } else if(ok == 1)
            break;
    }
    return x;
}

function read() {
    string.length = 0;
    string = document.getElementById("inputTest").value;
    
    pos = 0;
    N = extractValue();
    M = extractValue();
    ifinish = extractValue();
    jfinish = extractValue();
    matrix.length = par.length = 0;
    matrix[0] = [];
    par[0] = [];
    for(var i = 1; i <= N; i++){
        matrix[i] = [];
        par[i] = [];
        for(var j = 1; j <= M; j++){
            matrix[i][j] = extractValue();
            par[i][j] = 2e9;
        }
    }
}

function generateInputTable() {
    var cnt = document.getElementById("inputTable").rows.length;
    for(var i = 0; i < cnt; i++)
        document.getElementById("inputTable").deleteRow(0);
    
    var row, cell;
    row = document.getElementById("inputTable").insertRow(0);
    cell = row.insertCell(0); cell.innerHTML = "par";
    for(var i = 1; i <= M; i++){
        cell = row.insertCell(j);
        cell.innerHTML = i;
        cell.style.border = "solid white 2px";
        cell.style.color = "rgba(28, 207, 217, 1)";
    }
    for(var i = 1; i <= N; i++){
        row = document.getElementById("inputTable").insertRow(i);
        cell = row.insertCell(0);
        cell.innerHTML = i;
        cell.style.border = "solid white 2px";
        cell.style.color = "rgba(28, 207, 217, 1)";
        for(var j = 1; j <= M; j++){
            cell = row.insertCell(j);
            cell.innerHTML = matrix[i][j];
            cell.style.border = "solid white 2px";
            
            if(matrix[i][j] == 1 && (i != 1 || j != 1)){
                cell.style.color = "rgba(226, 29, 29, 1)";
                cell.innerHTML = -1;
            }
            if(i == ifinish && j == jfinish)
                cell.style.color = "rgba(194, 82, 255, 1)";
            if(i == currPos[0] && j == currPos[1] && nrPass >= 1)
                cell.style.color = "yellow";
            for(var d = 0; d < nrNeigh && nrPass >= 2; d++)
                if(i == neigh[d][0] && j == neigh[d][1])
                    cell.style.color = "rgba(18, 181, 13, 1)";
        }
    }
}

function OK(i, j) {
    if(i < 1 || j < 1 || i > N || j > M)
        return false;
    if(matrix[i][j] == 1)
        return false;
    return true;
}

function findNeigh() {
    for(var d = 0; d < 4; d++){
        var i = currPos[0] + di[d];
        var j = currPos[1] + dj[d];
        if(OK(i, j) == true && par[currPos[0]][currPos[1]] + 1 < par[i][j]){
            neigh[nrNeigh] = [i, j];
            nrNeigh++;
            par[i][j] = par[currPos[0]][currPos[1]] + 1;
            matrix[i][j] = matrix[currPos[0]][currPos[1]] + 1;
            Q.addElement([i, j]);
        }
    }
}

function Update() {
    if(run == 0)
        return 0;
    if(nrPass == 2){
        findNeigh();
    }
    generateInputTable();
    nrPass++;
    if(Q.isEmpty() && nrPass >= 4){
        //neigh = 0;
        currPos[0] = currPos[1] = -1;
        generateInputTable();
        runTest(button);
        return 0;
    }
    if(nrPass >= 4){
        neigh.length = nrNeigh = nrPass = 0;
        currPos = Q.front();
        Q.pop();
    }
}

function screenStart(){
    Q = new Queue();
    var interval = setInterval(Update, 150);
}

function runTest(objButton) {
    run = 1 - run;
    if(run == 1)
        objButton.innerHTML = "Stop";
    else {
        objButton.innerHTML = "Run";
        return 0;
    }
    button = objButton;
    
    var check = document.getElementById("inputTest").value;
    if(check == string && string.length != 0 && currPos[0] != -1)
        return 0;
    read();
    
    Q = new Queue();
    currPos = [1, 1];
    par[1][1] = 0;
    matrix[1][1] = 1;
    neigh.length = nrNeigh = nrPass = 0;
}

function matGenerate() {
    var row, cell, N = 8;
    var v = [
        [1, 0, 1, 0, 1, 1, 0, 1],
        [2, 0, 1, 1, 10, 11, 12, 1],
        [3, 1, 1, 0, 9, 1, 13, 0],
        [4, 5, 6, 7, 8, 1, 14, 1],
        [1, 1, 1, 1, 1, 0, 15, 0],
        [0, 0, 1, 19, 18, 17, 16, 1],
        [0, 0, 1, 20, 1, 1, 1, 1],
        [0, 0, 0, 21, 22, 23, 24, 0]
    ]
    
    for(var i = 0; i < N; i++){
        row = document.getElementById("littleSonTable").insertRow(i);
        for(var j = 0; j < N; j++){
            cell = row.insertCell(j);
            cell.innerHTML = v[i][j];
            cell.style.border = "solid white 2px";
            if(v[i][j] > 1 || (i == 0 && j == 0))
                cell.style.color = "rgba(18, 181, 13, 1)";
        }
    }
}