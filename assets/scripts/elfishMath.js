
/**
 * Computes the catchability q = 1-p.
 *
 */
function catchability (arr) {
    window.elfish.unstable = false;
    // k = number of removals
    var k = arr.length;
    
    // TOTAL CATCH
    var totalCatch = 0.0;
    for (var i = 0; i < k; i++) {
	totalCatch += arr[i];
    }
    
    var summand = 0.0;
    for (var i = 1; i < k; i++) {
        summand += (i * arr[i]);
    }
    summand = summand / totalCatch;
    
    // c_0 / T can be used as first guess
    var q = 1 - (arr[0] / totalCatch);
    
    // console.log("init q = " + q);
    
    var sumtwo = (k* Math.pow(q,k)) / (1 - Math.pow(q,k));
    var qinv = 1 - q;
    q = (summand + sumtwo) * qinv;
    // console.log("q = " + q);
    
    for (var i = 0; i < 100; i++) {
	var oldq=q;
	sumtwo = (k* Math.pow(q,k)) / (1 - Math.pow(q,k));
	qinv = 1 - q;
	q = (summand + sumtwo) * qinv;
	// console.log("q" + i + " = " + q);
	if (Math.abs(oldq-q) < 0.00001) {
	    return q;
	}
    }
    console.warn("Unstable q");
    window.elfish.unstable = true;    
    return q;
}



/**
 * Computes T / (1 - q^k)
 * where T = totalCatch (BB4)
 * k = num catch (AG4)
 * q = (1-p) (BV4)
 */
function estimate (arr) {
    
    console.log("estimating array " + arr);
    
    // k = number of removals
    var k = arr.length;
    
    // TOTAL CATCH
    var totalCatch = 0.0;
    for (var i = 0; i < k; i++) {
	totalCatch += arr[i];
    }
    
    q = catchability(arr);
    return totalCatch / (1-Math.pow(q,k));
}



/**
 * Computes confidence interval
 */
function confidence (arr, areal) {
    // k = number of removals
    var k = arr.length;
    
    // TOTAL CATCH
    var totalCatch = 0.0;
    for (var i = 0; i < k; i++) {
	totalCatch += arr[i];
    }
    
    q = catchability(arr);
    
    var qk = Math.pow(q,k);
    
    var CR4 = totalCatch / (1-Math.pow(q,k));
    
    // console.log("CR4 = " + CR4);
    
    // CR4 * (1-(BV4^$AG4)) * BV4^$AG4
    var CS4numerator = CR4 * (1-qk) * qk;
    
    // (((1-(qk))^2)-(Math.pow((1-q)*k,2))*(Math.pow(q,k-1)))
    var CS4denominator = (Math.pow(1-qk,2) - (Math.pow((1-q)*k,2)*(Math.pow(q,k-1))));
    
    var CS4 = CS4numerator / CS4denominator;
    // console.log("CS4 = " + CS4);
    
    var CT4 = Math.sqrt(CS4);

    // console.log("CT4 = " + CT4);
    
    var CU4 = 1.96 * CT4;

    // console.log("CU4 = " + CU4);
    
    return CU4/areal * 100
}

/**
 * Gets string 200 &pm; 59*
 */
function getEstimateString(arr) {
    if (arr.length < 2) {
	return "---";
    }
    
    var q = estimate(arr);
    var cf = confidence(arr, 100);
    var unstable = "";
    if (window.elfish.unstable) {
	window.elfish.unstable = false;
	unstable = "*";
    }
    
    return q.toFixed(2) + " &pm; " + cf.toFixed(2) + unstable
}

/**
 * Returns k/E
 *
 */
function getKE(arr) {
    if (arr.length < 2) {
	return "---";
    }

    // todo precomputed
    var q = estimate(arr);
    var cf = confidence(arr, 100);
    var unstable = "";
    if (window.elfish.unstable) {
	window.elfish.unstable = false;
	unstable = "*";
    }
    
    return (cf/q).toFixed(2);
}

function getTE(arr) {
    if (arr.length < 2) {
	return "---";
    }
    
    var t = 0;
    for (var i = 0; i < arr.length; i++) {
	t += arr[i];
    }
    
    // todo precomputed
    var q = estimate(arr);
    var cf = confidence(arr, 100);
    var unstable = "";
    if (window.elfish.unstable) {
	window.elfish.unstable = false;
	unstable = "*";
    }
    
    return (t/q).toFixed(2);
}
