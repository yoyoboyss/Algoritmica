var correct = [4, 2, 1, 4, 3, 
               1, 2, 3, 4, 1, 
               4, 2, 1, 3, 4, 
               1, 3, 2, 4, 1, 
               4, 2, 1, 3, 4];
var addPoints = 4, currPoints, currQ;

function verify(){
    currPoints = currQ = 0;
    for(var s = 1; s <= 5; s++){
        for(var q = 1; q <= 5; q++){
            console.log("S" + s + "Q" + q + "A" + correct[currQ]);
            if(document.getElementById("S" + s + "Q" + q + "A" + correct[currQ]).checked == 1)
                currPoints += addPoints;
            currQ++;
        }
    }
    document.getElementById("results").innerHTML = "Rezultat: " + currPoints + "%";
    if(currPoints < 75)
        document.getElementById("results").style.color = "red";
    else document.getElementById("results").style.color = "green";
}