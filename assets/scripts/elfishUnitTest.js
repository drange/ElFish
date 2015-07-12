console.error("loading unit test");
console.log("unit");
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


function unitTestEstimate() {
    console.log("unit: unitTestEstimate");
    window.elfish = {unstable:false};
    
    var ok = true;
    var arr = [34, 46, 22, 26, 18, 16, 20, 12];
    
    // TOTAL CATCH
    var T = sum(arr);
    if (T != 194) {
	    ok = false;
	    console.error("unit: Wrong total catch: " + T + " should be " + 194);
    }
    
    // CATCHABILITY
    var q = 1 - catchability(arr);
    var p = 0.1446;
    if (!floatEqual(q, p)) {
	    ok = false;
	    console.error("unit: Wrong catchability: " + q.toFixed(4) + " should be " + p);
    }
    
    // CONFIDENCE
    var cf = confidence(arr);
    if (!floatEqual(cf, 59.476)) {
	    ok = false;
	    console.error("unit: Wrong confidence: " + cf.toFixed(2) + " should be " + 0.22);
    }
    
    // ESTIMATE
    var est = estimate(arr);
    if (!floatEqual(est, 271.9773)) {
	    ok = false;
	    console.error("unit: Wrong estimate: " + est.toFixed(4) + " should be " + 271.9773);
    }
    
    
    if (ok) {
	    console.log("unit: unit test: pass");
	    return true;
    }
    else {
	    console.log("unit: unit test: fail");
	    return false;
    }
}


function unitTestCarleStrub(arr, hatN) {
    // testing C&S
    console.log("unit: Testing Carle&Strub");
    var cs = newCarleStrub(arr);
    console.log(cs);
    if (cs != hatN) {
        console.log("unit: Ca&Str error on " + arr + ": was " + cs + " expected " + hatN);
    } else {
        console.log("unit: Carle & Strub ok on " + arr + ": " + cs);
    }
}




function unitTestZippin(arr, hatN) {
    // testing Z
    console.log("unit: Testing zippin");
    var z = newZippin(arr);
    console.log(z);
    if (z != hatN) {
        console.log("unit: Zippin error on " + arr + ": was " + z + " expected " + hatN);
    }
}

function unitTestNewCatch(arr, hatN, p) {
    // testing X
    console.log("unit: Testing catch");
    
    if (Math.round(100*newCatch(arr,hatN)) != (p*100)) {
        console.log("unit: Catchability error " + arr);
    } else {
        console.log("unit: newCatch test " + Math.round(100*newCatch(arr,hatN)));
    }
}

function unitTestX(arr, x) {
    // testing X
    if (X(arr) != x) {
        console.log("unit: unit test: fail on X " + arr + " " + x);
    } else {
        console.log("unit: X passed");
    }
}

function unitTestConfidenceInterval(arr, ci) {
    var res = newConfidenceInterval(arr);
    
    console.log("unit: Confidence interval " + res);
    if (Math.round(res*10) != Math.round(ci* 10)) {
        console.log("unit: ci error: " + arr + " vs " + res);
    } else {
        console.log("unit: ci ok");
    }
}

unitTestEstimate();

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
