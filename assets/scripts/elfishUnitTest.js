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

unitTestEstimate();
