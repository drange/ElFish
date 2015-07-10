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
    window.elfish = {unstable:false};
    
    var ok = true;
    var arr = [34, 46, 22, 26, 18, 16, 20, 12];
    
    // TOTAL CATCH
    var T = sum(arr);
    if (T != 194) {
	    ok = false;
	    console.error("Wrong total catch: " + T + " should be " + 194);
    }
    
    // CATCHABILITY
    var q = 1 - catchability(arr);
    var p = 0.1446;
    if (!floatEqual(q, p)) {
	    ok = false;
	    console.error("Wrong catchability: " + q.toFixed(4) + " should be " + p);
    }
    
    // CONFIDENCE
    var cf = confidence(arr);
    if (!floatEqual(cf, 59.476)) {
	    ok = false;
	    console.error("Wrong confidence: " + cf.toFixed(2) + " should be " + 0.22);
    }
    
    // ESTIMATE
    var est = estimate(arr);
    if (!floatEqual(est, 271.9773)) {
	    ok = false;
	    console.error("Wrong estimate: " + est.toFixed(4) + " should be " + 271.9773);
    }
    
    
    if (ok) {
	    console.log("unit test: pass");
	    return true;
    }
    else {
	    console.log("unit test: fail");
	    return false;
    }
}

function unitTestZippin(arr, hatN) {
    // testing X
    console.log("Testing zippin");
    console.log(newZippin(arr));
    if (newZippin(arr) != hatN) {
        console.log("Zippin error on " + arr);
    }
}

function unitTestNewCatch(arr, hatN, p) {
    // testing X
    console.log("Testing catch");
    
    if (Math.round(100*newCatch(arr,hatN)) != (p*100)) {
        console.log("Catchability error " + arr);
    } else {
        console.log("newCatch test " + Math.round(100*newCatch(arr,hatN)));
    }
}

function unitTestX(arr, x) {
    // testing X
    if (X(arr) != x) {
        console.log("unit test: fail on X " + arr + " " + x);
    } else {
        console.log("X passed");
    }
}

function unitTestConfidenceInterval(arr, ci) {
    var res = newConfidenceInterval(arr);
    
    console.log("Confidence interval " + res);
    if (Math.round(res*10) != Math.round(ci* 10)) {
        console.log("ci error: " + arr + " vs " + res);
    } else {
        console.log("ci ok");
    }
}

unitTestEstimate();

var arr = [19,17,13,1,1];
var hatN = 53;
var p = 0.46;
var x = 154;
var ci = 4.4;
unitTestX(arr, x);
unitTestZippin(arr, hatN);
unitTestNewCatch(arr, hatN, p, x);
unitTestConfidenceInterval(arr, ci);

arr = [10,20,30,24,2,7];
hatN = 156;
p = 0.14;
x = 270;
ci = 80.29;
unitTestX(arr, x);
unitTestZippin(arr, hatN);
unitTestNewCatch(arr, hatN, p, x);
unitTestConfidenceInterval(arr, ci);


arr = [5,1,0,0,0,0,0];
hatN = 6;
p = 0.86;
x = 35;
ci = 0.00529;
unitTestX(arr, x);
unitTestZippin(arr, hatN);
unitTestNewCatch(arr, hatN, p, x);
unitTestConfidenceInterval(arr, ci);

