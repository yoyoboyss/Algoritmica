var N, Q, ok, run = 0;
var currQuery = 1, nrPass = 0;
var v = [], sum = [], string = [], query = [];

function read() {
    N = Q = ok = 0;
    string.length = v.length = sum.length = query.length = 0;
    
    string = document.getElementById("inputTest").value;
    
    var i;
    for(i = 0; i < string.length; i++){
        if(string[i] >= '0' && string[i] <= '9'){
            N = 10 * N + parseInt(string[i]);
            ok = 1;
        } else if(ok == 1)
            break;
    }
    
    ok = 0;
    for(i = i; i < string.length; i++){
        if(string[i] >= '0' && string[i] <= '9'){
            Q = 10 * Q + parseInt(string[i]);
            ok = 1;
        } else if(ok == 1)
            break;
    }  
    
    ok = 0;
    v.push(0); v.push(0); sum.push(0);
    var pos = 1, sign = 1;
    for(i = i; i < string.length; i++){
        if(string[i] == '-'){
            sign = -1;
        } else if(string[i] >= '0' && string[i] <= '9'){
            v[pos] = 10 * v[pos] + parseInt(string[i]) * sign;    
            ok = 1;
        } else if(ok == 1){
            ok = 0;
            sum.push(v[pos]);
            if(pos - 1 >= 0)
                sum[pos] += sum[pos - 1];
            pos++;
            if(pos > N)
                break;
            v.push(0);
            sign = 1;
        }
    }
    
    ok = 0;
    query.push(0); query.push(0);
    pos = 1;
    for(i = i; i < string.length; i++){
        if(string[i] >= '0' && string[i] <= '9'){
            query[pos] = 10 * query[pos] + parseInt(string[i]);    
            ok = 1;
        } else if(ok == 1){
            ok = 0;
            pos++;
            if(pos > 2 * Q)
                break;
            query.push(0);
        }
    }
}

function Update() {
    if(run == 0)
        return 0;
    
    document.getElementById("varX").innerHTML = "x = " + query[2 * currQuery - 1];
    document.getElementById("varY").innerHTML = "y = " + query[2 * currQuery];
    document.getElementById("varSumY").innerHTML = "sum[y] = sum[" + query[2 * currQuery] + "] = " + sum[query[2 * currQuery]];
    document.getElementById("varSumX").innerHTML = "sum[x - 1] = sum[" + (query[2 * currQuery - 1] - 1) + "] = " + sum[query[2 * currQuery - 1] - 1];
    document.getElementById("varAns").innerHTML = "ans = sum[y] - sum[x - 1] = " + (sum[query[2 * currQuery]] - sum[query[2 * currQuery - 1] - 1]);
    
    document.getElementById("vectorTable").deleteRow(0);
    document.getElementById("vectorTable").deleteRow(0);
    document.getElementById("vectorTable").deleteRow(0);
    
    var row = document.getElementById("vectorTable").insertRow(0);
    var cell = row.insertCell(0);
    cell.innerHTML = "pos";
    for(var i = 1; i < v.length; i++){
        cell = row.insertCell(i);
        cell.innerHTML = i;
        if(i >= query[2 * currQuery - 1] && i <= query[2 * currQuery] && nrPass >= 0)
            cell.style.color = "rgba(28, 207, 217, 1)";
    }

    row = document.getElementById("vectorTable").insertRow(1);
    cell = row.insertCell(0);
    cell.innerHTML = "v";
    for(var i = 1; i < v.length; i++){
        cell = row.insertCell(i);
        cell.innerHTML = v[i];
        if(i >= query[2 * currQuery - 1] && i <= query[2 * currQuery] && nrPass >= 1)
            cell.style.color = "yellow";
    }
    
    row = document.getElementById("vectorTable").insertRow(2);
    cell = row.insertCell(0);
    cell.innerHTML = "sum";
    for(var i = 1; i < v.length; i++){
        cell = row.insertCell(i);
        cell.innerHTML = sum[i];
        if(i <= query[2 * currQuery] && nrPass >= 2)
            cell.style.color = "rgba(18, 181, 13, 1)";
        if(i < query[2 * currQuery - 1] && nrPass >= 3)
            cell.style.color = "rgba(226, 29, 29, 1)";
    }
    nrPass++;
    if(nrPass > 3){
        nrPass = 0;
        currQuery++;
        if(currQuery > Q)
            currQuery = 1;
    }
}

function executeTest(objButton) {
    read();
    run = 1 - run;
    if(run == 1)
        objButton.innerHTML = "Stop";
    else objButton.innerHTML = "Run";
}




























