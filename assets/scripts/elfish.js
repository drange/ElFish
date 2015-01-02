window.elfish = {efforts: 3, groups: 2, species: 1 };

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
    var CS4 = CR4 * (1-(qk)*qk) / (   Math.pow(1-qk,2)   - (Math.pow((1-q)*k,2)*(Math.pow(q,k-1))));
    
    var CT4 = Math.sqrt(CS4);
    
    var CU4 = 1.95 * CT4;
    
    return CU4/areal * 100
}


function showAndroidToast(toast) {
    // Android.showToast(toast);
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

function createNewEffort(species, group, newId) {
    $("[data-id=group-"+group+"]").loadFromTemplate({
        template:$("#template-effort").html(),
        data: {
            effort: {
                id: newId,
                groupid: group,
                title: "g" + group + " Effort",
                est: "----",
                ke: "----",
                te: "----"
            }
        }
    });
}

function run () {
    $( ".app" )
	.delegate(".catch-input", "change", function (e) {
	    var val = e.target.value;
	    val = parseInt(val);
	    
	    window.elfish[e.target.id] = val;
	    
	    console.log(elfish);
	    
	    for (var s = 1; s <= window.elfish.species; s++) {
		for (var g = 1; g <= window.elfish.groups; g++) {
		    
		    var vals = [];
	    	    for (var e = 1; e <= window.elfish.efforts; e++) {
			vals.push(getInputValue(s,g,e));
		    }
		    
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
		    
		    document.getElementById("est-"+g+"-3").innerHTML = "EST = " + q.toFixed(2) + " &pm; " + cf.toFixed(2) + unstable; // areal = 100
		    document.getElementById("ke-"+g+"-3").innerHTML = "k/E = " + (cf/q).toFixed(2);
		    document.getElementById("te-"+g+"-3").innerHTML = "T/E = " + (t/q).toFixed(2);
		    
		    if (cf >= q) {
			document.getElementById("est-"+g+"-3").className = "est red";
		    } else {
			document.getElementById("est-"+g+"-3").className = "est";
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
