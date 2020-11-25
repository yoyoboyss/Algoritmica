var N, nrPass = 0, run = 0, P, pos, ans, x, MOD = 666013;
var button, finishRun;
var row, cell;
var string = [];

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

function read(){
    string = document.getElementById("myInputText").value;
    pos = 0; ans = 1;
    N = extractValue(); x = N;
    P = extractValue();
}

function runCommand(objButton){
    run = 1 - run;
    if(run == 1)
        objButton.innerHTML = "Stop";
    else {
        objButton.innerHTML = "Run";
        return 0;
    }
    var check = document.getElementById("myInputText").value;
    if(check == string && string.length != 0 && finishRun == 0)
        return 0;
    read();
    N = x = M;
    nrPass = finishRun = 0;
}

function doStart(){
    var interval = setInterval(Update, 50);
}

function lgpow(){
    if(P % 2 == 1)
        ans = ans * x % MOD;
    x = x * x % MOD;
    if(P % 2 == 0)
        P = P / 2;
    else P = (P - 1) / 2;
}

function Update() {
    if(run == 0)
        return 0;
    
    for(var i = 0; i < 6; i++)
        document.getElementById("myTable").deleteRow(1);
    
    row = document.getElementById("myTable").insertRow(1);
    cell = row.insertCell(0); cell.innerHTML = "N";
    if(nrPass == 0)
        cell.style.color = "rgba(28, 207, 217, 1)";
    cell = row.insertCell(1); cell.innerHTML = N;
    if(nrPass == 0)
        cell.style.color = "rgba(226, 29, 29, 1)";
    
    row = document.getElementById("myTable").insertRow(2);
    cell = row.insertCell(0); cell.innerHTML = "P";
    if(nrPass == 1)
        cell.style.color = "rgba(28, 207, 217, 1)";
    cell = row.insertCell(1); cell.innerHTML = P;
    if(nrPass == 1)
        cell.style.color = "rgba(226, 29, 29, 1)";
    
    row = document.getElementById("myTable").insertRow(3);
    cell = row.insertCell(0); cell.innerHTML = "P % 2";
    if(nrPass == 2)
        cell.style.color = "rgba(28, 207, 217, 1)";
    cell = row.insertCell(1); cell.innerHTML = P % 2;
    if(nrPass == 2)
        cell.style.color = "rgba(226, 29, 29, 1)";
    
    row = document.getElementById("myTable").insertRow(4);
    cell = row.insertCell(0); cell.innerHTML = "ans";
    if(nrPass == 3 || nrPass == 7)
        cell.style.color = "rgba(28, 207, 217, 1)";
    cell = row.insertCell(1); cell.innerHTML = ans;
    if(nrPass == 3)
        cell.style.color = "rgba(226, 29, 29, 1)";
    else if(nrPass == 7)
        cell.style.color = "yellow";
    
    row = document.getElementById("myTable").insertRow(5);
    cell = row.insertCell(0); cell.innerHTML = "x";
    if(nrPass == 4)
        cell.style.color = "rgba(28, 207, 217, 1)";
    cell = row.insertCell(1); cell.innerHTML = x;
    if(nrPass == 4)
        cell.style.color = "rgba(226, 29, 29, 1)";
    
    row = document.getElementById("myTable").insertRow(6);
    cell = row.insertCell(0); cell.innerHTML = "P / 2";
    if(nrPass == 5)
        cell.style.color = "rgba(28, 207, 217, 1)";
    cell = row.insertCell(1); 
    if(P % 2 == 0)
        cell.innerHTML = P / 2;
    else cell.innerHTML = (P - 1) / 2;
    if(nrPass == 5)
        cell.style.color = "rgba(226, 29, 29, 1)";
    
    nrPass++;
    if(nrPass >= 6){
        nrPass = 0;
        if(P != 0)
            lgpow();
        else {
            nrPass = 7;
            finishRun = 1;
        }
    }
}