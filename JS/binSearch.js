var N, Q, pos, nrQ, nextQuerry;
var button, run = 0, nrPass = 0;
var string = [], v = [], query = [];

var st, dr, last, mid;

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
    string.length = pos = 0;
    string = document.getElementById("inputTest").value;
    
    N = extractValue();
    Q = extractValue();
    v.length = query.length = 0;
    for(var i = 1; i <= N; i++)
        v[i] = extractValue();
    for(var i = 1; i <= Q; i++)
        query[i] = extractValue();
}

function addInTableVar() {
    var row, cell;
    var s = st, d = dr, m = mid, l = last;
    if(d < s)
        s = d;

    for(var z = 1; z <= 4; z++){
        if(s == 0 && d == 0 && m == 0 && l == 0)
            break;
        row = document.getElementById("inputTable").insertRow(z - 1);
        cell = row.insertCell(0);
        for(var i = 1; i <= N; i++){
            cell = row.insertCell(i);
            if(i == s) {
                cell.innerHTML = "s";
                s = 0;
            } else if(i == d) {
                cell.innerHTML = "d";
                d = 0;
            } else if(i == m) {
                cell.innerHTML = "m";
                m = 0;
            } else if(i == l){
                cell.innerHTML = "l";
                l = 0;
            } 
        }
    }
}

function generateInputTable() {
    var cnt = document.getElementById("inputTable").rows.length;
    for(var i = 0; i < cnt; i++)
        document.getElementById("inputTable").deleteRow(0);
    
    addInTableVar();
    
    var row, cell;
    row = document.getElementById("inputTable").insertRow(0);
    cell = row.insertCell(0);
    cell.innerHTML = "pos";
    cell.style.border = "solid white 2px";
    for(var i = 1; i <= N; i++){
        cell = row.insertCell(i);
        cell.innerHTML = i;
        cell.style.border = "solid white 2px";
        if((i == st || i == dr) && st <= dr)
            cell.style.color = "rgba(28, 207, 217, 1)";
        if(i == mid && nrPass >= 1)
            cell.style.color = "rgba(226, 29, 29, 1)";
        if(i == last)
            cell.style.color = "rgba(18, 181, 13, 1)";
    }
    
    row = document.getElementById("inputTable").insertRow(1);
    cell = row.insertCell(0);
    cell.innerHTML = "v";
    cell.style.border = "solid white 2px";
    for(var i = 1; i <= N; i++){
        cell = row.insertCell(i);
        cell.innerHTML = v[i];
        cell.style.border = "solid white 2px";
        if((i == st || i == dr) && st <= dr)
            cell.style.color = "rgba(28, 207, 217, 1)";
        if(i == mid && nrPass >= 1)
            cell.style.color = "rgba(226, 29, 29, 1)";
        if(i == last)
            cell.style.color = "rgba(18, 181, 13, 1)";
    }
}

function binsearch() {
    if(nrPass == 0){
        if((st + dr) % 2 == 0)
           mid = (st + dr) / 2;
        else mid = (st + dr - 1) / 2;
    }
    if(nrPass == 1)
        if(v[mid] <= query[nrQ])
            last = mid;
    if(nrPass == 3){
        if(v[mid] <= query[nrQ])
            st = mid + 1;
        else dr = mid - 1;
        if(dr < st){
            nextQuerry = 1;
            st = dr = 0;
            if(v[last] == query[nrQ])
                document.getElementById("varAns").innerHTML = "ans = DA";
            else document.getElementById("varAns").innerHTML = "ans = NU";
        }
        mid = 0
    }
}

function genDebug() {
    document.getElementById("varLast").innerHTML = "v[last] = ";
    if(last != 0)
        document.getElementById("varLast").innerHTML += v[last];
    document.getElementById("varX").innerHTML = "x = " + query[nrQ];
    document.getElementById("varCond").innerHTML = "v[mid] <= x&emsp;:&emsp;";
    if(nrPass > 1 && nrPass < 4)
       document.getElementById("varCond").innerHTML += v[mid] + " <= " + query[nrQ] + "&emsp;:&emsp;" + (v[mid] <= query[nrQ] );
}

function Update() {
    if(run == 0)
        return 0;
    
    generateInputTable();
    if(!nextQuerry)
        binsearch();
    nrPass++;
    genDebug();
    if(nrPass > 4 && nextQuerry == 0){
        nrPass = mid = 0;
    } else if(nrPass > 6 && nextQuerry == 1){
        st = 1; dr = N;
        nrQ++;
        last = nrPass = nextQuerry = 0;
        document.getElementById("varAns").innerHTML = "";
    }
}

function runOnLoad() {
    var interval = setInterval(Update, 700);
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
    if(check == string && string.length != 0)
        return 0;
    
    read();
    st = nrQ = 1; dr = N; last = mid = nrPass = nextQuerry = 0;
}