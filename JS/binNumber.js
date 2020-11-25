var N, nrPass = 0, run = 0, nrBits = -1, M = 0, x = 0;
var button;
var row, cell;
var bits = [];

function read(){
    var string = document.getElementById("myInputText").value;
    var ok = 0;
    M = 0;
    for(var i = 0; i < string.length; i++){
        if(string[i] >= '0' && string[i] <= '9'){
            M = 10 * M + parseInt(string[i]);
            ok = 1;
        } else if(ok == 1)
            break;
    }
}

function runCommand(objButton){
    read();
    run = 1 - run;
    if(run == 1)
        objButton.innerHTML = "Stop";
    else {
        objButton.innerHTML = "Run";
        return 0;
    }
    if(M == N && x != 0)
        return 0;
    N = x = M;
    button = objButton;
    nrPass = nrBits = 0;
    bits.length = 0;
    for(var i = 0; i <= 150; i++)
        bits.push(0);
    bits[0] = N % 2;
}

function doStart(){
    var interval = setInterval(Update, 500);
}

function Update() {
    if(run == 0)
        return 0;
    
    document.getElementById("myTable").deleteRow(1);
    document.getElementById("myTable").deleteRow(1);
    document.getElementById("myTable").deleteRow(1);
    document.getElementById("myTable").deleteRow(1);
    
    row = document.getElementById("myTable").insertRow(1);
    cell = row.insertCell(0); cell.innerHTML = "x";
    if(nrPass == 0)
        cell.style.color = "rgba(28, 207, 217, 1)";
    cell = row.insertCell(1); cell.innerHTML = x;
    if(nrPass == 0)
        cell.style.color = "rgba(226, 29, 29, 1)";
    
    row = document.getElementById("myTable").insertRow(2);
    cell = row.insertCell(0); cell.innerHTML = "x % 2";
    if(nrPass == 1)
        cell.style.color = "rgba(28, 207, 217, 1)";
    cell = row.insertCell(1); cell.innerHTML = x % 2;
    if(nrPass == 1)
        cell.style.color = "rgba(226, 29, 29, 1)";
    
    row = document.getElementById("myTable").insertRow(3);
    cell = row.insertCell(0); cell.innerHTML = "x / 2";
    if(nrPass == 2)
        cell.style.color = "rgba(28, 207, 217, 1)";
    cell = row.insertCell(1); 
    if(x % 2 == 0)
        cell.innerHTML = x / 2;
    else cell.innerHTML = (x - 1) / 2;
    if(nrPass == 2)
        cell.style.color = "rgba(226, 29, 29, 1)";
    
    row = document.getElementById("myTable").insertRow(4);
    cell = row.insertCell(0); cell.innerHTML = "ans";
    if(nrPass == 3)
        cell.style.color = "rgba(28, 207, 217, 1)";
    var lastCell = cell;
    cell = row.insertCell(1);
    for(var i = nrBits; i >= 0; i--){
        cell.innerHTML += bits[i];
    }
    if(nrPass == 3)
        cell.style.color = "rgba(226, 29, 29, 1)";
    
    nrPass++;
    if(nrPass > 3){
        nrPass = 0;
        nrBits++;
        if(x % 2 == 1)
            x--;
        x = x / 2;
        if(x == 0){
            runCommand(button);
            lastCell.style.color = "white";
            cell.style.color = "rgba(28, 207, 217, 1)";
        }
        bits[nrBits] = x % 2;
    }
}