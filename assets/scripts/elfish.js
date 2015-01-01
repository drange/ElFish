/**
 * Computes the catchability q = 1-p.
 *
 */
function catchability (arr) {


    //var ITERATIONS = 7;

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

    // c_1 / T can be used as first guess
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
	console.log("q" + i + " = " + q);
	if (Math.abs(oldq-q) < 0.00001) {
	    return q;
	}
    }
    console.warn("Unstable q");
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


function showAndroidToast(toast) {
    //Android.showToast(toast);
}

function run () {
    $( ".app" )
    .delegate(".catch-input", "change", function (eventObject) {
    var val = eventObject.target.value;
    val = parseInt(val);
    console.log(val);
    if (eventObject.target.id == "ci-1-3") {
        var c11 = document.getElementById("ci-1-1").value;
        var c12 = document.getElementById("ci-1-2").value;
        var c13 = document.getElementById("ci-1-3").value;
        console.log(c11 + " " + c12 + " " + c13);

        var i11 = parseInt(c11);
        var i12 = parseInt(c12);
        var i13 = parseInt(c13);

        var q = estimate([i11,i12,i13]);
        var t = i11+i12+i13;

        document.getElementById("est-1-3").innerHTML = "EST = " + q.toFixed(2);
        document.getElementById("ke-1-3").innerHTML = "k/E = " + t;
        document.getElementById("te-1-3").innerHTML = "T/E = " + (t/q).toFixed(2);
    }
    });

}

// same-ish as window.onload
$(function () {
    var groups = 2;
    var efforts = 3;

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
