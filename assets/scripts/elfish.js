window.elfish = {efforts: 3, groups: 1, species: 1 };

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
    
    console.log("init q = " + q);
    
    var sumtwo = (k* Math.pow(q,k)) / (1 - Math.pow(q,k));
    var qinv = 1 - q;
    q = (summand + sumtwo) * qinv;
    console.log("q = " + q);
    
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
    
    console.log("CR4 = " + CR4);
    
    // CR4 * (1-(BV4^$AG4)) * BV4^$AG4
    var CS4numerator = CR4 * (1-qk) * qk;
    
    // (((1-(qk))^2)-(Math.pow((1-q)*k,2))*(Math.pow(q,k-1)))
    var CS4denominator = (Math.pow(1-qk,2) - (Math.pow((1-q)*k,2)*(Math.pow(q,k-1))));
    
    var CS4 = CS4numerator / CS4denominator;
    console.log("CS4 = " + CS4);
    
    var CT4 = Math.sqrt(CS4);

    console.log("CT4 = " + CT4);
    
    var CU4 = 1.95 * CT4;

    console.log("CU4 = " + CU4);
    
    return CU4/areal * 100
}


function showAndroidToast(toast) {
    Android.showToast(toast);
}

function getInputValue(sp, gr, ef) {
    var elt = getInput(sp,gr,ef);
    if (elt != null)
	return elt.value;
    return NaN;
}

function getInput(sp, gr, ef) {
    var key = "ci-" + gr + "-" + ef;
    return document.getElementById(key);
}

function createNewSpecies () {
}

function createNewGroup (specie) {
    window.elfish.groups = window.elfish.groups + 1;
    
    var sp = window.elfish.species;
    var gr = window.elfish.groups;
    var ef = window.elfish.efforts;
    
    $(".app:first").loadFromTemplate({
        template:$("#template-group").html(),
        data: {
            group: {
                id: gr,
                title: "Group"
            }
        }
    });
    for (var e = 0; e < ef; e++) {
	$("[data-id=group-"+gr+"]").loadFromTemplate({
	    template:$("#template-effort").html(),
	    data: {
		effort: {
		    id: e+1,
		    groupid: gr,
		    title: "g" + gr + " Effort",
		    est: "----",
		    ke: "----",
		    te: "----"
		}
	    }
	});
    }    
}


function createNewEffort () {
    window.elfish.efforts = window.elfish.efforts + 1;
    
    var sp = window.elfish.species;
    var gr = window.elfish.groups;
    var ef = window.elfish.efforts;
    
    for (var s = 0; s < sp; s++) {
	for (var g = 0; g < gr; g++) {
	    $("[data-id=group-"+(g+1)+"]").loadFromTemplate({
		template:$("#template-effort").html(),
		data: {
		    effort: {
			id: ef,
			groupid: g+1,
			title: "g" + (g+1) + " Effort",
			est: "----",
			ke: "----",
			te: "----"
		    }
		}
	    });
	}
    }
}



function exportCSV () {
    var csv = "";
    for (var s = 0; s < window.elfish.species; s++) {
	csv += "Species " + (1+s);
	for (var g = 0; g < window.elfish.groups; g++) {
	    
	    // INPUT
	    csv += "\nGroup " + (g+1);
	    for (var e = 0; e < window.elfish.efforts; e++) {
		csv += "," + getInputValue(s+1,g+1,e+1);
	    }
	    
	    // EST
	    csv += "\n";
	    for (var e = 0; e < window.elfish.efforts; e++) {
		if (e < 2)
		    csv += ",---";
		else
		    csv += "," + document.getElementById("est-"+(g+1)+"-"+(e+1)).innerHTML;
	    }
	    
	    // k/E
	    csv += "\n";
	    for (var e = 0; e < window.elfish.efforts; e++) {
		if (e < 2)
		    csv += ",---";
		else
		    csv += "," + document.getElementById("ke-"+(g+1)+"-"+(e+1)).innerHTML;
	    }
	    
	    // T/E
	    csv += "\n";
	    for (var e = 0; e < window.elfish.efforts; e++) {
		if (e < 2)
		    csv += ",---";
		else
		    csv += "," + document.getElementById("te-"+(g+1)+"-"+(e+1)).innerHTML;
	    }
	    
	    
	    
	    
	}
	csv += "\n";
    }
    
    // TODO add also EST,k/E,T/E data
    // var est = document.getElementById("est-1-3").innerHTML;
    // var ke = document.getElementById("ke-1-3").innerHTML;
    // var te = document.getElementById("te-1-3").innerHTML;
    

    return csv;
}



function run () {
    $( ".app" )
	.delegate(".catch-input", "change", function (evtObj) {
	    var val = evtObj.target.value;
	    val = parseInt(val);
	    
	    window.elfish[evtObj.target.id] = val;
	    
	    console.log(elfish);
	    
	    for (var s = 1; s <= window.elfish.species; s++) {
		for (var g = 1; g <= window.elfish.groups; g++) {
		    
		    var vals = [];
	    	    for (var e = 1; e <= window.elfish.efforts; e++) {
			vals.push(getInputValue(s,g,e));
			
			if (e >= 3) {
			    
			    var arr = [];
			    var t = 0;
			    for (var i = 0; i < vals.length; i++) {
				var v = parseInt(vals[i],10)
				arr.push(v);
				t += v;
			    }
		    
			    console.log(arr);
			    if (t != t) return; // NaN
			    
			    
			    
			    var q = estimate(arr);
			    var cf = confidence(arr, 100);
			    var unstable = "";
			    if (window.elfish.unstable) {
				window.elfish.unstable = false;
				unstable = "*";
			    }
			    
			    document.getElementById("est-"+g+"-" + e).innerHTML =
				"EST =" + q.toFixed(2) + " &pm; " + cf.toFixed(2) + unstable; 
			    
			    document.getElementById("ke-"+g+"-" + e).innerHTML = 
				"k/E =" + (cf/q).toFixed(2);
			    
			    document.getElementById("te-"+g+"-" + e).innerHTML = 
				"T/E =" + (t/q).toFixed(2);
			    
			    if (cf >= q) {
				document.getElementById("est-"+g+"-" + e).className = "est red";
			    } else {
				document.getElementById("est-"+g+"-" + e).className = "est";
			    }
			}
		    }
		}
	    }
	});
}
    
// same-ish as window.onload
$(function () {
    var species = window.elfish.species;
    var groups = window.elfish.groups;
    var efforts = window.elfish.efforts;
    
    for (var i = 1; i <= groups; i++) {
        $(".app:first").loadFromTemplate({
            template:$("#template-group").html(),
            data: {
                group: {
                    id: i,
                    title: "Group"
                }
            }
        });
    }
    
    for (var j = 1; j <= groups; j++) {
        for (var i = 1; i <= efforts; i++) {
            $("[data-id=group-"+j+"]").loadFromTemplate({
                template:$("#template-effort").html(),
                data: {
                    effort: {
                        id: i,
                        groupid: j,
                        title: "g"+j+ " Effort",
                        est: "----",
                        ke: "----",
                        te: "----"
                    }
                }
            });
        }
    }
    
    run();
    
    var arr = [34, 46, 22, 26, 18, 16, 20, 12];
    console.log("arr = " + arr);
    var T = 0;
    $.each(arr,function(){T+=parseFloat(this) || 0;});
    
    console.log("T = " + T);
    console.log("catch="+catchability(arr));
    console.log("est="+estimate(arr));
    
})
