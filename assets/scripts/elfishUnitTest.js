console.log("unit testing ... ");


/**
 *  Tests if two floats are equal (close enough).  If no epsilon is
 *  given, sets epsilon to 0.01.
 *
 *  Tests if |f1-f2| <= ɛ 
 *
 */
function floatEqual(f1, f2, epsilon) {
    if (typeof epsilon === "undefined") {
	    epsilon = 0.001;
    }
    return Math.abs(f1-f2) <= epsilon;
}


function errorString(name, data, expected, actual) {
    var r = "error: " + name + " on " + data + ".  ";
    r += "Was " + actual + ", expected " + expected;
    return r;
}

function unitTestCarleStrub(arr, hatN) {
    // testing C&S
    var cs = newCarleStrub(arr);

    if (cs != hatN) {
        var s = errorString("Carle & Strub", arr, hatN, cs);
        console.log(s);
        console.error(s);
    }
}




function unitTestZippin(arr, hatN) {
    // testing Z
    var z = newZippin(arr);

    if (z != hatN) {
        var s = errorString("Zippin", arr, hatN, z);
        console.log(s);
        console.error(s);
    }
}

function unitTestNewCatch(arr, hatN, p) {
    // testing X
    console.log("unit: Testing catch");
    var out = newCatch(arr,hatN);
    if (Math.round(100*out) != (p*100)) {
        var s = errorString("newCatch", arr, hatN, out);
        console.log(s);
        console.error(s);
    }
}

function unitTestX(arr, x) {
    // testing X
    var out = X(arr);
    if (out != x) {
        var s = errorString("x", arr, x, out);
        console.log(s);
        console.error(s);
    }
}

function unitTestConfidenceInterval(arr, ci) {
    var res = newConfidenceInterval(arr);
    
    if (Math.round(res*10) != Math.round(ci* 10)) {
        var s = errorString("ci", arr, ci, res);
        console.log(s);
        console.error(s);
    }
}




//
// 1
//
var arr = [19,17,13,1,1];
var hatNZ = 53;
var hatNCS = 53;
var p = 0.46;
var x = 154;
var ci = 4.4;

unitTestX(arr, x);
unitTestZippin(arr, hatNZ);
unitTestNewCatch(arr, hatNZ, p, x);
unitTestConfidenceInterval(arr, ci);
unitTestCarleStrub(arr,hatNCS);




//
// 2
//
arr = [10,20,30,24,2,7];
hatNZ = 156;
hatNCS = 156;
p = 0.14;
x = 270;
ci = 80.29;

unitTestX(arr, x);
unitTestZippin(arr, hatNZ);
unitTestNewCatch(arr, hatNZ, p, x);
unitTestConfidenceInterval(arr, ci);
unitTestCarleStrub(arr,hatNCS);



//
// 3
//
arr = [5,1,0,0,0,0,0];
hatNZ = 6;
hatNCS = 6;
p = 0.86;
x = 35;
ci = 0.00529;

unitTestX(arr, x);
unitTestZippin(arr, hatNZ);
unitTestNewCatch(arr, hatNZ, p, x);
unitTestConfidenceInterval(arr, ci);
unitTestCarleStrub(arr,hatNCS);



arr =  [34, 46, 22, 26, 18, 16, 20, 12];
hatNZ = 268;
hatNCS = 268;
p = 0.1454;
x = 834;
ci = 56.33;

unitTestX(arr, x);
unitTestZippin(arr, hatNZ);
unitTestNewCatch(arr, hatNZ, p, x);
unitTestConfidenceInterval(arr, ci);
unitTestCarleStrub(arr,hatNCS);



//
//
// ny data fra Marius, 20.07.2015

console.log("===============MARIUS==============");

var laks = [32, 40, 12, 19, 9, 7, 8, 5, 2, 3, 1, 1, 0];
var orre = [22,  9,  3,  2, 1, 1, 0, 0, 0, 0, 0, 0, 0];


var cslaks = 140;
var csorre = 38;
var cslaksci = 3.11;
var csorreci = 0.06;
 
var zlaks = 141;
var zorre = 38;
var zlaksci = 3.38;
var zorreci = 0.06;

unitTestCarleStrub(laks, cslaks);
unitTestCarleStrub(orre, csorre);

unitTestZippin(laks, zlaks);
unitTestZippin(orre, zorre);
unitTestConfidenceInterval(laks, zlaksci);
unitTestConfidenceInterval(orre, zorreci);
